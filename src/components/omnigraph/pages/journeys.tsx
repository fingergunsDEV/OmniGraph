import { useMemo, useState } from "react";
import { CHANNELS, MODELS, type ChannelId } from "@/lib/omnigraph/content";
import { channelMeta, journeyCredits, type JourneyView } from "@/lib/omnigraph/engine";
import { longDate, money, num } from "@/lib/omnigraph/format";
import { cn } from "@/lib/utils";
import { useSnapshot } from "../use-snapshot";
import { controlClass, ChannelGlyph, PageIntro, SectionTitle, Surface } from "../ui";

type SortKey = "value" | "recent";

export function JourneysPage() {
  const snapshot = useSnapshot();
  const [channel, setChannel] = useState<ChannelId | "all">("all");
  const [sort, setSort] = useState<SortKey>("value");
  const [pathKey, setPathKey] = useState<string | null>(null);
  const [selectedId, setSelectedId] = useState<string | null>(null);

  const filtered = useMemo(() => {
    const rows = snapshot.journeys.filter((journey) => {
      if (channel !== "all" && !journey.touches.some((touch) => touch.channel === channel)) return false;
      if (pathKey && dedupe(journey).join(">") !== pathKey) return false;
      return true;
    });
    rows.sort((a, b) =>
      sort === "value" ? b.value - a.value : b.convertedOn.localeCompare(a.convertedOn) || b.value - a.value,
    );
    return rows;
  }, [snapshot.journeys, channel, sort, pathKey]);

  const selected = filtered.find((journey) => journey.id === selectedId) ?? filtered[0] ?? null;

  return (
    <div className="space-y-6">
      <PageIntro
        eyebrow="Journeys"
        title="Every order is a path, not a platform."
        lede={`${num(snapshot.journeys.length)} orders in this window. Open one to see the touches, the days between them, and how each model would split the revenue.`}
      />

      <Surface>
        <SectionTitle title="Common paths" hint="Click a path to filter the list." />
        <div className="flex flex-wrap gap-2">
          <FilterChip active={pathKey === null} onClick={() => setPathKey(null)} label="All paths" />
          {snapshot.paths.map((path) => (
            <FilterChip
              key={path.key}
              active={pathKey === path.key}
              onClick={() => setPathKey(path.key)}
              label={`${path.steps.map((step) => channelMeta(step).short).join(" → ")} · ${money(path.revenue)}`}
            />
          ))}
        </div>
      </Surface>

      <div className="grid gap-4 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)]">
        <Surface>
          <div className="mb-4 flex flex-wrap gap-2">
            <label className="sr-only" htmlFor="journey-channel">
              Channel
            </label>
            <select
              id="journey-channel"
              className={controlClass}
              value={channel}
              onChange={(event) => setChannel(event.target.value as ChannelId | "all")}
            >
              <option value="all">All channels</option>
              {CHANNELS.map((item) => (
                <option key={item.id} value={item.id}>
                  {item.name}
                </option>
              ))}
            </select>
            <div className="inline-flex items-center rounded-xl bg-canvas p-1" role="group" aria-label="Sort">
              <SortButton current={sort} id="value" setSort={setSort} label="Largest" />
              <SortButton current={sort} id="recent" setSort={setSort} label="Latest" />
            </div>
          </div>
          <p className="mb-3 text-sm text-muted">
            Showing {Math.min(filtered.length, 24)} of {num(filtered.length)}
          </p>
          <ul className="max-h-[32rem] space-y-2 overflow-auto">
            {filtered.slice(0, 24).map((journey) => {
              const active = selected?.id === journey.id;
              return (
                <li key={journey.id}>
                  <button
                    type="button"
                    onClick={() => setSelectedId(journey.id)}
                    className={cn(
                      "w-full rounded-xl px-3 py-3 text-left",
                      active ? "bg-good-bg ring-2 ring-teal" : "bg-canvas",
                    )}
                  >
                    <span className="flex items-center justify-between gap-3">
                      <span className="text-sm font-medium text-ink">{pathLabel(journey)}</span>
                      <span className="text-sm font-semibold tabular-nums text-ink">{money(journey.value)}</span>
                    </span>
                    <span className="mt-1 block text-xs text-muted">
                      {longDate(journey.convertedOn)}
                      {journey.newCustomer ? " · New" : " · Returning"}
                    </span>
                  </button>
                </li>
              );
            })}
          </ul>
          {filtered.length === 0 ? <p className="text-sm text-muted">No journeys match that filter.</p> : null}
        </Surface>

        <Surface>
          {selected ? <JourneyDetail journey={selected} model={snapshot.model} /> : <p className="text-sm text-muted">No journey selected.</p>}
        </Surface>
      </div>
    </div>
  );
}

