import {
  integer,
  jsonb,
  pgTable,
  serial,
  text,
  timestamp,
} from "drizzle-orm/pg-core";

export type BookChapter = {
  number: number;
  title: string;
  readingMinutes: number;
  body: string[];
};

export type BookTestimonial = {
  name: string;
  role: string;
  quote: string;
};

export const books = pgTable("books", {
  id: serial("id").primaryKey(),
  slug: text("slug").notNull().unique(),
  title: text("title").notNull(),
  subtitle: text("subtitle").notNull(),
  author: text("author").notNull(),
  category: text("category").notNull(),
  priceCents: integer("price_cents").notNull(),
  originalPriceCents: integer("original_price_cents").notNull(),
  description: text("description").notNull(),
  promise: text("promise").notNull(),
  diagnosis: text("diagnosis").notNull(),
  pages: integer("pages").notNull(),
  coverImage: text("cover_image").notNull(),
  lifestyleImage: text("lifestyle_image").notNull(),
  badge: text("badge"),
  accent: text("accent").notNull(),
  isBundle: integer("is_bundle").notNull().default(0),
  includesSlugs: jsonb("includes_slugs").$type<string[]>().notNull().default([]),
  painPoints: jsonb("pain_points").$type<string[]>().notNull(),
  outcomes: jsonb("outcomes").$type<string[]>().notNull(),
  chapters: jsonb("chapters").$type<BookChapter[]>().notNull(),
  testimonials: jsonb("testimonials").$type<BookTestimonial[]>().notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const quizSessions = pgTable("quiz_sessions", {
  id: serial("id").primaryKey(),
  publicId: text("public_id").notNull().unique(),
  name: text("name").notNull(),
  email: text("email").notNull(),
  answers: jsonb("answers").$type<Record<string, string>>().notNull(),
  scores: jsonb("scores").$type<Record<string, number>>().notNull(),
  primaryCategory: text("primary_category").notNull(),
  secondaryCategory: text("secondary_category").notNull(),
  recommendedBookSlug: text("recommended_book_slug").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const orders = pgTable("orders", {
  id: serial("id").primaryKey(),
  orderCode: text("order_code").notNull().unique(),
  customerName: text("customer_name").notNull(),
  customerEmail: text("customer_email").notNull(),
  totalCents: integer("total_cents").notNull(),
  status: text("status").notNull().default("pending"),
  stripeSessionId: text("stripe_session_id").unique(),
  lemonOrderId: text("lemon_order_id").unique(),
  quizPublicId: text("quiz_public_id"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const orderItems = pgTable("order_items", {
  id: serial("id").primaryKey(),
  orderId: integer("order_id")
    .notNull()
    .references(() => orders.id),
  bookId: integer("book_id")
    .notNull()
    .references(() => books.id),
  slug: text("slug").notNull(),
  title: text("title").notNull(),
  priceCents: integer("price_cents").notNull(),
});

export const reviews = pgTable("reviews", {
  id: serial("id").primaryKey(),
  bookSlug: text("book_slug").notNull(),
  authorName: text("author_name").notNull(),
  role: text("role").notNull(),
  rating: integer("rating").notNull(),
  quote: text("quote").notNull(),
});
