import { Link, useNavigate, useRouterState } from "@tanstack/react-router";
import {
  Flag,
  GitBranch,
  LayoutDashboard,
  Lightbulb,
  Menu,
  PieChart,
  Route as RouteIcon,
  Search,
  Settings,
  Users,
  X,
  type LucideIcon,
} from "lucide-react";
import { useEffect, useState, type FormEvent, type ReactNode } from "react";
import { AS_OF, CHANNELS, MODELS, RANGES, WORKSPACES, type ChannelId, type ModelId, type RangeKey, type WorkspaceId } from "@/lib/omnigraph/content";
import { longDate } from "@/lib/omnigraph/format";
import { useUi } from "@/lib/omnigraph/store";
import { cn } from "@/lib/utils";
import { Mark, Wordmark } from "./logo";
import { controlClass } from "./ui";
import { useSnapshot } from "./use-snapshot";

type NavItem = {
  to: "/" | "/channels" | "/attribution" | "/journeys" | "/campaigns" | "/insights" | "/alignment" | "/settings";
  label: string;
  icon: LucideIcon;
  question: string;
  group: string;
};

const GROUPS: { label: string; items: NavItem[] }[] = [
  {
    label: "Workspace",
    items: [
      { to: "/", label: "Overview", icon: LayoutDashboard, question: "What should the team do first?", group: "Workspace" },
      { to: "/channels", label: "Channels", icon: PieChart, question: "Where is demand showing up?", group: "Workspace" },
      { to: "/attribution", label: "Attribution", icon: GitBranch, question: "Who actually deserves the credit?", group: "Workspace" },
      { to: "/journeys", label: "Journeys", icon: RouteIcon, question: "How do customers move between channels?", group: "Workspace" },
    ],
  },
  {
    label: "Investigation",
    items: [
      { to: "/campaigns", label: "Campaigns", icon: Flag, question: "Which programs earn their spend?", group: "Investigation" },
      { to: "/insights", label: "Insights", icon: Lightbulb, question: "What changed, and what should we do?", group: "Investigation" },
    ],
  },
  {
    label: "Operations",
    items: [
      { to: "/alignment", label: "Alignment", icon: Users, question: "Is the team executing the same plan?", group: "Operations" },
    ],
  },
];

const SETTINGS: NavItem = {
  to: "/settings",
  label: "Settings",
  icon: Settings,
  question: "Which sources feed the graph?",
  group: "Settings",
};

const FLAT = [...GROUPS.flatMap((group) => group.items), SETTINGS];

function activeItem(pathname: string): NavItem {
  if (pathname.startsWith("/channels/")) {
    return GROUPS[0].items[1];
  }
  return [...FLAT].sort((a, b) => b.to.length - a.to.length).find((item) => (item.to === "/" ? pathname === "/" : pathname === item.to || pathname.startsWith(`${item.to}/`))) ?? FLAT[0];
}

