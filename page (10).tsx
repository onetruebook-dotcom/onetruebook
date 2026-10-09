"use client";

import Link from "next/link";
import { useCart } from "@/components/CartProvider";
import { formatMoney } from "@/lib/format";

export default function CartPage() {
  const { items, removeItem, totalCents } = useCart();

  return (
    <main className="mx-auto min-h-[60vh] max-w-3xl px-5 py-16">
      <p className="text-[11px] tracking-[0.28em] text-gold-deep uppercase">Your cart</p>
      <h1 className="font-serif mt-3 text-5xl">Ready when you are.</h1>
      {items.length === 0 ? (
        <div className="mt-10">
          <p className="text-ink-soft">Nothing here yet. The quiz can pick for you, or browse the library.</p>
          <div className="mt-6 flex gap-3">
            <Link href="/quiz" className="rounded-full bg-ink px-5 py-3 text-cream">
              Take the quiz
            </Link>
            <Link href="/shop" className="rounded-full border border-ink/15 px-5 py-3">
              Browse books
            </Link>
          </div>
        </div>
      ) : (
        <div className="mt-10">
          <ul className="divide-y divide-ink/10 border-y border-ink/10">
            {items.map((item) => (
              <li key={item.slug} className="flex items-center gap-4 py-5">
                <img src={item.coverImage} alt="" className="h-20 w-14 rounded object-cover" />
                <div className="flex-1">
                  <p className="font-serif text-2xl">{item.title}</p>
                  <p className="text-sm text-ink-soft">{item.author}</p>
                </div>
                <p>{formatMoney(item.priceCents)}</p>
                <button type="button" onClick={() => removeItem(item.slug)} className="text-sm underline">
                  Remove
                </button>
              </li>
            ))}
          </ul>
          <div className="mt-8 flex items-center justify-between">
            <p className="font-serif text-3xl">{formatMoney(totalCents)}</p>
            <Link href="/checkout" className="rounded-full bg-gold px-6 py-3 text-ink">
              Continue to checkout
            </Link>
          </div>
        </div>
      )}
    </main>
  );
}
