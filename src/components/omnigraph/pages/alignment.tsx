import { useState } from "react";
import type { Pillar, WorkStatus } from "@/lib/omnigraph/content";
import { buildInsights } from "@/lib/omnigraph/engine";
import { money, shortDate } from "@/lib/omnigraph/format";
import { useUi } from "@/lib/omnigraph/store";
import { useSnapshot, useWork } from "../use-snapshot";
import { Meter, PageIntro, SectionTitle, StatusPill, Surface, controlClass } from "../ui";

const PILLARS: Pillar[] = ["Unify", "Analyze", "Align", "Accelerate"];

const STATUS_OPTIONS: { id: WorkStatus; label: string }[] = [
  { id: "on_track", label: "On track" },
  { id: "at_risk", label: "At risk" },
  { id: "blocked", label: "Blocked" },
  { id: "shipped", label: "Shipped" },
];

export function AlignmentPage() {
  const snapshot = useSnapshot();
  const { items, score } = useWork();
  const setWorkStatus = useUi((state) => state.setWorkStatus);
  const decisions = useUi((state) => state.decisions);
  const addDecision = useUi((state) => state.addDecision);
  const insightState = useUi((state) => state.insightState);
  const [title, setTitle] = useState("");
  const [detail, setDetail] = useState("");
  const mine = decisions.filter((decision) => decision.workspaceId === snapshot.workspace.id);
  const committed = buildInsights(snapshot, items).filter((insight) => insightState[insight.id] === "accepted");
  const pace = snapshot.revenueTarget > 0 ? snapshot.kpis.revenue / snapshot.revenueTarget : 0;
  const cacTone = snapshot.kpis.cac <= snapshot.cacGuardrail ? "teal" : "risk";

  return (
    <div className="space-y-6">
      <PageIntro
        eyebrow="Alignment"
        title={`${snapshot.workspace.name} is ${Math.round(score * 100)} aligned.`}
        lede="Shared goals, the work under them, and a decision log so media, finance, and creative stop re-litigating the same call."
      />

      <div className="grid gap-3 lg:grid-cols-3">
        <Surface>
          <p className="text-xs font-semibold tracking-wide text-muted uppercase">Revenue pace</p>
          <p className="mt-2 text-xl font-semibold tabular-nums">
            {money(snapshot.kpis.revenue)}
            <span className="text-sm font-medium text-muted"> / {money(snapshot.revenueTarget)}</span>
          </p>
          <div className="mt-3">
            <Meter value={Math.min(pace, 1)} tone={pace >= 1 ? "teal" : "warn"} />
          </div>
        </Surface>
        <Surface>
          <p className="text-xs font-semibold tracking-wide text-muted uppercase">CAC vs guardrail</p>
          <p className="mt-2 text-xl font-semibold tabular-nums">
            {money(snapshot.kpis.cac)}
            <span className="text-sm font-medium text-muted"> / {money(snapshot.cacGuardrail)}</span>
          </p>
          <div className="mt-3">
            <Meter value={Math.min(snapshot.kpis.cac / (snapshot.cacGuardrail * 1.4), 1)} tone={cacTone} />
          </div>
        </Surface>
        <Surface>
          <p className="text-xs font-semibold tracking-wide text-muted uppercase">Brief to live</p>
          <p className="mt-2 text-xl font-semibold tabular-nums">
            {snapshot.workspace.velocityDays}d
            <span className="text-sm font-medium text-muted"> / {snapshot.workspace.velocityTarget}d target</span>
          </p>
          <p className="mt-3 text-sm text-muted">
            {snapshot.workspace.velocityDays <= snapshot.workspace.velocityTarget
              ? "Inside the launch guardrail."
              : `${snapshot.workspace.velocityDays - snapshot.workspace.velocityTarget} days past the guardrail.`}
          </p>
        </Surface>
      </div>

      <div className="grid gap-4 lg:grid-cols-2">
        {PILLARS.map((pillar) => (
          <Surface key={pillar}>
            <SectionTitle title={pillar} />
            <ul className="space-y-3">
              {items
                .filter((item) => item.pillar === pillar)
                .map((item) => (
                  <li key={item.id} className="rounded-xl bg-canvas p-3">
                    <div className="flex flex-wrap items-start justify-between gap-2">
                      <p className="font-medium text-ink">{item.title}</p>
                      <StatusPill status={item.status} />
                    </div>
                    <p className="mt-2 text-sm text-muted">{item.detail}</p>
                    <p className="mt-2 text-xs text-muted">
                      {item.owner} · {item.team} · due {shortDate(item.due)}
                    </p>
                    <label className="mt-3 block text-xs font-semibold text-muted" htmlFor={`status-${item.id}`}>
                      Status
                    </label>
                    <select
                      id={`status-${item.id}`}
                      className={controlClass}
                      value={item.status}
                      onChange={(event) => setWorkStatus(item.id, event.target.value as WorkStatus)}
                    >
                      {STATUS_OPTIONS.map((option) => (
                        <option key={option.id} value={option.id}>
                          {option.label}
                        </option>
                      ))}
                    </select>
                  </li>
                ))}
              {items.filter((item) => item.pillar === pillar).length === 0 ? (
                <li className="text-sm text-muted">Nothing open on this pillar.</li>
              ) : null}
            </ul>
          </Surface>
        ))}
      </div>

      {committed.length > 0 ? (
        <Surface>
          <SectionTitle
            title="Committed from insights"
            hint="Accepted on the insights page. They stay until you snooze or reopen them."
          />
          <ul className="space-y-3">
            {committed.map((insight) => (
              <li key={insight.id}>
                <p className="font-medium text-ink">{insight.title}</p>
                <p className="mt-1 text-sm text-muted">{insight.action}</p>
              </li>
            ))}
          </ul>
        </Surface>
      ) : null}

      <Surface>
        <SectionTitle title="Decision log" hint="Status changes and decisions stay in this browser." />
        <form
          className="grid gap-3"
          onSubmit={(event) => {
            event.preventDefault();
            if (!title.trim()) return;
            addDecision({
              workspaceId: snapshot.workspace.id,
              title: title.trim(),
              detail: detail.trim(),
            });
            setTitle("");
            setDetail("");
          }}
        >
          <label className="sr-only" htmlFor="decision-title">
            Decision
          </label>
          <input
            id="decision-title"
            value={title}
            onChange={(event) => setTitle(event.target.value)}
            placeholder="The call, in one line"
            className={controlClass}
          />
          <label className="sr-only" htmlFor="decision-detail">
            Why
          </label>
          <textarea
            id="decision-detail"
            value={detail}
            onChange={(event) => setDetail(event.target.value)}
            rows={3}
            placeholder="Why this, and who it binds"
            className="rounded-xl bg-canvas px-3 py-3 text-sm text-ink outline-none"
          />
          <button type="submit" className="h-11 w-fit rounded-xl bg-teal px-4 text-sm font-semibold text-on-teal">
            Log decision
          </button>
        </form>
        <ul className="mt-5 space-y-3">
          {mine.length === 0 ? (
            <li className="text-sm text-muted">No decisions logged. Record the call so it survives the next meeting.</li>
          ) : (
            mine.map((decision) => (
              <li key={decision.id} className="rounded-xl bg-canvas p-3">
                <p className="text-xs text-muted">{shortDate(decision.at)}</p>
                <p className="mt-1 font-medium text-ink">{decision.title}</p>
                {decision.detail ? <p className="mt-1 text-sm text-muted">{decision.detail}</p> : null}
              </li>
            ))
          )}
        </ul>
      </Surface>
    </div>
  );
}
