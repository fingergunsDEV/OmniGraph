import { r as CHANNELS } from "./content-YC0dq67J.mjs";
import { X as require_jsx_runtime, b as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { _ as pct, a as Meter, g as num, h as money, l as Surface, n as ChannelGlyph, o as PageIntro, s as SectionTitle, u as cn, v as roas } from "./ui-x5KaUPcl.mjs";
import { l as useSnapshot, n as channelMeta } from "./use-snapshot-C6PjU5zX.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/channels-0_PwGzMJ.js
var import_jsx_runtime = require_jsx_runtime();
function ChannelsPage() {
	const snapshot = useSnapshot();
	const max = Math.max(...snapshot.channels.map((channel) => channel.revenue), 1);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "space-y-6",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageIntro, {
				eyebrow: "Channels",
				title: "Six ways demand shows up. Open one to see the graph underneath.",
				lede: "This is the portfolio. A channel drill-down has the daily credit chart, the paths it shares, and the campaigns spending inside it."
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "grid gap-3 sm:grid-cols-2 xl:grid-cols-3",
				children: snapshot.channels.map((channel) => {
					const info = channelMeta(channel.id);
					const assist = channel.present ? Math.max(channel.present - channel.closer, 0) / channel.present : 0;
					return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
						to: "/channels/$channelId",
						params: { channelId: channel.id },
						className: cn("rounded-2xl bg-surface p-4 text-left shadow-card hover:shadow-card-hover"),
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-center gap-3",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChannelGlyph, { id: channel.id }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "min-w-0",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "font-semibold text-ink",
										children: info.name
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "truncate text-sm text-muted",
										children: info.surface
									})]
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-4 text-2xl font-semibold tabular-nums text-ink",
								children: roas(channel.roas)
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
								className: "text-sm text-muted",
								children: ["model ROAS · incremental ", roas(channel.iroas)]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "mt-3",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Meter, { value: channel.revenue / max })
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
								className: "mt-2 text-sm tabular-nums text-muted",
								children: [
									money(channel.revenue),
									" credit · ",
									pct(assist),
									" assist"
								]
							})
						]
					}, channel.id);
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Surface, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SectionTitle, {
				title: "Cross-channel ledger",
				hint: "Platform claim gives every touched channel the full order. The model splits it once. Open a row to drill in."
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "w-full max-w-full overflow-x-auto",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("table", {
					className: "w-full text-left text-sm",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("thead", {
						className: "text-xs font-semibold tracking-wide text-muted uppercase",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", { children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
								className: "pb-3 font-semibold",
								children: "Channel"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
								className: "pb-3 text-right font-semibold",
								children: "Orders"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
								className: "pb-3 text-right font-semibold",
								children: "Credit"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
								className: "pb-3 text-right font-semibold",
								children: "Platform"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
								className: "pb-3 text-right font-semibold",
								children: "Spend"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
								className: "pb-3 text-right font-semibold",
								children: "iROAS"
							})
						] })
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("tbody", {
						className: "divide-y divide-line",
						children: snapshot.channels.map((channel) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", { children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
								className: "py-3",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
									to: "/channels/$channelId",
									params: { channelId: channel.id },
									className: "inline-flex items-center gap-2 font-medium",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChannelGlyph, {
										id: channel.id,
										className: "size-7"
									}), channelMeta(channel.id).name]
								})
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
								className: "py-3 text-right tabular-nums",
								children: num(channel.present)
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
								className: "py-3 text-right font-medium tabular-nums",
								children: money(channel.revenue)
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
								className: "py-3 text-right tabular-nums text-muted",
								children: money(channel.platform)
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
								className: "py-3 text-right tabular-nums text-muted",
								children: money(channel.spend)
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
								className: "py-3 text-right tabular-nums",
								children: roas(channel.iroas)
							})
						] }, channel.id))
					})]
				})
			})] }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Surface, {
				id: "measurement",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SectionTitle, {
						title: "Measurement",
						hint: `${pct(snapshot.measurement.modeledShare)} of revenue is modeled. Match ${pct(snapshot.measurement.matchRate)}, consent ${pct(snapshot.measurement.consentRate)}, lag ${snapshot.measurement.lagHours}h across ${snapshot.measurement.profiles} profiles.`
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-sm text-muted",
						children: "Connect Google Analytics, Search Console, and the ad accounts in Settings when you want this ledger tied to a property. The credit graph is already compiled."
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/settings",
						className: "mt-3 inline-flex h-11 items-center text-sm font-semibold text-teal",
						children: "Open integration settings"
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
				className: "text-xs text-faint",
				children: ["Surfaces: ", CHANNELS.map((channel) => channel.short).join(" · ")]
			})
		]
	});
}
var SplitComponent = ChannelsPage;
//#endregion
export { SplitComponent as component };
