import type { Metadata } from "next";
import { QuizFlow } from "@/components/QuizFlow";

export const metadata: Metadata = {
  title: "The One True Book Quiz",
  description: "Eight questions. A diagnosis. The one ebook that matches the bottleneck you’re in.",
};

export default function QuizPage() {
  return (
    <main className="mx-auto min-h-[70vh] max-w-6xl px-5 py-16">
      <p className="mb-6 text-[11px] tracking-[0.28em] text-gold-deep uppercase">Free · 90 seconds · brutally useful</p>
      <QuizFlow />
    </main>
  );
}
