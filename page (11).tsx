import type { Metadata } from "next";
import { CheckoutForm } from "@/components/CheckoutForm";
import { getCatalogBook } from "@/lib/catalog";
import { ensureSeeded } from "@/lib/seed";

export const metadata: Metadata = {
  title: "Checkout",
  description: "Instant access to your One True Book ebook.",
};

export const dynamic = "force-dynamic";

export default async function CheckoutPage({
  searchParams,
}: {
  searchParams: Promise<{ book?: string; quiz?: string }>;
}) {
  await ensureSeeded();
  const { book: bookSlug, quiz } = await searchParams;
  const preset = bookSlug ? getCatalogBook(bookSlug) : null;
  const presetItems = preset
    ? [
        {
          slug: preset.slug,
          title: preset.title,
          priceCents: preset.priceCents,
          coverImage: preset.coverImage,
          author: preset.author,
        },
      ]
    : [];

  return (
    <main className="mx-auto max-w-5xl px-5 py-16">
      <p className="text-[11px] tracking-[0.28em] text-gold-deep uppercase">Secure instant delivery</p>
      <h1 className="font-serif mt-3 text-5xl">Checkout</h1>
      <p className="mt-3 max-w-xl text-ink-soft">
        Continue to Lemon Squeezy to complete payment. Once the payment is confirmed, your ebook
        unlocks immediately in the reader.
      </p>
      <div className="mt-10">
        <CheckoutForm presetItems={presetItems} quizId={quiz} />
      </div>
    </main>
  );
}
