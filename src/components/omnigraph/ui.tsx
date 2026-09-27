import {
  BarChart3,
  Mail,
  Megaphone,
  Play,
  Search,
  ShoppingCart,
  Users,
  type LucideIcon,
} from "lucide-react";
import type { ReactNode } from "react";
import type { ChannelId, WorkStatus } from "@/lib/omnigraph/content";
import { signedPct } from "@/lib/omnigraph/format";
import { cn } from "@/lib/utils";

export const CHANNEL_COLOR: Record<ChannelId, string> = {
  search: "var(--color-ch-search)",
  social: "var(--color-ch-social)",
  email: "var(--color-ch-email)",
  video: "var(--color-ch-video)",
  audience: "var(--color-ch-audience)",
  onsite: "var(--color-ch-onsite)",
};

const ICONS: Record<ChannelId | "measure", LucideIcon> = {
  search: Search,
  social: Megaphone,
  email: Mail,
  video: Play,
  audience: Users,
  onsite: ShoppingCart,
  measure: BarChart3,
};

export function ChannelGlyph({
  id,
  className,
}: {
  id: ChannelId | "measure";
  className?: string;
}) {
  const Icon = ICONS[id];
  return (
    <span
      className={cn("inline-flex size-8 shrink-0 items-center justify-center rounded-full text-on-navy", className)}
      style={{ background: id === "measure" ? "var(--color-navy)" : CHANNEL_COLOR[id] }}
    >
      <Icon className="size-4" strokeWidth={2.25} aria-hidden="true" />
    </span>
  );
}

export function PageIntro({
  eyebrow,
  title,
  lede,
}: {
  eyebrow: string;
  title: string;
  lede: string;
}) {
  return (
    <header className="max-w-3xl">
      <p className="text-xs font-semibold tracking-widest text-teal uppercase">{eyebrow}</p>
      <h1 className="mt-2 text-2xl font-semibold leading-tight text-ink sm:text-3xl">{title}</h1>
      <p className="mt-2 max-w-2xl text-sm text-muted sm:text-base">{lede}</p>
    </header>
  );
}

export function Surface({
  className,
  children,
  id,
}: {
  className?: string;
  children: ReactNode;
  id?: string;
}) {
  return (
    <section id={id} className={cn("rounded-2xl bg-surface p-4 shadow-card sm:p-5", className)}>
      {children}
    </section>
  );
}

export function SectionTitle({ title, hint, action }: { title: string; hint?: string; action?: ReactNode }) {
  return (
    <div className="mb-4 flex flex-wrap items-end justify-between gap-2">
      <div>
        <h2 className="text-base font-semibold text-ink">{title}</h2>
        {hint ? <p className="mt-1 text-sm text-muted">{hint}</p> : null}
      </div>
      {action}
    </div>
  );
}

export function Delta({ value, invert = false }: { value: number | null; invert?: boolean }) {
  if (value === null || !Number.isFinite(value)) {
    return <span className="text-sm text-faint">No prior window</span>;
  }
  const up = value > 0.004;
  const down = value < -0.004;
  const good = invert ? down : up;
  const bad = invert ? up : down;
  return (
    <span
      className={cn(
        "text-sm font-medium tabular-nums",
        good && "text-teal",
        bad && "text-risk",
        !good && !bad && "text-muted",
      )}
    >
      {signedPct(value)} vs prior
    </span>
  );
}

export function Kpi({
  label,
  value,
  detail,
  delta,
  invert,
  tone = "light",
}: {
  label: string;
  value: string;
  detail?: string;
  delta?: number | null;
  invert?: boolean;
  tone?: "light" | "navy";
}) {
  const navy = tone === "navy";
  return (
    <article className={cn("rounded-2xl p-4 shadow-card sm:p-5", navy ? "bg-navy" : "bg-surface")}>
      <p className={cn("text-xs font-semibold tracking-wide uppercase", navy ? "text-on-navy-dim" : "text-muted")}>
        {label}
      </p>
      <p className={cn("mt-2 text-2xl font-semibold tabular-nums sm:text-3xl", navy ? "text-on-navy" : "text-ink")}>
        {value}
      </p>
      <div className="mt-2 flex flex-wrap items-center gap-x-3 gap-y-1">
        {delta !== undefined ? <Delta value={delta} invert={invert} /> : null}
        {detail ? <p className={cn("text-sm", navy ? "text-on-navy-dim" : "text-muted")}>{detail}</p> : null}
      </div>
    </article>
  );
}

const STATUS_LABEL: Record<WorkStatus, string> = {
  on_track: "On track",
  at_risk: "At risk",
  blocked: "Blocked",
  shipped: "Shipped",
};

export function StatusPill({ status }: { status: WorkStatus }) {
  return (
    <span
      className={cn(
        "inline-flex h-7 items-center rounded-full px-2.5 text-xs font-semibold",
        status === "on_track" && "bg-good-bg text-teal",
        status === "shipped" && "bg-canvas text-muted",
        status === "at_risk" && "bg-warn-bg text-warn",
        status === "blocked" && "bg-risk-bg text-risk",
      )}
    >
      {STATUS_LABEL[status]}
    </span>
  );
}

export function Meter({ value, tone = "teal" }: { value: number; tone?: "teal" | "warn" | "risk" }) {
  const width = `${Math.max(0, Math.min(100, value * 100))}%`;
  return (
    <div className="h-2 overflow-hidden rounded-full bg-canvas">
      <div
        className={cn(
          "h-full rounded-full",
          tone === "teal" && "bg-teal-bright",
          tone === "warn" && "bg-ch-onsite",
          tone === "risk" && "bg-ch-video",
        )}
        style={{ width }}
      />
    </div>
  );
}

export const controlClass =
  "h-11 rounded-xl bg-surface px-3 text-sm text-ink shadow-card outline-none";
