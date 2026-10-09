# Payments — Lemon Squeezy + onetruebook.com

The storefront brand is **One True Book**. Use this website URL in Lemon Squeezy:

```text
https://onetruebook.com
```

TikTok / Instagram handle to match: **@onetruebook**

Lemon Squeezy is the merchant of record. US customers pay on Lemon Squeezy’s checkout (card and, when enabled, PayPal). Paid ebooks unlock on this site only after a signed `order_created` webhook.

Do not put API keys, webhook secrets, card numbers, or bank details in chat. Add them as server-side environment variables on your host.

## 1. Create the Lemon Squeezy store

1. Sign up at [Lemon Squeezy](https://www.lemonsqueezy.com/) and activate the store (test mode first).
2. Store URL / website: `https://onetruebook.com`
3. Create one **one-time** product per title below. Match the listed USD price.

| Title on this site | Slug (for env map) | Price |
| --- | --- | --- |
| The Focus Formula | `the-focus-formula` | $27 |
| Money Unlocked | `money-unlocked` | $29 |
| The Habit Architect | `the-habit-architect` | $24 |
| Quiet Confidence | `quiet-confidence` | $24 |
| The Sleep Reset | `the-sleep-reset` | $22 |
| Career Leap | `career-leap` | $27 |
| The One True Collection | `the-clarity-collection` | $67 |

After each product is saved, copy its **variant ID** (not the product ID) from Lemon Squeezy.

## 2. Environment variables

```dotenv
NEXT_PUBLIC_SITE_URL=https://onetruebook.com
LEMON_SQUEEZY_API_KEY=your_lemon_squeezy_api_key
LEMON_SQUEEZY_STORE_ID=your_store_id
LEMON_SQUEEZY_WEBHOOK_SECRET=a_long_random_secret_you_choose
LEMON_SQUEEZY_VARIANTS={"the-focus-formula":"123","money-unlocked":"124","the-habit-architect":"125","quiet-confidence":"126","the-sleep-reset":"127","career-leap":"128","the-clarity-collection":"129"}
```

Replace the example variant IDs with the real ones from your store. Create the API key under Lemon Squeezy **Settings → API**.

## 3. Webhook

In Lemon Squeezy **Settings → Webhooks**, add:

```text
https://onetruebook.com/api/lemon/webhook
```

Signing secret: the same value as `LEMON_SQUEEZY_WEBHOOK_SECRET`.

Events: `order_created` (required). `order_refunded` is optional.

Until the live domain is connected, use your current HTTPS preview URL instead of `onetruebook.com`.

## 4. Test, then go live

Use Lemon Squeezy test mode first. After a paid test order, confirm `/library` unlocks the book. Then activate the store and switch to live API keys.

Payouts go to the bank or PayPal account you connect inside Lemon Squeezy, on Lemon Squeezy’s payout schedule — not instantly at checkout.

Official docs: [supported seller countries](https://docs.lemonsqueezy.com/help/getting-started/supported-countries) · [getting paid](https://docs.lemonsqueezy.com/help/getting-started/getting-paid) · [webhooks](https://docs.lemonsqueezy.com/guides/developer-guide/webhooks)
