import { eq, inArray } from "drizzle-orm";
import { db } from "@/db";
import { books, orderItems, orders } from "@/db/schema";
import { getSlugForVariantId, type LemonOrder } from "@/lib/lemon";
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

export async function fulfillLemonOrder(input: {
  lemonOrder: LemonOrder;
  custom?: Record<string, unknown>;
}) {
  const { lemonOrder, custom } = input;
  if (lemonOrder.attributes.status !== "paid" || lemonOrder.attributes.refunded) return null;

  await ensureSeeded();

  const customSlugs = parseSlugs(typeof custom?.slugs === "string" ? custom.slugs : undefined);
  const variantSlug = lemonOrder.attributes.first_order_item
    ? getSlugForVariantId(lemonOrder.attributes.first_order_item.variant_id)
    : null;
  const selectedSlugs = customSlugs.length ? customSlugs : variantSlug ? [variantSlug] : [];
  if (!selectedSlugs.length) return null;

  if (variantSlug && !selectedSlugs.includes(variantSlug)) return null;

  const selectedBooks = await db.select().from(books).where(inArray(books.slug, selectedSlugs));
  if (selectedBooks.length !== selectedSlugs.length) return null;

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

  const email = lemonOrder.attributes.user_email.trim().toLowerCase();
  if (!email.includes("@")) return null;
  const name = (lemonOrder.attributes.user_name || (typeof custom?.customerName === "string" ? custom.customerName : "") || "Reader").trim();
  const quizPublicId =
    typeof custom?.quizPublicId === "string" && custom.quizPublicId.length ? custom.quizPublicId : null;
  const pendingCode = typeof custom?.orderCode === "string" ? custom.orderCode.trim().toUpperCase() : "";
  const selectedPriceBySlug = new Map(selectedBooks.map((book) => [book.slug, book.priceCents]));
  const totalCents = selectedBooks.reduce((sum, book) => sum + book.priceCents, 0);

  return db.transaction(async (tx) => {
    const [byLemonId] = await tx
      .select()
      .from(orders)
      .where(eq(orders.lemonOrderId, lemonOrder.id))
      .limit(1);
    if (byLemonId?.status === "paid") return byLemonId.orderCode;

    const pending = pendingCode
      ? (await tx.select().from(orders).where(eq(orders.orderCode, pendingCode)).limit(1))[0]
      : undefined;

    const target = byLemonId ?? pending;
    if (target) {
      await tx
        .update(orders)
        .set({
          status: "paid",
          lemonOrderId: lemonOrder.id,
          customerName: name || target.customerName,
          customerEmail: email,
          totalCents,
          quizPublicId: quizPublicId ?? target.quizPublicId,
        })
        .where(eq(orders.id, target.id));

      const existingItems = await tx.select().from(orderItems).where(eq(orderItems.orderId, target.id));
      if (!existingItems.length) {
        await tx.insert(orderItems).values(
          unlockedBooks.map((book) => ({
            orderId: target.id,
            bookId: book.id,
            slug: book.slug,
            title: book.title,
            priceCents: selectedPriceBySlug.get(book.slug) ?? 0,
          })),
        );
      }
      return target.orderCode;
    }

    const [created] = await tx
      .insert(orders)
      .values({
        orderCode: pendingCode || lemonOrder.attributes.identifier.replaceAll("-", "").slice(0, 12).toUpperCase(),
        customerName: name || "Reader",
        customerEmail: email,
        totalCents,
        status: "paid",
        lemonOrderId: lemonOrder.id,
        quizPublicId,
      })
      .onConflictDoNothing({ target: orders.lemonOrderId })
      .returning();

    if (!created) {
      const [existing] = await tx
        .select({ orderCode: orders.orderCode })
        .from(orders)
        .where(eq(orders.lemonOrderId, lemonOrder.id))
        .limit(1);
      return existing?.orderCode ?? null;
    }

    await tx.insert(orderItems).values(
      unlockedBooks.map((book) => ({
        orderId: created.id,
        bookId: book.id,
        slug: book.slug,
        title: book.title,
        priceCents: selectedPriceBySlug.get(book.slug) ?? 0,
      })),
    );

    return created.orderCode;
  });
}
