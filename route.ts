import { sql } from "drizzle-orm";
import { db, isDatabaseConfigured } from "@/db";

export const dynamic = "force-dynamic";

export async function GET() {
  if (!isDatabaseConfigured()) {
    return Response.json(
      {
        ok: false,
        database: "not_connected",
        hint: "Connect a Postgres database (Vercel → Storage → Neon), then redeploy.",
      },
      { status: 500 },
    );
  }

  try {
    await db.execute(sql`select 1`);
    return Response.json({ ok: true, database: "connected" });
  } catch {
    return Response.json({ ok: false, database: "unreachable" }, { status: 500 });
  }
}
