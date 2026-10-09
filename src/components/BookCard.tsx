import Link from "next/link";
import { BookCover } from "@/components/BookCover";
import { formatMoney } from "@/lib/format";
import type { CatalogBook } from "@/lib/catalog";

export function BookCard({ book }: { book: CatalogBook }) {
  return (
    <Link href={`/books/${book.slug}`} className="group block">
      <div className="flex justify-center pb-6 pt-2">
        <BookCover
          title={book.title}
          author={book.author}
          image={book.coverImage}
          accent={book.accent}
          size="md"
          className="transition-transform duration-500 group-hover:-translate-y-2"
        />
      </div>
      <div className="px-1">
        {book.badge ? (
          <p className="mb-2 text-[10px] tracking-[0.18em] text-gold-deep uppercase">{book.badge}</p>
        ) : null}
        <h3 className="font-serif text-2xl leading-tight">{book.title}</h3>
        <p className="mt-2 text-sm leading-relaxed text-ink-soft">{book.subtitle}</p>
        <p className="mt-4 text-sm">
          <span className="font-medium">{formatMoney(book.priceCents)}</span>
          <span className="ml-2 text-ink-soft line-through">{formatMoney(book.originalPriceCents)}</span>
        </p>
      </div>
    </Link>
  );
}
