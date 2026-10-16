import { i as __toESM } from "../_runtime.mjs";
import { a as CHANNEL_STRENGTH, c as MODELS, d as SPEND_DAILY, f as TEMPLATES, h as workspaceById, i as CHANNEL_IDS, n as CAMPAIGNS, o as HAIRCUT, p as WORK, r as CHANNELS, s as MEASUREMENT, t as AS_OF, u as RANGE_DAYS } from "./content-YC0dq67J.mjs";
import { Y as require_react } from "../_libs/@tanstack/react-router+[...].mjs";
import { b as useUi, y as shortDate } from "./ui-x5KaUPcl.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/use-snapshot-C6PjU5zX.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var cache = /* @__PURE__ */ new Map();
function mulberry32(seed) {
	let a = seed >>> 0;
	return function rand() {
		a |= 0;
		a = a + 1831565813 | 0;
		let t = Math.imul(a ^ a >>> 15, 1 | a);
		t = t + Math.imul(t ^ t >>> 7, 61 | t) ^ t;
		return ((t ^ t >>> 14) >>> 0) / 4294967296;
	};
}
function addDays(iso, days) {
	const [y, m, d] = iso.split("-").map(Number);
	const dt = new Date(Date.UTC(y, m - 1, d));
	dt.setUTCDate(dt.getUTCDate() + days);
	return dt.toISOString().slice(0, 10);
}
function eachDay(start, end) {
	const out = [];
	let cur = start;
	while (cur <= end) {
		out.push(cur);
		cur = addDays(cur, 1);
	}
	return out;
}
function weekStart(iso) {
	const [y, m, d] = iso.split("-").map(Number);
	const dt = new Date(Date.UTC(y, m - 1, d));
	const delta = (dt.getUTCDay() + 6) % 7;
	dt.setUTCDate(dt.getUTCDate() - delta);
	return dt.toISOString().slice(0, 10);
}
function emptyCredit() {
	return {
		search: 0,
		social: 0,
		email: 0,
		video: 0,
		audience: 0,
		onsite: 0
	};
}
function creditJourney(touches, value, model) {
	const out = emptyCredit();
	if (touches.length === 0 || value <= 0) return out;
	const add = (channel, amount) => {
		out[channel] += amount;
	};
	const last = touches.length - 1;
	if (model === "last_touch") {
		add(touches[last].channel, value);
		return out;
	}
	if (model === "first_touch") {
		add(touches[0].channel, value);
		return out;
	}
	if (model === "linear") {
		const slice = value / touches.length;
		for (const touch of touches) add(touch.channel, slice);
		return out;
	}
	if (model === "position") {
		if (touches.length === 1) {
			add(touches[0].channel, value);
			return out;
		}
		if (touches.length === 2) {
			add(touches[0].channel, value * .5);
			add(touches[1].channel, value * .5);
			return out;
		}
		add(touches[0].channel, value * .4);
		add(touches[last].channel, value * .4);
		const mid = touches.slice(1, last);
		const share = value * .2 / mid.length;
		for (const touch of mid) add(touch.channel, share);
		return out;
	}
	if (model === "time_decay") {
		const weights = touches.map((touch) => Math.pow(.5, touch.daysBefore / 7));
		const sum = weights.reduce((total, weight) => total + weight, 0);
		touches.forEach((touch, index) => add(touch.channel, value * weights[index] / sum));
		return out;
	}
	const weights = touches.map((touch, index) => {
		const position = touches.length === 1 ? 1 : index === 0 ? 1.28 : index === last ? 1.42 : .92;
		const decay = Math.pow(.5, touch.daysBefore / 10);
		return CHANNEL_STRENGTH[touch.channel] * position * decay;
	});
	const sum = weights.reduce((total, weight) => total + weight, 0);
	touches.forEach((touch, index) => add(touch.channel, value * weights[index] / sum));
	return out;
}
function generate(workspace) {
	const rand = mulberry32(workspace.seed);
	const weights = TEMPLATES.map((template, index) => template.weight * workspace.bias[index]);
	const journeys = [];
	for (let i = 0; i < workspace.orders; i += 1) {
		const template = pick(TEMPLATES, weights, rand);
		const daysAgo = Math.min(179, Math.floor(Math.pow(rand(), workspace.growth) * 180));
		const jitter = .78 + rand() * .44;
		journeys.push({
			id: `${workspace.id}-${i}`,
			workspaceId: workspace.id,
			convertedOn: addDays(AS_OF, -daysAgo),
			value: Math.max(24, Math.round(template.aov * workspace.aovScale * jitter)),
			newCustomer: rand() < template.newRate,
			touches: template.touches.map((touch) => ({ ...touch }))
		});
	}
	return journeys;
}
function pick(items, weights, rand) {
	let total = 0;
	for (const weight of weights) total += weight;
	let cursor = rand() * total;
	for (let i = 0; i < items.length; i += 1) {
		cursor -= weights[i];
		if (cursor <= 0) return items[i];
	}
	return items[items.length - 1];
}
var JOURNEYS = {
	lumen: generate(workspaceById("lumen")),
	harbor: generate(workspaceById("harbor")),
	vela: generate(workspaceById("vela"))
};
function spendOn(workspaceId, channel, iso) {
	const base = SPEND_DAILY[workspaceId][channel];
	const [y, m, d] = iso.split("-").map(Number);
	const dow = new Date(Date.UTC(y, m - 1, d)).getUTCDay();
	const weekend = dow === 0 || dow === 6;
	const season = channel === "search" ? weekend ? .74 : 1.08 : channel === "social" || channel === "video" ? weekend ? 1.22 : .94 : channel === "email" ? dow === 2 || dow === 4 ? 1.35 : .7 : 1;
	const daysAgo = Math.max(0, Math.round((Date.parse(`${AS_OF}T00:00:00Z`) - Date.parse(`${iso}T00:00:00Z`)) / 864e5));
	const phase = CHANNEL_IDS.indexOf(channel) * 1.3;
	const wave = 1 + .07 * Math.sin(daysAgo / 8 + phase);
	const trend = 1 + (180 - daysAgo) * 9e-4;
	return base * season * wave * trend;
}
function ratio(part, whole) {
	if (!Number.isFinite(part) || !Number.isFinite(whole) || whole === 0) return null;
	return (part - whole) / Math.abs(whole);
}
function safeDiv(part, whole) {
	if (!whole) return 0;
	return part / whole;
}
function windowBounds(range, end) {
	return {
		start: addDays(end, -(RANGE_DAYS[range] - 1)),
		end
	};
}
function getSnapshot(workspaceId, range, model) {
	const workspace = workspaceById(workspaceId);
	const key = `${workspace.id}|${range}|${model}`;
	const hit = cache.get(key);
	if (hit) return hit;
	const snap = compute(workspace, range, model);
	cache.set(key, snap);
	return snap;
}
function compute(workspace, range, model) {
	const { start, end } = windowBounds(range, AS_OF);
	const prior = windowBounds(range, addDays(start, -1));
	const current = aggregate(workspace, start, end, model, true);
	const previous = aggregate(workspace, prior.start, prior.end, model, false);
	const kpis = {
		revenue: current.revenue,
		platform: current.platform,
		incremental: current.incremental,
		spend: current.spend,
		orders: current.orders,
		newCustomers: current.newCustomers,
		aov: safeDiv(current.revenue, current.orders),
		roas: current.roas,
		iroas: current.iroas,
		platformRoas: safeDiv(current.platform, current.spend),
		cac: current.cac,
		assistRate: safeDiv(current.assistOrders, current.orders),
		avgTouches: safeDiv(current.touches, current.orders),
		revenueDelta: ratio(current.revenue, previous.revenue),
		roasDelta: ratio(current.roas, previous.roas),
		cacDelta: ratio(current.cac, previous.cac),
		ordersDelta: ratio(current.orders, previous.orders),
		incrementalDelta: ratio(current.incremental, previous.incremental)
	};
	const scale = RANGE_DAYS[range] / 30;
	return {
		workspace,
		range,
		model,
		start,
		end,
		kpis,
		channels: current.channels,
		series: current.series,
		paths: current.paths,
		campaigns: current.campaigns,
		journeys: current.journeys,
		measurement: MEASUREMENT[workspace.id],
		revenueTarget: workspace.monthTarget * scale,
		cacGuardrail: workspace.cacGuardrail
	};
}
function aggregate(workspace, start, end, model, heavy) {
	const credit = emptyCredit();
	const lastTouch = emptyCredit();
	const firstTouch = emptyCredit();
	const platform = emptyCredit();
	const present = emptyCredit();
	const opener = emptyCredit();
	const closer = emptyCredit();
	const spend = emptyCredit();
	let revenue = 0;
	let orders = 0;
	let newCustomers = 0;
	let assistOrders = 0;
	let touchCount = 0;
	const journeys = [];
	const pathMap = /* @__PURE__ */ new Map();
	const bucket = rangeIsWeekly(start, end) ? weekStart : (iso) => iso;
	const seriesMap = /* @__PURE__ */ new Map();
	if (heavy) for (const day of eachDay(start, end)) {
		const key = bucket(day);
		let point = seriesMap.get(key);
		if (!point) {
			point = {
				date: key,
				label: shortDate(key),
				spend: 0,
				search: 0,
				social: 0,
				email: 0,
				video: 0,
				audience: 0,
				onsite: 0
			};
			seriesMap.set(key, point);
		}
		for (const channel of CHANNEL_IDS) {
			const daySpend = spendOn(workspace.id, channel, day);
			spend[channel] += daySpend;
			point.spend += daySpend;
		}
	}
	else for (const day of eachDay(start, end)) for (const channel of CHANNEL_IDS) spend[channel] += spendOn(workspace.id, channel, day);
	for (const journey of JOURNEYS[workspace.id]) {
		if (journey.convertedOn < start || journey.convertedOn > end) continue;
		orders += 1;
		revenue += journey.value;
		if (journey.newCustomer) newCustomers += 1;
		touchCount += journey.touches.length;
		if (new Set(journey.touches.map((touch) => touch.channel)).size > 1 || journey.touches.length > 1) assistOrders += 1;
		const modeled = creditJourney(journey.touches, journey.value, model);
		const last = creditJourney(journey.touches, journey.value, "last_touch");
		const first = creditJourney(journey.touches, journey.value, "first_touch");
		for (const channel of CHANNEL_IDS) {
			credit[channel] += modeled[channel];
			lastTouch[channel] += last[channel];
			firstTouch[channel] += first[channel];
		}
		const seen = /* @__PURE__ */ new Set();
		for (const touch of journey.touches) {
			if (seen.has(touch.channel)) continue;
			seen.add(touch.channel);
			platform[touch.channel] += journey.value;
			present[touch.channel] += 1;
		}
		opener[journey.touches[0].channel] += 1;
		closer[journey.touches[journey.touches.length - 1].channel] += 1;
		if (!heavy) continue;
		const point = seriesMap.get(bucket(journey.convertedOn));
		if (point) for (const channel of CHANNEL_IDS) point[channel] += modeled[channel];
		const steps = dedupedSteps(journey.touches);
		const key = steps.join(">");
		const existing = pathMap.get(key);
		if (existing) {
			existing.orders += 1;
			existing.revenue += journey.value;
		} else pathMap.set(key, {
			key,
			steps,
			orders: 1,
			revenue: journey.value
		});
		journeys.push({
			id: journey.id,
			convertedOn: journey.convertedOn,
			value: journey.value,
			newCustomer: journey.newCustomer,
			touches: journey.touches
		});
	}
	const incremental = emptyCredit();
	for (const channel of CHANNEL_IDS) incremental[channel] = credit[channel] * HAIRCUT[channel];
	const spendTotal = CHANNEL_IDS.reduce((total, channel) => total + spend[channel], 0);
	const incrementalTotal = CHANNEL_IDS.reduce((total, channel) => total + incremental[channel], 0);
	const platformTotal = CHANNEL_IDS.reduce((total, channel) => total + platform[channel], 0);
	const channels = CHANNELS.map((channel) => ({
		id: channel.id,
		revenue: credit[channel.id],
		lastTouch: lastTouch[channel.id],
		firstTouch: firstTouch[channel.id],
		platform: platform[channel.id],
		incremental: incremental[channel.id],
		spend: spend[channel.id],
		roas: safeDiv(credit[channel.id], spend[channel.id]),
		iroas: safeDiv(incremental[channel.id], spend[channel.id]),
		platformRoas: safeDiv(platform[channel.id], spend[channel.id]),
		present: present[channel.id],
		opener: opener[channel.id],
		closer: closer[channel.id]
	}));
	const campaigns = heavy ? campaignStats(workspace.id, channels) : [];
	journeys.sort((a, b) => b.value - a.value || b.convertedOn.localeCompare(a.convertedOn));
	return {
		revenue,
		platform: platformTotal,
		incremental: incrementalTotal,
		spend: spendTotal,
		orders,
		newCustomers,
		assistOrders,
		touches: touchCount,
		roas: safeDiv(revenue, spendTotal),
		iroas: safeDiv(incrementalTotal, spendTotal),
		cac: safeDiv(spendTotal, newCustomers),
		channels,
		series: [...seriesMap.values()].sort((a, b) => a.date.localeCompare(b.date)),
		paths: [...pathMap.values()].sort((a, b) => b.revenue - a.revenue).slice(0, 8),
		campaigns,
		journeys
	};
}
function rangeIsWeekly(start, end) {
	const [ys, ms, ds] = start.split("-").map(Number);
	const [ye, me, de] = end.split("-").map(Number);
	return (Date.UTC(ye, me - 1, de) - Date.UTC(ys, ms - 1, ds)) / 864e5 > 45;
}
function dedupedSteps(touches) {
	const steps = [];
	for (const touch of touches) if (steps[steps.length - 1] !== touch.channel) steps.push(touch.channel);
	return steps;
}
function campaignStats(workspaceId, channels) {
	const byChannel = new Map(channels.map((channel) => [channel.id, channel]));
	const grouped = /* @__PURE__ */ new Map();
	for (const campaign of CAMPAIGNS) {
		if (campaign.workspaceId !== workspaceId) continue;
		const list = grouped.get(campaign.channel) ?? [];
		list.push(campaign);
		grouped.set(campaign.channel, list);
	}
	const stats = [];
	for (const [channelId, list] of grouped) {
		const channel = byChannel.get(channelId);
		if (!channel) continue;
		const shareSum = list.reduce((total, campaign) => total + campaign.share, 0) || 1;
		const weightSum = list.reduce((total, campaign) => total + campaign.share / shareSum * campaign.efficiency, 0) || 1;
		for (const campaign of list) {
			const spendShare = campaign.share / shareSum;
			const revenueShare = spendShare * campaign.efficiency / weightSum;
			const campSpend = channel.spend * spendShare;
			const campRevenue = channel.revenue * revenueShare;
			const campIncremental = channel.incremental * revenueShare;
			stats.push({
				...campaign,
				spend: campSpend,
				revenue: campRevenue,
				incremental: campIncremental,
				roas: safeDiv(campRevenue, campSpend),
				iroas: safeDiv(campIncremental, campSpend)
			});
		}
	}
	return stats.sort((a, b) => b.spend - a.spend);
}
function channelMeta(id) {
	return CHANNELS.find((channel) => channel.id === id) ?? CHANNELS[0];
}
function modelMeta(id) {
	return MODELS.find((model) => model.id === id) ?? MODELS[0];
}
function workFor(workspaceId) {
	const workspace = workspaceById(workspaceId);
	return WORK.filter((item) => item.workspaceId === workspace.id);
}
function alignmentScore(items) {
	if (items.length === 0) return 0;
	const weight = {
		on_track: 1,
		shipped: 1,
		at_risk: .45,
		blocked: 0
	};
	return items.reduce((sum, item) => sum + weight[item.status], 0) / items.length;
}
function buildInsights(snapshot, items) {
	const { kpis, channels, workspace, measurement } = snapshot;
	const model = modelMeta(snapshot.model);
	const insights = [];
	const gap = kpis.platform - kpis.revenue;
	if (kpis.revenue > 0 && gap / kpis.platform > .08) insights.push({
		id: `${workspace.id}:double-count`,
		pillar: "Unify",
		tone: "risk",
		title: `${formatGap(gap)} is claimed by more than one platform for the same orders`,
		evidence: `Platform pixels sum to ${compact(kpis.platform)} against ${compact(kpis.revenue)} of order revenue. The average journey has ${kpis.avgTouches.toFixed(1)} touches, so a last-click argument and a platform argument are not the same number.`,
		action: `Take ${model.name} into the finance readout. Order revenue does not change when you switch models — only who is allowed to keep the credit.`
	});
	const ranked = [...channels].filter((channel) => channel.spend > kpis.spend * .07).sort((a, b) => a.iroas - b.iroas);
	const worst = ranked[0];
	const best = ranked[ranked.length - 1];
	if (worst && best && best.iroas - worst.iroas > .8 && worst.iroas < 1.3) {
		const move = worst.spend * .1;
		const lift = move * (best.iroas - worst.iroas);
		insights.push({
			id: `${workspace.id}:shift`,
			pillar: "Analyze",
			tone: "warn",
			title: `Move 10% of ${channelMeta(worst.id).short} into ${channelMeta(best.id).short}`,
			evidence: `${channelMeta(worst.id).name} incremental ROAS is ${worst.iroas.toFixed(2)}× on ${model.name}. ${channelMeta(best.id).name} is ${best.iroas.toFixed(2)}×. Platform ROAS on ${channelMeta(worst.id).short} still reads ${worst.platformRoas.toFixed(2)}×, which is why the spend is still there.`,
			action: `Shift about ${compact(move)} for the next two weeks. Expected incremental lift is roughly ${compact(lift)}, if the haircuts hold.`
		});
	}
	let under = null;
	let underGap = 0;
	for (const channel of channels) {
		const delta = channel.revenue - channel.lastTouch;
		if (delta > underGap) {
			under = channel;
			underGap = delta;
		}
	}
	if (under && underGap > kpis.revenue * .04) insights.push({
		id: `${workspace.id}:assist:${under.id}`,
		pillar: "Align",
		tone: "warn",
		title: `${channelMeta(under.id).name} disappears if the room stays on last touch`,
		evidence: `Last touch gives it ${compact(under.lastTouch)}. ${model.name} gives it ${compact(under.revenue)}. It opens ${pctOf(under.opener, under.present)} of the journeys it touches and closes ${pctOf(under.closer, under.present)}.`,
		action: `Do not cut ${channelMeta(under.id).short} on a last-click slide. Put the opener/closer split in the same deck as the ROAS table.`
	});
	const blocked = items.filter((item) => item.status === "blocked");
	if (blocked.length > 0) {
		const first = blocked[0];
		insights.push({
			id: `${workspace.id}:blocked`,
			pillar: "Accelerate",
			tone: "risk",
			title: blocked.length === 1 ? first.title : `${blocked.length} launches are blocked`,
			evidence: blocked.map((item) => `${item.owner} · due ${shortDate(item.due)}`).join("  ·  "),
			action: first.detail
		});
	}
	if (kpis.cac > snapshot.cacGuardrail) insights.push({
		id: `${workspace.id}:cac`,
		pillar: "Analyze",
		tone: "warn",
		title: `Blended CAC is ${compact(kpis.cac)} against a ${compact(snapshot.cacGuardrail)} guardrail`,
		evidence: `${numPlain(kpis.newCustomers)} new customers on ${compact(kpis.spend)} of spend. Returning revenue is healthy; acquisition is the part that misses the guardrail.`,
		action: "Hold prospecting flat and let lifecycle and brand search absorb the next dollar until CAC is back under the line."
	});
	if (measurement.modeledShare >= .15) insights.push({
		id: `${workspace.id}:modeled`,
		pillar: "Unify",
		tone: "good",
		title: `${Math.round(measurement.modeledShare * 100)}% of revenue is modeled, not missing`,
		evidence: `Identity match is ${Math.round(measurement.matchRate * 100)}% and consent is ${Math.round(measurement.consentRate * 100)}%. The graph covers ${measurement.profiles} profiles, with a ${measurement.lagHours}h lag.`,
		action: "Label that slice as modeled in the finance pack so it is not treated as unattributed waste."
	});
	const order = {
		risk: 0,
		warn: 1,
		good: 2
	};
	return insights.sort((a, b) => order[a.tone] - order[b.tone]);
}
function formatGap(n) {
	return compact(n);
}
function compact(n) {
	const abs = Math.abs(n);
	const sign = n < 0 ? "-" : "";
	if (abs >= 1e6) return `${sign}$${(abs / 1e6).toFixed(2)}M`;
	if (abs >= 1e4) return `${sign}$${(abs / 1e3).toFixed(1)}k`;
	return `${sign}$${Math.round(abs).toLocaleString("en-US")}`;
}
function numPlain(n) {
	return Math.round(n).toLocaleString("en-US");
}
function pctOf(part, whole) {
	if (!whole) return "0%";
	return `${Math.round(part / whole * 100)}%`;
}
function journeyCredits(journey, model) {
	return creditJourney(journey.touches, journey.value, model);
}
function useSnapshot() {
	const workspaceId = useUi((state) => state.workspaceId);
	const range = useUi((state) => state.range);
	const model = useUi((state) => state.model);
	return (0, import_react.useMemo)(() => getSnapshot(workspaceId, range, model), [
		workspaceId,
		range,
		model
	]);
}
function useWork() {
	const workspaceId = useUi((state) => state.workspaceId);
	const overrides = useUi((state) => state.workStatus);
	return (0, import_react.useMemo)(() => {
		const items = workFor(workspaceId).map((item) => ({
			...item,
			status: overrides[item.id] ?? item.status
		}));
		return {
			items,
			score: alignmentScore(items)
		};
	}, [workspaceId, overrides]);
}
function useReducedMotion() {
	const [reduced, setReduced] = (0, import_react.useState)(false);
	(0, import_react.useEffect)(() => {
		const media = window.matchMedia("(prefers-reduced-motion: reduce)");
		const apply = () => setReduced(media.matches);
		apply();
		media.addEventListener("change", apply);
		return () => media.removeEventListener("change", apply);
	}, []);
	return reduced;
}
function useMounted() {
	const [mounted, setMounted] = (0, import_react.useState)(false);
	(0, import_react.useEffect)(() => setMounted(true), []);
	return mounted;
}
//#endregion
export { modelMeta as a, useReducedMotion as c, journeyCredits as i, useSnapshot as l, channelMeta as n, spendOn as o, getSnapshot as r, useMounted as s, buildInsights as t, useWork as u };
