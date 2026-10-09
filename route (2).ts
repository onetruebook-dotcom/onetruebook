import { randomUUID } from "node:crypto";
import { and, eq, inArray } from "drizzle-orm";
import { db } from "@/db";
import { books, orderItems, orders } from "@/db/schema";
import { createLemonCheckout, getLemonStoreId, getVariantIdForSlug } from "@/lib/lemon";
import { ensureSeeded } from "@/lib/seed";

export const dynamic = "force-dynamic";

export async function POST(request: Request) {
  if (!process.env.LEMON_SQUEEZY_API_KEY || !getLemonStoreId()) {
    return Response.json(
      {
        error:
          "Payments are not live yet. Add LEMON_SQUEEZY_API_KEY, LEMON_SQUEEZY_STORE_ID, and LEMON_SQUEEZY_VARIANTS, then create matching products in Lemon Squeezy.",
      },
      { status: 503 },
    );
  }

  try {
    await ensureSeeded();
    const rawBody: unknown = await request.json();
    if (!rawBody || typeof rawBody !== "object" || Array.isArray(rawBody)) {
      return Response.json({ error: "Invalid checkout request." }, { status: 400 });
    }
    const body = rawBody as {
      name?: unknown;
      email?: unknown;
      slugs?: unknown;
      quizPublicId?: unknown;
    };

    const name = typeof body.name === "string" ? body.name.trim() : "";
    const email = typeof body.email === "string" ? body.email.trim().toLowerCase() : "";
    const slugs = Array.isArray(body.slugs)
      ? Array.from(new Set(body.slugs.filter((slug): slug is string => typeof slug === "string")))
      : [];

    if (!name || name.length > 160 || !email.includes("@") || email.length > 320 || slugs.length === 0) {
      return Response.json({ error: "Enter a valid name, email, and at least one book." }, { status: 400 });
    }

    const selected = await db.select().from(books).where(inArray(books.slug, slugs));
    if (selected.length !== slugs.length) {
      return Response.json({ error: "One or more selected books could not be found." }, { status: 400 });
    }

    const bundle = selected.find((book) => book.isBundle);
    const checkoutBook = bundle ?? (selected.length === 1 ? selected[0] : null);
    if (!checkoutBook) {
      return Response.json(
        {
          error:
            "One True Book checkout is one title at a time. Buy a single book, or unlock the full collection.",
        },
        { status: 400 },
      );
    }

    const variantId = getVariantIdForSlug(checkoutBook.slug);
    if (!variantId) {
      return Response.json(
        {
          error: `Create this title in Lemon Squeezy, then add its variant ID to LEMON_SQUEEZY_VARIANTS for “${checkoutBook.slug}”.`,
        },
        { status: 503 },
      );
    }

    const orderCode = randomUUID().replaceAll("-", "").slice(0, 12).toUpperCase();
    const quizPublicId = typeof body.quizPublicId === "string" ? body.quizPublicId.slice(0, 500) : "";
    const siteUrl = (process.env.NEXT_PUBLIC_SITE_URL || "https://onetruebook.com").replace(/\/$/, "");

    await db.insert(orders).values({
      orderCode,
      customerName: name,
      customerEmail: email,
      totalCents: checkoutBook.priceCents,
      status: "pending",
      quizPublicId: quizPublicId || null,
    });

    const url = await createLemonCheckout({
      variantId,
      email,
      name,
      orderCode,
      slugs: [checkoutBook.slug],
      quizPublicId,
      redirectUrl: `${siteUrl}/payment/success?ref=${orderCode}`,
      receiptUrl: `${siteUrl}/library`,
      productName: checkoutBook.title,
      productDescription: checkoutBook.subtitle,
    });

    return Response.json({ url });
  } catch (error) {
    console.error("Lemon Squeezy checkout failed:", error);
    return Response.json({ error: "Could not start secure checkout. Please try again." }, { status: 500 });
  }
}

export async function GET(request: Request) {
  const url = new URL(request.url);
  const email = url.searchParams.get("email")?.trim().toLowerCase() ?? "";
  if (!email.includes("@")) {
    return Response.json({ error: "Email required." }, { status: 400 });
  }

  const found = await db
    .select()
    .from(orders)
    .where(and(eq(orders.customerEmail, email), eq(orders.status, "paid")));
  const items = found.length
    ? await db
        .select()
        .from(orderItems)
        .where(
          inArray(
            orderItems.orderId,
            found.map((order) => order.id),
          ),
        )
    : [];

  return Response.json({
    orders: found.map((order) => ({
      ...order,
      items: items.filter((item) => item.orderId === order.id),
    })),
  });
}
