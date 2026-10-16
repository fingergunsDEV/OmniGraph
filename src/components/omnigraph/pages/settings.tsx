import { useState } from "react";
import { PageIntro, SectionTitle, Surface, controlClass } from "@/components/omnigraph/ui";
import { MEASUREMENT, WORKSPACES } from "@/lib/omnigraph/content";
import { pct } from "@/lib/omnigraph/format";
import {
  INTEGRATIONS,
  type IntegrationId,
  integrationMeta,
} from "@/lib/omnigraph/integrations";
import { useUi } from "@/lib/omnigraph/store";
import { cn } from "@/lib/utils";

type Tab = "integrations" | "workspace" | "activity";

const TABS: { id: Tab; label: string }[] = [
  { id: "integrations", label: "Integrations" },
  { id: "workspace", label: "Workspace" },
  { id: "activity", label: "Sync activity" },
];

export function SettingsPage() {
  const [tab, setTab] = useState<Tab>("integrations");
  const [active, setActive] = useState<IntegrationId>("ga4");
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

  return (
    <div className="space-y-6">
      <PageIntro
        eyebrow="Settings"
        title="Which sources feed the graph?"
        lede="Connect Google Analytics, Search Console, ad accounts, and the store. Keys stay in this browser. OmniGraph records the property and stages a pull — it does not call those APIs from here."
      />

      <div className="flex flex-wrap gap-2" role="tablist" aria-label="Settings sections">
        {TABS.map((item) => (
          <button
            key={item.id}
            type="button"
            role="tab"
            aria-selected={tab === item.id}
            onClick={() => setTab(item.id)}
            className={cn(
              "h-11 rounded-full px-4 text-sm font-medium",
              tab === item.id ? "bg-navy text-on-navy" : "bg-surface text-muted shadow-card",
            )}
          >
            {item.label}
          </button>
        ))}
      </div>

      {tab === "integrations" ? (
        <div className="grid gap-4 lg:grid-cols-5">
          <div className="space-y-2 lg:col-span-2">
            {INTEGRATIONS.map((item) => {
              const record = integrations[item.id];
              const on = record?.status === "connected";
              return (
                <button
                  key={item.id}
                  type="button"
                  aria-pressed={active === item.id}
                  onClick={() => setActive(item.id)}
                  className={cn(
                    "flex w-full items-center justify-between gap-3 rounded-2xl bg-surface px-4 py-3 text-left shadow-card",
                    active === item.id && "ring-2 ring-teal",
                  )}
                >
                  <span className="min-w-0">
                    <span className="block font-medium text-ink">{item.name}</span>
                    <span className="block truncate text-sm text-muted">{item.vendor}</span>
                  </span>
                  <span
                    className={cn(
                      "shrink-0 rounded-full px-2.5 py-1 text-xs font-semibold",
                      on ? "bg-good-bg text-teal" : "bg-canvas text-muted",
                    )}
                  >
                    {on ? "Connected" : "Off"}
                  </span>
                </button>
              );
            })}
          </div>
          <div className="lg:col-span-3">
            <IntegrationForm
              key={active}
              id={active}
              property={integrations[active]?.property ?? ""}
              connected={integrations[active]?.status === "connected"}
              message={integrations[active]?.message ?? ""}
              rows={integrations[active]?.rows ?? 0}
              lastSync={integrations[active]?.lastSync ?? null}
              onConnect={connect}
              onDisconnect={disconnect}
            />
          </div>
        </div>
      ) : null}

      {tab === "workspace" ? (
        <Surface>
          <SectionTitle
            title={workspace.name}
            hint={`${workspace.category}. ${connectedCount} of ${INTEGRATIONS.length} sources connected for this browser.`}
          />
          <p className="max-w-2xl text-sm text-muted">{workspace.brief}</p>
          <dl className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <Stat label="Match rate" value={pct(measure.matchRate)} />
            <Stat label="Consent" value={pct(measure.consentRate)} />
            <Stat label="Modeled share" value={pct(measure.modeledShare)} />
            <Stat label="Profiles" value={measure.profiles} />
          </dl>
          <p className="mt-4 text-sm text-muted">
            Identity lag is {measure.lagHours} hours. Switch the brand from the header. Reset clears notes, decisions, and saved connections on this browser.
          </p>
          <button
            type="button"
            onClick={reset}
            className="mt-4 h-11 rounded-xl bg-canvas px-4 text-sm font-semibold text-ink"
          >
            Reset this browser
          </button>
        </Surface>
      ) : null}

      {tab === "activity" ? (
        <Surface>
          <SectionTitle
            title="Sync activity"
            hint="A sync refreshes staged row counts for sources that are already connected."
            action={
              <button
                type="button"
                onClick={() => sync()}
                className="h-11 rounded-xl bg-navy px-4 text-sm font-semibold text-on-navy"
              >
                Sync connected sources
              </button>
            }
          />
          {syncLog.length === 0 ? (
            <p className="text-sm text-muted">No syncs yet. Connect Google Analytics or Search Console, then run a sync.</p>
          ) : (
            <ul className="divide-y divide-line">
              {syncLog.map((event) => (
                <li key={event.id} className="py-3">
                  <p className="font-medium text-ink">{event.title}</p>
                  <p className="text-sm text-muted">
                    {event.at} · {event.detail}
                  </p>
                </li>
              ))}
            </ul>
          )}
        </Surface>
      ) : null}
    </div>
  );
}

