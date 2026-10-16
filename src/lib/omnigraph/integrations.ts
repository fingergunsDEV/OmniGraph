import type { ChannelId } from "./content";

export type IntegrationId =
  | "ga4"
  | "gsc"
  | "google_ads"
  | "meta"
  | "tiktok"
  | "klaviyo"
  | "shopify"
  | "youtube";

export type IntegrationDef = {
  id: IntegrationId;
  name: string;
  vendor: string;
  blurb: string;
  propertyLabel: string;
  propertyHint: string;
  secretLabel: string;
  scopes: string[];
  feeds: ChannelId[];
};

export const INTEGRATIONS: IntegrationDef[] = [
  {
    id: "ga4",
    name: "Google Analytics 4",
    vendor: "Google",
    blurb: "Sessions, conversions, and landing pages that tie platform clicks back to orders.",
    propertyLabel: "Property or measurement ID",
    propertyHint: "G-ABC1234 or a numeric property ID",
    secretLabel: "Measurement protocol or API key",
    scopes: ["analytics.readonly", "conversions"],
    feeds: ["search", "social", "email", "video", "audience", "onsite"],
  },
  {
    id: "gsc",
    name: "Google Search Console",
    vendor: "Google",
    blurb: "Queries, pages, and branded demand that paid search is bidding against.",
    propertyLabel: "Site property",
    propertyHint: "https://brand.com/ or sc-domain:brand.com",
    secretLabel: "Search Console API key",
    scopes: ["webmasters.readonly"],
    feeds: ["search"],
  },
  {
    id: "google_ads",
    name: "Google Ads",
    vendor: "Google",
    blurb: "Search, shopping, and YouTube cost, clicks, and platform-reported conversions.",
    propertyLabel: "Customer ID",
    propertyHint: "123-456-7890",
    secretLabel: "Developer token or OAuth client secret",
    scopes: ["adwords", "cost", "conversions"],
    feeds: ["search", "video"],
  },
  {
    id: "meta",
    name: "Meta Ads",
    vendor: "Meta",
    blurb: "Prospecting and retargeting spend, plus the pixel's view of the same orders.",
    propertyLabel: "Ad account",
    propertyHint: "act_1234567890",
    secretLabel: "Marketing API token",
    scopes: ["ads_read", "insights"],
    feeds: ["social"],
  },
  {
    id: "tiktok",
    name: "TikTok Ads",
    vendor: "TikTok",
    blurb: "Spark and in-feed cost so social is not only a Meta number.",
    propertyLabel: "Advertiser ID",
    propertyHint: "Numeric advertiser id",
    secretLabel: "Marketing API token",
    scopes: ["ads.insights", "campaigns"],
    feeds: ["social"],
  },
  {
    id: "klaviyo",
    name: "Klaviyo",
    vendor: "Klaviyo",
    blurb: "Flow and campaign sends that open and close lifecycle journeys.",
    propertyLabel: "Account or public key",
    propertyHint: "Six-character public site id",
    secretLabel: "Private API key",
    scopes: ["flows:read", "campaigns:read", "events:read"],
    feeds: ["email", "audience"],
  },
  {
    id: "shopify",
    name: "Shopify",
    vendor: "Shopify",
    blurb: "Orders, the source of revenue every model has to add up to.",
    propertyLabel: "Store domain",
    propertyHint: "brand.myshopify.com",
    secretLabel: "Admin API token",
    scopes: ["read_orders", "read_customers"],
    feeds: ["onsite"],
  },
  {
    id: "youtube",
    name: "YouTube & CTV",
    vendor: "Google",
    blurb: "View-through and completed views that rarely get last-click credit.",
    propertyLabel: "Channel or advertiser ID",
    propertyHint: "UC… channel id or Ads customer ID",
    secretLabel: "YouTube Data or Ads token",
    scopes: ["youtube.readonly", "video.views"],
    feeds: ["video"],
  },
];

export const INTEGRATION_IDS = INTEGRATIONS.map((item) => item.id);

export function integrationMeta(id: IntegrationId): IntegrationDef {
  const found = INTEGRATIONS.find((item) => item.id === id);
  if (!found) throw new Error(`Unknown integration ${id}`);
  return found;
}

export function feedsFor(channel: ChannelId): IntegrationDef[] {
  return INTEGRATIONS.filter((item) => item.feeds.includes(channel));
}

export function validateProperty(id: IntegrationId, value: string): string | null {
  const v = value.trim();
  if (!v) return "Add the property or account id.";
  if (id === "ga4" && !/^G-[A-Z0-9]{4,}$/.test(v) && !/^\d{6,12}$/.test(v)) {
    return "Use a GA4 measurement ID (G-XXXX) or a numeric property ID.";
  }
  if (id === "gsc" && !/^https:\/\/.+/i.test(v) && !/^sc-domain:[a-z0-9.-]+$/i.test(v)) {
    return "Use https://brand.com/ or sc-domain:brand.com.";
  }
  if (id === "google_ads" && !/^\d{3}-?\d{3}-?\d{4}$/.test(v)) {
    return "Use a 10-digit customer ID, with or without dashes.";
  }
  if (id === "meta" && !/^act_\d{6,}$/.test(v) && !/^\d{6,}$/.test(v)) {
    return "Use an ad account id, with or without the act_ prefix.";
  }
  if (id === "shopify" && !/^[a-z0-9-]+\.myshopify\.com$/i.test(v)) {
    return "Use the myshopify.com domain, not the public storefront URL.";
  }
  if (id === "klaviyo" && !/^[A-Za-z0-9]{6,}$/.test(v)) {
    return "Use the public site id from Klaviyo.";
  }
  if ((id === "tiktok" || id === "youtube") && v.length < 6) {
    return "That id is too short to be an account.";
  }
  return null;
}

export function validateSecret(value: string): string | null {
  if (value.trim().length < 8) return "Paste a key or token of at least 8 characters.";
  return null;
}

export function pullEstimate(id: string, property: string): number {
  let hash = 2166136261;
  const text = `${id}:${property.trim().toLowerCase()}`;
  for (let i = 0; i < text.length; i += 1) {
    hash ^= text.charCodeAt(i);
    hash = Math.imul(hash, 16777619);
  }
  return 6000 + ((hash >>> 0) % 48000);
}
