import { i as __toESM } from "./_runtime.mjs";
import { J as require_jsx_runtime, b as Link, g as Outlet, p as useRouterState, q as require_react } from "./_libs/@tanstack/react-router+[...].mjs";
import { c as Menu, d as Lightbulb, f as LayoutDashboard, h as ChartPie, m as Flag, n as Users, o as Route, p as GitBranch, t as X } from "./_libs/lucide-react.mjs";
import { C as cn, S as WORKSPACES, T as longDate, d as MODELS, j as useUi, m as RANGES, t as AS_OF, w as controlClass } from "./_ssr/ui-DLhUn6uC.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/_app-CvTSGdyR.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function Mark({ className }) {
	const id = (0, import_react.useId)().replace(/:/g, "");
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("svg", {
		viewBox: "0 0 48 48",
		className: cn("size-9", className),
		"aria-hidden": "true",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("defs", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("linearGradient", {
				id: `${id}-a`,
				x1: "6",
				y1: "40",
				x2: "42",
				y2: "8",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("stop", { stopColor: "var(--color-cobalt)" }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("stop", {
						offset: "0.55",
						stopColor: "var(--color-ch-search)"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("stop", {
						offset: "1",
						stopColor: "var(--color-teal-bright)"
					})
				]
			}) }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
				d: "M24 7.5c9.4 0 17 6.7 17 16.2 0 6.6-3.8 11.2-9 14",
				fill: "none",
				stroke: `url(#${id}-a)`,
				strokeWidth: "6.5",
				strokeLinecap: "round"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
				d: "M24 40.5c-9.4 0-17-6.7-17-16.2 0-6.8 4.2-11.6 9.6-14.4",
				fill: "none",
				stroke: `url(#${id}-a)`,
				strokeWidth: "6.5",
				strokeLinecap: "round"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("rect", {
				x: "16.2",
				y: "25",
				width: "4",
				height: "8.5",
				rx: "1.1",
				fill: "var(--color-ch-search)"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("rect", {
				x: "22",
				y: "19.5",
				width: "4",
				height: "14",
				rx: "1.1",
				fill: "var(--color-teal)"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("rect", {
				x: "27.8",
				y: "15.2",
				width: "4",
				height: "18.3",
				rx: "1.1",
				fill: "var(--color-teal-bright)"
			})
		]
	});
}
function Wordmark({ tone = "light" }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
		className: cn("text-lg font-semibold tracking-tight", tone === "light" ? "text-on-navy" : "text-ink"),
		children: [
			"Omni",
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "text-teal-bright",
				children: "Graph"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "ml-0.5 align-super text-xs font-medium",
				children: "TM"
			})
		]
	});
}
var NAV = [
	{
		to: "/",
		label: "Overview",
		icon: LayoutDashboard
	},
	{
		to: "/channels",
		label: "Channels",
		icon: ChartPie
	},
	{
		to: "/attribution",
		label: "Attribution",
		icon: GitBranch
	},
	{
		to: "/journeys",
		label: "Journeys",
		icon: Route
	},
	{
		to: "/campaigns",
		label: "Campaigns",
		icon: Flag
	},
	{
		to: "/alignment",
		label: "Alignment",
		icon: Users
	},
	{
		to: "/insights",
		label: "Insights",
		icon: Lightbulb
	}
];
function AppShell({ children }) {
	const pathname = useRouterState({ select: (state) => state.location.pathname });
	const open = useUi((state) => state.navOpen);
	const setNav = useUi((state) => state.setNav);
	const workspaceId = useUi((state) => state.workspaceId);
	const setWorkspace = useUi((state) => state.setWorkspace);
	const range = useUi((state) => state.range);
	const setRange = useUi((state) => state.setRange);
	const model = useUi((state) => state.model);
	const setModel = useUi((state) => state.setModel);
	const reset = useUi((state) => state.reset);
	(0, import_react.useEffect)(() => {
		useUi.persist.rehydrate();
	}, []);
	(0, import_react.useEffect)(() => {
		setNav(false);
	}, [pathname, setNav]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "min-h-screen bg-canvas text-ink",
		children: [
			open ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
				type: "button",
				"aria-label": "Close menu",
				className: "fixed inset-0 z-30 bg-navy/40 lg:hidden",
				onClick: () => setNav(false)
			}) : null,
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("aside", {
				className: cn("fixed inset-y-0 left-0 z-40 w-60 flex-col bg-navy text-on-navy lg:flex", open ? "flex" : "hidden"),
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center gap-2.5 px-4 pt-5",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Mark, {}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Wordmark, {})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "px-4 pt-2 text-xs text-on-navy-dim",
						children: "Performance, credit, and the work that ships it."
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("nav", {
						className: "mt-6 flex flex-1 flex-col gap-1 px-3",
						"aria-label": "Primary",
						children: NAV.map((item) => {
							const active = item.to === "/" ? pathname === "/" : pathname.startsWith(item.to);
							const Icon = item.icon;
							return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
								to: item.to,
								"aria-current": active ? "page" : void 0,
								className: cn("flex h-11 items-center gap-3 rounded-xl px-3 text-sm font-medium", active ? "bg-navy-2 text-on-navy" : "text-on-navy-dim hover:bg-navy-2 hover:text-on-navy"),
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, {
									className: "size-4",
									"aria-hidden": "true"
								}), item.label]
							}, item.to);
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "px-4 pb-5",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-xs font-semibold tracking-widest text-teal-bright uppercase",
								children: "Unify · Analyze · Align · Accelerate"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
								className: "mt-3 text-xs leading-relaxed text-on-navy-dim",
								children: [
									"Sample DTC brands through ",
									longDate(AS_OF),
									". Credit math is real. The ad accounts are not."
								]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								type: "button",
								onClick: reset,
								className: "mt-3 h-11 text-sm font-medium text-on-navy-dim underline-offset-2 hover:text-on-navy hover:underline",
								children: "Reset this browser"
							})
						]
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "min-w-0 lg:pl-60",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("header", {
					className: "sticky top-0 z-20 border-b border-line bg-canvas/90 backdrop-blur-sm",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mx-auto flex max-w-6xl flex-wrap items-center gap-2 px-4 py-3 sm:px-6 lg:px-8",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								type: "button",
								className: "inline-flex size-11 items-center justify-center rounded-xl bg-surface text-ink shadow-card lg:hidden",
								"aria-label": open ? "Close menu" : "Open menu",
								onClick: () => setNav(!open),
								children: open ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { className: "size-5" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Menu, { className: "size-5" })
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
								to: "/",
								className: "flex items-center gap-2 lg:hidden",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Mark, { className: "size-8" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Wordmark, { tone: "dark" })]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "ml-auto flex flex-wrap items-center gap-2",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
										className: "sr-only",
										htmlFor: "workspace",
										children: "Workspace"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("select", {
										id: "workspace",
										className: cn(controlClass, "max-w-full"),
										value: workspaceId,
										onChange: (event) => setWorkspace(event.target.value),
										children: WORKSPACES.map((workspace) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
											value: workspace.id,
											children: workspace.name
										}, workspace.id))
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "inline-flex items-center rounded-xl bg-surface p-1 shadow-card",
										role: "group",
										"aria-label": "Date range",
										children: RANGES.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
											type: "button",
											"aria-pressed": range === item.id,
											onClick: () => setRange(item.id),
											className: cn("h-11 rounded-lg px-3 text-sm font-medium", range === item.id ? "bg-navy text-on-navy" : "text-muted hover:text-ink"),
											children: item.label
										}, item.id))
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
										className: "sr-only",
										htmlFor: "model",
										children: "Attribution model"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("select", {
										id: "model",
										className: cn(controlClass, "max-w-full"),
										value: model,
										onChange: (event) => setModel(event.target.value),
										children: MODELS.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
											value: item.id,
											children: item.name
										}, item.id))
									})
								]
							})
						]
					})
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("main", {
					className: "mx-auto min-w-0 max-w-6xl px-4 py-5 sm:px-6 sm:py-6 lg:px-8",
					children
				})]
			})
		]
	});
}
function AppLayout() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AppShell, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Outlet, {}) });
}
//#endregion
export { AppLayout as component };
