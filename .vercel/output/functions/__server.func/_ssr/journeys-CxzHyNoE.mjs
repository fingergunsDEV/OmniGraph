import { i as __toESM } from "../_runtime.mjs";
import { c as MODELS, r as CHANNELS } from "./content-YC0dq67J.mjs";
import { X as require_jsx_runtime, Y as require_react } from "../_libs/@tanstack/react-router+[...].mjs";
import { d as controlClass, g as num, h as money, l as Surface, m as longDate, n as ChannelGlyph, o as PageIntro, s as SectionTitle, u as cn } from "./ui-x5KaUPcl.mjs";
import { i as journeyCredits, l as useSnapshot, n as channelMeta } from "./use-snapshot-C6PjU5zX.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/journeys-CxzHyNoE.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function JourneysPage() {
	const snapshot = useSnapshot();
	const [channel, setChannel] = (0, import_react.useState)("all");
	const [sort, setSort] = (0, import_react.useState)("value");
	const [pathKey, setPathKey] = (0, import_react.useState)(null);
	const [selectedId, setSelectedId] = (0, import_react.useState)(null);
	const filtered = (0, import_react.useMemo)(() => {
		const rows = snapshot.journeys.filter((journey) => {
			if (channel !== "all" && !journey.touches.some((touch) => touch.channel === channel)) return false;
			if (pathKey && dedupe(journey).join(">") !== pathKey) return false;
			return true;
		});
		rows.sort((a, b) => sort === "value" ? b.value - a.value : b.convertedOn.localeCompare(a.convertedOn) || b.value - a.value);
		return rows;
	}, [
		snapshot.journeys,
		channel,
		sort,
		pathKey
	]);
	const selected = filtered.find((journey) => journey.id === selectedId) ?? filtered[0] ?? null;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "space-y-6",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageIntro, {
				eyebrow: "Journeys",
				title: "Every order is a path, not a platform.",
				lede: `${num(snapshot.journeys.length)} orders in this window. Open one to see the touches, the days between them, and how each model would split the revenue.`
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Surface, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SectionTitle, {
				title: "Common paths",
				hint: "Click a path to filter the list."
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex flex-wrap gap-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FilterChip, {
					active: pathKey === null,
					onClick: () => setPathKey(null),
					label: "All paths"
				}), snapshot.paths.map((path) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FilterChip, {
					active: pathKey === path.key,
					onClick: () => setPathKey(path.key),
					label: `${path.steps.map((step) => channelMeta(step).short).join(" → ")} · ${money(path.revenue)}`
				}, path.key))]
			})] }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid gap-4 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)]",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Surface, { children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mb-4 flex flex-wrap gap-2",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
								className: "sr-only",
								htmlFor: "journey-channel",
								children: "Channel"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
								id: "journey-channel",
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
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "inline-flex items-center rounded-xl bg-canvas p-1",
								role: "group",
								"aria-label": "Sort",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SortButton, {
									current: sort,
									id: "value",
									setSort,
									label: "Largest"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SortButton, {
									current: sort,
									id: "recent",
									setSort,
									label: "Latest"
								})]
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "mb-3 text-sm text-muted",
						children: [
							"Showing ",
							Math.min(filtered.length, 24),
							" of ",
							num(filtered.length)
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
						className: "max-h-[32rem] space-y-2 overflow-auto",
						children: filtered.slice(0, 24).map((journey) => {
							const active = selected?.id === journey.id;
							return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
								type: "button",
								onClick: () => setSelectedId(journey.id),
								className: cn("w-full rounded-xl px-3 py-3 text-left", active ? "bg-good-bg ring-2 ring-teal" : "bg-canvas"),
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
									className: "flex items-center justify-between gap-3",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "text-sm font-medium text-ink",
										children: pathLabel(journey)
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "text-sm font-semibold tabular-nums text-ink",
										children: money(journey.value)
									})]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
									className: "mt-1 block text-xs text-muted",
									children: [longDate(journey.convertedOn), journey.newCustomer ? " · New" : " · Returning"]
								})]
							}) }, journey.id);
						})
					}),
					filtered.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-sm text-muted",
						children: "No journeys match that filter."
					}) : null
				] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Surface, { children: selected ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(JourneyDetail, {
					journey: selected,
					model: snapshot.model
				}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-sm text-muted",
					children: "No journey selected."
				}) })]
			})
		]
	});
}
function JourneyDetail({ journey, model }) {
	const credits = journeyCredits(journey, model);
	const entries = CHANNELS.map((channel) => ({
		channel,
		value: credits[channel.id]
	})).filter((entry) => entry.value > .5);
	const max = Math.max(...entries.map((entry) => entry.value), 1);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SectionTitle, {
			title: money(journey.value),
			hint: `${longDate(journey.convertedOn)} · ${journey.newCustomer ? "New customer" : "Returning customer"}`
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ol", {
			className: "flex flex-wrap items-center gap-2",
			children: journey.touches.map((touch, index) => {
				const previous = journey.touches[index - 1];
				const gap = previous ? previous.daysBefore - touch.daysBefore : null;
				return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
					className: "flex items-center gap-2",
					children: [gap !== null ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
						className: "text-xs text-faint",
						children: [gap, "d"]
					}) : null, /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
						className: "inline-flex h-11 items-center gap-2 rounded-full bg-canvas pr-3 pl-1.5 text-sm font-medium",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChannelGlyph, { id: touch.channel }), channelMeta(touch.channel).short]
					})]
				}, `${journey.id}-${index}`);
			})
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h3", {
			className: "mt-6 text-sm font-semibold text-ink",
			children: [MODELS.find((item) => item.id === model)?.name, " split"]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
			className: "mt-3 space-y-2",
			children: entries.map((entry) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
				className: "flex items-center gap-2 text-sm",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "w-24 shrink-0",
						children: entry.channel.short
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "h-2 min-w-0 flex-1 overflow-hidden rounded-full bg-canvas",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "block h-full rounded-full",
							style: {
								width: `${entry.value / max * 100}%`,
								background: `var(--color-ch-${entry.channel.id})`
							}
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "w-16 shrink-0 text-right tabular-nums",
						children: money(entry.value)
					})
				]
			}, entry.channel.id))
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "mt-5 w-full max-w-full overflow-x-auto",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("table", {
				className: "w-full text-left text-sm",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("thead", {
					className: "text-xs font-semibold tracking-wide text-muted uppercase",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
						className: "pb-2 font-semibold",
						children: "Model"
					}), CHANNELS.filter((channel) => journey.touches.some((touch) => touch.channel === channel.id)).map((channel) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
						className: "pb-2 text-right font-semibold",
						children: channel.short
					}, channel.id))] })
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("tbody", {
					className: "divide-y divide-line",
					children: MODELS.map((item) => {
						const split = journeyCredits(journey, item.id);
						const touched = CHANNELS.filter((channel) => journey.touches.some((touch) => touch.channel === channel.id));
						return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", {
							className: item.id === model ? "font-semibold" : void 0,
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
								className: "py-2",
								children: item.name
							}), touched.map((channel) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
								className: "py-2 text-right tabular-nums",
								children: money(split[channel.id])
							}, channel.id))]
						}, item.id);
					})
				})]
			})
		})
	] });
}
function FilterChip({ active, onClick, label }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
		type: "button",
		"aria-pressed": active,
		onClick,
		className: cn("h-11 rounded-full px-3 text-sm", active ? "bg-navy text-on-navy" : "bg-canvas text-ink"),
		children: label
	});
}
function SortButton({ current, id, setSort, label }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
		type: "button",
		"aria-pressed": current === id,
		onClick: () => setSort(id),
		className: cn("h-11 rounded-lg px-3 text-sm font-medium", current === id ? "bg-surface text-ink shadow-card" : "text-muted"),
		children: label
	});
}
function dedupe(journey) {
	const steps = [];
	for (const touch of journey.touches) if (steps[steps.length - 1] !== touch.channel) steps.push(touch.channel);
	return steps;
}
function pathLabel(journey) {
	return dedupe(journey).map((step) => channelMeta(step).short).join(" → ");
}
var SplitComponent = JourneysPage;
//#endregion
export { SplitComponent as component };
