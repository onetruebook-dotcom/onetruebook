import Link from "next/link";
import { redirect } from "next/navigation";
import { eq } from "drizzle-orm";
import { db } from "@/db";
import { orders } from "@/db/schema";
import { AutoRefresh } from "@/components/AutoRefresh";

export const dynamic = "force-dynamic";

export default async function PaymentSuccessPage({
  searchParams,
}: {
  searchParams: Promise<{ ref?: string }>;
}) {
  const { ref } = await searchParams;
  const orderCode = ref?.trim().toUpperCase() ?? "";

  if (orderCode) {
    const [order] = await db.select().from(orders).where(eq(orders.orderCode, orderCode)).limit(1);
    if (order?.status === "paid") redirect(`/order/${order.orderCode}`);
  }

  return (
    <main className="mx-auto min-h-[55vh] max-w-2xl px-5 py-24">
      <AutoRefresh seconds={4} />
      <p className="text-[11px] tracking-[0.28em] text-gold-deep uppercase">Lemon Squeezy</p>
      <h1 className="font-serif mt-3 text-5xl">Confirming your payment.</h1>
      <p className="mt-5 text-lg leading-relaxed text-ink-soft">
        If checkout completed, your library will open in a few seconds. Keep this tab open.
      </p>
      <Link href="/library" className="mt-8 inline-flex rounded-full bg-ink px-6 py-3 text-cream">
        Look up my books
      </Link>
    </main>
  );
}
