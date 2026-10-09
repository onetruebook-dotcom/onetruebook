const API_URL = "https://api.lemonsqueezy.com/v1";

export type LemonOrderAttributes = {
  store_id: number;
  identifier: string;
  order_number: number;
  user_name: string | null;
  user_email: string;
  currency: string;
  subtotal: number;
  tax: number;
  total: number;
  status: string;
  refunded: boolean;
  first_order_item?: {
    variant_id: number;
    product_name: string;
    price: number;
  };
};

export type LemonOrder = {
  type: "orders";
  id: string;
  attributes: LemonOrderAttributes;
};

function requireApiKey() {
  const apiKey = process.env.LEMON_SQUEEZY_API_KEY;
  if (!apiKey) {
    throw new Error("Lemon Squeezy is not configured. Set LEMON_SQUEEZY_API_KEY.");
  }
  return apiKey;
}

export function lemonHeaders() {
  return {
    Accept: "application/vnd.api+json",
    "Content-Type": "application/vnd.api+json",
    Authorization: `Bearer ${requireApiKey()}`,
  };
}

export function getLemonStoreId() {
  const storeId = process.env.LEMON_SQUEEZY_STORE_ID?.trim();
  if (!storeId) return null;
  return storeId;
}

export function getLemonVariantMap() {
  const raw = process.env.LEMON_SQUEEZY_VARIANTS?.trim();
  if (!raw) return {} as Record<string, string>;
  try {
    const parsed: unknown = JSON.parse(raw);
    if (!parsed || typeof parsed !== "object" || Array.isArray(parsed)) return {};
    const map: Record<string, string> = {};
    for (const [slug, value] of Object.entries(parsed as Record<string, unknown>)) {
      if (typeof value === "string" || typeof value === "number") {
        map[slug] = String(value);
      }
    }
    return map;
  } catch {
    return {};
  }
}

export function getVariantIdForSlug(slug: string) {
  return getLemonVariantMap()[slug] ?? null;
}

export function getSlugForVariantId(variantId: string | number) {
  const wanted = String(variantId);
  for (const [slug, id] of Object.entries(getLemonVariantMap())) {
    if (id === wanted) return slug;
  }
  return null;
}

export async function createLemonCheckout(input: {
  variantId: string;
  email: string;
  name: string;
  orderCode: string;
  slugs: string[];
  quizPublicId: string;
  redirectUrl: string;
  receiptUrl: string;
  productName: string;
  productDescription: string;
}) {
  const storeId = getLemonStoreId();
  if (!storeId) {
    throw new Error("Set LEMON_SQUEEZY_STORE_ID.");
  }

  const response = await fetch(`${API_URL}/checkouts`, {
    method: "POST",
    headers: lemonHeaders(),
    body: JSON.stringify({
      data: {
        type: "checkouts",
        attributes: {
          checkout_options: {
            embed: false,
            media: true,
            logo: true,
            desc: true,
            discount: true,
            button_color: "#B0894F",
          },
          checkout_data: {
            email: input.email,
            name: input.name,
            custom: {
              orderCode: input.orderCode,
              slugs: JSON.stringify(input.slugs),
              quizPublicId: input.quizPublicId,
            },
          },
          product_options: {
            name: input.productName,
            description: input.productDescription,
            redirect_url: input.redirectUrl,
            receipt_button_text: "Open your book",
            receipt_link_url: input.receiptUrl,
            enabled_variants: [Number(input.variantId)],
          },
        },
        relationships: {
          store: { data: { type: "stores", id: storeId } },
          variant: { data: { type: "variants", id: input.variantId } },
        },
      },
    }),
  });

  const payload = (await response.json()) as {
    data?: { attributes?: { url?: string } };
    errors?: { detail?: string }[];
  };

  if (!response.ok || !payload.data?.attributes?.url) {
    const detail = payload.errors?.map((error) => error.detail).filter(Boolean).join(" ") || "";
    throw new Error(detail || "Lemon Squeezy did not return a checkout URL.");
  }

  return payload.data.attributes.url;
}

export async function retrieveLemonOrder(orderId: string) {
  const response = await fetch(`${API_URL}/orders/${encodeURIComponent(orderId)}`, {
    headers: lemonHeaders(),
    cache: "no-store",
  });
  if (!response.ok) return null;
  const payload = (await response.json()) as { data?: LemonOrder };
  return payload.data ?? null;
}