export function AppShell({ children }: { children: ReactNode }) {
  const pathname = useRouterState({ select: (state) => state.location.pathname });
  const navigate = useNavigate();
  const snapshot = useSnapshot();
  const open = useUi((state) => state.navOpen);
  const setNav = useUi((state) => state.setNav);
  const workspaceId = useUi((state) => state.workspaceId);
  const setWorkspace = useUi((state) => state.setWorkspace);
  const range = useUi((state) => state.range);
  const setRange = useUi((state) => state.setRange);
  const model = useUi((state) => state.model);
  const setModel = useUi((state) => state.setModel);
  const [query, setQuery] = useState("");
  const [miss, setMiss] = useState("");

  const current = activeItem(pathname);
  const channel = CHANNELS.find((item) => pathname === `/channels/${item.id}`);
  const title = channel ? channel.name : current.label;
  const question = channel ? `What is ${channel.short} actually doing in this window?` : current.question;
  const crumb = channel ? "Workspace / Channels" : current.group;

  useEffect(() => {
    void useUi.persist.rehydrate();
  }, []);

  useEffect(() => {
    setNav(false);
    setMiss("");
  }, [pathname, setNav]);

  function submitSearch(event: FormEvent) {
    event.preventDefault();
    const needle = query.trim().toLowerCase();
    if (!needle) return;
    const hitChannel = CHANNELS.find((item) => `${item.name} ${item.short} ${item.surface} ${item.id}`.toLowerCase().includes(needle));
    if (hitChannel) {
      setMiss("");
      void navigate({ to: "/channels/$channelId", params: { channelId: hitChannel.id } });
      return;
    }
    const campaign = snapshot.campaigns.find(
      (item) => `${item.name} ${item.owner} ${item.team}`.toLowerCase().includes(needle),
    );
    if (campaign) {
      setMiss("");
      void navigate({
        to: "/channels/$channelId",
        params: { channelId: campaign.channel as ChannelId },
        search: { campaign: campaign.id },
      });
      return;
    }
    setMiss(`No channel or campaign matched “${query.trim()}”.`);
  }

  return (
    <div className="min-h-screen bg-canvas text-ink">
      {open ? (
        <button
          type="button"
          aria-label="Close menu"
          className="fixed inset-0 z-30 bg-navy/40 lg:hidden"
          onClick={() => setNav(false)}
        />
      ) : null}
      <aside
        className={cn(
          "fixed inset-y-0 left-0 z-40 w-60 flex-col overflow-y-auto bg-navy text-on-navy lg:flex",
          open ? "flex" : "hidden",
        )}
      >
        <div className="flex items-center gap-2.5 px-4 pt-5">
          <Mark />
          <Wordmark />
        </div>
        <p className="px-4 pt-2 text-xs text-on-navy-dim">Workspace for credit, sources, and the work that ships it.</p>
        <nav className="mt-4 flex flex-1 flex-col px-3" aria-label="Primary workspace">
          {GROUPS.map((group) => (
            <div key={group.label} className="mb-2">
              <p className="px-3 pt-3 pb-1 text-xs font-semibold tracking-widest text-on-navy-dim uppercase">{group.label}</p>
              {group.items.map((item) => (
                <NavLink key={item.to} item={item} pathname={pathname} />
              ))}
            </div>
          ))}
          <div className="mt-auto pt-2">
            <NavLink item={SETTINGS} pathname={pathname} />
          </div>
        </nav>
        <div className="px-4 py-5">
          <p className="text-xs font-semibold tracking-widest text-teal-bright uppercase">Unify · Analyze · Align · Accelerate</p>
          <p className="mt-3 text-xs leading-relaxed text-on-navy-dim">Sample DTC brands through {longDate(AS_OF)}. Credit math is real. Live APIs are configured, not called.</p>
        </div>
      </aside>

      <div className="min-w-0 pb-24 lg:pb-0 lg:pl-60">
        <header className="sticky top-0 z-20 border-b border-line bg-canvas/95 backdrop-blur-sm">
          <div className="mx-auto flex max-w-6xl flex-col gap-3 px-4 py-3 sm:px-6 lg:px-8">
            <div className="flex min-w-0 items-start gap-2">
              <button
                type="button"
                className="inline-flex size-11 shrink-0 items-center justify-center rounded-xl bg-surface text-ink shadow-card lg:hidden"
                aria-label={open ? "Close menu" : "Open menu"}
                onClick={() => setNav(!open)}
              >
                {open ? <X className="size-5" /> : <Menu className="size-5" />}
              </button>
              <div className="min-w-0 flex-1">
                <p className="truncate text-xs font-medium text-muted">OmniGraph / {crumb}</p>
                <p className="truncate text-lg font-semibold text-ink">{title}</p>
                <p className="text-sm text-muted">{question}</p>
              </div>
            </div>
            <div className="flex min-w-0 flex-col gap-2 xl:flex-row xl:items-center">
              <form onSubmit={submitSearch} className="flex min-w-0 flex-1 items-center gap-2">
                <label className="relative min-w-0 flex-1">
                  <span className="sr-only">Search channels and campaigns</span>
                  <Search className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted" aria-hidden="true" />
                  <input
                    value={query}
                    onChange={(event) => setQuery(event.target.value)}
                    placeholder="Search channels, campaigns, owners"
                    className={cn(controlClass, "w-full pr-3 pl-9")}
                  />
                </label>
                <button type="submit" className="h-11 shrink-0 rounded-xl bg-navy px-3 text-sm font-medium text-on-navy">
                  Find
                </button>
              </form>
              <div className="flex min-w-0 flex-wrap items-center gap-2">
                <label className="sr-only" htmlFor="workspace">
                  Workspace
                </label>
                <select
                  id="workspace"
                  className={cn(controlClass, "max-w-full")}
                  value={workspaceId}
                  onChange={(event) => setWorkspace(event.target.value as WorkspaceId)}
                >
                  {WORKSPACES.map((workspace) => (
                    <option key={workspace.id} value={workspace.id}>
                      {workspace.name}
                    </option>
                  ))}
                </select>
                <div className="inline-flex items-center rounded-xl bg-surface p-1 shadow-card" role="group" aria-label="Date range">
                  {RANGES.map((item) => (
                    <button
                      key={item.id}
                      type="button"
                      aria-pressed={range === item.id}
                      onClick={() => setRange(item.id as RangeKey)}
                      className={cn(
                        "h-11 rounded-lg px-3 text-sm font-medium",
                        range === item.id ? "bg-navy text-on-navy" : "text-muted hover:text-ink",
                      )}
                    >
                      {item.label}
                    </button>
                  ))}
                </div>
                <label className="sr-only" htmlFor="model">
                  Attribution model
                </label>
                <select
                  id="model"
                  className={cn(controlClass, "max-w-full")}
                  value={model}
                  onChange={(event) => setModel(event.target.value as ModelId)}
                >
                  {MODELS.map((item) => (
                    <option key={item.id} value={item.id}>
                      {item.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            {miss ? (
              <p role="status" className="text-sm font-medium text-risk">
                {miss}
              </p>
            ) : null}
          </div>
        </header>
        <main className="mx-auto min-w-0 max-w-6xl px-4 py-5 sm:px-6 sm:py-6 lg:px-8">{children}</main>
      </div>

      <nav className="fixed inset-x-0 bottom-0 z-30 border-t border-line bg-surface lg:hidden" aria-label="Mobile workspace">
        <div className="grid grid-cols-5">
          <MobileLink to="/" label="Home" icon={LayoutDashboard} pathname={pathname} />
          <MobileLink to="/channels" label="Channels" icon={PieChart} pathname={pathname} />
          <MobileLink to="/journeys" label="Journeys" icon={RouteIcon} pathname={pathname} />
          <MobileLink to="/settings" label="Settings" icon={Settings} pathname={pathname} />
          <button
            type="button"
            onClick={() => setNav(true)}
            className="flex h-16 flex-col items-center justify-center gap-1 text-xs font-medium text-muted"
          >
            <Menu className="size-5" aria-hidden="true" />
            More
          </button>
        </div>
      </nav>
    </div>
  );
}

function NavLink({ item, pathname }: { item: NavItem; pathname: string }) {
  const active = item.to === "/" ? pathname === "/" : item.to === "/channels" ? pathname === "/channels" || pathname.startsWith("/channels/") : pathname === item.to || pathname.startsWith(`${item.to}/`);
  const Icon = item.icon;
  return (
    <Link
      to={item.to}
      aria-current={active ? "page" : undefined}
      className={cn(
        "flex h-11 items-center gap-3 rounded-xl px-3 text-sm font-medium",
        active ? "bg-navy-2 text-on-navy" : "text-on-navy-dim hover:bg-navy-2 hover:text-on-navy",
      )}
    >
      <Icon className="size-4" aria-hidden="true" />
      {item.label}
    </Link>
  );
}

function MobileLink({
  to,
  label,
  icon: Icon,
  pathname,
}: {
  to: "/" | "/channels" | "/journeys" | "/settings";
  label: string;
  icon: LucideIcon;
  pathname: string;
}) {
  const active = to === "/" ? pathname === "/" : pathname === to || pathname.startsWith(`${to}/`);
  return (
    <Link
      to={to}
      aria-current={active ? "page" : undefined}
      className={cn(
        "flex h-16 flex-col items-center justify-center gap-1 text-xs font-medium",
        active ? "text-teal" : "text-muted",
      )}
    >
      <Icon className="size-5" aria-hidden="true" />
      {label}
    </Link>
  );
}