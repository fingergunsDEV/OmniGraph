import { i as __toESM } from "./_runtime.mjs";
import { c as MODELS, l as RANGES, m as WORKSPACES, r as CHANNELS, t as AS_OF } from "./_ssr/content-YC0dq67J.mjs";
import { X as require_jsx_runtime, Y as require_react, b as Link, g as Outlet, p as useRouterState, x as useNavigate } from "./_libs/@tanstack/react-router+[...].mjs";
import { a as Settings, f as Lightbulb, g as ChartPie, h as Flag, l as Menu, m as GitBranch, n as Users, o as Search, p as LayoutDashboard, s as Route, t as X } from "./_libs/lucide-react.mjs";
import { b as useUi, d as controlClass, m as longDate, u as cn } from "./_ssr/ui-x5KaUPcl.mjs";
import { l as useSnapshot } from "./_ssr/use-snapshot-C6PjU5zX.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/_app-CDc-01rg.js
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
var GROUPS = [
	{
		label: "Workspace",
		items: [
			{
				to: "/",
				label: "Overview",
				icon: LayoutDashboard,
				question: "What should the team do first?",
				group: "Workspace"
			},
			{
				to: "/channels",
				label: "Channels",
				icon: ChartPie,
				question: "Where is demand showing up?",
				group: "Workspace"
			},
			{
				to: "/attribution",
				label: "Attribution",
				icon: GitBranch,
				question: "Who actually deserves the credit?",
				group: "Workspace"
			},
			{
				to: "/journeys",
				label: "Journeys",
				icon: Route,
				question: "How do customers move between channels?",
				group: "Workspace"
			}
		]
	},
	{
		label: "Investigation",
		items: [{
			to: "/campaigns",
			label: "Campaigns",
			icon: Flag,
			question: "Which programs earn their spend?",
			group: "Investigation"
		}, {
			to: "/insights",
			label: "Insights",
			icon: Lightbulb,
			question: "What changed, and what should we do?",
			group: "Investigation"
		}]
	},
	{
		label: "Operations",
		items: [{
			to: "/alignment",
			label: "Alignment",
			icon: Users,
			question: "Is the team executing the same plan?",
			group: "Operations"
		}]
	}
];
var SETTINGS = {
	to: "/settings",
	label: "Settings",
	icon: Settings,
	question: "Which sources feed the graph?",
	group: "Settings"
};
var FLAT = [...GROUPS.flatMap((group) => group.items), SETTINGS];
function activeItem(pathname) {
	if (pathname.startsWith("/channels/")) return GROUPS[0].items[1];
	return [...FLAT].sort((a, b) => b.to.length - a.to.length).find((item) => item.to === "/" ? pathname === "/" : pathname === item.to || pathname.startsWith(`${item.to}/`)) ?? FLAT[0];
}
function AppShell({ children }) {
	const pathname = useRouterState({ select: (state) => state.location.pathname });
	const navigate = useNavigate();
	const snapshot = useSnapshot();
	const open = useUi((state) => state.navOpen);
	const setNav = useUi((state) => state.setNav);
	const workspaceId = useUi((state) => state.workspaceId);
	const setWorkspace = useUi((state) => state.setWorkspace);
	const range = useUi((state) => state.range);
	const setRange = useUi((state) => state.setRange);
	const model = useUi((state) => state.model);
	const setModel = useUi((state) => state.setModel);
	const [query, setQuery] = (0, import_react.useState)("");
	const [miss, setMiss] = (0, import_react.useState)("");
	const current = activeItem(pathname);
	const channel = CHANNELS.find((item) => pathname === `/channels/${item.id}`);
	const title = channel ? channel.name : current.label;
	const question = channel ? `What is ${channel.short} actually doing in this window?` : current.question;
	const crumb = channel ? "Workspace / Channels" : current.group;
	(0, import_react.useEffect)(() => {
		useUi.persist.rehydrate();
	}, []);
	(0, import_react.useEffect)(() => {
		setNav(false);
		setMiss("");
	}, [pathname, setNav]);
	function submitSearch(event) {
		event.preventDefault();
		const needle = query.trim().toLowerCase();
		if (!needle) return;
		const hitChannel = CHANNELS.find((item) => `${item.name} ${item.short} ${item.surface} ${item.id}`.toLowerCase().includes(needle));
		if (hitChannel) {
			setMiss("");
			navigate({
				to: "/channels/$channelId",
				params: { channelId: hitChannel.id }
			});
			return;
		}
		const campaign = snapshot.campaigns.find((item) => `${item.name} ${item.owner} ${item.team}`.toLowerCase().includes(needle));
		if (campaign) {
			setMiss("");
			navigate({
				to: "/channels/$channelId",
				params: { channelId: campaign.channel },
				search: { campaign: campaign.id }
			});
			return;
		}
		setMiss(`No channel or campaign matched “${query.trim()}”.`);
	}
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
				className: cn("fixed inset-y-0 left-0 z-40 w-60 flex-col overflow-y-auto bg-navy text-on-navy lg:flex", open ? "flex" : "hidden"),
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center gap-2.5 px-4 pt-5",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Mark, {}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Wordmark, {})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "px-4 pt-2 text-xs text-on-navy-dim",
						children: "Workspace for credit, sources, and the work that ships it."
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("nav", {
						className: "mt-4 flex flex-1 flex-col px-3",
						"aria-label": "Primary workspace",
						children: [GROUPS.map((group) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mb-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "px-3 pt-3 pb-1 text-xs font-semibold tracking-widest text-on-navy-dim uppercase",
								children: group.label
							}), group.items.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(NavLink, {
								item,
								pathname
							}, item.to))]
						}, group.label)), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "mt-auto pt-2",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(NavLink, {
								item: SETTINGS,
								pathname
							})
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "px-4 py-5",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-xs font-semibold tracking-widest text-teal-bright uppercase",
							children: "Unify · Analyze · Align · Accelerate"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "mt-3 text-xs leading-relaxed text-on-navy-dim",
							children: [
								"Sample DTC brands through ",
								longDate(AS_OF),
								". Credit math is real. Live APIs are configured, not called."
							]
						})]
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "min-w-0 pb-24 lg:pb-0 lg:pl-60",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("header", {
					className: "sticky top-0 z-20 border-b border-line bg-canvas/95 backdrop-blur-sm",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mx-auto flex max-w-6xl flex-col gap-3 px-4 py-3 sm:px-6 lg:px-8",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex min-w-0 items-start gap-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									type: "button",
									className: "inline-flex size-11 shrink-0 items-center justify-center rounded-xl bg-surface text-ink shadow-card lg:hidden",
									"aria-label": open ? "Close menu" : "Open menu",
									onClick: () => setNav(!open),
									children: open ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { className: "size-5" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Menu, { className: "size-5" })
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "min-w-0 flex-1",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
											className: "truncate text-xs font-medium text-muted",
											children: ["OmniGraph / ", crumb]
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
											className: "truncate text-lg font-semibold text-ink",
											children: title
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
											className: "text-sm text-muted",
											children: question
										})
									]
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex min-w-0 flex-col gap-2 xl:flex-row xl:items-center",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
									onSubmit: submitSearch,
									className: "flex min-w-0 flex-1 items-center gap-2",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
										className: "relative min-w-0 flex-1",
										children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: "sr-only",
												children: "Search channels and campaigns"
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Search, {
												className: "pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted",
												"aria-hidden": "true"
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
												value: query,
												onChange: (event) => setQuery(event.target.value),
												placeholder: "Search channels, campaigns, owners",
												className: cn(controlClass, "w-full pr-3 pl-9")
											})
										]
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
										type: "submit",
										className: "h-11 shrink-0 rounded-xl bg-navy px-3 text-sm font-medium text-on-navy",
										children: "Find"
									})]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex min-w-0 flex-wrap items-center gap-2",
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
								})]
							}),
							miss ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								role: "status",
								className: "text-sm font-medium text-risk",
								children: miss
							}) : null
						]
					})
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("main", {
					className: "mx-auto min-w-0 max-w-6xl px-4 py-5 sm:px-6 sm:py-6 lg:px-8",
					children
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("nav", {
				className: "fixed inset-x-0 bottom-0 z-30 border-t border-line bg-surface lg:hidden",
				"aria-label": "Mobile workspace",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "grid grid-cols-5",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MobileLink, {
							to: "/",
							label: "Home",
							icon: LayoutDashboard,
							pathname
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MobileLink, {
							to: "/channels",
							label: "Channels",
							icon: ChartPie,
							pathname
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MobileLink, {
							to: "/journeys",
							label: "Journeys",
							icon: Route,
							pathname
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MobileLink, {
							to: "/settings",
							label: "Settings",
							icon: Settings,
							pathname
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
							type: "button",
							onClick: () => setNav(true),
							className: "flex h-16 flex-col items-center justify-center gap-1 text-xs font-medium text-muted",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Menu, {
								className: "size-5",
								"aria-hidden": "true"
							}), "More"]
						})
					]
				})
			})
		]
	});
}
function NavLink({ item, pathname }) {
	const active = item.to === "/" ? pathname === "/" : item.to === "/channels" ? pathname === "/channels" || pathname.startsWith("/channels/") : pathname === item.to || pathname.startsWith(`${item.to}/`);
	const Icon = item.icon;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
		to: item.to,
		"aria-current": active ? "page" : void 0,
		className: cn("flex h-11 items-center gap-3 rounded-xl px-3 text-sm font-medium", active ? "bg-navy-2 text-on-navy" : "text-on-navy-dim hover:bg-navy-2 hover:text-on-navy"),
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, {
			className: "size-4",
			"aria-hidden": "true"
		}), item.label]
	});
}
function MobileLink({ to, label, icon: Icon, pathname }) {
	const active = to === "/" ? pathname === "/" : pathname === to || pathname.startsWith(`${to}/`);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
		to,
		"aria-current": active ? "page" : void 0,
		className: cn("flex h-16 flex-col items-center justify-center gap-1 text-xs font-medium", active ? "text-teal" : "text-muted"),
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, {
			className: "size-5",
			"aria-hidden": "true"
		}), label]
	});
}
function AppLayout() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AppShell, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Outlet, {}) });
}
//#endregion
export { AppLayout as component };
