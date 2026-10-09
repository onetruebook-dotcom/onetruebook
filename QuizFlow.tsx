"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { quizQuestions } from "@/lib/quiz";

export function QuizFlow() {
  const router = useRouter();
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const total = quizQuestions.length + 1;
  const isCapture = step >= quizQuestions.length;
  const question = quizQuestions[step];
  const progress = Math.round(((step + 1) / total) * 100);

  const selected = question ? answers[question.id] : "";

  const headline = useMemo(() => {
    if (isCapture) return "Your diagnosis is ready.";
    return question.title;
  }, [isCapture, question]);

  async function submit() {
    setError("");
    if (!name.trim() || !email.trim() || !email.includes("@")) {
      setError("Name and a real email so we can save your results.");
      return;
    }
    setSubmitting(true);
    try {
      const response = await fetch("/api/quiz", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: name.trim(), email: email.trim(), answers }),
      });
      const data = (await response.json()) as { publicId?: string; error?: string };
      if (!response.ok || !data.publicId) {
        setError(data.error || "Something went wrong. Try again.");
        setSubmitting(false);
        return;
      }
      router.push(`/results/${data.publicId}`);
    } catch {
      setError("Network error. Try once more.");
      setSubmitting(false);
    }
  }

  return (
    <div className="mx-auto max-w-2xl">
      <div className="mb-8">
        <div className="mb-2 flex items-center justify-between text-[11px] tracking-[0.2em] text-ink-soft uppercase">
          <span>{isCapture ? "Last step" : `Question ${step + 1} of ${quizQuestions.length}`}</span>
          <span>{progress}%</span>
        </div>
        <div className="h-[3px] overflow-hidden rounded-full bg-ink/10">
          <div className="h-full bg-gold-deep transition-all duration-500" style={{ width: `${progress}%` }} />
        </div>
      </div>

      <h1 className="font-serif text-4xl leading-tight md:text-5xl">{headline}</h1>
      <p className="mt-4 text-lg text-ink-soft">
        {isCapture
          ? "Tell us where to send it. Then we’ll show you the bottleneck — and the one book built to fix it."
          : question.subtitle}
      </p>

      {!isCapture ? (
        <div className="mt-10 grid gap-3">
          {question.options.map((option) => {
            const active = selected === option.id;
            return (
              <button
                key={option.id}
                type="button"
                onClick={() => {
                  setAnswers((current) => ({ ...current, [question.id]: option.id }));
                  window.setTimeout(() => setStep((value) => value + 1), 180);
                }}
                className={`rounded-2xl border px-5 py-4 text-left transition ${
                  active
                    ? "border-ink bg-ink text-cream"
                    : "border-ink/10 bg-paper hover:border-ink/30"
                }`}
              >
                <span className="block text-base font-medium">{option.label}</span>
                {option.hint ? (
                  <span className={`mt-1 block text-sm ${active ? "text-cream/70" : "text-ink-soft"}`}>
                    {option.hint}
                  </span>
                ) : null}
              </button>
            );
          })}
        </div>
      ) : (
        <form
          className="mt-10 grid gap-4"
          onSubmit={(event) => {
            event.preventDefault();
            void submit();
          }}
        >
          <label className="grid gap-2 text-sm">
            First name
            <input
              value={name}
              onChange={(event) => setName(event.target.value)}
              className="rounded-xl border border-ink/15 bg-paper px-4 py-3 text-base"
              placeholder="Maya"
            />
          </label>
          <label className="grid gap-2 text-sm">
            Email
            <input
              type="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              className="rounded-xl border border-ink/15 bg-paper px-4 py-3 text-base"
              placeholder="you@email.com"
            />
          </label>
          {error ? <p className="text-sm text-blush">{error}</p> : null}
          <button
            type="submit"
            disabled={submitting}
            className="mt-2 rounded-full bg-ink px-6 py-4 text-cream disabled:opacity-60"
          >
            {submitting ? "Reading your answers…" : "Show me my book"}
          </button>
          <p className="text-xs text-ink-soft">
            We use this to save your diagnosis and deliver your ebook. No spam. No list-selling.
          </p>
        </form>
      )}

      {step > 0 && !isCapture ? (
        <button
          type="button"
          onClick={() => setStep((value) => Math.max(0, value - 1))}
          className="mt-8 text-sm text-ink-soft underline"
        >
          Back
        </button>
      ) : null}
    </div>
  );
}
