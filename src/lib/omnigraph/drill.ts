import { CHANNELS, type ChannelId } from "./content";
import {
  channelMeta,
  journeyCredits,
  spendOn,
  type ChannelStat,
  type JourneyView,
  type PathStat,
  type Snapshot,
} from "./engine";

export type DrillPoint = {
  date: string;
  label: string;
  credit: number;
  spend: number;
  platform: number;
};

export type PartnerRow = {
  id: ChannelId;
  name: string;
  orders: number;
  shared: number;
  ourCredit: number;
  theirCredit: number;
};

export type RoleRow = { label: string; orders: number };

export type WeekRow = {
  label: string;
  credit: number;
  spend: number;
  platform: number;
};

export type ChannelDrill = {
  stat: ChannelStat;
  series: DrillPoint[];
  roles: RoleRow[];
  partners: PartnerRow[];
  paths: (PathStat & { role: string })[];
  orders: JourneyView[];
  touched: number;
  creditOnTouched: number;
};

export function channelDrill(snapshot: Snapshot, id: ChannelId): ChannelDrill {
  const stat = snapshot.channels.find((channel) => channel.id === id) ?? snapshot.channels[0];
  const journeys = snapshot.journeys.filter((journey) => journey.touches.some((touch) => touch.channel === id));
  const platformByDay = new Map<string, number>();
  const roles = { Solo: 0, Opens: 0, Closes: 0, Bookends: 0, Assists: 0 };
  const partnerMap = new Map<ChannelId, PartnerRow>();

  let creditOnTouched = 0;
  for (const journey of journeys) {
    const credits = journeyCredits(journey, snapshot.model);
    creditOnTouched += credits[id];
    platformByDay.set(journey.convertedOn, (platformByDay.get(journey.convertedOn) ?? 0) + journey.value);
    const channels = new Set(journey.touches.map((touch) => touch.channel));
    const first = journey.touches[0]?.channel;
    const last = journey.touches[journey.touches.length - 1]?.channel;
    const only = channels.size === 1;
    if (only) roles.Solo += 1;
    else if (first === id && last === id) roles.Bookends += 1;
    else if (first === id) roles.Opens += 1;
    else if (last === id) roles.Closes += 1;
    else roles.Assists += 1;

    for (const other of channels) {
      if (other === id) continue;
      const row = partnerMap.get(other) ?? {
        id: other,
        name: channelMeta(other).name,
        orders: 0,
        shared: 0,
        ourCredit: 0,
        theirCredit: 0,
      };
      row.orders += 1;
      row.shared += journey.value;
      row.ourCredit += credits[id];
      row.theirCredit += credits[other];
      partnerMap.set(other, row);
    }
  }

  const series: DrillPoint[] = snapshot.series.map((point) => ({
    date: point.date,
    label: point.label,
    credit: point[id],
    spend: spendOn(snapshot.workspace.id, id, point.date),
    platform: platformByDay.get(point.date) ?? 0,
  }));

  const paths = snapshot.paths
    .filter((path) => path.steps.includes(id))
    .slice(0, 8)
    .map((path) => {
      const first = path.steps[0] === id;
      const last = path.steps[path.steps.length - 1] === id;
      const role = path.steps.length === 1 ? "Solo" : first && last ? "Bookends" : first ? "Opens" : last ? "Closes" : "Assists";
      return { ...path, role };
    });

  const orders = [...journeys].sort((a, b) => (a.convertedOn < b.convertedOn ? 1 : -1)).slice(0, 8);

  return {
    stat,
    series,
    roles: (["Opens", "Assists", "Closes", "Bookends", "Solo"] as const)
      .map((label) => ({ label, orders: roles[label] }))
      .filter((row) => row.orders > 0),
    partners: [...partnerMap.values()].sort((a, b) => b.shared - a.shared),
    paths,
    orders,
    touched: journeys.length,
    creditOnTouched,
  };
}

export function weeklyRollup(series: DrillPoint[]): WeekRow[] {
  const buckets = new Map<string, WeekRow>();
  for (const point of series) {
    const date = new Date(`${point.date}T00:00:00Z`);
    const day = date.getUTCDay();
    const monday = new Date(date);
    monday.setUTCDate(date.getUTCDate() - ((day + 6) % 7));
    const key = monday.toISOString().slice(0, 10);
    const row = buckets.get(key) ?? { label: key.slice(5), credit: 0, spend: 0, platform: 0 };
    row.credit += point.credit;
    row.spend += point.spend;
    row.platform += point.platform;
    buckets.set(key, row);
  }
  return [...buckets.values()];
}

export function stepLabel(steps: ChannelId[]): string {
  return steps.map((id) => CHANNELS.find((channel) => channel.id === id)?.short ?? id).join(" → ");
}
