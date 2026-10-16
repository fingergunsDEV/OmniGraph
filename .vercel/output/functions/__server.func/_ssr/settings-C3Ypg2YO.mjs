import { i as __toESM } from "../_runtime.mjs";
import { m as WORKSPACES, s as MEASUREMENT } from "./content-YC0dq67J.mjs";
import { X as require_jsx_runtime, Y as require_react } from "../_libs/@tanstack/react-router+[...].mjs";
import { _ as pct, b as useUi, d as controlClass, l as Surface, o as PageIntro, p as integrationMeta, r as INTEGRATIONS, s as SectionTitle, u as cn } from "./ui-x5KaUPcl.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/settings-C3Ypg2YO.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var TABS = [
	{
		id: "integrations",
		label: "Integrations"
	},
	{
		id: "workspace",
		label: "Workspace"
	},
	{
		id: "activity",
		label: "Sync activity"
	}
];
function SettingsPage() {
	const [tab, setTab] = (0, import_react.useState)("integrations");
	const [active, setActive] = (0, import_react.useState)("ga4");
	const workspaceId = useUi((state) => state.workspaceId);
	const integrations = useUi((state) => state.integrations);
	const syncLog = useUi((state) => state.syncLog);
	const connect = useUi((state) => state.connectIntegration);
	const disconnect = useUi((state) => state.disconnectIntegration);
	const sync = useUi((state) => state.syncIntegrations);
	const reset = useUi((state) => state.reset);
	const workspace = WORKSPACES.find((item) => item.id === workspaceId) ?? WORKSPACES[0];
	const measure = MEASUREMENT[workspace.id];
	const connectedCount = INTEGRATIONS.filter((item) => integrations[item.id]?.status === "connected").length;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "space-y-6",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageIntro, {
				eyebrow: "Settings",
				title: "Which sources feed the graph?",
				lede: "Connect Google Analytics, Search Console, ad accounts, and the store. Keys stay in this browser. OmniGraph records the property and stages a pull — it does not call those APIs from here."
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "flex flex-wrap gap-2",
				role: "tablist",
				"aria-label": "Settings sections",
				children: TABS.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					type: "button",
					role: "tab",
					"aria-selected": tab === item.id,
					onClick: () => setTab(item.id),
					className: cn("h-11 rounded-full px-4 text-sm font-medium", tab === item.id ? "bg-navy text-on-navy" : "bg-surface text-muted shadow-card"),
					children: item.label
				}, item.id))
			}),
			tab === "integrations" ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid gap-4 lg:grid-cols-5",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "space-y-2 lg:col-span-2",
					children: INTEGRATIONS.map((item) => {
						const on = integrations[item.id]?.status === "connected";
						return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
							type: "button",
							"aria-pressed": active === item.id,
							onClick: () => setActive(item.id),
							className: cn("flex w-full items-center justify-between gap-3 rounded-2xl bg-surface px-4 py-3 text-left shadow-card", active === item.id && "ring-2 ring-teal"),
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
								className: "min-w-0",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "block font-medium text-ink",
									children: item.name
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "block truncate text-sm text-muted",
									children: item.vendor
								})]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: cn("shrink-0 rounded-full px-2.5 py-1 text-xs font-semibold", on ? "bg-good-bg text-teal" : "bg-canvas text-muted"),
								children: on ? "Connected" : "Off"
							})]
						}, item.id);
					})
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "lg:col-span-3",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(IntegrationForm, {
						id: active,
						property: integrations[active]?.property ?? "",
						connected: integrations[active]?.status === "connected",
						message: integrations[active]?.message ?? "",
						rows: integrations[active]?.rows ?? 0,
						lastSync: integrations[active]?.lastSync ?? null,
						onConnect: connect,
						onDisconnect: disconnect
					}, active)
				})]
			}) : null,
			tab === "workspace" ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Surface, { children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SectionTitle, {
					title: workspace.name,
					hint: `${workspace.category}. ${connectedCount} of ${INTEGRATIONS.length} sources connected for this browser.`
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "max-w-2xl text-sm text-muted",
					children: workspace.brief
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("dl", {
					className: "mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-4",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stat, {
							label: "Match rate",
							value: pct(measure.matchRate)
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stat, {
							label: "Consent",
							value: pct(measure.consentRate)
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stat, {
							label: "Modeled share",
							value: pct(measure.modeledShare)
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stat, {
							label: "Profiles",
							value: measure.profiles
						})
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "mt-4 text-sm text-muted",
					children: [
						"Identity lag is ",
						measure.lagHours,
						" hours. Switch the brand from the header. Reset clears notes, decisions, and saved connections on this browser."
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					type: "button",
					onClick: reset,
					className: "mt-4 h-11 rounded-xl bg-canvas px-4 text-sm font-semibold text-ink",
					children: "Reset this browser"
				})
			] }) : null,
			tab === "activity" ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Surface, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SectionTitle, {
				title: "Sync activity",
				hint: "A sync refreshes staged row counts for sources that are already connected.",
				action: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					type: "button",
					onClick: () => sync(),
					className: "h-11 rounded-xl bg-navy px-4 text-sm font-semibold text-on-navy",
					children: "Sync connected sources"
				})
			}), syncLog.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-sm text-muted",
				children: "No syncs yet. Connect Google Analytics or Search Console, then run a sync."
			}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
				className: "divide-y divide-line",
				children: syncLog.map((event) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
					className: "py-3",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "font-medium text-ink",
						children: event.title
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "text-sm text-muted",
						children: [
							event.at,
							" · ",
							event.detail
						]
					})]
				}, event.id))
			})] }) : null
		]
	});
}
function IntegrationForm({ id, property, connected, message, rows, lastSync, onConnect, onDisconnect }) {
	const def = integrationMeta(id);
	const [propertyDraft, setPropertyDraft] = (0, import_react.useState)(property);
	const [secret, setSecret] = (0, import_react.useState)("");
	const [error, setError] = (0, import_react.useState)("");
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Surface, { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "text-xs font-semibold tracking-widest text-teal uppercase",
			children: def.vendor
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
			className: "mt-1 text-xl font-semibold text-ink",
			children: def.name
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "mt-2 text-sm text-muted",
			children: def.blurb
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
			className: "mt-5 space-y-3",
			onSubmit: (event) => {
				event.preventDefault();
				const result = onConnect(id, propertyDraft, secret);
				setError(result ?? "");
				if (!result) setSecret("");
			},
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
					className: "block text-sm font-semibold text-ink",
					htmlFor: "integration-property",
					children: def.propertyLabel
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
					id: "integration-property",
					value: propertyDraft,
					onChange: (event) => setPropertyDraft(event.target.value),
					placeholder: def.propertyHint,
					autoComplete: "off",
					className: cn(controlClass, "w-full")
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
					className: "block text-sm font-semibold text-ink",
					htmlFor: "integration-secret",
					children: def.secretLabel
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
					id: "integration-secret",
					type: "password",
					value: secret,
					onChange: (event) => setSecret(event.target.value),
					placeholder: connected ? "Paste a new key to replace the saved one" : "Paste a key or token",
					autoComplete: "off",
					className: cn(controlClass, "w-full")
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "text-sm text-muted",
					children: ["Scopes: ", def.scopes.join(", ")]
				}),
				error ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					role: "alert",
					className: "text-sm font-medium text-risk",
					children: error
				}) : null,
				connected && !error ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					role: "status",
					className: "text-sm text-teal",
					children: [
						message || "Connected.",
						" ",
						rows.toLocaleString("en-US"),
						" rows",
						lastSync ? ` · last sync ${lastSync.slice(0, 16).replace("T", " ")}` : "",
						"."
					]
				}) : null,
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex flex-wrap gap-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "submit",
						className: "h-11 rounded-xl bg-navy px-4 text-sm font-semibold text-on-navy",
						children: connected ? "Update connection" : "Test connection"
					}), connected ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						onClick: () => onDisconnect(id),
						className: "h-11 rounded-xl bg-canvas px-4 text-sm font-semibold text-ink",
						children: "Disconnect"
					}) : null]
				})
			]
		})
	] });
}
function Stat({ label, value }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", {
		className: "text-xs font-semibold tracking-wide text-muted uppercase",
		children: label
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("dd", {
		className: "mt-1 text-xl font-semibold tabular-nums text-ink",
		children: value
	})] });
}
var SplitComponent = SettingsPage;
//#endregion
export { SplitComponent as component };
