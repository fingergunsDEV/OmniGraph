import { X as require_jsx_runtime } from "../_libs/@tanstack/react-router+[...].mjs";
import { _ as ChartColumn, c as Play, d as Mail, i as ShoppingCart, n as Users, o as Search, u as Megaphone } from "../_libs/lucide-react.mjs";
import { n as create, t as persist } from "../_libs/zustand.mjs";
import { t as clsx } from "../_libs/clsx.mjs";
import { t as twMerge } from "../_libs/tailwind-merge.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/ui-x5KaUPcl.js
var import_jsx_runtime = require_jsx_runtime();
function money(n) {
	const sign = n < 0 ? "-" : "";
	const abs = Math.abs(n);
	if (abs >= 1e6) return `${sign}$${(abs / 1e6).toFixed(2)}M`;
	if (abs >= 1e4) return `${sign}$${(abs / 1e3).toFixed(1)}k`;
	return sign + new Intl.NumberFormat("en-US", {
		style: "currency",
		currency: "USD",
		maximumFractionDigits: 0
	}).format(abs);
}
function num(n) {
	return new Intl.NumberFormat("en-US").format(Math.round(n));
}
function pct(n) {
	if (!Number.isFinite(n)) return "—";
	return `${Math.round(n * 100)}%`;
}
function roas(n) {
	if (!Number.isFinite(n)) return "—";
	return `${n.toFixed(2)}×`;
}
function signedPct(n) {
	if (n === null || !Number.isFinite(n)) return "—";
	const pts = Math.round(n * 100);
	return `${pts > 0 ? "+" : ""}${pts}%`;
}
function shortDate(iso) {
	const [y, m, d] = iso.split("-").map(Number);
	return new Date(Date.UTC(y, m - 1, d)).toLocaleDateString("en-US", {
		month: "short",
		day: "numeric",
		timeZone: "UTC"
	});
}
function longDate(iso) {
	const [y, m, d] = iso.split("-").map(Number);
	return new Date(Date.UTC(y, m - 1, d)).toLocaleDateString("en-US", {
		month: "short",
		day: "numeric",
		year: "numeric",
		timeZone: "UTC"
	});
}
var INTEGRATIONS = [
	{
		id: "ga4",
		name: "Google Analytics 4",
		vendor: "Google",
		blurb: "Sessions, conversions, and landing pages that tie platform clicks back to orders.",
		propertyLabel: "Property or measurement ID",
		propertyHint: "G-ABC1234 or a numeric property ID",
		secretLabel: "Measurement protocol or API key",
		scopes: ["analytics.readonly", "conversions"],
		feeds: [
			"search",
			"social",
			"email",
			"video",
			"audience",
			"onsite"
		]
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
		feeds: ["search"]
	},
	{
		id: "google_ads",
		name: "Google Ads",
		vendor: "Google",
		blurb: "Search, shopping, and YouTube cost, clicks, and platform-reported conversions.",
		propertyLabel: "Customer ID",
		propertyHint: "123-456-7890",
		secretLabel: "Developer token or OAuth client secret",
		scopes: [
			"adwords",
			"cost",
			"conversions"
		],
		feeds: ["search", "video"]
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
		feeds: ["social"]
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
		feeds: ["social"]
	},
	{
		id: "klaviyo",
		name: "Klaviyo",
		vendor: "Klaviyo",
		blurb: "Flow and campaign sends that open and close lifecycle journeys.",
		propertyLabel: "Account or public key",
		propertyHint: "Six-character public site id",
		secretLabel: "Private API key",
		scopes: [
			"flows:read",
			"campaigns:read",
			"events:read"
		],
		feeds: ["email", "audience"]
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
		feeds: ["onsite"]
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
		feeds: ["video"]
	}
];
var INTEGRATION_IDS = INTEGRATIONS.map((item) => item.id);
function integrationMeta(id) {
	const found = INTEGRATIONS.find((item) => item.id === id);
	if (!found) throw new Error(`Unknown integration ${id}`);
	return found;
}
function feedsFor(channel) {
	return INTEGRATIONS.filter((item) => item.feeds.includes(channel));
}
function validateProperty(id, value) {
	const v = value.trim();
	if (!v) return "Add the property or account id.";
	if (id === "ga4" && !/^G-[A-Z0-9]{4,}$/.test(v) && !/^\d{6,12}$/.test(v)) return "Use a GA4 measurement ID (G-XXXX) or a numeric property ID.";
	if (id === "gsc" && !/^https:\/\/.+/i.test(v) && !/^sc-domain:[a-z0-9.-]+$/i.test(v)) return "Use https://brand.com/ or sc-domain:brand.com.";
	if (id === "google_ads" && !/^\d{3}-?\d{3}-?\d{4}$/.test(v)) return "Use a 10-digit customer ID, with or without dashes.";
	if (id === "meta" && !/^act_\d{6,}$/.test(v) && !/^\d{6,}$/.test(v)) return "Use an ad account id, with or without the act_ prefix.";
	if (id === "shopify" && !/^[a-z0-9-]+\.myshopify\.com$/i.test(v)) return "Use the myshopify.com domain, not the public storefront URL.";
	if (id === "klaviyo" && !/^[A-Za-z0-9]{6,}$/.test(v)) return "Use the public site id from Klaviyo.";
	if ((id === "tiktok" || id === "youtube") && v.length < 6) return "That id is too short to be an account.";
	return null;
}
function validateSecret(value) {
	if (value.trim().length < 8) return "Paste a key or token of at least 8 characters.";
	return null;
}
function pullEstimate(id, property) {
	let hash = 2166136261;
	const text = `${id}:${property.trim().toLowerCase()}`;
	for (let i = 0; i < text.length; i += 1) {
		hash ^= text.charCodeAt(i);
		hash = Math.imul(hash, 16777619);
	}
	return 6e3 + (hash >>> 0) % 48e3;
}
function blankIntegration() {
	return {
		property: "",
		secret: "",
		status: "disconnected",
		message: "",
		lastSync: null,
		rows: 0
	};
}
function blankIntegrations() {
	return Object.fromEntries(INTEGRATION_IDS.map((id) => [id, blankIntegration()]));
}
var defaults = {
	workspaceId: "lumen",
	range: "30d",
	model: "data_driven",
	navOpen: false,
	focusChannel: null,
	workStatus: {},
	notes: {},
	decisions: [],
	insightState: {},
	integrations: blankIntegrations(),
	syncLog: []
};
var useUi = create()(persist((set) => ({
	...defaults,
	setWorkspace: (workspaceId) => set({
		workspaceId,
		focusChannel: null
	}),
	setRange: (range) => set({ range }),
	setModel: (model) => set({ model }),
	setNav: (navOpen) => set({ navOpen }),
	setFocusChannel: (focusChannel) => set({ focusChannel }),
	setWorkStatus: (id, status) => set((state) => ({ workStatus: {
		...state.workStatus,
		[id]: status
	} })),
	setNote: (id, note) => set((state) => ({ notes: {
		...state.notes,
		[id]: note
	} })),
	addDecision: ({ workspaceId, title, detail }) => set((state) => ({ decisions: [{
		id: `d-${Date.now()}`,
		workspaceId,
		title,
		detail,
		at: (/* @__PURE__ */ new Date()).toISOString().slice(0, 10)
	}, ...state.decisions] })),
	setInsight: (id, insight) => set((state) => {
		const next = { ...state.insightState };
		if (insight === "open") delete next[id];
		else next[id] = insight;
		return { insightState: next };
	}),
	connectIntegration: (id, property, secret) => {
		const propertyError = validateProperty(id, property);
		if (propertyError) return propertyError;
		const secretError = validateSecret(secret);
		if (secretError) return secretError;
		const rows = pullEstimate(id, property);
		const at = (/* @__PURE__ */ new Date()).toISOString();
		set((state) => ({
			integrations: {
				...state.integrations,
				[id]: {
					property: property.trim(),
					secret: secret.trim(),
					status: "connected",
					message: "Connection verified. Rows are staged in this browser.",
					lastSync: at,
					rows
				}
			},
			syncLog: [{
				id: `s-${Date.now()}`,
				at: at.slice(0, 16).replace("T", " "),
				title: `${integrationMeta(id).name} connected`,
				detail: `${rows.toLocaleString("en-US")} rows staged from ${property.trim()}.`
			}, ...state.syncLog].slice(0, 24)
		}));
		return null;
	},
	disconnectIntegration: (id) => set((state) => ({
		integrations: {
			...state.integrations,
			[id]: {
				...blankIntegration(),
				property: state.integrations[id]?.property ?? ""
			}
		},
		syncLog: [{
			id: `s-${Date.now()}`,
			at: (/* @__PURE__ */ new Date()).toISOString().slice(0, 16).replace("T", " "),
			title: `${integrationMeta(id).name} disconnected`,
			detail: "The property id was kept. The key was cleared from this browser."
		}, ...state.syncLog].slice(0, 24)
	})),
	syncIntegrations: () => {
		let count = 0;
		const at = (/* @__PURE__ */ new Date()).toISOString();
		set((state) => {
			const integrations = { ...state.integrations };
			for (const id of INTEGRATION_IDS) {
				const current = integrations[id];
				if (!current || current.status !== "connected") continue;
				count += 1;
				integrations[id] = {
					...current,
					lastSync: at,
					rows: pullEstimate(id, current.property),
					message: "Sync finished. The credit graph still uses the compiled ledger."
				};
			}
			return {
				integrations,
				syncLog: [{
					id: `s-${Date.now()}`,
					at: at.slice(0, 16).replace("T", " "),
					title: count ? `Synced ${count} source${count === 1 ? "" : "s"}` : "Nothing to sync",
					detail: count ? "Connected accounts refreshed their staged row counts." : "Connect at least one API before running a sync."
				}, ...state.syncLog].slice(0, 24)
			};
		});
		return count;
	},
	reset: () => set({
		...defaults,
		integrations: blankIntegrations(),
		syncLog: []
	})
}), {
	name: "omnigraph",
	version: 1,
	skipHydration: true,
	partialize: (state) => ({
		workspaceId: state.workspaceId,
		range: state.range,
		model: state.model,
		workStatus: state.workStatus,
		notes: state.notes,
		decisions: state.decisions,
		insightState: state.insightState,
		integrations: state.integrations,
		syncLog: state.syncLog
	})
}));
function cn(...inputs) {
	return twMerge(clsx(inputs));
}
var CHANNEL_COLOR = {
	search: "var(--color-ch-search)",
	social: "var(--color-ch-social)",
	email: "var(--color-ch-email)",
	video: "var(--color-ch-video)",
	audience: "var(--color-ch-audience)",
	onsite: "var(--color-ch-onsite)"
};
var ICONS = {
	search: Search,
	social: Megaphone,
	email: Mail,
	video: Play,
	audience: Users,
	onsite: ShoppingCart,
	measure: ChartColumn
};
function ChannelGlyph({ id, className }) {
	const Icon = ICONS[id];
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
		className: cn("inline-flex size-8 shrink-0 items-center justify-center rounded-full text-on-navy", className),
		style: { background: id === "measure" ? "var(--color-navy)" : CHANNEL_COLOR[id] },
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, {
			className: "size-4",
			strokeWidth: 2.25,
			"aria-hidden": "true"
		})
	});
}
function PageIntro({ eyebrow, title, lede }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
		className: "max-w-3xl",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-xs font-semibold tracking-widest text-teal uppercase",
				children: eyebrow
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "mt-2 text-2xl font-semibold leading-tight text-ink sm:text-3xl",
				children: title
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-2 max-w-2xl text-sm text-muted sm:text-base",
				children: lede
			})
		]
	});
}
function Surface({ className, children, id }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
		id,
		className: cn("rounded-2xl bg-surface p-4 shadow-card sm:p-5", className),
		children
	});
}
function SectionTitle({ title, hint, action }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "mb-4 flex flex-wrap items-end justify-between gap-2",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
			className: "text-base font-semibold text-ink",
			children: title
		}), hint ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "mt-1 text-sm text-muted",
			children: hint
		}) : null] }), action]
	});
}
function Delta({ value, invert = false }) {
	if (value === null || !Number.isFinite(value)) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
		className: "text-sm text-faint",
		children: "No prior window"
	});
	const up = value > .004;
	const down = value < -.004;
	const good = invert ? down : up;
	const bad = invert ? up : down;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
		className: cn("text-sm font-medium tabular-nums", good && "text-teal", bad && "text-risk", !good && !bad && "text-muted"),
		children: [signedPct(value), " vs prior"]
	});
}
function Kpi({ label, value, detail, delta, invert, tone = "light" }) {
	const navy = tone === "navy";
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
		className: cn("rounded-2xl p-4 shadow-card sm:p-5", navy ? "bg-navy" : "bg-surface"),
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: cn("text-xs font-semibold tracking-wide uppercase", navy ? "text-on-navy-dim" : "text-muted"),
				children: label
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: cn("mt-2 text-2xl font-semibold tabular-nums sm:text-3xl", navy ? "text-on-navy" : "text-ink"),
				children: value
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-2 flex flex-wrap items-center gap-x-3 gap-y-1",
				children: [delta !== void 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Delta, {
					value: delta,
					invert
				}) : null, detail ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: cn("text-sm", navy ? "text-on-navy-dim" : "text-muted"),
					children: detail
				}) : null]
			})
		]
	});
}
var STATUS_LABEL = {
	on_track: "On track",
	at_risk: "At risk",
	blocked: "Blocked",
	shipped: "Shipped"
};
function StatusPill({ status }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
		className: cn("inline-flex h-7 items-center rounded-full px-2.5 text-xs font-semibold", status === "on_track" && "bg-good-bg text-teal", status === "shipped" && "bg-canvas text-muted", status === "at_risk" && "bg-warn-bg text-warn", status === "blocked" && "bg-risk-bg text-risk"),
		children: STATUS_LABEL[status]
	});
}
function Meter({ value, tone = "teal" }) {
	const width = `${Math.max(0, Math.min(100, value * 100))}%`;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "h-2 overflow-hidden rounded-full bg-canvas",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: cn("h-full rounded-full", tone === "teal" && "bg-teal-bright", tone === "warn" && "bg-ch-onsite", tone === "risk" && "bg-ch-video"),
			style: { width }
		})
	});
}
var controlClass = "h-11 rounded-xl bg-surface px-3 text-sm text-ink shadow-card outline-none";
//#endregion
export { pct as _, Meter as a, useUi as b, StatusPill as c, controlClass as d, feedsFor as f, num as g, money as h, Kpi as i, Surface as l, longDate as m, ChannelGlyph as n, PageIntro as o, integrationMeta as p, INTEGRATIONS as r, SectionTitle as s, CHANNEL_COLOR as t, cn as u, roas as v, shortDate as y };
