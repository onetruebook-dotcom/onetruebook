import Link from "next/link";
import { notFound } from "next/navigation";
import { and, eq } from "drizzle-orm";
import { db } from "@/db";
import { orderItems, orders } from "@/db/schema";
import { Reader } from "@/components/Reader";
import { getCatalogBook } from "@/lib/catalog";
import { ensureSeeded } from "@/lib/seed";

export const dynamic = "force-dynamic";

export default async function ReadPage({
  params,
  searchParams,
}: {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ order?: string }>;
}) {
  await ensureSeeded();
  const { slug } = await params;
  const { order: orderCode } = await searchParams;
  const book = getCatalogBook(slug);
  if (!book || book.isBundle) notFound();

  let unlocked = false;
  if (orderCode) {
    const [order] = await db.select().from(orders).where(eq(orders.orderCode, orderCode)).limit(1);
    if (order?.status === "paid") {
      const [item] = await db
        .select()
        .from(orderItems)
        .where(and(eq(orderItems.orderId, order.id), eq(orderItems.slug, slug)))
        .limit(1);
      unlocked = Boolean(item);
    }
  }

  const chapters = unlocked ? book.chapters : book.chapters.slice(0, 1);

  return (
    <main className="paper-page min-h-screen">
      <div className="mx-auto max-w-2xl px-5 py-12">
        <p className="text-[11px] tracking-[0.22em] text-ink-soft uppercase">
          {unlocked ? "Your ebook" : "Preview · Chapter 1"}
        </p>
        <h1 className="font-serif mt-3 text-4xl md:text-5xl">{book.title}</h1>
        <p className="mt-2 text-ink-soft">{book.author}</p>
        <Reader chapters={chapters} />
        {!unlocked ? (
          <div className="mt-12 rounded-3xl bg-ink p-8 text-cream">
            <p className="font-serif text-3xl">The rest of the protocol is waiting.</p>
            <p className="mt-3 text-cream/75">
              Unlock all {book.chapters.length} chapters and keep lifetime access.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <Link href={`/checkout?book=${book.slug}`} className="rounded-full bg-gold px-5 py-3 text-ink">
                Buy now
              </Link>
              <Link href="/library" className="rounded-full border border-cream/20 px-5 py-3">
                I already purchased
              </Link>
            </div>
          </div>
        ) : null}
      </div>
    </main>
  );
}
