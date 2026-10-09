import type { Metadata } from "next";
import { BookCard } from "@/components/BookCard";
import { catalog, singleBooks } from "@/lib/catalog";
import { formatMoney } from "@/lib/format";
import { ensureSeeded } from "@/lib/seed";
import Link from "next/link";

export const metadata: Metadata = {
  title: "The library",
  description: "Six short ebooks for focus, money, habits, confidence, sleep, and career — plus the complete collection.",
};

export const dynamic = "force-dynamic";

export default async function ShopPage() {
  await ensureSeeded();
  const bundle = catalog.find((book) => book.isBundle === 1)!;

  return (
    <main className="mx-auto max-w-6xl px-5 py-16">
      <p className="text-[11px] tracking-[0.28em] text-gold-deep uppercase">The One True Book library</p>
      <h1 className="font-serif mt-3 max-w-3xl text-5xl md:text-6xl">Choose a bottleneck. Or let the quiz choose for you.</h1>
      <p className="mt-5 max-w-2xl text-lg text-ink-soft">
        Every title is a complete protocol, not a TED Talk in PDF clothing. Instant access. Start
        tonight — the first shifts show within a week. Run it for 90 days.
      </p>
      <Link href="/quiz" className="mt-8 inline-flex rounded-full bg-ink px-6 py-3 text-cream">
        I want the quiz to decide
      </Link>

      <div className="mt-16 grid gap-12 sm:grid-cols-2 lg:grid-cols-3">
        {singleBooks.map((book) => (
          <BookCard key={book.slug} book={book} />
        ))}
      </div>

      <section className="mt-20 rounded-[2rem] bg-paper p-10 md:flex md:items-center md:justify-between">
        <div>
          <p className="text-[11px] tracking-[0.2em] text-gold-deep uppercase">{bundle.badge}</p>
          <h2 className="font-serif mt-2 text-4xl">{bundle.title}</h2>
          <p className="mt-3 max-w-xl text-ink-soft">{bundle.subtitle}</p>
        </div>
        <div className="mt-6 md:mt-0 md:text-right">
          <p className="font-serif text-4xl">{formatMoney(bundle.priceCents)}</p>
          <Link href={`/books/${bundle.slug}`} className="mt-4 inline-flex rounded-full bg-gold px-6 py-3 text-ink">
            Open the collection
          </Link>
        </div>
      </section>
    </main>
  );
}
