import { i as __toESM } from "../_runtime.mjs";
import { J as require_jsx_runtime, q as require_react } from "../_libs/@tanstack/react-router+[...].mjs";
import { C as cn, D as num, E as money, O as pct, _ as SectionTitle, f as Meter, i as CHANNEL_COLOR, j as useUi, k as roas, p as PageIntro, s as ChannelGlyph, y as Surface } from "./ui-DLhUn6uC.mjs";
import { c as useSnapshot, n as channelMeta } from "./use-snapshot-4U2ncHzN.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/channels-C-1GJWgL.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function ChannelsPage() {
	const snapshot = useSnapshot();
	const focus = useUi((state) => state.focusChannel);
	const setFocus = useUi((state) => state.setFocusChannel);
	const [selected, setSelected] = (0, import_react.useState)(focus ?? "search");
	(0, import_react.useEffect)(() => {
		if (focus) setSelected(focus);
	}, [focus]);
	const stat = snapshot.channels.find((channel) => channel.id === selected) ?? snapshot.channels[0];
	const meta = channelMeta(stat.id);
	const campaigns = snapshot.campaigns.filter((campaign) => campaign.channel === stat.id);
	const max = Math.max(...snapshot.channels.map((channel) => channel.revenue), 1);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "space-y-6",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageIntro, {
				eyebrow: "Channels",
				title: "Six ways demand shows up, plus the graph that ties them together.",
				lede: "Pick a node. OmniGraph shows what it opens, what it closes, and whether the platform ROAS survives a haircut."
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "grid gap-3 sm:grid-cols-2 xl:grid-cols-3",
				children: snapshot.channels.map((channel) => {
					const info = channelMeta(channel.id);
					const active = channel.id === stat.id;
					return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
						type: "button",
						"aria-pressed": active,
						onClick: () => {
							setSelected(channel.id);
							setFocus(channel.id);
						},
						className: cn("rounded-2xl bg-surface p-4 text-left shadow-card", active && "ring-2 ring-teal"),
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-center gap-3",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChannelGlyph, { id: channel.id }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "font-semibold text-ink",
									children: info.name
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-sm text-muted",
									children: info.surface
								})] })]
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
								children: [money(channel.revenue), " credit"]
							})
						]
					}, channel.id);
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Surface, { children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex flex-wrap items-start justify-between gap-3",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-xs font-semibold tracking-widest text-teal uppercase",
							children: meta.surface
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
							className: "mt-1 text-xl font-semibold text-ink",
							children: meta.name
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-2 max-w-2xl text-sm text-muted",
							children: roleLine(stat)
						})
					] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChannelGlyph, {
						id: stat.id,
						className: "size-11"
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("dl", {
					className: "mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-4",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Metric, {
							label: "Model credit",
							value: money(stat.revenue)
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Metric, {
							label: "Platform claim",
							value: money(stat.platform)
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Metric, {
							label: "Spend",
							value: money(stat.spend)
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Metric, {
							label: "Incremental ROAS",
							value: roas(stat.iroas)
						})
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-5 grid gap-3 sm:grid-cols-3",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Split, {
							label: "Opens",
							value: stat.opener,
							total: stat.present,
							color: CHANNEL_COLOR[stat.id]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Split, {
							label: "Closes",
							value: stat.closer,
							total: stat.present,
							color: CHANNEL_COLOR[stat.id]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Split, {
							label: "Present, not closer",
							value: Math.max(stat.present - stat.closer, 0),
							total: stat.present,
							color: CHANNEL_COLOR[stat.id]
						})
					]
				})
			] }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Surface, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SectionTitle, {
				title: `Campaigns in ${meta.short}`,
				hint: "Share of this channel's spend and credit for the window."
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
				className: "divide-y divide-line",
				children: campaigns.map((campaign) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
					className: "flex flex-wrap items-center justify-between gap-3 py-3",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "font-medium text-ink",
						children: campaign.name
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "text-sm text-muted",
						children: [
							campaign.owner,
							" · ",
							campaign.team,
							" · ",
							labelStatus(campaign.status)
						]
					})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "text-right",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "font-semibold tabular-nums text-ink",
							children: roas(campaign.roas)
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "text-sm tabular-nums text-muted",
							children: [money(campaign.spend), " spend"]
						})]
					})]
				}, campaign.id))
			})] }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Surface, {
				id: "measurement",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SectionTitle, {
					title: "Measurement",
					hint: `${pct(snapshot.measurement.modeledShare)} of revenue is modeled. Match ${pct(snapshot.measurement.matchRate)}, consent ${pct(snapshot.measurement.consentRate)}, lag ${snapshot.measurement.lagHours}h across ${snapshot.measurement.profiles} profiles.`
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-sm text-muted",
					children: "Teams arguing from a single pixel are missing the modeled slice. OmniGraph keeps it in the graph instead of dropping it into \"unattributed.\""
				})]
			})
		]
	});
}
function roleLine(stat) {
	const present = stat.present || 1;
	const open = Math.round(stat.opener / present * 100);
	const close = Math.round(stat.closer / present * 100);
	if (close >= 45) return `It closes ${close}% of the journeys it touches, so last-click will flatter it.`;
	if (open >= 35 && close < 30) return `It opens ${open}% of the journeys it touches and closes only ${close}%. Last-click will hide the work.`;
	return `It shows up on ${num(stat.present)} orders — opening ${open}% and closing ${close}%.`;
}
function Metric({ label, value }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", {
		className: "text-xs font-semibold tracking-wide text-muted uppercase",
		children: label
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("dd", {
		className: "mt-1 text-xl font-semibold tabular-nums text-ink",
		children: value
	})] });
}
function Split({ label, value, total, color }) {
	const share = total ? value / total : 0;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "rounded-xl bg-canvas p-3",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-sm text-muted",
				children: label
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-1 text-lg font-semibold tabular-nums text-ink",
				children: pct(share)
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mt-2 h-2 overflow-hidden rounded-full bg-surface",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "h-full rounded-full",
					style: {
						width: `${Math.round(share * 100)}%`,
						background: color
					}
				})
			})
		]
	});
}
function labelStatus(status) {
	if (status === "on_track") return "On track";
	if (status === "live") return "Live";
	if (status === "learning") return "Learning";
	if (status === "paused") return "Paused";
	if (status === "scheduled") return "Scheduled";
	return status;
}
var SplitComponent = ChannelsPage;
//#endregion
export { SplitComponent as component };
