import { Link } from "@tanstack/react-router";
import { CHANNELS } from "@/lib/omnigraph/content";
import { channelMeta } from "@/lib/omnigraph/engine";
import { money, num, pct, roas } from "@/lib/omnigraph/format";
import { cn } from "@/lib/utils";
import { useSnapshot } from "../use-snapshot";
import { ChannelGlyph, Meter, PageIntro, SectionTitle, Surface } from "../ui";

export function ChannelsPage() {
  const snapshot = useSnapshot();
  const max = Math.max(...snapshot.channels.map((channel) => channel.revenue), 1);

  return (
    <div className="space-y-6">
      <PageIntro
        eyebrow="Channels"
        title="Six ways demand shows up. Open one to see the graph underneath."
        lede="This is the portfolio. A channel drill-down has the daily credit chart, the paths it shares, and the campaigns spending inside it."
      />

      <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
        {snapshot.channels.map((channel) => {
          const info = channelMeta(channel.id);
          const assist = channel.present ? Math.max(channel.present - channel.closer, 0) / channel.present : 0;
          return (
            <Link
              key={channel.id}
              to="/channels/$channelId"
              params={{ channelId: channel.id }}
              className={cn("rounded-2xl bg-surface p-4 text-left shadow-card hover:shadow-card-hover")}
            >
              <div className="flex items-center gap-3">
                <ChannelGlyph id={channel.id} />
                <div className="min-w-0">
                  <p className="font-semibold text-ink">{info.name}</p>
                  <p className="truncate text-sm text-muted">{info.surface}</p>
                </div>
              </div>
              <p className="mt-4 text-2xl font-semibold tabular-nums text-ink">{roas(channel.roas)}</p>
              <p className="text-sm text-muted">model ROAS · incremental {roas(channel.iroas)}</p>
              <div className="mt-3">
                <Meter value={channel.revenue / max} />
              </div>
              <p className="mt-2 text-sm tabular-nums text-muted">
                {money(channel.revenue)} credit · {pct(assist)} assist
              </p>
            </Link>
          );
        })}
      </div>

      <Surface>
        <SectionTitle
          title="Cross-channel ledger"
          hint="Platform claim gives every touched channel the full order. The model splits it once. Open a row to drill in."
        />
        <div className="w-full max-w-full overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="text-xs font-semibold tracking-wide text-muted uppercase">
              <tr>
                <th className="pb-3 font-semibold">Channel</th>
                <th className="pb-3 text-right font-semibold">Orders</th>
                <th className="pb-3 text-right font-semibold">Credit</th>
                <th className="pb-3 text-right font-semibold">Platform</th>
                <th className="pb-3 text-right font-semibold">Spend</th>
                <th className="pb-3 text-right font-semibold">iROAS</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-line">
              {snapshot.channels.map((channel) => (
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
                  <td className="py-3 text-right tabular-nums">{num(channel.present)}</td>
                  <td className="py-3 text-right font-medium tabular-nums">{money(channel.revenue)}</td>
                  <td className="py-3 text-right tabular-nums text-muted">{money(channel.platform)}</td>
                  <td className="py-3 text-right tabular-nums text-muted">{money(channel.spend)}</td>
                  <td className="py-3 text-right tabular-nums">{roas(channel.iroas)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Surface>

      <Surface id="measurement">
        <SectionTitle
          title="Measurement"
          hint={`${pct(snapshot.measurement.modeledShare)} of revenue is modeled. Match ${pct(snapshot.measurement.matchRate)}, consent ${pct(snapshot.measurement.consentRate)}, lag ${snapshot.measurement.lagHours}h across ${snapshot.measurement.profiles} profiles.`}
        />
        <p className="text-sm text-muted">
          Connect Google Analytics, Search Console, and the ad accounts in Settings when you want this ledger tied to a property. The credit graph is already compiled.
        </p>
        <Link to="/settings" className="mt-3 inline-flex h-11 items-center text-sm font-semibold text-teal">
          Open integration settings
        </Link>
      </Surface>

      <p className="text-xs text-faint">Surfaces: {CHANNELS.map((channel) => channel.short).join(" · ")}</p>
    </div>
  );
}
