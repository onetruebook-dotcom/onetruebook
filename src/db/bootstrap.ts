import { sql } from "drizzle-orm";
import { db } from "@/db";

// Creates every table the app needs if it does not exist yet.
// This lets a brand-new hosted Postgres database (e.g. Vercel Postgres / Neon)
// work on first visit, with zero terminal commands.
const STATEMENTS = [
  `CREATE TABLE IF NOT EXISTS "books" (
    "id" SERIAL PRIMARY KEY,
    "slug" TEXT NOT NULL UNIQUE,
    "title" TEXT NOT NULL,
    "subtitle" TEXT NOT NULL,
    "author" TEXT NOT NULL,
    "category" TEXT NOT NULL,
    "price_cents" INTEGER NOT NULL,
    "original_price_cents" INTEGER NOT NULL,
    "description" TEXT NOT NULL,
    "promise" TEXT NOT NULL,
    "diagnosis" TEXT NOT NULL,
    "pages" INTEGER NOT NULL,
    "cover_image" TEXT NOT NULL,
    "lifestyle_image" TEXT NOT NULL,
    "badge" TEXT,
    "accent" TEXT NOT NULL,
    "is_bundle" INTEGER NOT NULL DEFAULT 0,
    "includes_slugs" JSONB NOT NULL DEFAULT '[]'::jsonb,
    "pain_points" JSONB NOT NULL,
    "outcomes" JSONB NOT NULL,
    "chapters" JSONB NOT NULL,
    "testimonials" JSONB NOT NULL,
    "created_at" TIMESTAMP NOT NULL DEFAULT NOW()
  )`,
  `CREATE TABLE IF NOT EXISTS "quiz_sessions" (
    "id" SERIAL PRIMARY KEY,
    "public_id" TEXT NOT NULL UNIQUE,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "answers" JSONB NOT NULL,
    "scores" JSONB NOT NULL,
    "primary_category" TEXT NOT NULL,
    "secondary_category" TEXT NOT NULL,
    "recommended_book_slug" TEXT NOT NULL,
    "created_at" TIMESTAMP NOT NULL DEFAULT NOW()
  )`,
  `CREATE TABLE IF NOT EXISTS "orders" (
    "id" SERIAL PRIMARY KEY,
    "order_code" TEXT NOT NULL UNIQUE,
    "customer_name" TEXT NOT NULL,
    "customer_email" TEXT NOT NULL,
    "total_cents" INTEGER NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'pending',
    "stripe_session_id" TEXT UNIQUE,
    "lemon_order_id" TEXT UNIQUE,
    "quiz_public_id" TEXT,
    "created_at" TIMESTAMP NOT NULL DEFAULT NOW()
  )`,
  `CREATE TABLE IF NOT EXISTS "order_items" (
    "id" SERIAL PRIMARY KEY,
    "order_id" INTEGER NOT NULL REFERENCES "orders"("id"),
    "book_id" INTEGER NOT NULL REFERENCES "books"("id"),
    "slug" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "price_cents" INTEGER NOT NULL
  )`,
  `CREATE TABLE IF NOT EXISTS "reviews" (
    "id" SERIAL PRIMARY KEY,
    "book_slug" TEXT NOT NULL,
    "author_name" TEXT NOT NULL,
    "role" TEXT NOT NULL,
    "rating" INTEGER NOT NULL,
    "quote" TEXT NOT NULL
  )`,
  // Safety net for databases created before the payment columns existed.
  `ALTER TABLE "orders" ADD COLUMN IF NOT EXISTS "stripe_session_id" TEXT UNIQUE`,
  `ALTER TABLE "orders" ADD COLUMN IF NOT EXISTS "lemon_order_id" TEXT UNIQUE`,
];

let bootstrapped = false;

export async function ensureTables() {
  if (bootstrapped) return;
  for (const statement of STATEMENTS) {
    await db.execute(sql.raw(statement));
  }
  bootstrapped = true;
}
