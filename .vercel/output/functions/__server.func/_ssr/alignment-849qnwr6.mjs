import { i as __toESM } from "../_runtime.mjs";
import { J as require_jsx_runtime, q as require_react } from "../_libs/@tanstack/react-router+[...].mjs";
import { A as shortDate, E as money, _ as SectionTitle, f as Meter, j as useUi, p as PageIntro, v as StatusPill, w as controlClass, y as Surface } from "./ui-DLhUn6uC.mjs";
import { c as useSnapshot, l as useWork, t as buildInsights } from "./use-snapshot-4U2ncHzN.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/alignment-849qnwr6.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var PILLARS = [
	"Unify",
	"Analyze",
	"Align",
	"Accelerate"
];
var STATUS_OPTIONS = [
	{
		id: "on_track",
		label: "On track"
	},
	{
		id: "at_risk",
		label: "At risk"
	},
	{
		id: "blocked",
		label: "Blocked"
	},
	{
		id: "shipped",
		label: "Shipped"
	}
];
function AlignmentPage() {
	const snapshot = useSnapshot();
	const { items, score } = useWork();
	const setWorkStatus = useUi((state) => state.setWorkStatus);
	const decisions = useUi((state) => state.decisions);
	const addDecision = useUi((state) => state.addDecision);
	const insightState = useUi((state) => state.insightState);
	const [title, setTitle] = (0, import_react.useState)("");
	const [detail, setDetail] = (0, import_react.useState)("");
	const mine = decisions.filter((decision) => decision.workspaceId === snapshot.workspace.id);
	const committed = buildInsights(snapshot, items).filter((insight) => insightState[insight.id] === "accepted");
	const pace = snapshot.revenueTarget > 0 ? snapshot.kpis.revenue / snapshot.revenueTarget : 0;
	const cacTone = snapshot.kpis.cac <= snapshot.cacGuardrail ? "teal" : "risk";
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "space-y-6",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageIntro, {
				eyebrow: "Alignment",
				title: `${snapshot.workspace.name} is ${Math.round(score * 100)} aligned.`,
				lede: "Shared goals, the work under them, and a decision log so media, finance, and creative stop re-litigating the same call."
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid gap-3 lg:grid-cols-3",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Surface, { children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-xs font-semibold tracking-wide text-muted uppercase",
							children: "Revenue pace"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "mt-2 text-xl font-semibold tabular-nums",
							children: [money(snapshot.kpis.revenue), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
								className: "text-sm font-medium text-muted",
								children: [" / ", money(snapshot.revenueTarget)]
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "mt-3",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Meter, {
								value: Math.min(pace, 1),
								tone: pace >= 1 ? "teal" : "warn"
							})
						})
					] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Surface, { children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-xs font-semibold tracking-wide text-muted uppercase",
							children: "CAC vs guardrail"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "mt-2 text-xl font-semibold tabular-nums",
							children: [money(snapshot.kpis.cac), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
								className: "text-sm font-medium text-muted",
								children: [" / ", money(snapshot.cacGuardrail)]
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "mt-3",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Meter, {
								value: Math.min(snapshot.kpis.cac / (snapshot.cacGuardrail * 1.4), 1),
								tone: cacTone
							})
						})
					] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Surface, { children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-xs font-semibold tracking-wide text-muted uppercase",
							children: "Brief to live"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "mt-2 text-xl font-semibold tabular-nums",
							children: [
								snapshot.workspace.velocityDays,
								"d",
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
									className: "text-sm font-medium text-muted",
									children: [
										" / ",
										snapshot.workspace.velocityTarget,
										"d target"
									]
								})
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-3 text-sm text-muted",
							children: snapshot.workspace.velocityDays <= snapshot.workspace.velocityTarget ? "Inside the launch guardrail." : `${snapshot.workspace.velocityDays - snapshot.workspace.velocityTarget} days past the guardrail.`
						})
					] })
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "grid gap-4 lg:grid-cols-2",
				children: PILLARS.map((pillar) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Surface, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SectionTitle, { title: pillar }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("ul", {
					className: "space-y-3",
					children: [items.filter((item) => item.pillar === pillar).map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
						className: "rounded-xl bg-canvas p-3",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex flex-wrap items-start justify-between gap-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "font-medium text-ink",
									children: item.title
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatusPill, { status: item.status })]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-2 text-sm text-muted",
								children: item.detail
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
								className: "mt-2 text-xs text-muted",
								children: [
									item.owner,
									" · ",
									item.team,
									" · due ",
									shortDate(item.due)
								]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
								className: "mt-3 block text-xs font-semibold text-muted",
								htmlFor: `status-${item.id}`,
								children: "Status"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("select", {
								id: `status-${item.id}`,
								className: controlClass,
								value: item.status,
								onChange: (event) => setWorkStatus(item.id, event.target.value),
								children: STATUS_OPTIONS.map((option) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
									value: option.id,
									children: option.label
								}, option.id))
							})
						]
					}, item.id)), items.filter((item) => item.pillar === pillar).length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", {
						className: "text-sm text-muted",
						children: "Nothing open on this pillar."
					}) : null]
				})] }, pillar))
			}),
			committed.length > 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Surface, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SectionTitle, {
				title: "Committed from insights",
				hint: "Accepted on the insights page. They stay until you snooze or reopen them."
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
				className: "space-y-3",
				children: committed.map((insight) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "font-medium text-ink",
					children: insight.title
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-1 text-sm text-muted",
					children: insight.action
				})] }, insight.id))
			})] }) : null,
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Surface, { children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SectionTitle, {
					title: "Decision log",
					hint: "Status changes and decisions stay in this browser."
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
					className: "grid gap-3",
					onSubmit: (event) => {
						event.preventDefault();
						if (!title.trim()) return;
						addDecision({
							workspaceId: snapshot.workspace.id,
							title: title.trim(),
							detail: detail.trim()
						});
						setTitle("");
						setDetail("");
					},
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
							className: "sr-only",
							htmlFor: "decision-title",
							children: "Decision"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
							id: "decision-title",
							value: title,
							onChange: (event) => setTitle(event.target.value),
							placeholder: "The call, in one line",
							className: controlClass
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
							className: "sr-only",
							htmlFor: "decision-detail",
							children: "Why"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("textarea", {
							id: "decision-detail",
							value: detail,
							onChange: (event) => setDetail(event.target.value),
							rows: 3,
							placeholder: "Why this, and who it binds",
							className: "rounded-xl bg-canvas px-3 py-3 text-sm text-ink outline-none"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							type: "submit",
							className: "h-11 w-fit rounded-xl bg-teal px-4 text-sm font-semibold text-on-teal",
							children: "Log decision"
						})
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
					className: "mt-5 space-y-3",
					children: mine.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", {
						className: "text-sm text-muted",
						children: "No decisions logged. Record the call so it survives the next meeting."
					}) : mine.map((decision) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
						className: "rounded-xl bg-canvas p-3",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-xs text-muted",
								children: shortDate(decision.at)
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-1 font-medium text-ink",
								children: decision.title
							}),
							decision.detail ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-1 text-sm text-muted",
								children: decision.detail
							}) : null
						]
					}, decision.id))
				})
			] })
		]
	});
}
var SplitComponent = AlignmentPage;
//#endregion
export { SplitComponent as component };
