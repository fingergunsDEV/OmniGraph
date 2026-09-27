import { MODELS, type ModelId } from "@/lib/omnigraph/content";
import { channelMeta, getSnapshot, modelMeta } from "@/lib/omnigraph/engine";
import { money, pct, roas } from "@/lib/omnigraph/format";
import { useUi } from "@/lib/omnigraph/store";
import { cn } from "@/lib/utils";
import { useSnapshot } from "../use-snapshot";
import { ChannelGlyph, PageIntro, SectionTitle, Surface } from "../ui";

export function AttributionPage() {
  const snapshot = useSnapshot();
  const setModel = useUi((state) => state.setModel);
  const model = modelMeta(snapshot.model);
  const compared = MODELS.map((item) => ({
    meta: item,
    snap: item.id === snapshot.model ? snapshot : getSnapshot(snapshot.workspace.id, snapshot.range, item.id),
  }));
  const max = Math.max(...snapshot.channels.map((channel) => channel.revenue), 1);

  return (
    <div className="space-y-6">
      <PageIntro
        eyebrow="Attribution"
        title="The order total does not move. The credit does."
        lede={model.blurb}
      />

      <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-3">
        {MODELS.map((item) => {
          const active = item.id === snapshot.model;
          return (
            <button
              key={item.id}
              type="button"
              aria-pressed={active}
              onClick={() => setModel(item.id)}
              className={cn(
                "rounded-2xl p-4 text-left shadow-card",
                active ? "bg-good-bg ring-2 ring-teal" : "bg-surface",
              )}
            >
              <p className="font-semibold text-ink">{item.name}</p>
              <p className="mt-1 text-sm text-muted">{item.blurb}</p>
            </button>
          );
        })}
      </div>

      <Surface>
        <SectionTitle title={`${model.name} credit`} hint="Each bar is that channel's share of order revenue." />
        <ul className="space-y-3">
          {snapshot.channels.map((channel) => (
            <li key={channel.id} className="flex items-center gap-3">
              <span className="inline-flex w-28 shrink-0 items-center gap-2 text-sm font-medium text-ink">
                <ChannelGlyph id={channel.id} className="size-7" />
                <span className="truncate">{channelMeta(channel.id).short}</span>
              </span>
              <span className="h-3 min-w-0 flex-1 overflow-hidden rounded-full bg-canvas">
                <span
                  className="block h-full rounded-full"
                  style={{
                    width: `${Math.max(2, (channel.revenue / max) * 100)}%`,
                    background: `var(--color-ch-${channel.id})`,
                  }}
                />
              </span>
              <span className="w-16 shrink-0 text-right text-sm font-medium tabular-nums text-ink">
                {money(channel.revenue)}
              </span>
            </li>
          ))}
        </ul>
      </Surface>

      <Surface>
        <SectionTitle
          title="Same orders, six answers"
          hint="Highlighted column is the model selected above. Totals match order revenue. Platform claims do not."
        />
        <div className="w-full max-w-full overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="text-xs font-semibold tracking-wide text-muted uppercase">
              <tr>
                <th className="pb-3 font-semibold">Channel</th>
                {compared.map((column) => (
                  <th
                    key={column.meta.id}
                    className={cn(
                      "pb-3 text-right font-semibold",
                      column.meta.id === snapshot.model && "text-teal",
                    )}
                  >
                    {column.meta.name}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-line">
              {snapshot.channels.map((channel, index) => (
                <tr key={channel.id}>
                  <td className="py-3 font-medium">{channelMeta(channel.id).name}</td>
                  {compared.map((column) => {
                    const value = column.snap.channels[index]?.revenue ?? 0;
                    return (
                      <td
                        key={column.meta.id}
                        className={cn(
                          "py-3 text-right tabular-nums",
                          column.meta.id === snapshot.model ? "font-semibold text-ink" : "text-muted",
                        )}
                      >
                        {money(value)}
                      </td>
                    );
                  })}
                </tr>
              ))}
              <tr>
                <td className="py-3 font-semibold">Order revenue</td>
                {compared.map((column) => (
                  <td key={column.meta.id} className="py-3 text-right font-semibold tabular-nums">
                    {money(column.snap.kpis.revenue)}
                  </td>
                ))}
              </tr>
            </tbody>
          </table>
        </div>
        <p className="mt-4 text-sm text-muted">
          Versus last touch, {shiftSentence(snapshot.model, compared)}.
        </p>
      </Surface>

      <Surface>
        <SectionTitle title="Paths that carry the revenue" hint="Consecutive repeats are collapsed. Revenue is the order, not a single touch." />
        <ul className="space-y-3">
          {snapshot.paths.map((path) => (
            <li key={path.key} className="flex flex-wrap items-center justify-between gap-3 rounded-xl bg-canvas px-3 py-3">
              <p className="flex flex-wrap items-center gap-1 text-sm font-medium text-ink">
                {path.steps.map((step, index) => (
                  <span key={`${path.key}-${index}`} className="inline-flex items-center gap-1">
                    {index > 0 ? <span className="text-faint">→</span> : null}
                    {channelMeta(step).short}
                  </span>
                ))}
              </p>
              <p className="text-sm tabular-nums text-muted">
                {money(path.revenue)} · {pct(path.revenue / snapshot.kpis.revenue)} · {path.orders} orders
              </p>
            </li>
          ))}
        </ul>
      </Surface>
    </div>
  );
}

function shiftSentence(
  model: ModelId,
  compared: { meta: { id: ModelId; name: string }; snap: ReturnType<typeof getSnapshot> }[],
): string {
  if (model === "last_touch") return "this is the last-touch baseline the other columns move away from";
  const current = compared.find((column) => column.meta.id === model);
  const last = compared.find((column) => column.meta.id === "last_touch");
  if (!current || !last) return "switch models to see who gains";
  let winner = current.snap.channels[0];
  let gap = -Infinity;
  for (let i = 0; i < current.snap.channels.length; i += 1) {
    const delta = current.snap.channels[i].revenue - last.snap.channels[i].revenue;
    if (delta > gap) {
      gap = delta;
      winner = current.snap.channels[i];
    }
  }
  if (!winner || gap <= 0) return "no channel gains against last touch in this window";
  return `${channelMeta(winner.id).name} gains ${money(gap)} against last touch (${roas(winner.roas)} model ROAS)`;
}
