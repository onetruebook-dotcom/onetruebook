import Link from "next/link";
import { notFound } from "next/navigation";
import { AddToCartButton } from "@/components/AddToCartButton";
import { BookCover } from "@/components/BookCover";
import { catalog, getCatalogBook, singleBooks } from "@/lib/catalog";
import { formatMoney } from "@/lib/format";
import { ensureSeeded } from "@/lib/seed";
import type { Metadata } from "next";

export const dynamic = "force-dynamic";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const book = getCatalogBook(slug);
  if (!book) return { title: "Book" };
  return { title: book.title, description: book.description };
}

export default async function BookPage({ params }: { params: Promise<{ slug: string }> }) {
  await ensureSeeded();
  const { slug } = await params;
  const book = getCatalogBook(slug);
  if (!book) notFound();

  const included = book.includesSlugs
    .map((item) => getCatalogBook(item))
    .filter((item): item is NonNullable<typeof item> => Boolean(item));
  const others = singleBooks.filter((item) => item.slug !== book.slug).slice(0, 3);

  return (
    <main>
      <section className="border-b border-ink/10 bg-paper">
        <div className="mx-auto grid max-w-6xl items-center gap-12 px-5 py-16 md:grid-cols-[0.9fr_1.1fr]">
          <div className="flex justify-center">
            <BookCover
              title={book.title}
              author={book.author}
              image={book.coverImage}
              accent={book.accent}
              size="lg"
            />
          </div>
          <div>
            {book.badge ? (
              <p className="text-[11px] tracking-[0.22em] text-gold-deep uppercase">{book.badge}</p>
            ) : null}
            <h1 className="font-serif mt-3 text-5xl md:text-6xl">{book.title}</h1>
            <p className="mt-3 text-xl text-ink-soft">{book.subtitle}</p>
            <p className="mt-4 text-sm tracking-[0.08em] uppercase text-ink-soft">
              {book.author} · {book.pages} pages · Instant ebook
            </p>
            <p className="mt-6 text-lg leading-relaxed">{book.description}</p>
            <p className="mt-4 font-medium">{book.promise}</p>
            <p className="mt-8 font-serif text-4xl">
              {formatMoney(book.priceCents)}
              <span className="ml-3 text-xl text-ink-soft line-through">
                {formatMoney(book.originalPriceCents)}
              </span>
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <AddToCartButton
                item={{
                  slug: book.slug,
                  title: book.title,
                  priceCents: book.priceCents,
                  coverImage: book.coverImage,
                  author: book.author,
                }}
                label="Add to cart"
                className="rounded-full bg-ink px-6 py-3 text-cream"
              />
              <Link href={`/checkout?book=${book.slug}`} className="rounded-full bg-gold px-6 py-3 text-ink">
                Buy now — read tonight
              </Link>
            </div>
            <p className="mt-4 text-sm text-ink-soft">30-day it-has-to-hit guarantee · Keep the files forever</p>
          </div>
        </div>
      </section>

      <section className="mx-auto grid max-w-6xl gap-12 px-5 py-16 md:grid-cols-2">
        <div>
          <h2 className="font-serif text-3xl">If this is you</h2>
          <ul className="mt-6 grid gap-3">
            {book.painPoints.map((item) => (
              <li key={item} className="rounded-2xl bg-paper px-5 py-4">
                {item}
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h2 className="font-serif text-3xl">What you walk out with</h2>
          <ul className="mt-6 grid gap-3">
            {book.outcomes.map((item) => (
              <li key={item} className="rounded-2xl border border-ink/10 px-5 py-4">
                {item}
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="bg-ink text-cream">
        <div className="mx-auto grid max-w-6xl items-center gap-10 px-5 py-16 md:grid-cols-2">
          <img src={book.lifestyleImage} alt="" className="h-[360px] w-full rounded-3xl object-cover" />
          <div>
            <h2 className="font-serif text-4xl">{book.diagnosis}</h2>
            <p className="mt-5 text-cream/75 leading-relaxed">
              This is not a 400-page monument to the author’s research. It is a field manual: chapters
              you can finish, a protocol you can run, language sharp enough to keep you honest when
              motivation leaves the building.
            </p>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-5 py-16">
        <h2 className="font-serif text-3xl">Inside the ebook</h2>
        <ol className="mt-8 divide-y divide-ink/10 border-y border-ink/10">
          {book.chapters.map((chapter) => (
            <li key={chapter.number} className="flex items-baseline justify-between gap-4 py-4">
              <div>
                <span className="mr-3 text-sm text-ink-soft">0{chapter.number}</span>
                <span className="font-serif text-2xl">{chapter.title}</span>
              </div>
              <span className="text-sm text-ink-soft">{chapter.readingMinutes} min</span>
            </li>
          ))}
        </ol>
        {book.chapters[0] ? (
          <article className="paper-page mt-12 rounded-3xl p-8 md:p-12">
            <p className="text-[11px] tracking-[0.2em] uppercase text-ink-soft">Free preview · Chapter 1</p>
            <h3 className="font-serif mt-3 text-3xl">{book.chapters[0].title}</h3>
            {book.chapters[0].body.slice(0, 2).map((paragraph) => (
              <p key={paragraph.slice(0, 24)} className="font-serif mt-5 text-lg leading-8">
                {paragraph}
              </p>
            ))}
            <p className="mt-6 text-sm text-ink-soft">The rest unlocks the moment you order.</p>
          </article>
        ) : null}
      </section>

      {included.length ? (
        <section className="mx-auto max-w-6xl px-5 pb-8">
          <h2 className="font-serif text-3xl">Included titles</h2>
          <div className="mt-8 grid gap-6 md:grid-cols-3">
            {included.map((item) => (
              <Link key={item.slug} href={`/books/${item.slug}`} className="rounded-2xl bg-paper p-5">
                <p className="font-serif text-xl">{item.title}</p>
                <p className="mt-2 text-sm text-ink-soft">{item.author}</p>
              </Link>
            ))}
          </div>
        </section>
      ) : null}

      <section className="mx-auto max-w-6xl px-5 py-12">
        <h2 className="font-serif text-3xl">From readers</h2>
        <div className="mt-8 grid gap-6 md:grid-cols-2">
          {book.testimonials.map((item) => (
            <blockquote key={item.name} className="rounded-3xl bg-paper p-8">
              <p className="font-serif text-2xl leading-snug">“{item.quote}”</p>
              <footer className="mt-4 text-sm text-ink-soft">
                {item.name} · {item.role}
              </footer>
            </blockquote>
          ))}
        </div>
      </section>

      {others.length ? (
        <section className="mx-auto max-w-6xl px-5 pb-20">
          <h2 className="font-serif text-3xl">Other bottlenecks</h2>
          <div className="mt-6 flex flex-wrap gap-3">
            {others.map((item) => (
              <Link key={item.slug} href={`/books/${item.slug}`} className="rounded-full border border-ink/15 px-4 py-2 text-sm">
                {item.title}
              </Link>
            ))}
            <Link href="/quiz" className="rounded-full bg-ink px-4 py-2 text-sm text-cream">
              Not sure? Take the quiz
            </Link>
          </div>
        </section>
      ) : null}
    </main>
  );
}
