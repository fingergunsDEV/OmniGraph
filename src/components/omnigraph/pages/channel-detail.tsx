import { Link } from "@tanstack/react-router";
import { useEffect, useMemo, useState } from "react";
import { CHANNEL_COLOR, ChannelGlyph, Kpi, Meter, PageIntro, SectionTitle, Surface } from "@/components/omnigraph/ui";
import { ChannelTrend, RoleChart } from "@/components/omnigraph/charts";
import { useSnapshot } from "@/components/omnigraph/use-snapshot";
import type { ChannelId } from "@/lib/omnigraph/content";
import { channelDrill, stepLabel, weeklyRollup } from "@/lib/omnigraph/drill";
import { channelMeta, modelMeta } from "@/lib/omnigraph/engine";
import { money, num, pct, roas } from "@/lib/omnigraph/format";
import { feedsFor } from "@/lib/omnigraph/integrations";
import { useUi } from "@/lib/omnigraph/store";
import { cn } from "@/lib/utils";

const STATUS: Record<string, string> = {
  live: "Live",
  learning: "Learning",
  paused: "Paused",
  scheduled: "Scheduled",
};

export function ChannelDetailPage({ channelId, campaignId }: { channelId: ChannelId; campaignId?: string }) {
  const snapshot = useSnapshot();
  const integrations = useUi((state) => state.integrations);
  const drill = useMemo(() => channelDrill(snapshot, channelId), [snapshot, channelId]);
  const weeks = useMemo(() => weeklyRollup(drill.series), [drill.series]);
  const meta = channelMeta(channelId);
  const model = modelMeta(snapshot.model);
  const feeds = feedsFor(channelId);
  const connected = feeds.filter((feed) => integrations[feed.id]?.status === "connected");
  const campaigns = snapshot.campaigns.filter((campaign) => campaign.channel === channelId);
  const [openId, setOpenId] = useState(campaignId ?? "");
  const share = snapshot.kpis.revenue ? drill.stat.revenue / snapshot.kpis.revenue : 0;
  const assistRate = drill.stat.present ? Math.max(drill.stat.present - drill.stat.closer, 0) / drill.stat.present : 0;
  const inspected = campaigns.find((campaign) => campaign.id === openId) ?? null;

  useEffect(() => {
    if (!campaignId) return;
    setOpenId(campaignId);
    document.getElementById("channel-campaigns")?.scrollIntoView({ block: "start" });
  }, [campaignId]);

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center gap-2 text-sm">
        <Link to="/channels" className="font-medium text-teal">
          All channels
        </Link>
        <span className="text-faint">/</span>
        <span className="font-medium text-ink">{meta.name}</span>
      </div>

      <PageIntro
        eyebrow={`${meta.surface} · ${model.name}`}
        title={`What is ${meta.short} actually doing in this window?`}
        lede={`${meta.name} holds ${pct(share)} of model credit. It touches ${num(drill.touched)} orders and closes ${pct(drill.stat.present ? drill.stat.closer / drill.stat.present : 0)} of them. Platform pixels still claim ${money(drill.stat.platform)}.`}
      />

      <Surface>
        <SectionTitle
          title="Sources compiled into this view"
          hint={
            connected.length
              ? `${connected.map((feed) => feed.name).join(", ")} ${connected.length === 1 ? "is" : "are"} connected. The credit math still uses the compiled ledger.`
              : "Nothing is connected yet. The charts use the compiled sample ledger until you add an API in Settings."
          }
          action={
            <Link to="/settings" className="text-sm font-semibold text-teal">
              Configure integrations
            </Link>
          }
        />
        <ul className="flex flex-wrap gap-2">
          {feeds.map((feed) => {
            const record = integrations[feed.id];
            const on = record?.status === "connected";
            return (
              <li key={feed.id}>
                <Link
                  to="/settings"
                  className={cn(
                    "inline-flex h-11 max-w-full items-center gap-2 rounded-full px-3 text-sm",
                    on ? "bg-good-bg text-teal" : "bg-canvas text-muted",
                  )}
                >
                  <span className={cn("size-2 rounded-full", on ? "bg-teal-bright" : "bg-faint")} aria-hidden="true" />
                  <span className="truncate font-medium">{feed.name}</span>
                  <span className="text-xs">{on ? record.property : "Not connected"}</span>
                </Link>
              </li>
            );
          })}
        </ul>
      </Surface>

      <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
        <Kpi
          tone="navy"
          label="Model credit"
          value={money(drill.stat.revenue)}
          detail={`${pct(share)} of order revenue`}
        />
        <Kpi label="Spend" value={money(drill.stat.spend)} detail={`${roas(drill.stat.roas)} model ROAS`} />
        <Kpi
          label="Incremental ROAS"
          value={roas(drill.stat.iroas)}
          detail={`Platform still reads ${roas(drill.stat.platformRoas)}`}
        />
        <Kpi label="Assist rate" value={pct(assistRate)} detail={`${num(drill.touched)} orders touched`} />
      </div>

      <div className="grid gap-4 lg:grid-cols-3">
        <Surface className="min-w-0 lg:col-span-2">
          <SectionTitle
            title="Credit, claim, and spend"
            hint="The pale area is what platforms claim on orders this channel touched. The color is model credit. The line is spend."
          />
          <ChannelTrend series={drill.series} color={CHANNEL_COLOR[channelId]} />
        </Surface>
        <Surface className="min-w-0">
          <SectionTitle title="Role in the path" hint="Where this channel sits when it shows up." />
          <RoleChart rows={drill.roles} color={CHANNEL_COLOR[channelId]} />
        </Surface>
      </div>

      <Surface>
        <SectionTitle
          title="Cross-channel overlap"
          hint="Orders where this channel shares the path. Credit is split by the model you have selected."
        />
        {drill.partners.length === 0 ? (
          <p className="text-sm text-muted">Every order this channel touches is solo. No partner to split with.</p>
        ) : (
          <div className="w-full max-w-full overflow-x-auto">
            <table className="w-full min-w-0 text-left text-sm">
              <thead className="text-xs font-semibold tracking-wide text-muted uppercase">
                <tr>
                  <th className="pb-3 font-semibold">Partner</th>
                  <th className="pb-3 text-right font-semibold">Shared orders</th>
                  <th className="pb-3 text-right font-semibold">Order value</th>
                  <th className="pb-3 text-right font-semibold">Our credit</th>
                  <th className="pb-3 text-right font-semibold">Their credit</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-line">
                {drill.partners.map((partner) => (
                  <tr key={partner.id}>
                    <td className="py-3">
                      <Link
                        to="/channels/$channelId"
                        params={{ channelId: partner.id }}
                        className="inline-flex items-center gap-2 font-medium"
                      >
                        <ChannelGlyph id={partner.id} className="size-7" />
                        {partner.name}
                      </Link>
                    </td>
                    <td className="py-3 text-right tabular-nums">{num(partner.orders)}</td>
                    <td className="py-3 text-right tabular-nums">{money(partner.shared)}</td>
                    <td className="py-3 text-right font-medium tabular-nums">{money(partner.ourCredit)}</td>
                    <td className="py-3 text-right tabular-nums text-muted">{money(partner.theirCredit)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </Surface>

      <div className="grid gap-4 lg:grid-cols-2">
        <Surface className="min-w-0">
          <SectionTitle title="Paths that include this channel" hint="Most common routes, with the role this channel plays." />
          <ul className="divide-y divide-line">
            {drill.paths.map((path) => (
              <li key={path.key} className="py-3">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <p className="font-medium text-ink">{stepLabel(path.steps)}</p>
                  <span className="rounded-full bg-canvas px-2.5 py-1 text-xs font-semibold text-muted">{path.role}</span>
                </div>
                <p className="mt-1 text-sm tabular-nums text-muted">
                  {num(path.orders)} orders · {money(path.revenue)}
                </p>
              </li>
            ))}
          </ul>
        </Surface>
        <Surface className="min-w-0">
          <SectionTitle title="Week by week" hint="Compiled inside the selected date range." />
          <div className="w-full max-w-full overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead className="text-xs font-semibold tracking-wide text-muted uppercase">
                <tr>
                  <th className="pb-3 font-semibold">Week of</th>
                  <th className="pb-3 text-right font-semibold">Credit</th>
                  <th className="pb-3 text-right font-semibold">Spend</th>
                  <th className="pb-3 text-right font-semibold">Claim</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-line">
                {weeks.map((week) => (
                  <tr key={week.label}>
                    <td className="py-2.5 tabular-nums">{week.label}</td>
                    <td className="py-2.5 text-right font-medium tabular-nums">{money(week.credit)}</td>
                    <td className="py-2.5 text-right tabular-nums text-muted">{money(week.spend)}</td>
                    <td className="py-2.5 text-right tabular-nums text-muted">{money(week.platform)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Surface>
      </div>

      <Surface id="channel-campaigns">
        <SectionTitle title={`Campaigns in ${meta.short}`} hint="Open a line to inspect its slice of this channel." />
        <ul className="divide-y divide-line">
          {campaigns.map((campaign) => {
            const active = campaign.id === openId;
            const max = Math.max(...campaigns.map((item) => item.revenue), 1);
            return (
              <li key={campaign.id}>
                <button
                  type="button"
                  aria-expanded={active}
                  onClick={() => setOpenId(active ? "" : campaign.id)}
                  className="flex w-full flex-wrap items-center justify-between gap-3 py-3 text-left"
                >
                  <span>
                    <span className="block font-medium text-ink">{campaign.name}</span>
                    <span className="text-sm text-muted">
                      {campaign.owner} · {campaign.team} · {STATUS[campaign.status] ?? campaign.status}
                    </span>
                  </span>
                  <span className="min-w-36 flex-1 sm:max-w-xs">
                    <Meter value={campaign.revenue / max} />
                    <span className="mt-1 block text-right text-sm tabular-nums text-muted">
                      {roas(campaign.roas)} · {money(campaign.spend)}
                    </span>
                  </span>
                </button>
                {active && inspected ? (
                  <dl className="mb-3 grid gap-3 rounded-xl bg-canvas p-3 sm:grid-cols-4">
                    <Cell label="Credit" value={money(inspected.revenue)} />
                    <Cell label="Incremental" value={money(inspected.incremental)} />
                    <Cell label="iROAS" value={roas(inspected.iroas)} />
                    <Cell label="Spend share" value={pct(inspected.share)} />
                  </dl>
                ) : null}
              </li>
            );
          })}
        </ul>
      </Surface>

      <Surface>
        <SectionTitle title="Recent orders on this channel" hint="Newest conversions the channel touched. Each glyph is a step." />
        <ul className="divide-y divide-line">
          {drill.orders.map((order) => (
            <li key={order.id} className="flex flex-wrap items-center justify-between gap-3 py-3">
              <div className="flex min-w-0 items-center gap-1">
                {order.touches.map((touch, index) => (
                  <ChannelGlyph key={`${order.id}-${index}`} id={touch.channel} className="size-7" />
                ))}
              </div>
              <p className="text-sm tabular-nums text-muted">
                {order.convertedOn} · {money(order.value)}
                {order.newCustomer ? " · new" : " · returning"}
              </p>
            </li>
          ))}
        </ul>
      </Surface>
    </div>
  );
}

function Cell({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <dt className="text-xs font-semibold tracking-wide text-muted uppercase">{label}</dt>
      <dd className="mt-1 font-semibold tabular-nums text-ink">{value}</dd>
    </div>
  );
}
