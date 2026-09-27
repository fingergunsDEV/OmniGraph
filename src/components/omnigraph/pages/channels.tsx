import { useEffect, useState } from "react";
import { CHANNELS, type ChannelId } from "@/lib/omnigraph/content";
import { channelMeta, type ChannelStat } from "@/lib/omnigraph/engine";
import { money, num, pct, roas } from "@/lib/omnigraph/format";
import { useUi } from "@/lib/omnigraph/store";
import { cn } from "@/lib/utils";
import { useSnapshot } from "../use-snapshot";
import { CHANNEL_COLOR, ChannelGlyph, Meter, PageIntro, SectionTitle, Surface } from "../ui";

export function ChannelsPage() {
  const snapshot = useSnapshot();
  const focus = useUi((state) => state.focusChannel);
  const setFocus = useUi((state) => state.setFocusChannel);
  const [selected, setSelected] = useState<ChannelId>(focus ?? "search");

  useEffect(() => {
    if (focus) setSelected(focus);
  }, [focus]);

  const stat = snapshot.channels.find((channel) => channel.id === selected) ?? snapshot.channels[0];
  const meta = channelMeta(stat.id);
  const campaigns = snapshot.campaigns.filter((campaign) => campaign.channel === stat.id);
  const max = Math.max(...snapshot.channels.map((channel) => channel.revenue), 1);

  return (
    <div className="space-y-6">
      <PageIntro
        eyebrow="Channels"
        title="Six ways demand shows up, plus the graph that ties them together."
        lede="Pick a node. OmniGraph shows what it opens, what it closes, and whether the platform ROAS survives a haircut."
      />

      <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
        {snapshot.channels.map((channel) => {
          const info = channelMeta(channel.id);
          const active = channel.id === stat.id;
          return (
            <button
              key={channel.id}
              type="button"
              aria-pressed={active}
              onClick={() => {
                setSelected(channel.id);
                setFocus(channel.id);
              }}
              className={cn(
                "rounded-2xl bg-surface p-4 text-left shadow-card",
                active && "ring-2 ring-teal",
              )}
            >
              <div className="flex items-center gap-3">
                <ChannelGlyph id={channel.id} />
                <div>
                  <p className="font-semibold text-ink">{info.name}</p>
                  <p className="text-sm text-muted">{info.surface}</p>
                </div>
              </div>
              <p className="mt-4 text-2xl font-semibold tabular-nums text-ink">{roas(channel.roas)}</p>
              <p className="text-sm text-muted">model ROAS · incremental {roas(channel.iroas)}</p>
              <div className="mt-3">
                <Meter value={channel.revenue / max} />
              </div>
              <p className="mt-2 text-sm tabular-nums text-muted">{money(channel.revenue)} credit</p>
            </button>
          );
        })}
      </div>

      <Surface>
        <div className="flex flex-wrap items-start justify-between gap-3">
          <div>
            <p className="text-xs font-semibold tracking-widest text-teal uppercase">{meta.surface}</p>
            <h2 className="mt-1 text-xl font-semibold text-ink">{meta.name}</h2>
            <p className="mt-2 max-w-2xl text-sm text-muted">{roleLine(stat)}</p>
          </div>
          <ChannelGlyph id={stat.id} className="size-11" />
        </div>
        <dl className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <Metric label="Model credit" value={money(stat.revenue)} />
          <Metric label="Platform claim" value={money(stat.platform)} />
          <Metric label="Spend" value={money(stat.spend)} />
          <Metric label="Incremental ROAS" value={roas(stat.iroas)} />
        </dl>
        <div className="mt-5 grid gap-3 sm:grid-cols-3">
          <Split label="Opens" value={stat.opener} total={stat.present} color={CHANNEL_COLOR[stat.id]} />
          <Split label="Closes" value={stat.closer} total={stat.present} color={CHANNEL_COLOR[stat.id]} />
          <Split
            label="Present, not closer"
            value={Math.max(stat.present - stat.closer, 0)}
            total={stat.present}
            color={CHANNEL_COLOR[stat.id]}
          />
        </div>
      </Surface>

      <Surface>
        <SectionTitle title={`Campaigns in ${meta.short}`} hint="Share of this channel's spend and credit for the window." />
        <ul className="divide-y divide-line">
          {campaigns.map((campaign) => (
            <li key={campaign.id} className="flex flex-wrap items-center justify-between gap-3 py-3">
              <div>
                <p className="font-medium text-ink">{campaign.name}</p>
                <p className="text-sm text-muted">
                  {campaign.owner} · {campaign.team} · {labelStatus(campaign.status)}
                </p>
              </div>
              <div className="text-right">
                <p className="font-semibold tabular-nums text-ink">{roas(campaign.roas)}</p>
                <p className="text-sm tabular-nums text-muted">{money(campaign.spend)} spend</p>
              </div>
            </li>
          ))}
        </ul>
      </Surface>

      <Surface id="measurement">
        <SectionTitle
          title="Measurement"
          hint={`${pct(snapshot.measurement.modeledShare)} of revenue is modeled. Match ${pct(snapshot.measurement.matchRate)}, consent ${pct(snapshot.measurement.consentRate)}, lag ${snapshot.measurement.lagHours}h across ${snapshot.measurement.profiles} profiles.`}
        />
        <p className="text-sm text-muted">
          Teams arguing from a single pixel are missing the modeled slice. OmniGraph keeps it in the graph instead of dropping it into "unattributed."
        </p>
      </Surface>
    </div>
  );
}

function roleLine(stat: ChannelStat): string {
  const present = stat.present || 1;
  const open = Math.round((stat.opener / present) * 100);
  const close = Math.round((stat.closer / present) * 100);
  if (close >= 45) return `It closes ${close}% of the journeys it touches, so last-click will flatter it.`;
  if (open >= 35 && close < 30) {
    return `It opens ${open}% of the journeys it touches and closes only ${close}%. Last-click will hide the work.`;
  }
  return `It shows up on ${num(stat.present)} orders — opening ${open}% and closing ${close}%.`;
}

function Metric({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <dt className="text-xs font-semibold tracking-wide text-muted uppercase">{label}</dt>
      <dd className="mt-1 text-xl font-semibold tabular-nums text-ink">{value}</dd>
    </div>
  );
}

function Split({ label, value, total, color }: { label: string; value: number; total: number; color: string }) {
  const share = total ? value / total : 0;
  return (
    <div className="rounded-xl bg-canvas p-3">
      <p className="text-sm text-muted">{label}</p>
      <p className="mt-1 text-lg font-semibold tabular-nums text-ink">{pct(share)}</p>
      <div className="mt-2 h-2 overflow-hidden rounded-full bg-surface">
        <div className="h-full rounded-full" style={{ width: `${Math.round(share * 100)}%`, background: color }} />
      </div>
    </div>
  );
}

function labelStatus(status: string): string {
  if (status === "on_track") return "On track";
  if (status === "live") return "Live";
  if (status === "learning") return "Learning";
  if (status === "paused") return "Paused";
  if (status === "scheduled") return "Scheduled";
  return status;
}
