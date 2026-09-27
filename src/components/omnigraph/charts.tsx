import { Area, CartesianGrid, ComposedChart, Line, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { CHANNELS, type ChannelId } from "@/lib/omnigraph/content";
import type { SeriesPoint } from "@/lib/omnigraph/engine";
import { money } from "@/lib/omnigraph/format";
import { channelMeta } from "@/lib/omnigraph/engine";
import { CHANNEL_COLOR } from "./ui";
import { useMounted, useReducedMotion } from "./use-snapshot";

export function RevenueChart({
  series,
  hidden,
}: {
  series: SeriesPoint[];
  hidden: Partial<Record<ChannelId, boolean>>;
}) {
  const mounted = useMounted();
  const reduced = useReducedMotion();
  if (!mounted) {
    return <div className="h-72 rounded-xl bg-canvas" />;
  }
  const visible = CHANNELS.filter((channel) => !hidden[channel.id]);
  return (
    <div className="h-72 w-full">
      <ResponsiveContainer width="100%" height="100%">
        <ComposedChart data={series} margin={{ top: 8, right: 8, left: 0, bottom: 0 }}>
          <CartesianGrid stroke="var(--color-line)" vertical={false} />
          <XAxis
            dataKey="label"
            tick={{ fill: "var(--color-faint)", fontSize: 12 }}
            tickLine={false}
            axisLine={false}
            interval={series.length > 12 ? Math.ceil(series.length / 6) : 0}
          />
          <YAxis
            tick={{ fill: "var(--color-faint)", fontSize: 12 }}
            tickLine={false}
            axisLine={false}
            width={48}
            tickFormatter={(value: number) => (value >= 1000 ? `$${Math.round(value / 1000)}k` : `$${Math.round(value)}`)}
          />
          <Tooltip content={<ChartTip />} />
          {visible.map((channel) => (
            <Area
              key={channel.id}
              type="monotone"
              dataKey={channel.id}
              name={channel.short}
              stackId="credit"
              stroke={CHANNEL_COLOR[channel.id]}
              fill={CHANNEL_COLOR[channel.id]}
              fillOpacity={0.88}
              isAnimationActive={!reduced}
            />
          ))}
          <Line
            type="monotone"
            dataKey="spend"
            name="Spend"
            stroke="var(--color-navy)"
            strokeWidth={2}
            dot={false}
            isAnimationActive={!reduced}
          />
        </ComposedChart>
      </ResponsiveContainer>
    </div>
  );
}

function ChartTip({
  active,
  payload,
  label,
}: {
  active?: boolean;
  payload?: { dataKey?: string | number; value?: number; name?: string }[];
  label?: string;
}) {
  if (!active || !payload?.length) return null;
  return (
    <div className="rounded-xl bg-surface px-3 py-2 shadow-card">
      <p className="text-xs font-medium text-muted">{label}</p>
      <ul className="mt-1 space-y-0.5">
        {payload.map((entry) => {
          const key = String(entry.dataKey ?? "");
          const name = key === "spend" ? "Spend" : channelMeta(key as ChannelId).short;
          return (
            <li key={key} className="flex items-center justify-between gap-4 text-sm tabular-nums text-ink">
              <span>{name}</span>
              <span>{money(Number(entry.value ?? 0))}</span>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
