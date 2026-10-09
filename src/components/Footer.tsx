import Link from "next/link";
import { Logo } from "@/components/Logo";

export function Footer() {
  return (
    <footer className="mt-24 border-t border-ink/10 bg-moss text-cream">
      <div className="mx-auto grid max-w-6xl gap-10 px-5 py-16 md:grid-cols-4">
        <div className="md:col-span-2">
          <Logo variant="dark" className="sm:h-12" />
          <p className="mt-5 max-w-md text-sm leading-relaxed text-cream/75">
            Short, surgical ebooks for the bottleneck you are actually in. Ninety seconds to a
            diagnosis. Instant access forever.
          </p>
          <p className="mt-4 text-[11px] tracking-[0.22em] text-gold uppercase">
            @onetruebook · onetruebook.com
          </p>
        </div>
        <div className="text-sm text-cream/80">
          <p className="mb-3 tracking-[0.16em] uppercase text-cream/50">Visit</p>
          <div className="flex flex-col gap-2">
            <Link href="/quiz">The quiz</Link>
            <Link href="/shop">The library</Link>
            <Link href="/about">The method</Link>
            <Link href="/library">My books</Link>
            <Link href="/brand">Brand kit</Link>
          </div>
        </div>
        <div className="text-sm text-cream/80">
          <p className="mb-3 tracking-[0.16em] uppercase text-cream/50">Promise</p>
          <p className="leading-relaxed">
            30-day “it has to hit” guarantee. If the book does not name your life, write us. We
            make it right.
          </p>
        </div>
      </div>
      <div className="border-t border-white/10 px-5 py-5 text-center text-xs tracking-[0.18em] text-cream/50 uppercase">
        © {new Date().getFullYear()} One True Book · onetruebook.com · Payments by Lemon Squeezy
      </div>
    </footer>
  );
}
