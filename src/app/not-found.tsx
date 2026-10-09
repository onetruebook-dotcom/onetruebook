import Link from "next/link";

export default function NotFound() {
  return (
    <main className="mx-auto min-h-[50vh] max-w-2xl px-5 py-24 text-center">
      <p className="text-[11px] tracking-[0.28em] text-gold-deep uppercase">Lost the page</p>
      <h1 className="font-serif mt-3 text-5xl">This chapter isn’t here.</h1>
      <p className="mt-4 text-ink-soft">Try the quiz or the library — both still work.</p>
      <div className="mt-8 flex justify-center gap-3">
        <Link href="/quiz" className="rounded-full bg-ink px-5 py-3 text-cream">
          Take the quiz
        </Link>
        <Link href="/shop" className="rounded-full border border-ink/15 px-5 py-3">
          Browse books
        </Link>
      </div>
    </main>
  );
}
