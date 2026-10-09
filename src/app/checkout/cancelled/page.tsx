import Link from "next/link";

export const metadata = { title: "Checkout cancelled" };

export default async function CheckoutCancelledPage({
  searchParams,
}: {
  searchParams: Promise<{ book?: string }>;
}) {
  const { book } = await searchParams;
  const retryHref = book ? `/checkout?book=${encodeURIComponent(book)}` : "/checkout";

  return (
    <main className="mx-auto min-h-[55vh] max-w-2xl px-5 py-24">
      <p className="text-[11px] tracking-[0.28em] text-gold-deep uppercase">No payment taken</p>
      <h1 className="font-serif mt-3 text-5xl">You left checkout.</h1>
      <p className="mt-5 text-lg leading-relaxed text-ink-soft">
        Nothing was charged. Your book is still here if you want to continue.
      </p>
      <div className="mt-8 flex flex-wrap gap-3">
        <Link href={retryHref} className="rounded-full bg-ink px-6 py-3 text-cream">
          Return to secure checkout
        </Link>
        <Link href="/shop" className="rounded-full border border-ink/15 px-6 py-3">
          Browse the library
        </Link>
      </div>
    </main>
  );
}
