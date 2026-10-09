"use client";

import { useMemo, useState, type FormEvent } from "react";
import { useCart, type CartItem } from "@/components/CartProvider";
import { formatMoney } from "@/lib/format";

type Props = {
  presetItems: CartItem[];
  quizId?: string;
};

export function CheckoutForm({ presetItems, quizId }: Props) {
  const cart = useCart();
  const items = presetItems.length ? presetItems : cart.items;
  const totalCents = useMemo(
    () => items.reduce((sum, item) => sum + item.priceCents, 0),
    [items],
  );

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  async function onSubmit(event: FormEvent) {
    event.preventDefault();
    setError("");
    if (!items.length) {
      setError("Your cart is empty.");
      return;
    }
    if (!name.trim() || !email.includes("@")) {
      setError("We need a name and email to deliver your books.");
      return;
    }
    setSubmitting(true);
    try {
      const response = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: name.trim(),
          email: email.trim(),
          slugs: items.map((item) => item.slug),
          quizPublicId: quizId || null,
        }),
      });
      const data = (await response.json()) as { url?: string; error?: string };
      if (!response.ok || !data.url) {
        setError(data.error || "Could not start secure checkout.");
        setSubmitting(false);
        return;
      }
      window.location.assign(data.url);
    } catch {
      setError("Network error. Please try again.");
      setSubmitting(false);
    }
  }

  if (!items.length) {
    return (
      <p className="text-ink-soft">
        Nothing to check out. Take the quiz or add a book from the library.
      </p>
    );
  }

  return (
    <div className="grid gap-10 md:grid-cols-[1.1fr_0.9fr]">
      <form onSubmit={onSubmit} className="grid gap-4">
        <label className="grid gap-2 text-sm">
          Full name
          <input
            value={name}
            onChange={(event) => setName(event.target.value)}
            className="rounded-xl border border-ink/15 bg-paper px-4 py-3 text-base"
            placeholder="Jordan Hale"
          />
        </label>
        <label className="grid gap-2 text-sm">
          Email for instant access
          <input
            type="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            className="rounded-xl border border-ink/15 bg-paper px-4 py-3 text-base"
            placeholder="you@email.com"
          />
        </label>
        <p className="rounded-2xl bg-paper p-4 text-sm leading-relaxed text-ink-soft">
          You’ll continue to Lemon Squeezy’s secure checkout. US buyers can pay by card or PayPal,
          depending on Lemon Squeezy’s available methods. Your book unlocks only after payment is
          confirmed. Checkout is one title at a time — or the full collection.
        </p>
        {error ? <p className="text-sm text-blush">{error}</p> : null}
        <button
          type="submit"
          disabled={submitting}
          className="rounded-full bg-ink px-6 py-4 text-cream disabled:opacity-60"
        >
          {submitting ? "Opening secure checkout…" : `Pay securely · ${formatMoney(totalCents)}`}
        </button>
      </form>
      <aside className="rounded-3xl bg-paper p-6">
        <p className="text-[11px] tracking-[0.2em] uppercase text-ink-soft">Order summary</p>
        <ul className="mt-4 grid gap-4">
          {items.map((item) => (
            <li key={item.slug} className="flex items-center gap-3">
              <img src={item.coverImage} alt="" className="h-14 w-10 rounded object-cover" />
              <div className="flex-1">
                <p className="font-medium">{item.title}</p>
                <p className="text-xs text-ink-soft">{item.author}</p>
              </div>
              <p className="text-sm">{formatMoney(item.priceCents)}</p>
            </li>
          ))}
        </ul>
        <div className="mt-6 flex justify-between border-t border-ink/10 pt-4 font-serif text-2xl">
          <span>Total</span>
          <span>{formatMoney(totalCents)}</span>
        </div>
      </aside>
    </div>
  );
}
