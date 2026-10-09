import { getLemonVariantMap, getLemonStoreId } from "@/lib/lemon";
import { catalog } from "@/lib/catalog";

export const dynamic = "force-dynamic";

export async function GET() {
  const storeId = getLemonStoreId();
  const variantMap = getLemonVariantMap();
  const requiredSlugs = catalog.map((book) => book.slug);
  const missingSlugs = requiredSlugs.filter((slug) => !variantMap[slug]);
  const siteUrl = (process.env.NEXT_PUBLIC_SITE_URL || "https://onetruebook.com").replace(/\/$/, "");

  const hasApiKey = Boolean(process.env.LEMON_SQUEEZY_API_KEY);
  const hasWebhookSecret = Boolean(process.env.LEMON_SQUEEZY_WEBHOOK_SECRET);
  const configured = Boolean(storeId) && hasApiKey && hasWebhookSecret && missingSlugs.length === 0;

  return Response.json({
    configured,
    siteUrl,
    webhookUrl: `${siteUrl}/api/lemon/webhook`,
    hasApiKey,
    hasStoreId: Boolean(storeId),
    // Never expose the actual IDs or secrets here, only counts.
    storeIdLength: storeId ? storeId.length : 0,
    hasWebhookSecret,
    variantCount: Object.keys(variantMap).length,
    requiredCount: requiredSlugs.length,
    missingSlugs,
    requiredSlugs,
  });
}
