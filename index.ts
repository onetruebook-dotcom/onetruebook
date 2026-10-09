import { drizzle } from "drizzle-orm/node-postgres";
import { Pool } from "pg";
import * as schema from "./schema";

// Hosts name the Postgres connection variable differently:
// local .env -> DATABASE_URL, Vercel + Neon -> DATABASE_URL (or a custom prefix),
// legacy Vercel Postgres -> POSTGRES_URL.
const PREFERRED_KEYS = [
  "DATABASE_URL",
  "POSTGRES_URL",
  "DATABASE_URL_UNPOOLED",
  "POSTGRES_PRISMA_URL",
  "POSTGRES_URL_NON_POOLING",
];

function isPostgresUrl(value: string | undefined): value is string {
  return Boolean(value && /^postgres(ql)?:\/\//i.test(value.trim()));
}

export function resolveDatabaseUrl(): string | null {
  for (const key of PREFERRED_KEYS) {
    const value = process.env[key];
    if (isPostgresUrl(value)) return value.trim();
  }
  // Custom prefix chosen in the hosting dashboard (e.g. STORAGE_URL).
  for (const [key, value] of Object.entries(process.env)) {
    if (key.endsWith("_URL") && isPostgresUrl(value)) return value.trim();
  }
  return null;
}

export function isDatabaseConfigured() {
  return resolveDatabaseUrl() !== null;
}

function createDb(connectionString: string) {
  const isLocalDb = /localhost|127\.0\.0\.1/.test(connectionString);
  const pool = new Pool({
    connectionString,
    // Hosted Postgres (Neon, Supabase, ...) requires SSL; local databases do not.
    ssl: isLocalDb ? undefined : { rejectUnauthorized: false },
  });
  return drizzle(pool, { schema });
}

type Database = ReturnType<typeof createDb>;

const globalForDb = globalThis as typeof globalThis & {
  __oneTrueBookDb?: Database;
};

function getDb(): Database {
  if (globalForDb.__oneTrueBookDb) return globalForDb.__oneTrueBookDb;
  const url = resolveDatabaseUrl();
  if (!url) {
    throw new Error(
      "DATABASE_URL is required. Connect a Postgres database (Vercel → Storage → Neon) and redeploy.",
    );
  }
  const instance = createDb(url);
  globalForDb.__oneTrueBookDb = instance;
  return instance;
}

// Lazy connection: importing this module never throws, so the site can build
// and deploy before a database is connected. The pool is created on first query.
export const db = new Proxy({} as Database, {
  get(_target, prop) {
    const real = getDb();
    const value = Reflect.get(real as object, prop, real);
    return typeof value === "function"
      ? (value as (...args: unknown[]) => unknown).bind(real)
      : value;
  },
});
