import { Link, useRouterState } from "@tanstack/react-router";
import {
  Flag,
  GitBranch,
  LayoutDashboard,
  Lightbulb,
  Menu,
  PieChart,
  Route as RouteIcon,
  Users,
  X,
} from "lucide-react";
import { useEffect, type ReactNode } from "react";
import { AS_OF, MODELS, RANGES, WORKSPACES, type ModelId, type RangeKey, type WorkspaceId } from "@/lib/omnigraph/content";
import { longDate } from "@/lib/omnigraph/format";
import { useUi } from "@/lib/omnigraph/store";
import { cn } from "@/lib/utils";
import { Mark, Wordmark } from "./logo";
import { controlClass } from "./ui";

const NAV = [
  { to: "/", label: "Overview", icon: LayoutDashboard },
  { to: "/channels", label: "Channels", icon: PieChart },
  { to: "/attribution", label: "Attribution", icon: GitBranch },
  { to: "/journeys", label: "Journeys", icon: RouteIcon },
  { to: "/campaigns", label: "Campaigns", icon: Flag },
  { to: "/alignment", label: "Alignment", icon: Users },
  { to: "/insights", label: "Insights", icon: Lightbulb },
] as const;

export function AppShell({ children }: { children: ReactNode }) {
  const pathname = useRouterState({ select: (state) => state.location.pathname });
  const open = useUi((state) => state.navOpen);
  const setNav = useUi((state) => state.setNav);
  const workspaceId = useUi((state) => state.workspaceId);
  const setWorkspace = useUi((state) => state.setWorkspace);
  const range = useUi((state) => state.range);
  const setRange = useUi((state) => state.setRange);
  const model = useUi((state) => state.model);
  const setModel = useUi((state) => state.setModel);
  const reset = useUi((state) => state.reset);

  useEffect(() => {
    void useUi.persist.rehydrate();
  }, []);

  useEffect(() => {
    setNav(false);
  }, [pathname, setNav]);

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
          "fixed inset-y-0 left-0 z-40 w-60 flex-col bg-navy text-on-navy lg:flex",
          open ? "flex" : "hidden",
        )}
      >
        <div className="flex items-center gap-2.5 px-4 pt-5">
          <Mark />
          <Wordmark />
        </div>
        <p className="px-4 pt-2 text-xs text-on-navy-dim">Performance, credit, and the work that ships it.</p>
        <nav className="mt-6 flex flex-1 flex-col gap-1 px-3" aria-label="Primary">
          {NAV.map((item) => {
            const active = item.to === "/" ? pathname === "/" : pathname.startsWith(item.to);
            const Icon = item.icon;
            return (
              <Link
                key={item.to}
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
          })}
        </nav>
        <div className="px-4 pb-5">
          <p className="text-xs font-semibold tracking-widest text-teal-bright uppercase">
            Unify · Analyze · Align · Accelerate
          </p>
          <p className="mt-3 text-xs leading-relaxed text-on-navy-dim">
            Sample DTC brands through {longDate(AS_OF)}. Credit math is real. The ad accounts are not.
          </p>
          <button
            type="button"
            onClick={reset}
            className="mt-3 h-11 text-sm font-medium text-on-navy-dim underline-offset-2 hover:text-on-navy hover:underline"
          >
            Reset this browser
          </button>
        </div>
      </aside>

      <div className="min-w-0 lg:pl-60">
        <header className="sticky top-0 z-20 border-b border-line bg-canvas/90 backdrop-blur-sm">
          <div className="mx-auto flex max-w-6xl flex-wrap items-center gap-2 px-4 py-3 sm:px-6 lg:px-8">
            <button
              type="button"
              className="inline-flex size-11 items-center justify-center rounded-xl bg-surface text-ink shadow-card lg:hidden"
              aria-label={open ? "Close menu" : "Open menu"}
              onClick={() => setNav(!open)}
            >
              {open ? <X className="size-5" /> : <Menu className="size-5" />}
            </button>
            <Link to="/" className="flex items-center gap-2 lg:hidden">
              <Mark className="size-8" />
              <Wordmark tone="dark" />
            </Link>
            <div className="ml-auto flex flex-wrap items-center gap-2">
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
        </header>
        <main className="mx-auto min-w-0 max-w-6xl px-4 py-5 sm:px-6 sm:py-6 lg:px-8">{children}</main>
      </div>
    </div>
  );
}
