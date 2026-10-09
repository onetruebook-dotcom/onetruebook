import { db } from "@/db";
import { ensureTables } from "@/db/bootstrap";
import { books, reviews } from "@/db/schema";
import { catalog } from "@/lib/catalog";

let seeded = false;

export async function ensureSeeded() {
  if (seeded) return;

  try {
    // Fresh hosted databases (Vercel Postgres / Neon) start empty,
    // so create tables automatically before seeding any content.
    await ensureTables();

    const rows = catalog.map((book) => ({
      slug: book.slug,
      title: book.title,
      subtitle: book.subtitle,
      author: book.author,
      category: book.category,
      priceCents: book.priceCents,
      originalPriceCents: book.originalPriceCents,
      description: book.description,
      promise: book.promise,
      diagnosis: book.diagnosis,
      pages: book.pages,
      coverImage: book.coverImage,
      lifestyleImage: book.lifestyleImage,
      badge: book.badge,
      accent: book.accent,
      isBundle: book.isBundle,
      includesSlugs: book.includesSlugs,
      painPoints: book.painPoints,
      outcomes: book.outcomes,
      chapters: book.chapters,
      testimonials: book.testimonials,
    }));

    for (const row of rows) {
      await db
        .insert(books)
        .values(row)
        .onConflictDoUpdate({
          target: books.slug,
          set: {
            title: row.title,
            subtitle: row.subtitle,
            author: row.author,
            category: row.category,
            priceCents: row.priceCents,
            originalPriceCents: row.originalPriceCents,
            description: row.description,
            promise: row.promise,
            diagnosis: row.diagnosis,
            pages: row.pages,
            coverImage: row.coverImage,
            lifestyleImage: row.lifestyleImage,
            badge: row.badge,
            accent: row.accent,
            isBundle: row.isBundle,
            includesSlugs: row.includesSlugs,
            painPoints: row.painPoints,
            outcomes: row.outcomes,
            chapters: row.chapters,
            testimonials: row.testimonials,
          },
        });
    }

    const existingReviews = await db.select({ id: reviews.id }).from(reviews).limit(1);
    if (existingReviews.length === 0) {
      const reviewRows = catalog.flatMap((book) =>
        book.testimonials.map((item) => ({
          bookSlug: book.slug,
          authorName: item.name,
          role: item.role,
          rating: 5,
          quote: item.quote,
        })),
      );
      if (reviewRows.length) {
        await db.insert(reviews).values(reviewRows);
      }
    }

    seeded = true;
  } catch {
    seeded = false;
  }
}
