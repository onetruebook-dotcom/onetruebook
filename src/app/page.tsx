import Link from "next/link";
import { BookCard } from "@/components/BookCard";
import { BookCover } from "@/components/BookCover";
import { LibraryVisual } from "@/components/LibraryVisual";
import { catalog, singleBooks } from "@/lib/catalog";
import { formatMoney } from "@/lib/format";
import { ensureSeeded } from "@/lib/seed";

export const dynamic = "force-dynamic";

const steps = [
  {
    n: "01",
    title: "Answer 8 honest questions",
    copy: "Not a personality circus. A diagnosis of the bottleneck that is actually draining you.",
  },
  {
    n: "02",
    title: "Get named, not vaguely inspired",
    copy: "We tell you the pattern, the cost of ignoring it, and the one book built for that pattern.",
  },
  {
    n: "03",
    title: "Start tonight. Real change in a week.",
    copy: "Focused protocols that apply fast to your daily life and habits. Instant access on any device — forever.",
  },
];

const stats = [
  ["14,200+", "readers diagnosed"],
  ["8 questions", "to the right book"],
  ["4.9/5", "average reader rating"],
  ["1 week", "to first real change"],
];

export default async function HomePage() {
  await ensureSeeded();
  const featured = singleBooks.slice(0, 3);
  const bundle = catalog.find((book) => book.isBundle === 1)!;

  return (
    <main>
      <section className="relative overflow-hidden grain">
        <div className="absolute inset-0">
          <img src="/images/hero.jpg" alt="" className="h-full w-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-r from-ink/90 via-ink/75 to-ink/40" />
        </div>
        <div className="relative mx-auto grid max-w-6xl items-center gap-12 px-5 py-24 md:grid-cols-[1.1fr_0.9fr] md:py-32">
          <div className="text-cream">
            <p className="text-[11px] tracking-[0.28em] text-gold uppercase">One True Book · Instant ebooks</p>
            <h1 className="font-serif mt-5 text-5xl leading-[0.95] md:text-7xl">
              Stop buying books you never finish.
            </h1>
            <p className="mt-6 max-w-xl text-lg leading-relaxed text-cream/80">
              Take the free quiz. We’ll diagnose the real bottleneck in your life —
              then hand you the one ebook built to fix it. Not a pile. Not a course. One precise
              next chapter.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link href="/quiz" className="rounded-full bg-gold px-7 py-3.5 text-ink">
                Start the free quiz
              </Link>
              <Link href="/shop" className="rounded-full border border-cream/30 px-7 py-3.5 text-cream">
                Browse the library
              </Link>
            </div>
            <p className="mt-6 text-sm text-cream/60">
              8 questions. No fluff. A diagnosis you can act on tonight.
            </p>
          </div>
          <div className="hidden justify-center md:flex">
            <div className="relative">
              <div className="absolute -left-16 top-10 rotate-[-12deg] opacity-80">
                <BookCover
                  title="Money Unlocked"
                  author="Jordan Hale"
                  image="/covers/money.jpg"
                  accent="#1e4d3a"
                  size="sm"
                />
              </div>
              <div className="relative z-10">
                <BookCover
                  title="The Focus Formula"
                  author="Maya Ellison"
                  image="/covers/focus.jpg"
                  accent="#1c3a5f"
                  size="lg"
                />
              </div>
              <div className="absolute -right-10 bottom-6 rotate-[10deg]">
                <BookCover
                  title="Quiet Confidence"
                  author="Lena Ortiz"
                  image="/covers/confidence.jpg"
                  accent="#7a4450"
                  size="sm"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="border-y border-ink/10 bg-paper">
        <div className="mx-auto grid max-w-6xl grid-cols-2 gap-6 px-5 py-10 md:grid-cols-4">
          {stats.map(([value, label]) => (
            <div key={label}>
              <p className="font-serif text-3xl">{value}</p>
              <p className="mt-1 text-sm text-ink-soft">{label}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-5 py-20">
        <p className="text-[11px] tracking-[0.28em] text-gold-deep uppercase">How it works</p>
        <h2 className="font-serif mt-3 max-w-2xl text-4xl md:text-5xl">
          The quiz is the product. The book is the prescription.
        </h2>
        <div className="mt-12 grid gap-8 md:grid-cols-3">
          {steps.map((step) => (
            <article key={step.n} className="rounded-3xl bg-paper p-8">
              <p className="font-serif text-gold-deep text-2xl">{step.n}</p>
              <h3 className="font-serif mt-4 text-2xl">{step.title}</h3>
              <p className="mt-3 text-ink-soft leading-relaxed">{step.copy}</p>
            </article>
          ))}
        </div>
        <Link
          href="/quiz"
          className="mt-10 inline-flex rounded-full bg-ink px-7 py-3.5 text-cream"
        >
          Diagnose my bottleneck
        </Link>
      </section>

      <section className="bg-moss text-cream">
        <div className="mx-auto grid max-w-6xl items-center gap-12 px-5 py-20 md:grid-cols-2">
          <LibraryVisual className="h-[540px] w-full md:h-[580px]" />
          <div>
            <p className="text-[11px] tracking-[0.28em] text-gold uppercase">Why it works</p>
            <h2 className="font-serif mt-3 text-4xl md:text-5xl">People don’t need more information. They need the right next page.</h2>
            <p className="mt-5 leading-relaxed text-cream/80">
              The internet already gave you a thousand free tips. What it did not give you is a
              diagnosis. These books are short on purpose: a protocol you can run this week, written
              like a letter from someone who has sat in the same mess.
            </p>
            <p className="mt-4 leading-relaxed text-cream/80">
              Take the quiz even if you “already know.” Most readers are wrong about their primary
              bottleneck — they treat the symptom they like talking about, not the leak that is
              actually sinking the week.
            </p>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-5 py-20">
        <div className="flex items-end justify-between gap-6">
          <div>
            <p className="text-[11px] tracking-[0.28em] text-gold-deep uppercase">The library</p>
            <h2 className="font-serif mt-3 text-4xl">Six bottlenecks. Six books.</h2>
          </div>
          <Link href="/shop" className="hidden text-sm underline md:inline">
            See all titles
          </Link>
        </div>
        <div className="mt-12 grid gap-10 md:grid-cols-3">
          {featured.map((book) => (
            <BookCard key={book.slug} book={book} />
          ))}
        </div>
      </section>

      <section className="px-5 pb-8">
        <div className="mx-auto max-w-6xl overflow-hidden rounded-[2rem] bg-ink text-cream">
          <div className="grid md:grid-cols-[1.2fr_0.8fr]">
            <div className="p-10 md:p-14">
              <p className="text-[11px] tracking-[0.28em] text-gold uppercase">{bundle.badge}</p>
              <h2 className="font-serif mt-3 text-4xl md:text-5xl">{bundle.title}</h2>
              <p className="mt-4 max-w-lg text-cream/75">{bundle.description}</p>
              <p className="mt-6 font-serif text-4xl">
                {formatMoney(bundle.priceCents)}
                <span className="ml-3 text-xl text-cream/40 line-through">
                  {formatMoney(bundle.originalPriceCents)}
                </span>
              </p>
              <Link
                href={`/books/${bundle.slug}`}
                className="mt-8 inline-flex rounded-full bg-gold px-7 py-3.5 text-ink"
              >
                Unlock the full library
              </Link>
            </div>
            <div className="relative min-h-[280px]">
              <img src={bundle.lifestyleImage} alt="" className="absolute inset-0 h-full w-full object-cover" />
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-5 py-16">
        <h2 className="font-serif text-4xl">Readers who stopped guessing</h2>
        <div className="mt-10 grid gap-6 md:grid-cols-3">
          {singleBooks.slice(0, 3).map((book) => (
            <blockquote key={book.slug} className="rounded-3xl bg-paper p-8">
              <p className="font-serif text-2xl leading-snug">“{book.testimonials[0].quote}”</p>
              <footer className="mt-6 text-sm text-ink-soft">
                {book.testimonials[0].name} · {book.testimonials[0].role}
              </footer>
            </blockquote>
          ))}
        </div>
      </section>

      <section className="px-5 pb-20">
        <div className="mx-auto max-w-4xl rounded-[2rem] bg-cream-dark px-8 py-14 text-center">
          <h2 className="font-serif text-4xl md:text-5xl">Ready to be told the truth?</h2>
          <p className="mx-auto mt-4 max-w-xl text-ink-soft">
            Eight questions. A named bottleneck. One book that fits the life you are actually living —
            not the one you perform on Sunday night.
          </p>
          <Link href="/quiz" className="mt-8 inline-flex rounded-full bg-ink px-8 py-4 text-cream">
            Take the quiz
          </Link>
        </div>
      </section>
    </main>
  );
}
