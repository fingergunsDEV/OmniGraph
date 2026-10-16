import { r as CHANNELS } from "./content-YC0dq67J.mjs";
import { X as require_jsx_runtime } from "../_libs/@tanstack/react-router+[...].mjs";
import { g as num, h as money, t as CHANNEL_COLOR } from "./ui-x5KaUPcl.mjs";
import { c as useReducedMotion, n as channelMeta, s as useMounted } from "./use-snapshot-C6PjU5zX.mjs";
import { a as Area, c as Bar, i as XAxis, l as ResponsiveContainer, n as BarChart, o as Line, r as YAxis, s as CartesianGrid, t as ComposedChart, u as Tooltip } from "../_libs/recharts+[...].mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/charts-Bw0JFtUc.js
var import_jsx_runtime = require_jsx_runtime();
function RevenueChart({ series, hidden }) {
	const mounted = useMounted();
	const reduced = useReducedMotion();
	if (!mounted) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "h-72 rounded-xl bg-canvas" });
	const visible = CHANNELS.filter((channel) => !hidden[channel.id]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "h-72 w-full",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ResponsiveContainer, {
			width: "100%",
			height: "100%",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(ComposedChart, {
				data: series,
				margin: {
					top: 8,
					right: 8,
					left: 0,
					bottom: 0
				},
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CartesianGrid, {
						stroke: "var(--color-line)",
						vertical: false
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(XAxis, {
						dataKey: "label",
						tick: {
							fill: "var(--color-faint)",
							fontSize: 12
						},
						tickLine: false,
						axisLine: false,
						interval: series.length > 12 ? Math.ceil(series.length / 6) : 0
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(YAxis, {
						tick: {
							fill: "var(--color-faint)",
							fontSize: 12
						},
						tickLine: false,
						axisLine: false,
						width: 48,
						tickFormatter: (value) => value >= 1e3 ? `$${Math.round(value / 1e3)}k` : `$${Math.round(value)}`
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Tooltip, { content: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChartTip, {}) }),
					visible.map((channel) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Area, {
						type: "monotone",
						dataKey: channel.id,
						name: channel.short,
						stackId: "credit",
						stroke: CHANNEL_COLOR[channel.id],
						fill: CHANNEL_COLOR[channel.id],
						fillOpacity: .88,
						isAnimationActive: !reduced
					}, channel.id)),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Line, {
						type: "monotone",
						dataKey: "spend",
						name: "Spend",
						stroke: "var(--color-navy)",
						strokeWidth: 2,
						dot: false,
						isAnimationActive: !reduced
					})
				]
			})
		})
	});
}
function ChartTip({ active, payload, label }) {
	if (!active || !payload?.length) return null;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "rounded-xl bg-surface px-3 py-2 shadow-card",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "text-xs font-medium text-muted",
			children: label
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
			className: "mt-1 space-y-0.5",
			children: payload.map((entry) => {
				const key = String(entry.dataKey ?? "");
				const name = key === "spend" ? "Spend" : channelMeta(key).short;
				return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
					className: "flex items-center justify-between gap-4 text-sm tabular-nums text-ink",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: name }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: money(Number(entry.value ?? 0)) })]
				}, key);
			})
		})]
	});
}
function ChannelTrend({ series, color }) {
	const mounted = useMounted();
	const reduced = useReducedMotion();
	if (!mounted) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "h-72 rounded-xl bg-canvas" });
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "h-72 w-full min-w-0",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ResponsiveContainer, {
			width: "100%",
			height: "100%",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(ComposedChart, {
				data: series,
				margin: {
					top: 8,
					right: 8,
					left: 0,
					bottom: 0
				},
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CartesianGrid, {
						stroke: "var(--color-line)",
						vertical: false
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(XAxis, {
						dataKey: "label",
						tick: {
							fill: "var(--color-faint)",
							fontSize: 12
						},
						tickLine: false,
						axisLine: false,
						interval: series.length > 12 ? Math.ceil(series.length / 6) : 0
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(YAxis, {
						tick: {
							fill: "var(--color-faint)",
							fontSize: 12
						},
						tickLine: false,
						axisLine: false,
						width: 48,
						tickFormatter: (value) => value >= 1e3 ? `$${Math.round(value / 1e3)}k` : `$${Math.round(value)}`
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Tooltip, { content: ({ active, payload, label }) => {
						if (!active || !payload?.length) return null;
						const names = {
							credit: "Model credit",
							spend: "Spend",
							platform: "Platform claim"
						};
						return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "rounded-xl bg-surface px-3 py-2 shadow-card",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-xs font-medium text-muted",
								children: label
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
								className: "mt-1 space-y-0.5",
								children: payload.map((entry) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
									className: "flex justify-between gap-4 text-sm tabular-nums text-ink",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: names[String(entry.dataKey)] ?? String(entry.name) }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: money(Number(entry.value ?? 0)) })]
								}, String(entry.dataKey)))
							})]
						});
					} }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Area, {
						type: "monotone",
						dataKey: "platform",
						name: "Platform claim",
						stroke: "var(--color-faint)",
						fill: "var(--color-line)",
						fillOpacity: 1,
						isAnimationActive: !reduced
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Area, {
						type: "monotone",
						dataKey: "credit",
						name: "Model credit",
						stroke: color,
						fill: color,
						fillOpacity: .85,
						isAnimationActive: !reduced
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Line, {
						type: "monotone",
						dataKey: "spend",
						name: "Spend",
						stroke: "var(--color-navy)",
						strokeWidth: 2,
						dot: false,
						isAnimationActive: !reduced
					})
				]
			})
		})
	});
}
function RoleChart({ rows, color }) {
	const mounted = useMounted();
	const reduced = useReducedMotion();
	if (!mounted) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "h-56 rounded-xl bg-canvas" });
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "h-56 w-full min-w-0",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ResponsiveContainer, {
			width: "100%",
			height: "100%",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(BarChart, {
				data: rows,
				margin: {
					top: 8,
					right: 8,
					left: 0,
					bottom: 0
				},
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CartesianGrid, {
						stroke: "var(--color-line)",
						vertical: false
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(XAxis, {
						dataKey: "label",
						tick: {
							fill: "var(--color-faint)",
							fontSize: 12
						},
						tickLine: false,
						axisLine: false
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(YAxis, {
						tick: {
							fill: "var(--color-faint)",
							fontSize: 12
						},
						tickLine: false,
						axisLine: false,
						width: 36,
						allowDecimals: false
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Tooltip, { content: ({ active, payload, label }) => {
						if (!active || !payload?.length) return null;
						return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "rounded-xl bg-surface px-3 py-2 shadow-card",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-xs font-medium text-muted",
								children: label
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
								className: "text-sm font-medium tabular-nums text-ink",
								children: [num(Number(payload[0]?.value ?? 0)), " orders"]
							})]
						});
					} }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Bar, {
						dataKey: "orders",
						fill: color,
						radius: [
							8,
							8,
							0,
							0
						],
						isAnimationActive: !reduced
					})
				]
			})
		})
	});
}
//#endregion
export { RevenueChart as n, RoleChart as r, ChannelTrend as t };
