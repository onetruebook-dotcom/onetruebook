import Link from "next/link";
import { notFound } from "next/navigation";
import { eq } from "drizzle-orm";
import { db } from "@/db";
import { orderItems, orders } from "@/db/schema";
import { ClearCartOnSuccess } from "@/components/ClearCartOnSuccess";
import { getCatalogBook } from "@/lib/catalog";
import { formatMoney } from "@/lib/format";
import { ensureSeeded } from "@/lib/seed";

export const dynamic = "force-dynamic";

export default async function OrderPage({ params }: { params: Promise<{ code: string }> }) {
  await ensureSeeded();
  const { code } = await params;
  const [order] = await db.select().from(orders).where(eq(orders.orderCode, code)).limit(1);
  if (!order || order.status !== "paid") notFound();
  const items = await db.select().from(orderItems).where(eq(orderItems.orderId, order.id));

  return (
    <main className="mx-auto max-w-3xl px-5 py-16">
      <ClearCartOnSuccess />
      <p className="text-[11px] tracking-[0.28em] text-gold-deep uppercase">You’re in</p>
      <h1 className="font-serif mt-3 text-5xl">Your library is open.</h1>
      <p className="mt-4 text-lg text-ink-soft">
        Thanks, {order.customerName.split(" ")[0]}. Order <span className="text-ink">{order.orderCode}</span>{" "}
        is paid. Open any title in the reader — your access does not expire.
      </p>
      <p className="mt-2 text-sm text-ink-soft">We also saved this to {order.customerEmail}.</p>

      <ul className="mt-10 divide-y divide-ink/10 border-y border-ink/10">
        {items.map((item) => {
          const book = getCatalogBook(item.slug);
          return (
            <li key={item.id} className="flex items-center gap-4 py-5">
              {book ? (
                <img src={book.coverImage} alt="" className="h-20 w-14 rounded object-cover" />
              ) : null}
              <div className="flex-1">
                <p className="font-serif text-2xl">{item.title}</p>
                <p className="text-sm text-ink-soft">{formatMoney(item.priceCents) === "$0" ? "Included" : formatMoney(item.priceCents)}</p>
              </div>
              <Link
                href={`/read/${item.slug}?order=${order.orderCode}`}
                className="rounded-full bg-ink px-4 py-2 text-sm text-cream"
              >
                Read now
              </Link>
            </li>
          );
        })}
      </ul>

      <p className="mt-8 font-serif text-3xl">Total {formatMoney(order.totalCents)}</p>
      <Link href="/library" className="mt-6 inline-block text-sm underline">
        Look up purchases by email later
      </Link>
    </main>
  );
}
