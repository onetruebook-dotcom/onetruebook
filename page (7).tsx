import Link from "next/link";
import { notFound } from "next/navigation";
import { eq } from "drizzle-orm";
import { db } from "@/db";
import { quizSessions } from "@/db/schema";
import { AddToCartButton } from "@/components/AddToCartButton";
import { BookCover } from "@/components/BookCover";
import { catalog, getCatalogBook } from "@/lib/catalog";
import { formatMoney } from "@/lib/format";
import { categoryMeta, isCategory } from "@/lib/quiz";
import { ensureSeeded } from "@/lib/seed";

export const dynamic = "force-dynamic";

export default async function ResultsPage({ params }: { params: Promise<{ id: string }> }) {
  await ensureSeeded();
  const { id } = await params;
  const [session] = await db.select().from(quizSessions).where(eq(quizSessions.publicId, id)).limit(1);
  if (!session) notFound();

  const primary = isCategory(session.primaryCategory) ? session.primaryCategory : "focus";
  const secondary = isCategory(session.secondaryCategory) ? session.secondaryCategory : "habits";
  const meta = categoryMeta[primary];
  const book = getCatalogBook(session.recommendedBookSlug) ?? getCatalogBook(meta.bookSlug);
  const secondBook = getCatalogBook(categoryMeta[secondary].bookSlug);
  const bundle = catalog.find((item) => item.isBundle === 1)!;

  if (!book || !secondBook) notFound();

  const scores = session.scores;
  const maxScore = Math.max(...Object.values(scores), 1);

  return (
    <main className="mx-auto max-w-6xl px-5 py-16">
      <p className="text-[11px] tracking-[0.28em] text-gold-deep uppercase">Your One True Book diagnosis</p>
      <p className="mt-4 text-sm text-ink-soft">For {session.name.split(" ")[0]}</p>
      <h1 className="font-serif mt-3 max-w-3xl text-4xl leading-tight md:text-6xl">{meta.headline}</h1>
      <p className="mt-6 max-w-2xl text-lg leading-relaxed text-ink-soft">{meta.diagnosis}</p>
      <p className="mt-4 max-w-2xl text-lg">{meta.hook}</p>

      <section className="mt-12 grid items-center gap-10 rounded-[2rem] bg-paper p-8 md:grid-cols-[280px_1fr] md:p-12">
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
          <p className="text-[11px] tracking-[0.2em] text-gold-deep uppercase">Your prescribed book</p>
          <h2 className="font-serif mt-2 text-4xl">{book.title}</h2>
          <p className="mt-2 text-ink-soft">{book.subtitle}</p>
          <p className="mt-5 leading-relaxed">{book.description}</p>
          <ul className="mt-5 grid gap-2 text-sm">
            {book.outcomes.map((item) => (
              <li key={item}>— {item}</li>
            ))}
          </ul>
          <p className="mt-6 font-serif text-3xl">
            {formatMoney(book.priceCents)}
            <span className="ml-3 text-lg text-ink-soft line-through">
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
              label="Add my book — instant access"
              className="rounded-full bg-ink px-6 py-3 text-cream"
            />
            <Link href={`/checkout?book=${book.slug}&quiz=${session.publicId}`} className="rounded-full bg-gold px-6 py-3 text-ink">
              Buy now
            </Link>
            <Link href={`/books/${book.slug}`} className="rounded-full border border-ink/15 px-6 py-3">
              Preview the book
            </Link>
          </div>
        </div>
      </section>

      <section className="mt-14">
        <h3 className="font-serif text-3xl">How your answers stacked up</h3>
        <div className="mt-6 grid gap-3">
          {Object.entries(scores)
            .sort((a, b) => b[1] - a[1])
            .map(([key, value]) => (
              <div key={key}>
                <div className="mb-1 flex justify-between text-sm">
                  <span className="capitalize">{isCategory(key) ? categoryMeta[key].label : key}</span>
                  <span className="text-ink-soft">{value}</span>
                </div>
                <div className="h-2 overflow-hidden rounded-full bg-ink/10">
                  <div
                    className="h-full rounded-full bg-gold-deep"
                    style={{ width: `${Math.round((value / maxScore) * 100)}%` }}
                  />
                </div>
              </div>
            ))}
        </div>
      </section>

      <section className="mt-16 grid gap-8 md:grid-cols-2">
        <article className="rounded-3xl border border-ink/10 p-8">
          <p className="text-[11px] tracking-[0.18em] uppercase text-ink-soft">Also showing up</p>
          <h3 className="font-serif mt-2 text-3xl">{secondBook.title}</h3>
          <p className="mt-3 text-ink-soft">{categoryMeta[secondary].headline}</p>
          <Link href={`/books/${secondBook.slug}`} className="mt-6 inline-block text-sm underline">
            See this title
          </Link>
        </article>
        <article className="rounded-3xl bg-moss p-8 text-cream">
          <p className="text-[11px] tracking-[0.18em] text-gold uppercase">If it is never only one thing</p>
          <h3 className="font-serif mt-2 text-3xl">{bundle.title}</h3>
          <p className="mt-3 text-cream/75">
            All six systems for {formatMoney(bundle.priceCents)} — save{" "}
            {formatMoney(bundle.originalPriceCents - bundle.priceCents)}.
          </p>
          <Link href={`/books/${bundle.slug}`} className="mt-6 inline-flex rounded-full bg-gold px-5 py-2.5 text-ink">
            Get the collection
          </Link>
        </article>
      </section>
    </main>
  );
}
