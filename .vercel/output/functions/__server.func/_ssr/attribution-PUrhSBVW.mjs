import { J as require_jsx_runtime } from "../_libs/@tanstack/react-router+[...].mjs";
import { C as cn, E as money, O as pct, _ as SectionTitle, d as MODELS, j as useUi, k as roas, p as PageIntro, s as ChannelGlyph, y as Surface } from "./ui-DLhUn6uC.mjs";
import { a as modelMeta, c as useSnapshot, n as channelMeta, r as getSnapshot } from "./use-snapshot-4U2ncHzN.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/attribution-PUrhSBVW.js
var import_jsx_runtime = require_jsx_runtime();
function AttributionPage() {
	const snapshot = useSnapshot();
	const setModel = useUi((state) => state.setModel);
	const model = modelMeta(snapshot.model);
	const compared = MODELS.map((item) => ({
		meta: item,
		snap: item.id === snapshot.model ? snapshot : getSnapshot(snapshot.workspace.id, snapshot.range, item.id)
	}));
	const max = Math.max(...snapshot.channels.map((channel) => channel.revenue), 1);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "space-y-6",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageIntro, {
				eyebrow: "Attribution",
				title: "The order total does not move. The credit does.",
				lede: model.blurb
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "grid gap-3 md:grid-cols-2 xl:grid-cols-3",
				children: MODELS.map((item) => {
					const active = item.id === snapshot.model;
					return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
						type: "button",
						"aria-pressed": active,
						onClick: () => setModel(item.id),
						className: cn("rounded-2xl p-4 text-left shadow-card", active ? "bg-good-bg ring-2 ring-teal" : "bg-surface"),
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "font-semibold text-ink",
							children: item.name
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-1 text-sm text-muted",
							children: item.blurb
						})]
					}, item.id);
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Surface, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SectionTitle, {
				title: `${model.name} credit`,
				hint: "Each bar is that channel's share of order revenue."
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
				className: "space-y-3",
				children: snapshot.channels.map((channel) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
					className: "flex items-center gap-3",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
							className: "inline-flex w-28 shrink-0 items-center gap-2 text-sm font-medium text-ink",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChannelGlyph, {
								id: channel.id,
								className: "size-7"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "truncate",
								children: channelMeta(channel.id).short
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "h-3 min-w-0 flex-1 overflow-hidden rounded-full bg-canvas",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "block h-full rounded-full",
								style: {
									width: `${Math.max(2, channel.revenue / max * 100)}%`,
									background: `var(--color-ch-${channel.id})`
								}
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "w-16 shrink-0 text-right text-sm font-medium tabular-nums text-ink",
							children: money(channel.revenue)
						})
					]
				}, channel.id))
			})] }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Surface, { children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SectionTitle, {
					title: "Same orders, six answers",
					hint: "Highlighted column is the model selected above. Totals match order revenue. Platform claims do not."
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "w-full max-w-full overflow-x-auto",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("table", {
						className: "w-full text-left text-sm",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("thead", {
							className: "text-xs font-semibold tracking-wide text-muted uppercase",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
								className: "pb-3 font-semibold",
								children: "Channel"
							}), compared.map((column) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
								className: cn("pb-3 text-right font-semibold", column.meta.id === snapshot.model && "text-teal"),
								children: column.meta.name
							}, column.meta.id))] })
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tbody", {
							className: "divide-y divide-line",
							children: [snapshot.channels.map((channel, index) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
								className: "py-3 font-medium",
								children: channelMeta(channel.id).name
							}), compared.map((column) => {
								const value = column.snap.channels[index]?.revenue ?? 0;
								return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
									className: cn("py-3 text-right tabular-nums", column.meta.id === snapshot.model ? "font-semibold text-ink" : "text-muted"),
									children: money(value)
								}, column.meta.id);
							})] }, channel.id)), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
								className: "py-3 font-semibold",
								children: "Order revenue"
							}), compared.map((column) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
								className: "py-3 text-right font-semibold tabular-nums",
								children: money(column.snap.kpis.revenue)
							}, column.meta.id))] })]
						})]
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "mt-4 text-sm text-muted",
					children: [
						"Versus last touch, ",
						shiftSentence(snapshot.model, compared),
						"."
					]
				})
			] }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Surface, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SectionTitle, {
				title: "Paths that carry the revenue",
				hint: "Consecutive repeats are collapsed. Revenue is the order, not a single touch."
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
				className: "space-y-3",
				children: snapshot.paths.map((path) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
					className: "flex flex-wrap items-center justify-between gap-3 rounded-xl bg-canvas px-3 py-3",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "flex flex-wrap items-center gap-1 text-sm font-medium text-ink",
						children: path.steps.map((step, index) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
							className: "inline-flex items-center gap-1",
							children: [index > 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-faint",
								children: "→"
							}) : null, channelMeta(step).short]
						}, `${path.key}-${index}`))
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "text-sm tabular-nums text-muted",
						children: [
							money(path.revenue),
							" · ",
							pct(path.revenue / snapshot.kpis.revenue),
							" · ",
							path.orders,
							" orders"
						]
					})]
				}, path.key))
			})] })
		]
	});
}
function shiftSentence(model, compared) {
	if (model === "last_touch") return "this is the last-touch baseline the other columns move away from";
	const current = compared.find((column) => column.meta.id === model);
	const last = compared.find((column) => column.meta.id === "last_touch");
	if (!current || !last) return "switch models to see who gains";
	let winner = current.snap.channels[0];
	let gap = -Infinity;
	for (let i = 0; i < current.snap.channels.length; i += 1) {
		const delta = current.snap.channels[i].revenue - last.snap.channels[i].revenue;
		if (delta > gap) {
			gap = delta;
			winner = current.snap.channels[i];
		}
	}
	if (!winner || gap <= 0) return "no channel gains against last touch in this window";
	return `${channelMeta(winner.id).name} gains ${money(gap)} against last touch (${roas(winner.roas)} model ROAS)`;
}
var SplitComponent = AttributionPage;
//#endregion
export { SplitComponent as component };
