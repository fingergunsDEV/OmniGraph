import { i as __toESM } from "../_runtime.mjs";
import { J as require_jsx_runtime, q as require_react } from "../_libs/@tanstack/react-router+[...].mjs";
import { C as cn, j as useUi, p as PageIntro, y as Surface } from "./ui-DLhUn6uC.mjs";
import { c as useSnapshot, l as useWork, t as buildInsights } from "./use-snapshot-4U2ncHzN.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/insights-DbbNj2aP.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function InsightsPage() {
	const snapshot = useSnapshot();
	const { items } = useWork();
	const insightState = useUi((state) => state.insightState);
	const setInsight = useUi((state) => state.setInsight);
	const [showSnoozed, setShowSnoozed] = (0, import_react.useState)(false);
	const insights = buildInsights(snapshot, items);
	const open = insights.filter((insight) => !insightState[insight.id]);
	const accepted = insights.filter((insight) => insightState[insight.id] === "accepted");
	const snoozed = insights.filter((insight) => insightState[insight.id] === "snoozed");
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "space-y-6",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageIntro, {
				eyebrow: "Insights",
				title: "Recommendations with the number attached.",
				lede: "Accept one and it lands on the alignment board. Snooze it if the room is not ready. They recompute when you change brand, window, or model."
			}),
			open.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Surface, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "font-medium text-ink",
				children: "Nothing open."
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-1 text-sm text-muted",
				children: "Everything in this window is accepted or snoozed. Change the model if you want a different argument."
			})] }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
				className: "space-y-3",
				children: open.map((insight) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Surface, { children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex flex-wrap items-center gap-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "text-xs font-semibold tracking-widest text-teal uppercase",
							children: insight.pillar
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Tone, { tone: insight.tone })]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "mt-2 text-lg font-semibold text-ink",
						children: insight.title
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-2 text-sm text-muted",
						children: insight.evidence
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-3 text-sm font-medium text-ink",
						children: insight.action
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mt-4 flex flex-wrap gap-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							type: "button",
							onClick: () => setInsight(insight.id, "accepted"),
							className: "h-11 rounded-xl bg-teal px-4 text-sm font-semibold text-on-teal",
							children: "Accept"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							type: "button",
							onClick: () => setInsight(insight.id, "snoozed"),
							className: "h-11 rounded-xl bg-canvas px-4 text-sm font-semibold text-ink",
							children: "Snooze"
						})]
					})
				] }) }, insight.id))
			}),
			accepted.length > 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
				className: "mb-3 text-base font-semibold text-ink",
				children: "Committed"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
				className: "space-y-3",
				children: accepted.map((insight) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Surface, { children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "font-medium text-ink",
						children: insight.title
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-1 text-sm text-muted",
						children: insight.action
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						onClick: () => setInsight(insight.id, "open"),
						className: "mt-3 h-11 text-sm font-semibold text-teal",
						children: "Reopen"
					})
				] }) }, insight.id))
			})] }) : null,
			snoozed.length > 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
				type: "button",
				onClick: () => setShowSnoozed((value) => !value),
				className: "h-11 text-sm font-semibold text-ink",
				"aria-expanded": showSnoozed,
				children: [
					showSnoozed ? "Hide" : "Show",
					" snoozed (",
					snoozed.length,
					")"
				]
			}), showSnoozed ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
				className: "mt-3 space-y-3",
				children: snoozed.map((insight) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Surface, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "font-medium text-ink",
					children: insight.title
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					type: "button",
					onClick: () => setInsight(insight.id, "open"),
					className: "mt-3 h-11 text-sm font-semibold text-teal",
					children: "Restore"
				})] }) }, insight.id))
			}) : null] }) : null
		]
	});
}
function Tone({ tone }) {
	const label = tone === "risk" ? "Act now" : tone === "warn" ? "Watch" : "Keep";
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
		className: cn("inline-flex h-7 items-center rounded-full px-2.5 text-xs font-semibold", tone === "risk" && "bg-risk-bg text-risk", tone === "warn" && "bg-warn-bg text-warn", tone === "good" && "bg-good-bg text-teal"),
		children: label
	});
}
var SplitComponent = InsightsPage;
//#endregion
export { SplitComponent as component };
