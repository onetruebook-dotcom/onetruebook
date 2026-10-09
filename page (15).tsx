"use client";

import Link from "next/link";
import { useState, type FormEvent } from "react";

type OrderPayload = {
  orderCode: string;
  totalCents: number;
  createdAt: string;
  items: { slug: string; title: string }[];
};

export default function LibraryPage() {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [orders, setOrders] = useState<OrderPayload[] | null>(null);
  const [loading, setLoading] = useState(false);

  async function lookup(event: FormEvent) {
    event.preventDefault();
    setError("");
    setLoading(true);
    try {
      const response = await fetch(`/api/checkout?email=${encodeURIComponent(email.trim())}`);
      const data = (await response.json()) as { orders?: OrderPayload[]; error?: string };
      if (!response.ok) {
        setError(data.error || "Could not find that email.");
        setOrders(null);
      } else {
        setOrders(data.orders ?? []);
      }
    } catch {
      setError("Network error.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="mx-auto min-h-[60vh] max-w-3xl px-5 py-16">
      <p className="text-[11px] tracking-[0.28em] text-gold-deep uppercase">Your purchases</p>
      <h1 className="font-serif mt-3 text-5xl">Open your library.</h1>
      <p className="mt-4 text-ink-soft">
        Enter the email you used at checkout. We’ll pull every book tied to it.
      </p>
      <form onSubmit={lookup} className="mt-8 flex flex-col gap-3 sm:flex-row">
        <input
          type="email"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          placeholder="you@email.com"
          className="flex-1 rounded-full border border-ink/15 bg-paper px-5 py-3"
        />
        <button type="submit" className="rounded-full bg-ink px-6 py-3 text-cream">
          {loading ? "Looking…" : "Find my books"}
        </button>
      </form>
      {error ? <p className="mt-4 text-sm text-blush">{error}</p> : null}
      {orders && orders.length === 0 ? (
        <p className="mt-8 text-ink-soft">No orders on that email yet.</p>
      ) : null}
      {orders && orders.length > 0 ? (
        <div className="mt-10 grid gap-6">
          {orders.map((order) => (
            <section key={order.orderCode} className="rounded-3xl bg-paper p-6">
              <p className="text-sm text-ink-soft">Order {order.orderCode}</p>
              <ul className="mt-4 grid gap-3">
                {order.items.map((item) => (
                  <li key={item.slug} className="flex items-center justify-between gap-3">
                    <span className="font-serif text-xl">{item.title}</span>
                    <Link
                      href={`/read/${item.slug}?order=${order.orderCode}`}
                      className="text-sm underline"
                    >
                      Read
                    </Link>
                  </li>
                ))}
              </ul>
            </section>
          ))}
        </div>
      ) : null}
    </main>
  );
}
