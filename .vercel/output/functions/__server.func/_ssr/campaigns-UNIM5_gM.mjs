import { i as __toESM } from "../_runtime.mjs";
import { r as CHANNELS } from "./content-YC0dq67J.mjs";
import { X as require_jsx_runtime, Y as require_react, b as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { b as useUi, d as controlClass, h as money, l as Surface, n as ChannelGlyph, o as PageIntro, u as cn, v as roas } from "./ui-x5KaUPcl.mjs";
import { l as useSnapshot, n as channelMeta } from "./use-snapshot-C6PjU5zX.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/campaigns-UNIM5_gM.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var STATUSES = [
	{
		id: "all",
		label: "All statuses"
	},
	{
		id: "live",
		label: "Live"
	},
	{
		id: "learning",
		label: "Learning"
	},
	{
		id: "paused",
		label: "Paused"
	},
	{
		id: "scheduled",
		label: "Scheduled"
	}
];
function CampaignsPage() {
	const snapshot = useSnapshot();
	const notes = useUi((state) => state.notes);
	const setNote = useUi((state) => state.setNote);
	const [query, setQuery] = (0, import_react.useState)("");
	const [channel, setChannel] = (0, import_react.useState)("all");
	const [status, setStatus] = (0, import_react.useState)("all");
	const [selectedId, setSelectedId] = (0, import_react.useState)(null);
	const [draft, setDraft] = (0, import_react.useState)("");
	const rows = (0, import_react.useMemo)(() => {
		const q = query.trim().toLowerCase();
		return snapshot.campaigns.filter((campaign) => {
			if (channel !== "all" && campaign.channel !== channel) return false;
			if (status !== "all" && campaign.status !== status) return false;
			if (!q) return true;
			return campaign.name.toLowerCase().includes(q) || campaign.owner.toLowerCase().includes(q) || campaign.team.toLowerCase().includes(q);
		});
	}, [
		snapshot.campaigns,
		query,
		channel,
		status
	]);
	const selected = rows.find((row) => row.id === selectedId) ?? rows[0] ?? null;
	(0, import_react.useEffect)(() => {
		setDraft(selected ? notes[selected.id] ?? "" : "");
	}, [selected, notes]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "space-y-6",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageIntro, {
				eyebrow: "Campaigns",
				title: "Budget lines, with the credit model applied.",
				lede: "Filter the book, open a line, and leave the note the next person in the room will actually read. Notes stay in this browser."
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Surface, { children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex flex-wrap gap-2",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
							className: "sr-only",
							htmlFor: "campaign-search",
							children: "Search campaigns"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
							id: "campaign-search",
							value: query,
							onChange: (event) => setQuery(event.target.value),
							placeholder: "Search name or owner",
							className: cn(controlClass, "min-w-0 flex-1 sm:max-w-xs")
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
							"aria-label": "Channel",
							className: controlClass,
							value: channel,
							onChange: (event) => setChannel(event.target.value),
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
								value: "all",
								children: "All channels"
							}), CHANNELS.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
								value: item.id,
								children: item.name
							}, item.id))]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("select", {
							"aria-label": "Status",
							className: controlClass,
							value: status,
							onChange: (event) => setStatus(event.target.value),
							children: STATUSES.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
								value: item.id,
								children: item.label
							}, item.id))
						})
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mt-4 hidden md:block",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("table", {
						className: "w-full text-left text-sm",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("thead", {
							className: "text-xs font-semibold tracking-wide text-muted uppercase",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", { children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
									className: "pb-3 font-semibold",
									children: "Campaign"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
									className: "pb-3 font-semibold",
									children: "Status"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
									className: "pb-3 text-right font-semibold",
									children: "Spend"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
									className: "pb-3 text-right font-semibold",
									children: "Credit"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
									className: "pb-3 text-right font-semibold",
									children: "ROAS"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
									className: "pb-3 text-right font-semibold",
									children: "iROAS"
								})
							] })
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("tbody", {
							className: "divide-y divide-line",
							children: rows.map((campaign) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", {
								tabIndex: 0,
								role: "button",
								"aria-pressed": selected?.id === campaign.id,
								onClick: () => setSelectedId(campaign.id),
								onKeyDown: (event) => {
									if (event.key === "Enter" || event.key === " ") {
										event.preventDefault();
										setSelectedId(campaign.id);
									}
								},
								className: cn("cursor-pointer", selected?.id === campaign.id && "bg-good-bg"),
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("td", {
										className: "py-3 pr-3",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "font-medium text-ink",
											children: campaign.name
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
											className: "mt-0.5 block text-xs text-muted",
											children: [
												channelMeta(campaign.channel).short,
												" · ",
												campaign.owner
											]
										})]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
										className: "py-3 capitalize text-muted",
										children: campaign.status
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
										className: "py-3 text-right tabular-nums",
										children: money(campaign.spend)
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
										className: "py-3 text-right tabular-nums",
										children: money(campaign.revenue)
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
										className: "py-3 text-right font-medium tabular-nums",
										children: roas(campaign.roas)
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
										className: "py-3 text-right tabular-nums",
										children: roas(campaign.iroas)
									})
								]
							}, campaign.id))
						})]
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
					className: "mt-4 space-y-2 md:hidden",
					children: rows.map((campaign) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
						type: "button",
						onClick: () => setSelectedId(campaign.id),
						className: cn("w-full rounded-xl px-3 py-3 text-left", selected?.id === campaign.id ? "bg-good-bg ring-2 ring-teal" : "bg-canvas"),
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "font-medium text-ink",
							children: campaign.name
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
							className: "mt-1 block text-sm text-muted",
							children: [
								channelMeta(campaign.channel).short,
								" · ",
								roas(campaign.roas),
								" · ",
								money(campaign.spend)
							]
						})]
					}) }, campaign.id))
				}),
				rows.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-4 text-sm text-muted",
					children: "Nothing matches those filters."
				}) : null
			] }),
			selected ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CampaignDetail, {
				campaign: selected,
				draft,
				setDraft,
				onSave: () => setNote(selected.id, draft.trim()),
				saved: notes[selected.id] ?? ""
			}) : null
		]
	});
}
function CampaignDetail({ campaign, draft, setDraft, onSave, saved }) {
	const channel = channelMeta(campaign.channel);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Surface, { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex flex-wrap items-start gap-3",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChannelGlyph, { id: campaign.channel }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-xs font-semibold tracking-widest text-teal uppercase",
					children: channel.name
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "mt-1 text-xl font-semibold text-ink",
					children: campaign.name
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "mt-1 text-sm text-muted",
					children: [
						campaign.owner,
						" · ",
						campaign.team,
						" · ",
						campaign.status
					]
				})
			] })]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("dl", {
			className: "mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-4",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Metric, {
					label: "Spend",
					value: money(campaign.spend)
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Metric, {
					label: "Model credit",
					value: money(campaign.revenue)
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Metric, {
					label: "ROAS",
					value: roas(campaign.roas)
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Metric, {
					label: "Incremental ROAS",
					value: roas(campaign.iroas)
				})
			]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "mt-4 text-sm text-muted",
			children: campaign.status === "learning" ? "Still inside the platform learning phase. Treat the ROAS as thin until it exits." : campaign.status === "paused" ? "Paused lines still hold credit from the days they ran inside this window." : campaign.status === "scheduled" ? "Scheduled. Spend share is the plan, not a live auction." : "Live. Credit is this line's slice of the channel under the selected model."
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
			to: "/channels/$channelId",
			params: { channelId: campaign.channel },
			search: { campaign: campaign.id },
			className: "mt-3 inline-flex h-11 items-center text-sm font-semibold text-teal",
			children: [
				"Open in ",
				channel.short,
				" drill-down"
			]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
			htmlFor: "campaign-note",
			className: "mt-5 block text-sm font-semibold text-ink",
			children: "Team note"
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("textarea", {
			id: "campaign-note",
			value: draft,
			onChange: (event) => setDraft(event.target.value),
			rows: 3,
			placeholder: "What should the next person know before they change the bid?",
			className: "mt-2 w-full rounded-xl bg-canvas px-3 py-3 text-sm text-ink outline-none"
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mt-3 flex flex-wrap items-center gap-3",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
				type: "button",
				onClick: onSave,
				className: "h-11 rounded-xl bg-teal px-4 text-sm font-semibold text-on-teal",
				children: "Save note"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-sm text-muted",
				children: saved ? "Saved in this browser." : "Nothing saved yet."
			})]
		})
	] });
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
var SplitComponent = CampaignsPage;
//#endregion
export { SplitComponent as component };
