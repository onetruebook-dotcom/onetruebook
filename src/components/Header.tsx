"use client";

import Link from "next/link";
import { useState } from "react";
import { Logo } from "@/components/Logo";
import { useCart } from "@/components/CartProvider";

const links = [
  { href: "/quiz", label: "Take the quiz" },
  { href: "/shop", label: "Library" },
  { href: "/about", label: "The method" },
  { href: "/library", label: "My books" },
];

export function Header() {
  const { count } = useCart();
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 border-b border-ink/10 bg-cream/85 backdrop-blur-md">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-5 py-4">
        <Link href="/" aria-label="One True Book home">
          <Logo />
        </Link>
        <nav className="hidden items-center gap-8 text-sm text-ink-soft md:flex">
          {links.map((link) => (
            <Link key={link.href} href={link.href} className="hover:text-ink">
              {link.label}
            </Link>
          ))}
        </nav>
        <div className="flex items-center gap-3">
          <Link
            href="/cart"
            className="relative rounded-full border border-ink/15 px-4 py-2 text-sm"
          >
            Cart
            {count > 0 ? (
              <span className="absolute -top-1 -right-1 grid h-5 min-w-5 place-items-center rounded-full bg-blush px-1 text-[10px] text-white">
                {count}
              </span>
            ) : null}
          </Link>
          <Link
            href="/quiz"
            className="hidden rounded-full bg-ink px-4 py-2 text-sm text-cream md:inline-flex"
          >
            Diagnose my bottleneck
          </Link>
          <button
            type="button"
            className="md:hidden"
            onClick={() => setOpen((value) => !value)}
            aria-label="Menu"
          >
            Menu
          </button>
        </div>
      </div>
      {open ? (
        <div className="border-t border-ink/10 px-5 py-4 md:hidden">
          <div className="flex flex-col gap-3 text-sm">
            {links.map((link) => (
              <Link key={link.href} href={link.href} onClick={() => setOpen(false)}>
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      ) : null}
    </header>
  );
}
