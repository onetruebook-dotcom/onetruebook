import type { Metadata } from "next";
import Link from "next/link";
import { MethodVisual } from "@/components/MethodVisual";

export const metadata: Metadata = {
  title: "The method",
  description: "Why One True Book titles are short, diagnostic, and built to be used this week.",
};

const faqs = [
  {
    q: "Is this a real ebook I can keep?",
    a: "Yes. After checkout you get lifetime access in the reader, tied to your email. Come back anytime via My books.",
  },
  {
    q: "Why a quiz instead of a shop?",
    a: "Because most people buy the book that matches their identity, not their leak. The quiz is designed to name the bottleneck you are in — even if it is not the one you like talking about.",
  },
  {
    q: "How long are the books?",
    a: "Roughly 215–285 pages of field-manual writing. A real read — and a protocol to run for 10 to 90 days, with changes that show up in your week.",
  },
  {
    q: "What if I pick wrong?",
    a: "Every book opens with a free first chapter, so you can feel it before you buy. If it does not name your life, retake the quiz — it will point you to the one that does.",
  },
  {
    q: "Can I buy all six?",
    a: "The One True Collection is the full library at a steep launch price. Start with the quiz book anyway. Do not swallow the cabinet.",
  },
];

export default function AboutPage() {
  return (
    <main>
      <section className="mx-auto max-w-6xl px-5 py-16 md:grid md:grid-cols-2 md:items-center md:gap-12">
        <div>
          <p className="text-[11px] tracking-[0.28em] text-gold-deep uppercase">The method</p>
          <h1 className="font-serif mt-3 text-5xl md:text-6xl">Short books. Sharp diagnosis. No more unread graves.</h1>
          <p className="mt-6 text-lg leading-relaxed text-ink-soft">
            One True Book publishes one kind of thing: a protocol for a specific human leak. Focus.
            Money. Habits. Confidence. Sleep. Career. If it cannot be used this week, it does not ship.
          </p>
        </div>
        <MethodVisual className="mt-10 h-[520px] w-full md:mt-0 md:h-[560px]" />
      </section>

      <section className="bg-moss text-cream">
        <div className="mx-auto max-w-6xl grid gap-10 px-5 py-16 md:grid-cols-3">
          {[
            ["Diagnose", "Eight questions. A named bottleneck. No astrology, no 47-type quiz."],
            ["Prescribe", "One ebook written as a letter plus a protocol — not a content farm."],
            ["Practice", "Tiny daily moves. Relapse scripts. A way back when life gets loud."],
          ].map(([title, copy]) => (
            <article key={title}>
              <h2 className="font-serif text-3xl">{title}</h2>
              <p className="mt-3 text-cream/75">{copy}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-3xl px-5 py-16">
        <h2 className="font-serif text-4xl">Questions people ask before they buy</h2>
        <div className="mt-8 divide-y divide-ink/10 border-y border-ink/10">
          {faqs.map((item) => (
            <article key={item.q} className="py-6">
              <h3 className="font-medium">{item.q}</h3>
              <p className="mt-2 text-ink-soft leading-relaxed">{item.a}</p>
            </article>
          ))}
        </div>
        <Link href="/quiz" className="mt-10 inline-flex rounded-full bg-ink px-6 py-3 text-cream">
          Take the quiz
        </Link>
      </section>
    </main>
  );
}