function JourneyDetail({ journey, model }: { journey: JourneyView; model: (typeof MODELS)[number]["id"] }) {
  const credits = journeyCredits(journey, model);
  const entries = CHANNELS.map((channel) => ({ channel, value: credits[channel.id] })).filter((entry) => entry.value > 0.5);
  const max = Math.max(...entries.map((entry) => entry.value), 1);
  return (
    <div>
      <SectionTitle title={money(journey.value)} hint={`${longDate(journey.convertedOn)} · ${journey.newCustomer ? "New customer" : "Returning customer"}`} />
      <ol className="flex flex-wrap items-center gap-2">
        {journey.touches.map((touch, index) => {
          const previous = journey.touches[index - 1];
          const gap = previous ? previous.daysBefore - touch.daysBefore : null;
          return (
            <li key={`${journey.id}-${index}`} className="flex items-center gap-2">
              {gap !== null ? <span className="text-xs text-faint">{gap}d</span> : null}
              <span className="inline-flex h-11 items-center gap-2 rounded-full bg-canvas pr-3 pl-1.5 text-sm font-medium">
                <ChannelGlyph id={touch.channel} />
                {channelMeta(touch.channel).short}
              </span>
            </li>
          );
        })}
      </ol>
      <h3 className="mt-6 text-sm font-semibold text-ink">{MODELS.find((item) => item.id === model)?.name} split</h3>
      <ul className="mt-3 space-y-2">
        {entries.map((entry) => (
          <li key={entry.channel.id} className="flex items-center gap-2 text-sm">
            <span className="w-24 shrink-0">{entry.channel.short}</span>
            <span className="h-2 min-w-0 flex-1 overflow-hidden rounded-full bg-canvas">
              <span
                className="block h-full rounded-full"
                style={{
                  width: `${(entry.value / max) * 100}%`,
                  background: `var(--color-ch-${entry.channel.id})`,
                }}
              />
            </span>
            <span className="w-16 shrink-0 text-right tabular-nums">{money(entry.value)}</span>
          </li>
        ))}
      </ul>
      <div className="mt-5 w-full max-w-full overflow-x-auto">
        <table className="w-full text-left text-sm">
          <thead className="text-xs font-semibold tracking-wide text-muted uppercase">
            <tr>
              <th className="pb-2 font-semibold">Model</th>
              {CHANNELS.filter((channel) => journey.touches.some((touch) => touch.channel === channel.id)).map((channel) => (
                <th key={channel.id} className="pb-2 text-right font-semibold">
                  {channel.short}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-line">
            {MODELS.map((item) => {
              const split = journeyCredits(journey, item.id);
              const touched = CHANNELS.filter((channel) => journey.touches.some((touch) => touch.channel === channel.id));
              return (
                <tr key={item.id} className={item.id === model ? "font-semibold" : undefined}>
                  <td className="py-2">{item.name}</td>
                  {touched.map((channel) => (
                    <td key={channel.id} className="py-2 text-right tabular-nums">
                      {money(split[channel.id])}
                    </td>
                  ))}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function FilterChip({ active, onClick, label }: { active: boolean; onClick: () => void; label: string }) {
  return (
    <button
      type="button"
      aria-pressed={active}
      onClick={onClick}
      className={cn(
        "h-11 rounded-full px-3 text-sm",
        active ? "bg-navy text-on-navy" : "bg-canvas text-ink",
      )}
    >
      {label}
    </button>
  );
}

function SortButton({
  current,
  id,
  setSort,
  label,
}: {
  current: SortKey;
  id: SortKey;
  setSort: (value: SortKey) => void;
  label: string;
}) {
  return (
    <button
      type="button"
      aria-pressed={current === id}
      onClick={() => setSort(id)}
      className={cn(
        "h-11 rounded-lg px-3 text-sm font-medium",
        current === id ? "bg-surface text-ink shadow-card" : "text-muted",
      )}
    >
      {label}
    </button>
  );
}

function dedupe(journey: JourneyView): ChannelId[] {
  const steps: ChannelId[] = [];
  for (const touch of journey.touches) {
    if (steps[steps.length - 1] !== touch.channel) steps.push(touch.channel);
  }
  return steps;
}

function pathLabel(journey: JourneyView): string {
  return dedupe(journey)
    .map((step) => channelMeta(step).short)
    .join(" → ");
}
