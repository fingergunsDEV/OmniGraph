import { useState } from "react";
import { buildInsights } from "@/lib/omnigraph/engine";
import { useUi } from "@/lib/omnigraph/store";
import { cn } from "@/lib/utils";
import { useSnapshot, useWork } from "../use-snapshot";
import { PageIntro, Surface } from "../ui";

export function InsightsPage() {
  const snapshot = useSnapshot();
  const { items } = useWork();
  const insightState = useUi((state) => state.insightState);
  const setInsight = useUi((state) => state.setInsight);
  const [showSnoozed, setShowSnoozed] = useState(false);
  const insights = buildInsights(snapshot, items);
  const open = insights.filter((insight) => !insightState[insight.id]);
  const accepted = insights.filter((insight) => insightState[insight.id] === "accepted");
  const snoozed = insights.filter((insight) => insightState[insight.id] === "snoozed");

  return (
    <div className="space-y-6">
      <PageIntro
        eyebrow="Insights"
        title="Recommendations with the number attached."
        lede="Accept one and it lands on the alignment board. Snooze it if the room is not ready. They recompute when you change brand, window, or model."
      />

      {open.length === 0 ? (
        <Surface>
          <p className="font-medium text-ink">Nothing open.</p>
          <p className="mt-1 text-sm text-muted">
            Everything in this window is accepted or snoozed. Change the model if you want a different argument.
          </p>
        </Surface>
      ) : (
        <ul className="space-y-3">
          {open.map((insight) => (
            <li key={insight.id}>
              <Surface>
                <div className="flex flex-wrap items-center gap-2">
                  <span className="text-xs font-semibold tracking-widest text-teal uppercase">{insight.pillar}</span>
                  <Tone tone={insight.tone} />
                </div>
                <h2 className="mt-2 text-lg font-semibold text-ink">{insight.title}</h2>
                <p className="mt-2 text-sm text-muted">{insight.evidence}</p>
                <p className="mt-3 text-sm font-medium text-ink">{insight.action}</p>
                <div className="mt-4 flex flex-wrap gap-2">
                  <button
                    type="button"
                    onClick={() => setInsight(insight.id, "accepted")}
                    className="h-11 rounded-xl bg-teal px-4 text-sm font-semibold text-on-teal"
                  >
                    Accept
                  </button>
                  <button
                    type="button"
                    onClick={() => setInsight(insight.id, "snoozed")}
                    className="h-11 rounded-xl bg-canvas px-4 text-sm font-semibold text-ink"
                  >
                    Snooze
                  </button>
                </div>
              </Surface>
            </li>
          ))}
        </ul>
      )}

      {accepted.length > 0 ? (
        <section>
          <h2 className="mb-3 text-base font-semibold text-ink">Committed</h2>
          <ul className="space-y-3">
            {accepted.map((insight) => (
              <li key={insight.id}>
                <Surface>
                  <p className="font-medium text-ink">{insight.title}</p>
                  <p className="mt-1 text-sm text-muted">{insight.action}</p>
                  <button
                    type="button"
                    onClick={() => setInsight(insight.id, "open")}
                    className="mt-3 h-11 text-sm font-semibold text-teal"
                  >
                    Reopen
                  </button>
                </Surface>
              </li>
            ))}
          </ul>
        </section>
      ) : null}

      {snoozed.length > 0 ? (
        <section>
          <button
            type="button"
            onClick={() => setShowSnoozed((value) => !value)}
            className="h-11 text-sm font-semibold text-ink"
            aria-expanded={showSnoozed}
          >
            {showSnoozed ? "Hide" : "Show"} snoozed ({snoozed.length})
          </button>
          {showSnoozed ? (
            <ul className="mt-3 space-y-3">
              {snoozed.map((insight) => (
                <li key={insight.id}>
                  <Surface>
                    <p className="font-medium text-ink">{insight.title}</p>
                    <button
                      type="button"
                      onClick={() => setInsight(insight.id, "open")}
                      className="mt-3 h-11 text-sm font-semibold text-teal"
                    >
                      Restore
                    </button>
                  </Surface>
                </li>
              ))}
            </ul>
          ) : null}
        </section>
      ) : null}
    </div>
  );
}

function Tone({ tone }: { tone: "risk" | "warn" | "good" }) {
  const label = tone === "risk" ? "Act now" : tone === "warn" ? "Watch" : "Keep";
  return (
    <span
      className={cn(
        "inline-flex h-7 items-center rounded-full px-2.5 text-xs font-semibold",
        tone === "risk" && "bg-risk-bg text-risk",
        tone === "warn" && "bg-warn-bg text-warn",
        tone === "good" && "bg-good-bg text-teal",
      )}
    >
      {label}
    </span>
  );
}
