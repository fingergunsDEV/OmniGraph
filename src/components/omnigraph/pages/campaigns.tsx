import { useEffect, useMemo, useState } from "react";
import { CHANNELS, type CampaignStatus, type ChannelId } from "@/lib/omnigraph/content";
import { channelMeta, type CampaignStat } from "@/lib/omnigraph/engine";
import { money, roas } from "@/lib/omnigraph/format";
import { useUi } from "@/lib/omnigraph/store";
import { cn } from "@/lib/utils";
import { useSnapshot } from "../use-snapshot";
import { controlClass, ChannelGlyph, PageIntro, SectionTitle, Surface } from "../ui";

const STATUSES: { id: CampaignStatus | "all"; label: string }[] = [
  { id: "all", label: "All statuses" },
  { id: "live", label: "Live" },
  { id: "learning", label: "Learning" },
  { id: "paused", label: "Paused" },
  { id: "scheduled", label: "Scheduled" },
];

export function CampaignsPage() {
  const snapshot = useSnapshot();
  const notes = useUi((state) => state.notes);
  const setNote = useUi((state) => state.setNote);
  const [query, setQuery] = useState("");
  const [channel, setChannel] = useState<ChannelId | "all">("all");
  const [status, setStatus] = useState<CampaignStatus | "all">("all");
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [draft, setDraft] = useState("");

  const rows = useMemo(() => {
    const q = query.trim().toLowerCase();
    return snapshot.campaigns.filter((campaign) => {
      if (channel !== "all" && campaign.channel !== channel) return false;
      if (status !== "all" && campaign.status !== status) return false;
      if (!q) return true;
      return (
        campaign.name.toLowerCase().includes(q) ||
        campaign.owner.toLowerCase().includes(q) ||
        campaign.team.toLowerCase().includes(q)
      );
    });
  }, [snapshot.campaigns, query, channel, status]);

  const selected = rows.find((row) => row.id === selectedId) ?? rows[0] ?? null;

  useEffect(() => {
    setDraft(selected ? (notes[selected.id] ?? "") : "");
  }, [selected, notes]);

  return (
    <div className="space-y-6">
      <PageIntro
        eyebrow="Campaigns"
        title="Budget lines, with the credit model applied."
        lede="Filter the book, open a line, and leave the note the next person in the room will actually read. Notes stay in this browser."
      />

      <Surface>
        <div className="flex flex-wrap gap-2">
          <label className="sr-only" htmlFor="campaign-search">
            Search campaigns
          </label>
          <input
            id="campaign-search"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Search name or owner"
            className={cn(controlClass, "min-w-0 flex-1 sm:max-w-xs")}
          />
          <select
            aria-label="Channel"
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
          <select
            aria-label="Status"
            className={controlClass}
            value={status}
            onChange={(event) => setStatus(event.target.value as CampaignStatus | "all")}
          >
            {STATUSES.map((item) => (
              <option key={item.id} value={item.id}>
                {item.label}
              </option>
            ))}
          </select>
        </div>

        <div className="mt-4 hidden md:block">
          <table className="w-full text-left text-sm">
            <thead className="text-xs font-semibold tracking-wide text-muted uppercase">
              <tr>
                <th className="pb-3 font-semibold">Campaign</th>
                <th className="pb-3 font-semibold">Status</th>
                <th className="pb-3 text-right font-semibold">Spend</th>
                <th className="pb-3 text-right font-semibold">Credit</th>
                <th className="pb-3 text-right font-semibold">ROAS</th>
                <th className="pb-3 text-right font-semibold">iROAS</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-line">
              {rows.map((campaign) => (
                <tr
                  key={campaign.id}
                  tabIndex={0}
                  role="button"
                  aria-pressed={selected?.id === campaign.id}
                  onClick={() => setSelectedId(campaign.id)}
                  onKeyDown={(event) => {
                    if (event.key === "Enter" || event.key === " ") {
                      event.preventDefault();
                      setSelectedId(campaign.id);
                    }
                  }}
                  className={cn("cursor-pointer", selected?.id === campaign.id && "bg-good-bg")}
                >
                  <td className="py-3 pr-3">
                    <span className="font-medium text-ink">{campaign.name}</span>
                    <span className="mt-0.5 block text-xs text-muted">
                      {channelMeta(campaign.channel).short} · {campaign.owner}
                    </span>
                  </td>
                  <td className="py-3 capitalize text-muted">{campaign.status}</td>
                  <td className="py-3 text-right tabular-nums">{money(campaign.spend)}</td>
                  <td className="py-3 text-right tabular-nums">{money(campaign.revenue)}</td>
                  <td className="py-3 text-right font-medium tabular-nums">{roas(campaign.roas)}</td>
                  <td className="py-3 text-right tabular-nums">{roas(campaign.iroas)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <ul className="mt-4 space-y-2 md:hidden">
          {rows.map((campaign) => (
            <li key={campaign.id}>
              <button
                type="button"
                onClick={() => setSelectedId(campaign.id)}
                className={cn(
                  "w-full rounded-xl px-3 py-3 text-left",
                  selected?.id === campaign.id ? "bg-good-bg ring-2 ring-teal" : "bg-canvas",
                )}
              >
                <span className="font-medium text-ink">{campaign.name}</span>
                <span className="mt-1 block text-sm text-muted">
                  {channelMeta(campaign.channel).short} · {roas(campaign.roas)} · {money(campaign.spend)}
                </span>
              </button>
            </li>
          ))}
        </ul>
        {rows.length === 0 ? <p className="mt-4 text-sm text-muted">Nothing matches those filters.</p> : null}
      </Surface>

      {selected ? (
        <CampaignDetail
          campaign={selected}
          draft={draft}
          setDraft={setDraft}
          onSave={() => setNote(selected.id, draft.trim())}
          saved={notes[selected.id] ?? ""}
        />
      ) : null}
    </div>
  );
}

function CampaignDetail({
  campaign,
  draft,
  setDraft,
  onSave,
  saved,
}: {
  campaign: CampaignStat;
  draft: string;
  setDraft: (value: string) => void;
  onSave: () => void;
  saved: string;
}) {
  const channel = channelMeta(campaign.channel);
  return (
    <Surface>
      <div className="flex flex-wrap items-start gap-3">
        <ChannelGlyph id={campaign.channel} />
        <div>
          <p className="text-xs font-semibold tracking-widest text-teal uppercase">{channel.name}</p>
          <h2 className="mt-1 text-xl font-semibold text-ink">{campaign.name}</h2>
          <p className="mt-1 text-sm text-muted">
            {campaign.owner} · {campaign.team} · {campaign.status}
          </p>
        </div>
      </div>
      <dl className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <Metric label="Spend" value={money(campaign.spend)} />
        <Metric label="Model credit" value={money(campaign.revenue)} />
        <Metric label="ROAS" value={roas(campaign.roas)} />
        <Metric label="Incremental ROAS" value={roas(campaign.iroas)} />
      </dl>
      <p className="mt-4 text-sm text-muted">
        {campaign.status === "learning"
          ? "Still inside the platform learning phase. Treat the ROAS as thin until it exits."
          : campaign.status === "paused"
            ? "Paused lines still hold credit from the days they ran inside this window."
            : campaign.status === "scheduled"
              ? "Scheduled. Spend share is the plan, not a live auction."
              : "Live. Credit is this line's slice of the channel under the selected model."}
      </p>
      <label htmlFor="campaign-note" className="mt-5 block text-sm font-semibold text-ink">
        Team note
      </label>
      <textarea
        id="campaign-note"
        value={draft}
        onChange={(event) => setDraft(event.target.value)}
        rows={3}
        placeholder="What should the next person know before they change the bid?"
        className="mt-2 w-full rounded-xl bg-canvas px-3 py-3 text-sm text-ink outline-none"
      />
      <div className="mt-3 flex flex-wrap items-center gap-3">
        <button
          type="button"
          onClick={onSave}
          className="h-11 rounded-xl bg-teal px-4 text-sm font-semibold text-on-teal"
        >
          Save note
        </button>
        <p className="text-sm text-muted">{saved ? "Saved in this browser." : "Nothing saved yet."}</p>
      </div>
    </Surface>
  );
}

function Metric({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <dt className="text-xs font-semibold tracking-wide text-muted uppercase">{label}</dt>
      <dd className="mt-1 text-xl font-semibold tabular-nums text-ink">{value}</dd>
    </div>
  );
}