function IntegrationForm({
  id,
  property,
  connected,
  message,
  rows,
  lastSync,
  onConnect,
  onDisconnect,
}: {
  id: IntegrationId;
  property: string;
  connected: boolean;
  message: string;
  rows: number;
  lastSync: string | null;
  onConnect: (id: IntegrationId, property: string, secret: string) => string | null;
  onDisconnect: (id: IntegrationId) => void;
}) {
  const def = integrationMeta(id);
  const [propertyDraft, setPropertyDraft] = useState(property);
  const [secret, setSecret] = useState("");
  const [error, setError] = useState("");

  return (
    <Surface>
      <p className="text-xs font-semibold tracking-widest text-teal uppercase">{def.vendor}</p>
      <h2 className="mt-1 text-xl font-semibold text-ink">{def.name}</h2>
      <p className="mt-2 text-sm text-muted">{def.blurb}</p>
      <form
        className="mt-5 space-y-3"
        onSubmit={(event) => {
          event.preventDefault();
          const result = onConnect(id, propertyDraft, secret);
          setError(result ?? "");
          if (!result) setSecret("");
        }}
      >
        <label className="block text-sm font-semibold text-ink" htmlFor="integration-property">
          {def.propertyLabel}
        </label>
        <input
          id="integration-property"
          value={propertyDraft}
          onChange={(event) => setPropertyDraft(event.target.value)}
          placeholder={def.propertyHint}
          autoComplete="off"
          className={cn(controlClass, "w-full")}
        />
        <label className="block text-sm font-semibold text-ink" htmlFor="integration-secret">
          {def.secretLabel}
        </label>
        <input
          id="integration-secret"
          type="password"
          value={secret}
          onChange={(event) => setSecret(event.target.value)}
          placeholder={connected ? "Paste a new key to replace the saved one" : "Paste a key or token"}
          autoComplete="off"
          className={cn(controlClass, "w-full")}
        />
        <p className="text-sm text-muted">Scopes: {def.scopes.join(", ")}</p>
        {error ? (
          <p role="alert" className="text-sm font-medium text-risk">
            {error}
          </p>
        ) : null}
        {connected && !error ? (
          <p role="status" className="text-sm text-teal">
            {message || "Connected."} {rows.toLocaleString("en-US")} rows
            {lastSync ? ` · last sync ${lastSync.slice(0, 16).replace("T", " ")}` : ""}.
          </p>
        ) : null}
        <div className="flex flex-wrap gap-2">
          <button type="submit" className="h-11 rounded-xl bg-navy px-4 text-sm font-semibold text-on-navy">
            {connected ? "Update connection" : "Test connection"}
          </button>
          {connected ? (
            <button
              type="button"
              onClick={() => onDisconnect(id)}
              className="h-11 rounded-xl bg-canvas px-4 text-sm font-semibold text-ink"
            >
              Disconnect
            </button>
          ) : null}
        </div>
      </form>
    </Surface>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <dt className="text-xs font-semibold tracking-wide text-muted uppercase">{label}</dt>
      <dd className="mt-1 text-xl font-semibold tabular-nums text-ink">{value}</dd>
    </div>
  );
}
