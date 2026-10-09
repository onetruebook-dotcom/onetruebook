import { randomUUID } from "node:crypto";
import type Stripe from "stripe";
import { eq, inArray } from "drizzle-orm";
import { db } from "@/db";
import { books, orderItems, orders } from "@/db/schema";
import { ensureSeeded } from "@/lib/seed";

function parseSlugs(value: string | undefined) {
  if (!value) return [];
  try {
    const parsed: unknown = JSON.parse(value);
    if (!Array.isArray(parsed)) return [];
    return Array.from(
      new Set(parsed.filter((slug): slug is string => typeof slug === "string" && slug.length > 0)),
    );
  } catch {
    return [];
  }
}

/** Creates a paid order only from a verified Stripe session; safe for retries. */
export async function fulfillPaidCheckout(session: Stripe.Checkout.Session) {
  if (session.mode !== "payment" || session.payment_status !== "paid") return null;

  const metadata = session.metadata;
  const selectedSlugs = parseSlugs(metadata?.slugs);
  if (!selectedSlugs.length) return null;

  await ensureSeeded();

  const selectedBooks = await db.select().from(books).where(inArray(books.slug, selectedSlugs));
  if (selectedBooks.length !== selectedSlugs.length) return null;

  const expectedTotal = selectedBooks.reduce((total, book) => total + book.priceCents, 0);
  if (session.currency !== "usd" || session.amount_total !== expectedTotal) return null;

  const includedSlugs = new Set<string>();
  for (const book of selectedBooks) {
    if (book.isBundle) {
      for (const slug of book.includesSlugs) includedSlugs.add(slug);
    } else {
      includedSlugs.add(book.slug);
    }
  }
  const unlockedBooks = await db
    .select()
    .from(books)
    .where(inArray(books.slug, Array.from(includedSlugs)));
  if (!unlockedBooks.length || unlockedBooks.length !== includedSlugs.size) return null;

  const email = (
    session.customer_details?.email ?? session.customer_email ?? metadata?.customerEmail ?? ""
  )
    .trim()
    .toLowerCase();
  if (!email.includes("@")) return null;

  const name = (session.customer_details?.name ?? metadata?.customerName ?? "Reader").trim();
  const selectedPriceBySlug = new Map(selectedBooks.map((book) => [book.slug, book.priceCents]));
  const quizPublicId = metadata?.quizPublicId || null;

  return db.transaction(async (tx) => {
    const [existing] = await tx
      .select({ orderCode: orders.orderCode })
      .from(orders)
      .where(eq(orders.stripeSessionId, session.id))
      .limit(1);
    if (existing) return existing.orderCode;

    const orderCode = randomUUID().replaceAll("-", "").slice(0, 12).toUpperCase();
    const [order] = await tx
      .insert(orders)
      .values({
        orderCode,
        customerName: name || "Reader",
        customerEmail: email,
        totalCents: expectedTotal,
        status: "paid",
        stripeSessionId: session.id,
        quizPublicId,
      })
      .onConflictDoNothing({ target: orders.stripeSessionId })
      .returning({ id: orders.id, orderCode: orders.orderCode });

    if (!order) {
      const [concurrentOrder] = await tx
        .select({ orderCode: orders.orderCode })
        .from(orders)
        .where(eq(orders.stripeSessionId, session.id))
        .limit(1);
      return concurrentOrder?.orderCode ?? null;
    }

    await tx.insert(orderItems).values(
      unlockedBooks.map((book) => ({
        orderId: order.id,
        bookId: book.id,
        slug: book.slug,
        title: book.title,
        priceCents: selectedPriceBySlug.get(book.slug) ?? 0,
      })),
    );

    return order.orderCode;
  });
}
