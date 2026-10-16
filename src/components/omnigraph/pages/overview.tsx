import { Link } from "@tanstack/react-router";
import { useState } from "react";
import { CHANNELS, RANGES, type ChannelId } from "@/lib/omnigraph/content";
import { buildInsights, channelMeta, modelMeta } from "@/lib/omnigraph/engine";
import { money, num, pct, roas } from "@/lib/omnigraph/format";
import { cn } from "@/lib/utils";
import { RevenueChart } from "../charts";
import { useSnapshot, useWork } from "../use-snapshot";
import { ChannelGlyph, Kpi, Meter, PageIntro, SectionTitle, StatusPill, Surface } from "../ui";

export function OverviewPage() {
  const snapshot = useSnapshot();
  const { items, score } = useWork();
  const [hidden, setHidden] = useState<Partial<Record<ChannelId, boolean>>>({});
  const { kpis, workspace, channels } = snapshot;
  const model = modelMeta(snapshot.model);
  const range = RANGES.find((item) => item.id === snapshot.range);
  const gap = kpis.platform - kpis.revenue;
  const pace = snapshot.revenueTarget > 0 ? kpis.revenue / snapshot.revenueTarget : 0;
  const hot = [...items].sort((a, b) => rank(a.status) - rank(b.status)).slice(0, 3);
  const topChannel = [...channels].sort((a, b) => b.revenue - a.revenue)[0];
  const insights = buildInsights(snapshot, items).slice(0, 2);

  return (
    <div className="space-y-6">
      <PageIntro
        eyebrow={`${workspace.category} · ${range?.hint ?? ""}`}
        title={`${money(gap)} is claimed by more than one platform for the same orders.`}
        lede={`${workspace.brief} ${model.name} gives ${topChannel ? channelMeta(topChannel.id).short : "search"} ${topChannel ? pct(topChannel.revenue / kpis.revenue) : "—"} of credit. Order revenue stays ${money(kpis.revenue)} no matter which model you pick.`}
      />

      <div className="flex flex-wrap gap-2">
        {CHANNELS.map((channel) => (
          <Link
            key={channel.id}
            to="/channels/$channelId"
            params={{ channelId: channel.id }}
            className="inline-flex h-11 items-center gap-2 rounded-full bg-surface pr-3 pl-1.5 text-sm font-medium text-ink shadow-card"
          >
            <ChannelGlyph id={channel.id} />
            {channel.short}
          </Link>
        ))}
        <a
          href="#measurement"
          className="inline-flex h-11 items-center gap-2 rounded-full bg-surface pr-3 pl-1.5 text-sm font-medium text-ink shadow-card"
        >
          <ChannelGlyph id="measure" />
          Measurement
        </a>
      </div>

      <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
        <Kpi
          tone="navy"
          label="Order revenue"
          value={money(kpis.revenue)}
          delta={kpis.revenueDelta}
          detail={`${num(kpis.orders)} orders · ${money(kpis.aov)} AOV`}
        />
        <Kpi
          label={`Incremental · ${model.name}`}
          value={money(kpis.incremental)}
          delta={kpis.incrementalDelta}
          detail={`${roas(kpis.iroas)} incremental ROAS`}
        />
        <Kpi
          label="Blended CAC"
          value={money(kpis.cac)}
          delta={kpis.cacDelta}
          invert
          detail={`Guardrail ${money(snapshot.cacGuardrail)} · ${num(kpis.newCustomers)} new`}
        />
        <Kpi
          label="Alignment"
          value={`${Math.round(score * 100)}`}
          detail={`${items.filter((item) => item.status === "blocked").length} blocked · ${items.filter((item) => item.status === "at_risk").length} at risk`}
        />
      </div>

      <div className="grid gap-4 lg:grid-cols-3">
        <Surface className="lg:col-span-2">
          <SectionTitle
            title="Credit by day"
            hint="Stacked areas are the selected model. The line is media spend."
            action={
              <div className="flex flex-wrap gap-1">
                {CHANNELS.map((channel) => {
                  const off = hidden[channel.id];
                  return (
                    <button
                      key={channel.id}
                      type="button"
                      aria-pressed={!off}
                      onClick={() => setHidden((current) => ({ ...current, [channel.id]: !current[channel.id] }))}
                      className={cn(
                        "inline-flex h-11 items-center gap-2 rounded-full px-3 text-sm",
                        off ? "text-faint" : "text-ink",
                      )}
                    >
                      <span
                        className="size-2.5 rounded-full"
                        style={{ background: off ? "var(--color-line)" : `var(--color-ch-${channel.id})` }}
                      />
                      {channel.short}
                    </button>
                  );
                })}
              </div>
            }
          />
          <RevenueChart series={snapshot.series} hidden={hidden} />
        </Surface>
        <Surface>
          <SectionTitle title="Pace" hint="Order revenue against the window goal." />
          <p className="text-2xl font-semibold tabular-nums text-ink">
            {money(kpis.revenue)}
            <span className="text-base font-medium text-muted"> / {money(snapshot.revenueTarget)}</span>
          </p>
          <div className="mt-3">
            <Meter value={Math.min(pace, 1)} tone={pace >= 1 ? "teal" : pace >= 0.9 ? "warn" : "risk"} />
          </div>
          <p className="mt-3 text-sm text-muted">
            {pace >= 1
              ? `${pct(pace - 1)} ahead of the goal for this window.`
              : `${pct(1 - pace)} behind the goal for this window.`}
          </p>
          <dl className="mt-5 space-y-3 text-sm">
            <div className="flex justify-between gap-3">
              <dt className="text-muted">Platform claim</dt>
              <dd className="font-medium tabular-nums">{roas(kpis.platformRoas)}</dd>
            </div>
            <div className="flex justify-between gap-3">
              <dt className="text-muted">Counted once</dt>
              <dd className="font-medium tabular-nums">{roas(kpis.roas)}</dd>
            </div>
            <div className="flex justify-between gap-3">
              <dt className="text-muted">Assisted orders</dt>
              <dd className="font-medium tabular-nums">{pct(kpis.assistRate)}</dd>
            </div>
            <div className="flex justify-between gap-3">
              <dt className="text-muted">Brief to live</dt>
              <dd className="font-medium tabular-nums">
                {workspace.velocityDays}d
                <span className="text-muted"> / {workspace.velocityTarget}d</span>
              </dd>
            </div>
          </dl>
        </Surface>
      </div>

      <Surface>
        <SectionTitle
          title="Where the pixels and the journey disagree"
          hint="Platform claim gives every touched channel the full order. The model splits the order once."
          action={
            <Link to="/attribution" className="text-sm font-semibold text-teal">
              Open attribution
            </Link>
          }
        />
        <div className="w-full max-w-full overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="text-xs font-semibold tracking-wide text-muted uppercase">
              <tr>
                <th className="pb-3 font-semibold">Channel</th>
                <th className="pb-3 text-right font-semibold">Platform</th>
                <th className="pb-3 text-right font-semibold">{model.name}</th>
                <th className="pb-3 text-right font-semibold">Gap</th>
                <th className="pb-3 text-right font-semibold">iROAS</th>
                <th className="pb-3 text-right font-semibold">Spend</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-line">
              {channels.map((channel) => (
                <tr key={channel.id}>
                  <td className="py-3">
                    <Link
                      to="/channels/$channelId"
                      params={{ channelId: channel.id }}
                      className="inline-flex items-center gap-2 font-medium"
                    >
                      <ChannelGlyph id={channel.id} className="size-7" />
                      {channelMeta(channel.id).name}
                    </Link>
                  </td>
                  <td className="py-3 text-right tabular-nums text-muted">{money(channel.platform)}</td>
                  <td className="py-3 text-right font-medium tabular-nums">{money(channel.revenue)}</td>
                  <td className="py-3 text-right tabular-nums text-risk">{money(channel.platform - channel.revenue)}</td>
                  <td className="py-3 text-right tabular-nums">{roas(channel.iroas)}</td>
                  <td className="py-3 text-right tabular-nums text-muted">{money(channel.spend)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Surface>

      <div className="grid gap-4 lg:grid-cols-2">
        <Surface>
          <SectionTitle
            title="Work that can slip the number"
            action={
              <Link to="/alignment" className="text-sm font-semibold text-teal">
                Alignment board
              </Link>
            }
          />
          <ul className="space-y-3">
            {hot.map((item) => (
              <li key={item.id} className="rounded-xl bg-canvas p-3">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <p className="text-xs font-semibold tracking-wide text-muted uppercase">{item.pillar}</p>
                  <StatusPill status={item.status} />
                </div>
                <p className="mt-1 font-medium text-ink">{item.title}</p>
                <p className="mt-1 text-sm text-muted">
                  {item.owner} · {item.team}
                </p>
              </li>
            ))}
          </ul>
        </Surface>
        <Surface>
          <SectionTitle
            title="What to do with it"
            action={
              <Link to="/insights" className="text-sm font-semibold text-teal">
                All insights
              </Link>
            }
          />
          <ul className="space-y-4">
            {insights.map((insight) => (
              <li key={insight.id}>
                <p className="text-xs font-semibold tracking-wide text-teal uppercase">{insight.pillar}</p>
                <p className="mt-1 font-medium text-ink">{insight.title}</p>
                <p className="mt-1 text-sm text-muted">{insight.action}</p>
              </li>
            ))}
          </ul>
        </Surface>
      </div>

      <Surface id="measurement">
        <SectionTitle title="Measurement" hint="The seventh node. If this is wrong, every ROAS above it is a argument." />
        <dl className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <Stat label="Identity match" value={pct(snapshot.measurement.matchRate)} />
          <Stat label="Consent" value={pct(snapshot.measurement.consentRate)} />
          <Stat label="Modeled revenue" value={pct(snapshot.measurement.modeledShare)} />
          <Stat label="Graph lag" value={`${snapshot.measurement.lagHours}h`} detail={`${snapshot.measurement.profiles} profiles`} />
        </dl>
      </Surface>
    </div>
  );
}

function Stat({ label, value, detail }: { label: string; value: string; detail?: string }) {
  return (
    <div>
      <dt className="text-xs font-semibold tracking-wide text-muted uppercase">{label}</dt>
      <dd className="mt-1 text-xl font-semibold tabular-nums text-ink">{value}</dd>
      {detail ? <p className="text-sm text-muted">{detail}</p> : null}
    </div>
  );
}

function rank(status: string): number {
  if (status === "blocked") return 0;
  if (status === "at_risk") return 1;
  if (status === "on_track") return 2;
  return 3;
}
