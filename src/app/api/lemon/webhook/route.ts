import { createHmac, timingSafeEqual } from "node:crypto";
import { eq } from "drizzle-orm";
import { db } from "@/db";
import { orders } from "@/db/schema";
import { fulfillLemonOrder } from "@/lib/lemon-fulfillment";
import { retrieveLemonOrder, type LemonOrder } from "@/lib/lemon";

export async function GET() {
  return Response.json({
    ok: true,
    message: "POST signed Lemon Squeezy webhooks here.",
    events: ["order_created", "order_refunded"],
  });
}

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

function signaturesMatch(rawBody: string, header: string, secret: string) {
  const digest = Buffer.from(createHmac("sha256", secret).update(rawBody).digest("hex"), "utf8");
  const signature = Buffer.from(header, "utf8");
  if (digest.length !== signature.length) return false;
  return timingSafeEqual(digest, signature);
}

export async function POST(request: Request) {
  const secret = process.env.LEMON_SQUEEZY_WEBHOOK_SECRET;
  if (!secret) {
    return Response.json({ error: "Lemon Squeezy webhook is not configured." }, { status: 503 });
  }

  const rawBody = await request.text();
  const header = request.headers.get("x-signature") ?? request.headers.get("X-Signature") ?? "";
  if (!header || !signaturesMatch(rawBody, header, secret)) {
    return Response.json({ error: "Invalid Lemon Squeezy signature." }, { status: 400 });
  }

  let payload: {
    meta?: { event_name?: string; custom_data?: Record<string, unknown> };
    data?: LemonOrder;
  };
  try {
    payload = JSON.parse(rawBody) as typeof payload;
  } catch {
    return Response.json({ error: "Invalid JSON." }, { status: 400 });
  }

  const eventName = payload.meta?.event_name;
  if (eventName !== "order_created" && eventName !== "order_refunded") {
    return Response.json({ received: true });
  }

  try {
    const orderId = payload.data?.id;
    if (!orderId) return Response.json({ error: "Missing order." }, { status: 400 });
    const lemonOrder = (await retrieveLemonOrder(orderId)) ?? payload.data;
    if (!lemonOrder) return Response.json({ error: "Could not load order." }, { status: 500 });

    if (eventName === "order_created") {
      const orderCode = await fulfillLemonOrder({
        lemonOrder,
        custom: payload.meta?.custom_data,
      });
      if (lemonOrder.attributes.status === "paid" && !orderCode) {
        throw new Error(`Paid Lemon Squeezy order ${orderId} did not fulfill.`);
      }
    }

    if (eventName === "order_refunded") {
      await db
        .update(orders)
        .set({ status: "refunded" })
        .where(eq(orders.lemonOrderId, lemonOrder.id));
    }

    return Response.json({ received: true });
  } catch (error) {
    console.error("Lemon Squeezy webhook failed:", error);
    return Response.json({ error: "Could not process the Lemon Squeezy event." }, { status: 500 });
  }
}
