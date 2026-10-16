import { i as __toESM } from "./_runtime.mjs";
import { l as RANGES, r as CHANNELS } from "./_ssr/content-YC0dq67J.mjs";
import { X as require_jsx_runtime, Y as require_react, b as Link } from "./_libs/@tanstack/react-router+[...].mjs";
import { _ as pct, a as Meter, c as StatusPill, g as num, h as money, i as Kpi, l as Surface, n as ChannelGlyph, o as PageIntro, s as SectionTitle, u as cn, v as roas } from "./_ssr/ui-x5KaUPcl.mjs";
import { a as modelMeta, l as useSnapshot, n as channelMeta, t as buildInsights, u as useWork } from "./_ssr/use-snapshot-C6PjU5zX.mjs";
import { n as RevenueChart } from "./_ssr/charts-Bw0JFtUc.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/_app-DMCkTUOE.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function OverviewPage() {
	const snapshot = useSnapshot();
	const { items, score } = useWork();
	const [hidden, setHidden] = (0, import_react.useState)({});
	const { kpis, workspace, channels } = snapshot;
	const model = modelMeta(snapshot.model);
	const range = RANGES.find((item) => item.id === snapshot.range);
	const gap = kpis.platform - kpis.revenue;
	const pace = snapshot.revenueTarget > 0 ? kpis.revenue / snapshot.revenueTarget : 0;
	const hot = [...items].sort((a, b) => rank(a.status) - rank(b.status)).slice(0, 3);
	const topChannel = [...channels].sort((a, b) => b.revenue - a.revenue)[0];
	const insights = buildInsights(snapshot, items).slice(0, 2);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "space-y-6",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageIntro, {
				eyebrow: `${workspace.category} · ${range?.hint ?? ""}`,
				title: `${money(gap)} is claimed by more than one platform for the same orders.`,
				lede: `${workspace.brief} ${model.name} gives ${topChannel ? channelMeta(topChannel.id).short : "search"} ${topChannel ? pct(topChannel.revenue / kpis.revenue) : "—"} of credit. Order revenue stays ${money(kpis.revenue)} no matter which model you pick.`
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex flex-wrap gap-2",
				children: [CHANNELS.map((channel) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
					to: "/channels/$channelId",
					params: { channelId: channel.id },
					className: "inline-flex h-11 items-center gap-2 rounded-full bg-surface pr-3 pl-1.5 text-sm font-medium text-ink shadow-card",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChannelGlyph, { id: channel.id }), channel.short]
				}, channel.id)), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("a", {
					href: "#measurement",
					className: "inline-flex h-11 items-center gap-2 rounded-full bg-surface pr-3 pl-1.5 text-sm font-medium text-ink shadow-card",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChannelGlyph, { id: "measure" }), "Measurement"]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid gap-3 sm:grid-cols-2 xl:grid-cols-4",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Kpi, {
						tone: "navy",
						label: "Order revenue",
						value: money(kpis.revenue),
						delta: kpis.revenueDelta,
						detail: `${num(kpis.orders)} orders · ${money(kpis.aov)} AOV`
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Kpi, {
						label: `Incremental · ${model.name}`,
						value: money(kpis.incremental),
						delta: kpis.incrementalDelta,
						detail: `${roas(kpis.iroas)} incremental ROAS`
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Kpi, {
						label: "Blended CAC",
						value: money(kpis.cac),
						delta: kpis.cacDelta,
						invert: true,
						detail: `Guardrail ${money(snapshot.cacGuardrail)} · ${num(kpis.newCustomers)} new`
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Kpi, {
						label: "Alignment",
						value: `${Math.round(score * 100)}`,
						detail: `${items.filter((item) => item.status === "blocked").length} blocked · ${items.filter((item) => item.status === "at_risk").length} at risk`
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid gap-4 lg:grid-cols-3",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Surface, {
					className: "lg:col-span-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SectionTitle, {
						title: "Credit by day",
						hint: "Stacked areas are the selected model. The line is media spend.",
						action: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "flex flex-wrap gap-1",
							children: CHANNELS.map((channel) => {
								const off = hidden[channel.id];
								return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
									type: "button",
									"aria-pressed": !off,
									onClick: () => setHidden((current) => ({
										...current,
										[channel.id]: !current[channel.id]
									})),
									className: cn("inline-flex h-11 items-center gap-2 rounded-full px-3 text-sm", off ? "text-faint" : "text-ink"),
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "size-2.5 rounded-full",
										style: { background: off ? "var(--color-line)" : `var(--color-ch-${channel.id})` }
									}), channel.short]
								}, channel.id);
							})
						})
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(RevenueChart, {
						series: snapshot.series,
						hidden
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Surface, { children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SectionTitle, {
						title: "Pace",
						hint: "Order revenue against the window goal."
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "text-2xl font-semibold tabular-nums text-ink",
						children: [money(kpis.revenue), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
							className: "text-base font-medium text-muted",
							children: [" / ", money(snapshot.revenueTarget)]
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "mt-3",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Meter, {
							value: Math.min(pace, 1),
							tone: pace >= 1 ? "teal" : pace >= .9 ? "warn" : "risk"
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-3 text-sm text-muted",
						children: pace >= 1 ? `${pct(pace - 1)} ahead of the goal for this window.` : `${pct(1 - pace)} behind the goal for this window.`
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("dl", {
						className: "mt-5 space-y-3 text-sm",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex justify-between gap-3",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", {
									className: "text-muted",
									children: "Platform claim"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("dd", {
									className: "font-medium tabular-nums",
									children: roas(kpis.platformRoas)
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex justify-between gap-3",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", {
									className: "text-muted",
									children: "Counted once"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("dd", {
									className: "font-medium tabular-nums",
									children: roas(kpis.roas)
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex justify-between gap-3",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", {
									className: "text-muted",
									children: "Assisted orders"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("dd", {
									className: "font-medium tabular-nums",
									children: pct(kpis.assistRate)
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex justify-between gap-3",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", {
									className: "text-muted",
									children: "Brief to live"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("dd", {
									className: "font-medium tabular-nums",
									children: [
										workspace.velocityDays,
										"d",
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
											className: "text-muted",
											children: [
												" / ",
												workspace.velocityTarget,
												"d"
											]
										})
									]
								})]
							})
						]
					})
				] })]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Surface, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SectionTitle, {
				title: "Where the pixels and the journey disagree",
				hint: "Platform claim gives every touched channel the full order. The model splits the order once.",
				action: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
					to: "/attribution",
					className: "text-sm font-semibold text-teal",
					children: "Open attribution"
				})
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
								children: "Platform"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
								className: "pb-3 text-right font-semibold",
								children: model.name
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
								className: "pb-3 text-right font-semibold",
								children: "Gap"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
								className: "pb-3 text-right font-semibold",
								children: "iROAS"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
								className: "pb-3 text-right font-semibold",
								children: "Spend"
							})
						] })
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("tbody", {
						className: "divide-y divide-line",
						children: channels.map((channel) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", { children: [
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
								className: "py-3 text-right tabular-nums text-muted",
								children: money(channel.platform)
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
								className: "py-3 text-right font-medium tabular-nums",
								children: money(channel.revenue)
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
								className: "py-3 text-right tabular-nums text-risk",
								children: money(channel.platform - channel.revenue)
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
								className: "py-3 text-right tabular-nums",
								children: roas(channel.iroas)
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
								className: "py-3 text-right tabular-nums text-muted",
								children: money(channel.spend)
							})
						] }, channel.id))
					})]
				})
			})] }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid gap-4 lg:grid-cols-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Surface, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SectionTitle, {
					title: "Work that can slip the number",
					action: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/alignment",
						className: "text-sm font-semibold text-teal",
						children: "Alignment board"
					})
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
					className: "space-y-3",
					children: hot.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
						className: "rounded-xl bg-canvas p-3",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex flex-wrap items-center justify-between gap-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-xs font-semibold tracking-wide text-muted uppercase",
									children: item.pillar
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatusPill, { status: item.status })]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-1 font-medium text-ink",
								children: item.title
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
								className: "mt-1 text-sm text-muted",
								children: [
									item.owner,
									" · ",
									item.team
								]
							})
						]
					}, item.id))
				})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Surface, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SectionTitle, {
					title: "What to do with it",
					action: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/insights",
						className: "text-sm font-semibold text-teal",
						children: "All insights"
					})
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
					className: "space-y-4",
					children: insights.map((insight) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", { children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-xs font-semibold tracking-wide text-teal uppercase",
							children: insight.pillar
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-1 font-medium text-ink",
							children: insight.title
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-1 text-sm text-muted",
							children: insight.action
						})
					] }, insight.id))
				})] })]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Surface, {
				id: "measurement",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SectionTitle, {
					title: "Measurement",
					hint: "The seventh node. If this is wrong, every ROAS above it is a argument."
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("dl", {
					className: "grid gap-4 sm:grid-cols-2 lg:grid-cols-4",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stat, {
							label: "Identity match",
							value: pct(snapshot.measurement.matchRate)
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stat, {
							label: "Consent",
							value: pct(snapshot.measurement.consentRate)
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stat, {
							label: "Modeled revenue",
							value: pct(snapshot.measurement.modeledShare)
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stat, {
							label: "Graph lag",
							value: `${snapshot.measurement.lagHours}h`,
							detail: `${snapshot.measurement.profiles} profiles`
						})
					]
				})]
			})
		]
	});
}
function Stat({ label, value, detail }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", {
			className: "text-xs font-semibold tracking-wide text-muted uppercase",
			children: label
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dd", {
			className: "mt-1 text-xl font-semibold tabular-nums text-ink",
			children: value
		}),
		detail ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "text-sm text-muted",
			children: detail
		}) : null
	] });
}
function rank(status) {
	if (status === "blocked") return 0;
	if (status === "at_risk") return 1;
	if (status === "on_track") return 2;
	return 3;
}
var SplitComponent = OverviewPage;
//#endregion
export { SplitComponent as component };
