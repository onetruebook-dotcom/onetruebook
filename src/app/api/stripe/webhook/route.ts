import type Stripe from "stripe";
import { fulfillPaidCheckout } from "@/lib/stripe-fulfillment";
import { getStripeClient } from "@/lib/stripe";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function POST(request: Request) {
  const signingSecret = process.env.STRIPE_WEBHOOK_SECRET;
  if (!signingSecret) {
    return Response.json({ error: "Stripe webhook is not configured." }, { status: 503 });
  }

  const signature = request.headers.get("stripe-signature");
  if (!signature) {
    return Response.json({ error: "Missing Stripe signature." }, { status: 400 });
  }

  let event: Stripe.Event;
  try {
    const payload = await request.text();
    event = getStripeClient().webhooks.constructEvent(payload, signature, signingSecret);
  } catch {
    return Response.json({ error: "Invalid Stripe webhook signature." }, { status: 400 });
  }

  try {
    if (
      event.type === "checkout.session.completed" ||
      event.type === "checkout.session.async_payment_succeeded"
    ) {
      const session = event.data.object as Stripe.Checkout.Session;
      const orderCode = await fulfillPaidCheckout(session);
      if (session.payment_status === "paid" && !orderCode) {
        throw new Error(`Paid Checkout Session ${session.id} did not fulfill an order.`);
      }
    }
    return Response.json({ received: true });
  } catch (error) {
    console.error("Stripe webhook fulfillment failed:", error);
    return Response.json({ error: "Could not fulfill the paid checkout." }, { status: 500 });
  }
}
