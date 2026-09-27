import { J as require_jsx_runtime } from "../_libs/@tanstack/react-router+[...].mjs";
import { a as Search, g as ChartColumn, i as ShoppingCart, l as Megaphone, n as Users, s as Play, u as Mail } from "../_libs/lucide-react.mjs";
import { n as create, t as persist } from "../_libs/zustand.mjs";
import { t as clsx } from "../_libs/clsx.mjs";
import { t as twMerge } from "../_libs/tailwind-merge.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/ui-DLhUn6uC.js
var import_jsx_runtime = require_jsx_runtime();
var AS_OF = "2026-09-26";
var CHANNELS = [
	{
		id: "search",
		name: "Paid Search",
		short: "Search",
		surface: "Google & Bing"
	},
	{
		id: "social",
		name: "Paid Social",
		short: "Social",
		surface: "Meta & TikTok"
	},
	{
		id: "email",
		name: "Lifecycle",
		short: "Email",
		surface: "Klaviyo"
	},
	{
		id: "video",
		name: "Video",
		short: "Video",
		surface: "YouTube & CTV"
	},
	{
		id: "audience",
		name: "CRM Audiences",
		short: "Audiences",
		surface: "First-party"
	},
	{
		id: "onsite",
		name: "On-site",
		short: "On-site",
		surface: "Shopify"
	}
];
var CHANNEL_IDS = CHANNELS.map((c) => c.id);
var MODELS = [
	{
		id: "data_driven",
		name: "OmniGraph",
		blurb: "Recency, position, and channel strength. Every dollar of an order is credited once."
	},
	{
		id: "last_touch",
		name: "Last touch",
		blurb: "The last touch before purchase takes the whole order. Close to how platform pixels argue."
	},
	{
		id: "first_touch",
		name: "First touch",
		blurb: "The opener takes the whole order. Use it when the question is who starts demand."
	},
	{
		id: "linear",
		name: "Linear",
		blurb: "Every touch gets an equal slice, whether it happened two weeks ago or today."
	},
	{
		id: "position",
		name: "U-shape",
		blurb: "40% to the opener, 40% to the closer, 20% shared by the middle of the path."
	},
	{
		id: "time_decay",
		name: "Time decay",
		blurb: "A touch loses half its weight every 7 days before the order."
	}
];
var RANGES = [
	{
		id: "7d",
		label: "7d",
		hint: "Last 7 days"
	},
	{
		id: "30d",
		label: "30d",
		hint: "Last 30 days"
	},
	{
		id: "90d",
		label: "90d",
		hint: "Last 90 days"
	}
];
var RANGE_DAYS = {
	"7d": 7,
	"30d": 30,
	"90d": 90
};
var HAIRCUT = {
	search: .72,
	social: .48,
	email: .88,
	video: .42,
	audience: .64,
	onsite: .8
};
var CHANNEL_STRENGTH = {
	search: 1.22,
	social: .92,
	email: 1.12,
	video: .84,
	audience: .98,
	onsite: 1.04
};
var TEMPLATES = [
	{
		touches: [
			{
				channel: "social",
				daysBefore: 11
			},
			{
				channel: "video",
				daysBefore: 6
			},
			{
				channel: "search",
				daysBefore: 0
			}
		],
		weight: 14,
		aov: 96,
		newRate: .7
	},
	{
		touches: [{
			channel: "search",
			daysBefore: 0
		}],
		weight: 18,
		aov: 78,
		newRate: .55
	},
	{
		touches: [{
			channel: "email",
			daysBefore: 9
		}, {
			channel: "email",
			daysBefore: 2
		}],
		weight: 10,
		aov: 124,
		newRate: .15
	},
	{
		touches: [
			{
				channel: "video",
				daysBefore: 14
			},
			{
				channel: "social",
				daysBefore: 8
			},
			{
				channel: "email",
				daysBefore: 3
			},
			{
				channel: "search",
				daysBefore: 0
			}
		],
		weight: 8,
		aov: 148,
		newRate: .6
	},
	{
		touches: [
			{
				channel: "audience",
				daysBefore: 7
			},
			{
				channel: "email",
				daysBefore: 2
			},
			{
				channel: "onsite",
				daysBefore: 0
			}
		],
		weight: 10,
		aov: 108,
		newRate: .2
	},
	{
		touches: [{
			channel: "social",
			daysBefore: 4
		}, {
			channel: "social",
			daysBefore: 1
		}],
		weight: 12,
		aov: 62,
		newRate: .72
	},
	{
		touches: [
			{
				channel: "search",
				daysBefore: 6
			},
			{
				channel: "email",
				daysBefore: 2
			},
			{
				channel: "search",
				daysBefore: 0
			}
		],
		weight: 7,
		aov: 136,
		newRate: .35
	},
	{
		touches: [{
			channel: "video",
			daysBefore: 5
		}, {
			channel: "search",
			daysBefore: 0
		}],
		weight: 8,
		aov: 88,
		newRate: .58
	},
	{
		touches: [{
			channel: "onsite",
			daysBefore: 0
		}],
		weight: 8,
		aov: 70,
		newRate: .1
	},
	{
		touches: [
			{
				channel: "audience",
				daysBefore: 10
			},
			{
				channel: "social",
				daysBefore: 4
			},
			{
				channel: "search",
				daysBefore: 0
			}
		],
		weight: 7,
		aov: 102,
		newRate: .4
	},
	{
		touches: [{
			channel: "email",
			daysBefore: 3
		}, {
			channel: "onsite",
			daysBefore: 0
		}],
		weight: 9,
		aov: 90,
		newRate: .18
	},
	{
		touches: [
			{
				channel: "social",
				daysBefore: 8
			},
			{
				channel: "email",
				daysBefore: 1
			},
			{
				channel: "onsite",
				daysBefore: 0
			}
		],
		weight: 9,
		aov: 84,
		newRate: .48
	},
	{
		touches: [{
			channel: "social",
			daysBefore: 3
		}, {
			channel: "video",
			daysBefore: 0
		}],
		weight: 5,
		aov: 74,
		newRate: .64
	},
	{
		touches: [{
			channel: "audience",
			daysBefore: 0
		}],
		weight: 5,
		aov: 98,
		newRate: .22
	}
];
var WORKSPACES = [
	{
		id: "lumen",
		name: "Lumen & Co",
		category: "Clinical skincare",
		brief: "Refills and sets. Media still defends last-click; lifecycle is doing the quiet work.",
		seed: 11,
		orders: 9e3,
		aovScale: 1.22,
		growth: 1.16,
		bias: [
			.8,
			1.35,
			1.45,
			.75,
			1.15,
			.9,
			1.3,
			.8,
			.9,
			.85,
			1.35,
			1.05,
			.7,
			1.15
		],
		monthTarget: 22e4,
		cacGuardrail: 72,
		velocityDays: 14,
		velocityTarget: 12
	},
	{
		id: "harbor",
		name: "Harbor Goods",
		category: "Home & outdoor",
		brief: "High-AOV seasonal drops. Video opens demand that search closes a week later.",
		seed: 29,
		orders: 6200,
		aovScale: 1.55,
		growth: 1.04,
		bias: [
			1.3,
			.9,
			.8,
			1.45,
			.75,
			1.2,
			.85,
			1.5,
			1,
			.95,
			.85,
			.95,
			1.35,
			.8
		],
		monthTarget: 19e4,
		cacGuardrail: 108,
		velocityDays: 9,
		velocityTarget: 12
	},
	{
		id: "vela",
		name: "Vela Athletics",
		category: "Performance apparel",
		brief: "Drop cadence is the business. Prospecting social and on-site merch fight over the same orders.",
		seed: 47,
		orders: 11200,
		aovScale: .92,
		growth: 1.28,
		bias: [
			1,
			.8,
			.7,
			.9,
			.8,
			1.45,
			.75,
			.95,
			1.35,
			1.1,
			.85,
			1.45,
			.85,
			1.2
		],
		monthTarget: 25e4,
		cacGuardrail: 56,
		velocityDays: 16,
		velocityTarget: 12
	}
];
var SPEND_DAILY = {
	lumen: {
		search: 640,
		social: 520,
		email: 260,
		video: 240,
		audience: 160,
		onsite: 110
	},
	harbor: {
		search: 420,
		social: 560,
		email: 150,
		video: 380,
		audience: 120,
		onsite: 160
	},
	vela: {
		search: 700,
		social: 780,
		email: 210,
		video: 200,
		audience: 190,
		onsite: 170
	}
};
var MEASUREMENT = {
	lumen: {
		matchRate: .81,
		consentRate: .74,
		modeledShare: .18,
		lagHours: 14,
		profiles: "412k"
	},
	harbor: {
		matchRate: .88,
		consentRate: .81,
		modeledShare: .11,
		lagHours: 6,
		profiles: "190k"
	},
	vela: {
		matchRate: .76,
		consentRate: .69,
		modeledShare: .23,
		lagHours: 20,
		profiles: "680k"
	}
};
var CAMPAIGNS = [
	{
		id: "lu-brand",
		workspaceId: "lumen",
		channel: "search",
		name: "Brand — exact & phrase",
		owner: "Priya Shah",
		team: "Performance",
		status: "live",
		share: .38,
		efficiency: 1.85
	},
	{
		id: "lu-nonbrand",
		workspaceId: "lumen",
		channel: "search",
		name: "Ingredients — nonbrand",
		owner: "Priya Shah",
		team: "Performance",
		status: "live",
		share: .37,
		efficiency: .72
	},
	{
		id: "lu-shop",
		workspaceId: "lumen",
		channel: "search",
		name: "Shopping — clinical sets",
		owner: "Priya Shah",
		team: "Performance",
		status: "learning",
		share: .25,
		efficiency: 1.1
	},
	{
		id: "lu-pros",
		workspaceId: "lumen",
		channel: "social",
		name: "Prospecting — lookalikes",
		owner: "Elena Voss",
		team: "Media",
		status: "live",
		share: .46,
		efficiency: .68
	},
	{
		id: "lu-rt",
		workspaceId: "lumen",
		channel: "social",
		name: "Retargeting — 14 day",
		owner: "Elena Voss",
		team: "Media",
		status: "live",
		share: .34,
		efficiency: 1.45
	},
	{
		id: "lu-spark",
		workspaceId: "lumen",
		channel: "social",
		name: "Spark — creator whitelist",
		owner: "Elena Voss",
		team: "Media",
		status: "learning",
		share: .2,
		efficiency: .9
	},
	{
		id: "lu-win",
		workspaceId: "lumen",
		channel: "email",
		name: "Winback — 90 day lapsed",
		owner: "Marco Lin",
		team: "Lifecycle",
		status: "live",
		share: .55,
		efficiency: 1.25
	},
	{
		id: "lu-refill",
		workspaceId: "lumen",
		channel: "email",
		name: "Refill flow — day 24",
		owner: "Marco Lin",
		team: "Lifecycle",
		status: "live",
		share: .45,
		efficiency: 1.4
	},
	{
		id: "lu-yt",
		workspaceId: "lumen",
		channel: "video",
		name: "YouTube — barrier routine",
		owner: "Elena Voss",
		team: "Media",
		status: "live",
		share: .62,
		efficiency: .9
	},
	{
		id: "lu-ctv",
		workspaceId: "lumen",
		channel: "video",
		name: "CTV — dermatologist cutdown",
		owner: "Jonah Adeyemi",
		team: "Creative",
		status: "paused",
		share: .38,
		efficiency: .7
	},
	{
		id: "lu-sup",
		workspaceId: "lumen",
		channel: "audience",
		name: "Suppress — subscribers & high LTV",
		owner: "Marco Lin",
		team: "Lifecycle",
		status: "live",
		share: 1,
		efficiency: 1
	},
	{
		id: "lu-pdp",
		workspaceId: "lumen",
		channel: "onsite",
		name: "Bundle PDP — trial + full size",
		owner: "Amira Solt",
		team: "Merchandising",
		status: "live",
		share: 1,
		efficiency: 1
	},
	{
		id: "ha-brand",
		workspaceId: "harbor",
		channel: "search",
		name: "Brand — harbor & line names",
		owner: "Chris Adelayo",
		team: "Performance",
		status: "live",
		share: .44,
		efficiency: 1.7
	},
	{
		id: "ha-non",
		workspaceId: "harbor",
		channel: "search",
		name: "Category — outdoor living",
		owner: "Chris Adelayo",
		team: "Performance",
		status: "live",
		share: .56,
		efficiency: .78
	},
	{
		id: "ha-pros",
		workspaceId: "harbor",
		channel: "social",
		name: "Prospecting — patio season",
		owner: "Maya Chen",
		team: "Media",
		status: "live",
		share: .68,
		efficiency: .74
	},
	{
		id: "ha-rt",
		workspaceId: "harbor",
		channel: "social",
		name: "Retargeting — viewers",
		owner: "Maya Chen",
		team: "Media",
		status: "live",
		share: .32,
		efficiency: 1.35
	},
	{
		id: "ha-em",
		workspaceId: "harbor",
		channel: "email",
		name: "Browse abandon — 3 touch",
		owner: "Owen Blake",
		team: "Lifecycle",
		status: "live",
		share: 1,
		efficiency: 1
	},
	{
		id: "ha-vid",
		workspaceId: "harbor",
		channel: "video",
		name: "YouTube — material stories",
		owner: "Maya Chen",
		team: "Media",
		status: "live",
		share: 1,
		efficiency: 1
	},
	{
		id: "ha-aud",
		workspaceId: "harbor",
		channel: "audience",
		name: "Past buyers — 18 month",
		owner: "Owen Blake",
		team: "Lifecycle",
		status: "live",
		share: 1,
		efficiency: 1
	},
	{
		id: "ha-col",
		workspaceId: "harbor",
		channel: "onsite",
		name: "Collection page — late summer",
		owner: "Helen Cho",
		team: "Merchandising",
		status: "live",
		share: .55,
		efficiency: 1.15
	},
	{
		id: "ha-bundle",
		workspaceId: "harbor",
		channel: "onsite",
		name: "Bundle builder — dining set",
		owner: "Helen Cho",
		team: "Merchandising",
		status: "learning",
		share: .45,
		efficiency: .85
	},
	{
		id: "ve-brand",
		workspaceId: "vela",
		channel: "search",
		name: "Brand — Vela",
		owner: "Andre Silva",
		team: "Performance",
		status: "live",
		share: .3,
		efficiency: 1.9
	},
	{
		id: "ve-shop",
		workspaceId: "vela",
		channel: "search",
		name: "Shopping — current drop",
		owner: "Andre Silva",
		team: "Performance",
		status: "live",
		share: .45,
		efficiency: 1.05
	},
	{
		id: "ve-non",
		workspaceId: "vela",
		channel: "search",
		name: "Nonbrand — run & train",
		owner: "Andre Silva",
		team: "Performance",
		status: "learning",
		share: .25,
		efficiency: .66
	},
	{
		id: "ve-pros",
		workspaceId: "vela",
		channel: "social",
		name: "Prospecting — broad",
		owner: "Nina Kapoor",
		team: "Media",
		status: "live",
		share: .55,
		efficiency: .62
	},
	{
		id: "ve-cre",
		workspaceId: "vela",
		channel: "social",
		name: "Creators — whitelisted",
		owner: "Nina Kapoor",
		team: "Media",
		status: "live",
		share: .45,
		efficiency: 1.2
	},
	{
		id: "ve-welcome",
		workspaceId: "vela",
		channel: "email",
		name: "Welcome — 5 day",
		owner: "Tess Okonkwo",
		team: "Lifecycle",
		status: "live",
		share: .5,
		efficiency: 1.15
	},
	{
		id: "ve-drop",
		workspaceId: "vela",
		channel: "email",
		name: "Drop announce — SMS + mail",
		owner: "Tess Okonkwo",
		team: "Lifecycle",
		status: "scheduled",
		share: .5,
		efficiency: 1.3
	},
	{
		id: "ve-vid",
		workspaceId: "vela",
		channel: "video",
		name: "Shorts — training cuts",
		owner: "Nina Kapoor",
		team: "Media",
		status: "live",
		share: 1,
		efficiency: 1
	},
	{
		id: "ve-aud",
		workspaceId: "vela",
		channel: "audience",
		name: "High intent — site 7 day",
		owner: "Park Min-seo",
		team: "Analytics",
		status: "live",
		share: 1,
		efficiency: 1
	},
	{
		id: "ve-drop-pdp",
		workspaceId: "vela",
		channel: "onsite",
		name: "Drop landing — Oct 2",
		owner: "Caleb Frost",
		team: "Merchandising",
		status: "scheduled",
		share: .6,
		efficiency: 1.2
	},
	{
		id: "ve-outlet",
		workspaceId: "vela",
		channel: "onsite",
		name: "Outlet rail",
		owner: "Caleb Frost",
		team: "Merchandising",
		status: "live",
		share: .4,
		efficiency: .75
	}
];
var WORK = [
	{
		id: "lu-identity",
		workspaceId: "lumen",
		pillar: "Unify",
		title: "Pass click IDs through the checkout consent banner",
		detail: "Match rate is stuck because the banner drops Meta click IDs before Shopify. Lifecycle and media are scoring different people.",
		owner: "Noah Park",
		team: "Analytics",
		due: "2026-10-03",
		status: "at_risk"
	},
	{
		id: "lu-finance",
		workspaceId: "lumen",
		pillar: "Analyze",
		title: "Walk finance off last-click before the Q4 cut",
		detail: "The Monday readout still ranks channels by platform ROAS. Refill email looks optional on that view and essential on OmniGraph.",
		owner: "Priya Shah",
		team: "Performance",
		due: "2026-09-30",
		status: "on_track"
	},
	{
		id: "lu-frames",
		workspaceId: "lumen",
		pillar: "Accelerate",
		title: "Retinol refill — three PDP frames still missing",
		detail: "Lifecycle is built. Launch slips past the 12-day guardrail if frames miss Thursday.",
		owner: "Jonah Adeyemi",
		team: "Creative",
		due: "2026-10-02",
		status: "blocked"
	},
	{
		id: "lu-bundle",
		workspaceId: "lumen",
		pillar: "Accelerate",
		title: "Trial + full-size bundle in QA",
		detail: "Merch signed the offer. On-site credit moves only after the PDP is live, so don't read this week's on-site ROAS as the offer.",
		owner: "Amira Solt",
		team: "Merchandising",
		due: "2026-09-29",
		status: "on_track"
	},
	{
		id: "lu-suppress",
		workspaceId: "lumen",
		pillar: "Align",
		title: "Keep subscribers out of prospecting social",
		detail: "Suppression list is ready. Media hasn't flipped it on for the lookalike campaign, so email and social are buying the same refill.",
		owner: "Marco Lin",
		team: "Lifecycle",
		due: "2026-10-01",
		status: "at_risk"
	},
	{
		id: "ha-video",
		workspaceId: "harbor",
		pillar: "Analyze",
		title: "Judge material stories on assisted revenue",
		detail: "YouTube opens the patio path and almost never closes it. Last-click makes the line look like waste.",
		owner: "Samir Qureshi",
		team: "Analytics",
		due: "2026-10-02",
		status: "on_track"
	},
	{
		id: "ha-creative",
		workspaceId: "harbor",
		pillar: "Accelerate",
		title: "Late summer collection edits shipped",
		detail: "New cuts are in rotation. Hold spend steady for five days before calling a winner.",
		owner: "Ruth Ibarra",
		team: "Creative",
		due: "2026-09-28",
		status: "shipped"
	},
	{
		id: "ha-bundle",
		workspaceId: "harbor",
		pillar: "Align",
		title: "Dining-set bundle price vs. ad promise",
		detail: "Prospecting says 'set under $900'. The builder still starts at $940. Creative and merch are describing different offers.",
		owner: "Helen Cho",
		team: "Merchandising",
		due: "2026-09-30",
		status: "blocked"
	},
	{
		id: "ha-consent",
		workspaceId: "harbor",
		pillar: "Unify",
		title: "Hold the identity graph — don't re-platform mid-season",
		detail: "Match rate is the healthiest of the three brands. The job is to not break it with a tag rewrite before October.",
		owner: "Samir Qureshi",
		team: "Analytics",
		due: "2026-10-08",
		status: "on_track"
	},
	{
		id: "ve-drop",
		workspaceId: "vela",
		pillar: "Accelerate",
		title: "Oct 2 drop landing is still a sketch",
		detail: "Email and SMS are scheduled. The landing they point at is not. That is a 16-day brief-to-live, past the guardrail.",
		owner: "Caleb Frost",
		team: "Merchandising",
		due: "2026-10-01",
		status: "blocked"
	},
	{
		id: "ve-broad",
		workspaceId: "vela",
		pillar: "Analyze",
		title: "Cap broad prospecting until incrementality clears 1.0",
		detail: "Platform ROAS on broad looks fine. The haircut does not. Creators are carrying the efficient half.",
		owner: "Nina Kapoor",
		team: "Media",
		due: "2026-09-29",
		status: "at_risk"
	},
	{
		id: "ve-identity",
		workspaceId: "vela",
		pillar: "Unify",
		title: "App-to-web identity is the modeled slice",
		detail: "23% of revenue is modeled because the app checkout never sees the web click. Finance should not treat that slice as unattributed waste.",
		owner: "Park Min-seo",
		team: "Analytics",
		due: "2026-10-06",
		status: "on_track"
	},
	{
		id: "ve-creative",
		workspaceId: "vela",
		pillar: "Align",
		title: "One offer language across creators, mail, and the PDP",
		detail: "Creators are saying 'first drop access'. The PDP says 'members'. Lifecycle wrote a third version. Pick one before Oct 2.",
		owner: "Jules Marin",
		team: "Creative",
		due: "2026-09-30",
		status: "at_risk"
	}
];
function workspaceById(id) {
	return WORKSPACES.find((w) => w.id === id) ?? WORKSPACES[0];
}
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
var defaults = {
	workspaceId: "lumen",
	range: "30d",
	model: "data_driven",
	navOpen: false,
	focusChannel: null,
	workStatus: {},
	notes: {},
	decisions: [],
	insightState: {}
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
	reset: () => set({ ...defaults })
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
		insightState: state.insightState
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
export { shortDate as A, cn as C, num as D, money as E, workspaceById as M, pct as O, WORKSPACES as S, longDate as T, SectionTitle as _, CHANNEL_IDS as a, TEMPLATES as b, HAIRCUT as c, MODELS as d, Meter as f, SPEND_DAILY as g, RANGE_DAYS as h, CHANNEL_COLOR as i, useUi as j, roas as k, Kpi as l, RANGES as m, CAMPAIGNS as n, CHANNEL_STRENGTH as o, PageIntro as p, CHANNELS as r, ChannelGlyph as s, AS_OF as t, MEASUREMENT as u, StatusPill as v, controlClass as w, WORK as x, Surface as y };
