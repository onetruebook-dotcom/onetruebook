import Link from "next/link";
import { FannedBooks } from "@/components/FannedBooks";
import { singleBooks } from "@/lib/catalog";

type MethodVisualProps = {
  className?: string;
};

/** "The method" page: a reader curled up by the fire, with the books fanned in front. */
export function MethodVisual({ className = "" }: MethodVisualProps) {
  const picks = ["the-sleep-reset", "the-focus-formula", "quiet-confidence"]
    .map((slug) => singleBooks.find((book) => book.slug === slug))
    .filter((book): book is NonNullable<typeof book> => Boolean(book));

  return (
    <div className={`relative isolate overflow-hidden rounded-3xl bg-ink ${className}`}>
      <img
        src="/images/method.jpg"
        alt="A woman curled up in an armchair, reading a book by a warm fireplace"
        className="absolute inset-0 -z-10 h-full w-full object-cover object-[62%_center]"
      />
      <div className="absolute inset-0 -z-10 bg-gradient-to-t from-ink/90 via-ink/20 to-transparent" />
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_top_right,rgba(214,140,60,0.18),transparent_60%)]" />

      <span className="absolute top-4 left-4 inline-flex items-center gap-2 rounded-full bg-cream/95 px-3.5 py-1.5 text-[10px] font-medium tracking-[0.2em] text-ink uppercase shadow-lg">
        <span className="h-1.5 w-1.5 rounded-full bg-gold" />
        Read tonight · keep forever
      </span>

      <div className="absolute inset-x-5 bottom-5 flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
        <FannedBooks books={picks} size={84} className="shrink-0" />
        <div className="max-w-[15rem] text-cream sm:text-right">
          <p className="font-serif text-2xl leading-tight">Start tonight. A week to real change — it moves fast into your days and habits.</p>
          <Link
            href="/quiz"
            className="mt-3 inline-flex rounded-full bg-gold px-4 py-2 text-sm font-medium text-ink"
          >
            Find my book
          </Link>
        </div>
      </div>
    </div>
  );
}
