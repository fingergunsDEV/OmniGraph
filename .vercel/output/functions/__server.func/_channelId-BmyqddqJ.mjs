import { i as __toESM } from "./_runtime.mjs";
import { r as CHANNELS } from "./_ssr/content-YC0dq67J.mjs";
import { X as require_jsx_runtime, Y as require_react, b as Link } from "./_libs/@tanstack/react-router+[...].mjs";
import { _ as pct, a as Meter, b as useUi, f as feedsFor, g as num, h as money, i as Kpi, l as Surface, n as ChannelGlyph, o as PageIntro, s as SectionTitle, t as CHANNEL_COLOR, u as cn, v as roas } from "./_ssr/ui-x5KaUPcl.mjs";
import { a as modelMeta, i as journeyCredits, l as useSnapshot, n as channelMeta, o as spendOn } from "./_ssr/use-snapshot-C6PjU5zX.mjs";
import { r as RoleChart, t as ChannelTrend } from "./_ssr/charts-Bw0JFtUc.mjs";
import { n as Route$1 } from "./_ssr/router-CaZKI3H4.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/_channelId-BmyqddqJ.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function channelDrill(snapshot, id) {
	const stat = snapshot.channels.find((channel) => channel.id === id) ?? snapshot.channels[0];
	const journeys = snapshot.journeys.filter((journey) => journey.touches.some((touch) => touch.channel === id));
	const platformByDay = /* @__PURE__ */ new Map();
	const roles = {
		Solo: 0,
		Opens: 0,
		Closes: 0,
		Bookends: 0,
		Assists: 0
	};
	const partnerMap = /* @__PURE__ */ new Map();
	let creditOnTouched = 0;
	for (const journey of journeys) {
		const credits = journeyCredits(journey, snapshot.model);
		creditOnTouched += credits[id];
		platformByDay.set(journey.convertedOn, (platformByDay.get(journey.convertedOn) ?? 0) + journey.value);
		const channels = new Set(journey.touches.map((touch) => touch.channel));
		const first = journey.touches[0]?.channel;
		const last = journey.touches[journey.touches.length - 1]?.channel;
		if (channels.size === 1) roles.Solo += 1;
		else if (first === id && last === id) roles.Bookends += 1;
		else if (first === id) roles.Opens += 1;
		else if (last === id) roles.Closes += 1;
		else roles.Assists += 1;
		for (const other of channels) {
			if (other === id) continue;
			const row = partnerMap.get(other) ?? {
				id: other,
				name: channelMeta(other).name,
				orders: 0,
				shared: 0,
				ourCredit: 0,
				theirCredit: 0
			};
			row.orders += 1;
			row.shared += journey.value;
			row.ourCredit += credits[id];
			row.theirCredit += credits[other];
			partnerMap.set(other, row);
		}
	}
	const series = snapshot.series.map((point) => ({
		date: point.date,
		label: point.label,
		credit: point[id],
		spend: spendOn(snapshot.workspace.id, id, point.date),
		platform: platformByDay.get(point.date) ?? 0
	}));
	const paths = snapshot.paths.filter((path) => path.steps.includes(id)).slice(0, 8).map((path) => {
		const first = path.steps[0] === id;
		const last = path.steps[path.steps.length - 1] === id;
		const role = path.steps.length === 1 ? "Solo" : first && last ? "Bookends" : first ? "Opens" : last ? "Closes" : "Assists";
		return {
			...path,
			role
		};
	});
	const orders = [...journeys].sort((a, b) => a.convertedOn < b.convertedOn ? 1 : -1).slice(0, 8);
	return {
		stat,
		series,
		roles: [
			"Opens",
			"Assists",
			"Closes",
			"Bookends",
			"Solo"
		].map((label) => ({
			label,
			orders: roles[label]
		})).filter((row) => row.orders > 0),
		partners: [...partnerMap.values()].sort((a, b) => b.shared - a.shared),
		paths,
		orders,
		touched: journeys.length,
		creditOnTouched
	};
}
function weeklyRollup(series) {
	const buckets = /* @__PURE__ */ new Map();
	for (const point of series) {
		const date = /* @__PURE__ */ new Date(`${point.date}T00:00:00Z`);
		const day = date.getUTCDay();
		const monday = new Date(date);
		monday.setUTCDate(date.getUTCDate() - (day + 6) % 7);
		const key = monday.toISOString().slice(0, 10);
		const row = buckets.get(key) ?? {
			label: key.slice(5),
			credit: 0,
			spend: 0,
			platform: 0
		};
		row.credit += point.credit;
		row.spend += point.spend;
		row.platform += point.platform;
		buckets.set(key, row);
	}
	return [...buckets.values()];
}
function stepLabel(steps) {
	return steps.map((id) => CHANNELS.find((channel) => channel.id === id)?.short ?? id).join(" → ");
}
var STATUS = {
	live: "Live",
	learning: "Learning",
	paused: "Paused",
	scheduled: "Scheduled"
};
function ChannelDetailPage({ channelId, campaignId }) {
	const snapshot = useSnapshot();
	const integrations = useUi((state) => state.integrations);
	const drill = (0, import_react.useMemo)(() => channelDrill(snapshot, channelId), [snapshot, channelId]);
	const weeks = (0, import_react.useMemo)(() => weeklyRollup(drill.series), [drill.series]);
	const meta = channelMeta(channelId);
	const model = modelMeta(snapshot.model);
	const feeds = feedsFor(channelId);
	const connected = feeds.filter((feed) => integrations[feed.id]?.status === "connected");
	const campaigns = snapshot.campaigns.filter((campaign) => campaign.channel === channelId);
	const [openId, setOpenId] = (0, import_react.useState)(campaignId ?? "");
	const share = snapshot.kpis.revenue ? drill.stat.revenue / snapshot.kpis.revenue : 0;
	const assistRate = drill.stat.present ? Math.max(drill.stat.present - drill.stat.closer, 0) / drill.stat.present : 0;
	const inspected = campaigns.find((campaign) => campaign.id === openId) ?? null;
	(0, import_react.useEffect)(() => {
		if (!campaignId) return;
		setOpenId(campaignId);
		document.getElementById("channel-campaigns")?.scrollIntoView({ block: "start" });
	}, [campaignId]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "space-y-6",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex flex-wrap items-center gap-2 text-sm",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/channels",
						className: "font-medium text-teal",
						children: "All channels"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "text-faint",
						children: "/"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "font-medium text-ink",
						children: meta.name
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageIntro, {
				eyebrow: `${meta.surface} · ${model.name}`,
				title: `What is ${meta.short} actually doing in this window?`,
				lede: `${meta.name} holds ${pct(share)} of model credit. It touches ${num(drill.touched)} orders and closes ${pct(drill.stat.present ? drill.stat.closer / drill.stat.present : 0)} of them. Platform pixels still claim ${money(drill.stat.platform)}.`
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Surface, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SectionTitle, {
				title: "Sources compiled into this view",
				hint: connected.length ? `${connected.map((feed) => feed.name).join(", ")} ${connected.length === 1 ? "is" : "are"} connected. The credit math still uses the compiled ledger.` : "Nothing is connected yet. The charts use the compiled sample ledger until you add an API in Settings.",
				action: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
					to: "/settings",
					className: "text-sm font-semibold text-teal",
					children: "Configure integrations"
				})
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
				className: "flex flex-wrap gap-2",
				children: feeds.map((feed) => {
					const record = integrations[feed.id];
					const on = record?.status === "connected";
					return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
						to: "/settings",
						className: cn("inline-flex h-11 max-w-full items-center gap-2 rounded-full px-3 text-sm", on ? "bg-good-bg text-teal" : "bg-canvas text-muted"),
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: cn("size-2 rounded-full", on ? "bg-teal-bright" : "bg-faint"),
								"aria-hidden": "true"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "truncate font-medium",
								children: feed.name
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-xs",
								children: on ? record.property : "Not connected"
							})
						]
					}) }, feed.id);
				})
			})] }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid gap-3 sm:grid-cols-2 xl:grid-cols-4",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Kpi, {
						tone: "navy",
						label: "Model credit",
						value: money(drill.stat.revenue),
						detail: `${pct(share)} of order revenue`
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Kpi, {
						label: "Spend",
						value: money(drill.stat.spend),
						detail: `${roas(drill.stat.roas)} model ROAS`
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Kpi, {
						label: "Incremental ROAS",
						value: roas(drill.stat.iroas),
						detail: `Platform still reads ${roas(drill.stat.platformRoas)}`
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Kpi, {
						label: "Assist rate",
						value: pct(assistRate),
						detail: `${num(drill.touched)} orders touched`
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid gap-4 lg:grid-cols-3",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Surface, {
					className: "min-w-0 lg:col-span-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SectionTitle, {
						title: "Credit, claim, and spend",
						hint: "The pale area is what platforms claim on orders this channel touched. The color is model credit. The line is spend."
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChannelTrend, {
						series: drill.series,
						color: CHANNEL_COLOR[channelId]
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Surface, {
					className: "min-w-0",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SectionTitle, {
						title: "Role in the path",
						hint: "Where this channel sits when it shows up."
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(RoleChart, {
						rows: drill.roles,
						color: CHANNEL_COLOR[channelId]
					})]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Surface, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SectionTitle, {
				title: "Cross-channel overlap",
				hint: "Orders where this channel shares the path. Credit is split by the model you have selected."
			}), drill.partners.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-sm text-muted",
				children: "Every order this channel touches is solo. No partner to split with."
			}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "w-full max-w-full overflow-x-auto",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("table", {
					className: "w-full min-w-0 text-left text-sm",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("thead", {
						className: "text-xs font-semibold tracking-wide text-muted uppercase",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", { children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
								className: "pb-3 font-semibold",
								children: "Partner"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
								className: "pb-3 text-right font-semibold",
								children: "Shared orders"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
								className: "pb-3 text-right font-semibold",
								children: "Order value"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
								className: "pb-3 text-right font-semibold",
								children: "Our credit"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
								className: "pb-3 text-right font-semibold",
								children: "Their credit"
							})
						] })
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("tbody", {
						className: "divide-y divide-line",
						children: drill.partners.map((partner) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", { children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
								className: "py-3",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
									to: "/channels/$channelId",
									params: { channelId: partner.id },
									className: "inline-flex items-center gap-2 font-medium",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChannelGlyph, {
										id: partner.id,
										className: "size-7"
									}), partner.name]
								})
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
								className: "py-3 text-right tabular-nums",
								children: num(partner.orders)
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
								className: "py-3 text-right tabular-nums",
								children: money(partner.shared)
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
								className: "py-3 text-right font-medium tabular-nums",
								children: money(partner.ourCredit)
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
								className: "py-3 text-right tabular-nums text-muted",
								children: money(partner.theirCredit)
							})
						] }, partner.id))
					})]
				})
			})] }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid gap-4 lg:grid-cols-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Surface, {
					className: "min-w-0",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SectionTitle, {
						title: "Paths that include this channel",
						hint: "Most common routes, with the role this channel plays."
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
						className: "divide-y divide-line",
						children: drill.paths.map((path) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
							className: "py-3",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex flex-wrap items-center justify-between gap-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "font-medium text-ink",
									children: stepLabel(path.steps)
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "rounded-full bg-canvas px-2.5 py-1 text-xs font-semibold text-muted",
									children: path.role
								})]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
								className: "mt-1 text-sm tabular-nums text-muted",
								children: [
									num(path.orders),
									" orders · ",
									money(path.revenue)
								]
							})]
						}, path.key))
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Surface, {
					className: "min-w-0",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SectionTitle, {
						title: "Week by week",
						hint: "Compiled inside the selected date range."
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "w-full max-w-full overflow-x-auto",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("table", {
							className: "w-full text-left text-sm",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("thead", {
								className: "text-xs font-semibold tracking-wide text-muted uppercase",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", { children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
										className: "pb-3 font-semibold",
										children: "Week of"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
										className: "pb-3 text-right font-semibold",
										children: "Credit"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
										className: "pb-3 text-right font-semibold",
										children: "Spend"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
										className: "pb-3 text-right font-semibold",
										children: "Claim"
									})
								] })
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("tbody", {
								className: "divide-y divide-line",
								children: weeks.map((week) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", { children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
										className: "py-2.5 tabular-nums",
										children: week.label
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
										className: "py-2.5 text-right font-medium tabular-nums",
										children: money(week.credit)
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
										className: "py-2.5 text-right tabular-nums text-muted",
										children: money(week.spend)
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
										className: "py-2.5 text-right tabular-nums text-muted",
										children: money(week.platform)
									})
								] }, week.label))
							})]
						})
					})]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Surface, {
				id: "channel-campaigns",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SectionTitle, {
					title: `Campaigns in ${meta.short}`,
					hint: "Open a line to inspect its slice of this channel."
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
					className: "divide-y divide-line",
					children: campaigns.map((campaign) => {
						const active = campaign.id === openId;
						const max = Math.max(...campaigns.map((item) => item.revenue), 1);
						return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
							type: "button",
							"aria-expanded": active,
							onClick: () => setOpenId(active ? "" : campaign.id),
							className: "flex w-full flex-wrap items-center justify-between gap-3 py-3 text-left",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "block font-medium text-ink",
								children: campaign.name
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
								className: "text-sm text-muted",
								children: [
									campaign.owner,
									" · ",
									campaign.team,
									" · ",
									STATUS[campaign.status] ?? campaign.status
								]
							})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
								className: "min-w-36 flex-1 sm:max-w-xs",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Meter, { value: campaign.revenue / max }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
									className: "mt-1 block text-right text-sm tabular-nums text-muted",
									children: [
										roas(campaign.roas),
										" · ",
										money(campaign.spend)
									]
								})]
							})]
						}), active && inspected ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("dl", {
							className: "mb-3 grid gap-3 rounded-xl bg-canvas p-3 sm:grid-cols-4",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Cell, {
									label: "Credit",
									value: money(inspected.revenue)
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Cell, {
									label: "Incremental",
									value: money(inspected.incremental)
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Cell, {
									label: "iROAS",
									value: roas(inspected.iroas)
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Cell, {
									label: "Spend share",
									value: pct(inspected.share)
								})
							]
						}) : null] }, campaign.id);
					})
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Surface, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SectionTitle, {
				title: "Recent orders on this channel",
				hint: "Newest conversions the channel touched. Each glyph is a step."
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
				className: "divide-y divide-line",
				children: drill.orders.map((order) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
					className: "flex flex-wrap items-center justify-between gap-3 py-3",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "flex min-w-0 items-center gap-1",
						children: order.touches.map((touch, index) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChannelGlyph, {
							id: touch.channel,
							className: "size-7"
						}, `${order.id}-${index}`))
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "text-sm tabular-nums text-muted",
						children: [
							order.convertedOn,
							" · ",
							money(order.value),
							order.newCustomer ? " · new" : " · returning"
						]
					})]
				}, order.id))
			})] })
		]
	});
}
function Cell({ label, value }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", {
		className: "text-xs font-semibold tracking-wide text-muted uppercase",
		children: label
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("dd", {
		className: "mt-1 font-semibold tabular-nums text-ink",
		children: value
	})] });
}
function ChannelDetailRoute() {
	const { channelId } = Route$1.useParams();
	const { campaign } = Route$1.useSearch();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChannelDetailPage, {
		channelId,
		campaignId: campaign
	});
}
//#endregion
export { ChannelDetailRoute as component };
