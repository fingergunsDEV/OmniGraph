import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { ChannelId, ModelId, RangeKey, WorkStatus, WorkspaceId } from "./content";
import type { IntegrationId } from "./integrations";
import { INTEGRATION_IDS, integrationMeta, pullEstimate, validateProperty, validateSecret } from "./integrations";

export type Decision = {
  id: string;
  workspaceId: WorkspaceId;
  title: string;
  detail: string;
  at: string;
};

type InsightMark = "accepted" | "snoozed";

export type IntegrationStatus = "disconnected" | "connected" | "error";

export type IntegrationRecord = {
  property: string;
  secret: string;
  status: IntegrationStatus;
  message: string;
  lastSync: string | null;
  rows: number;
};

export type SyncEvent = {
  id: string;
  at: string;
  title: string;
  detail: string;
};

function blankIntegration(): IntegrationRecord {
  return { property: "", secret: "", status: "disconnected", message: "", lastSync: null, rows: 0 };
}

function blankIntegrations(): Record<IntegrationId, IntegrationRecord> {
  return Object.fromEntries(INTEGRATION_IDS.map((id) => [id, blankIntegration()])) as Record<
    IntegrationId,
    IntegrationRecord
  >;
}

type UiState = {
  workspaceId: WorkspaceId;
  range: RangeKey;
  model: ModelId;
  navOpen: boolean;
  focusChannel: ChannelId | null;
  workStatus: Record<string, WorkStatus>;
  notes: Record<string, string>;
  decisions: Decision[];
  insightState: Record<string, InsightMark>;
  integrations: Record<IntegrationId, IntegrationRecord>;
  syncLog: SyncEvent[];
  setWorkspace: (id: WorkspaceId) => void;
  setRange: (range: RangeKey) => void;
  setModel: (model: ModelId) => void;
  setNav: (open: boolean) => void;
  setFocusChannel: (id: ChannelId | null) => void;
  setWorkStatus: (id: string, status: WorkStatus) => void;
  setNote: (id: string, note: string) => void;
  addDecision: (input: { workspaceId: WorkspaceId; title: string; detail: string }) => void;
  setInsight: (id: string, state: InsightMark | "open") => void;
  connectIntegration: (id: IntegrationId, property: string, secret: string) => string | null;
  disconnectIntegration: (id: IntegrationId) => void;
  syncIntegrations: () => number;
  reset: () => void;
};

const defaults = {
  workspaceId: "lumen" as WorkspaceId,
  range: "30d" as RangeKey,
  model: "data_driven" as ModelId,
  navOpen: false,
  focusChannel: null as ChannelId | null,
  workStatus: {} as Record<string, WorkStatus>,
  notes: {} as Record<string, string>,
  decisions: [] as Decision[],
  insightState: {} as Record<string, InsightMark>,
  integrations: blankIntegrations(),
  syncLog: [] as SyncEvent[],
};

export const useUi = create<UiState>()(
  persist(
    (set) => ({
      ...defaults,
      setWorkspace: (workspaceId) => set({ workspaceId, focusChannel: null }),
      setRange: (range) => set({ range }),
      setModel: (model) => set({ model }),
      setNav: (navOpen) => set({ navOpen }),
      setFocusChannel: (focusChannel) => set({ focusChannel }),
      setWorkStatus: (id, status) =>
        set((state) => ({ workStatus: { ...state.workStatus, [id]: status } })),
      setNote: (id, note) => set((state) => ({ notes: { ...state.notes, [id]: note } })),
      addDecision: ({ workspaceId, title, detail }) =>
        set((state) => ({
          decisions: [
            {
              id: `d-${Date.now()}`,
              workspaceId,
              title,
              detail,
              at: new Date().toISOString().slice(0, 10),
            },
            ...state.decisions,
          ],
        })),
      setInsight: (id, insight) =>
        set((state) => {
          const next = { ...state.insightState };
          if (insight === "open") delete next[id];
          else next[id] = insight;
          return { insightState: next };
        }),
      connectIntegration: (id, property, secret) => {
        const propertyError = validateProperty(id, property);
        if (propertyError) return propertyError;
        const secretError = validateSecret(secret);
        if (secretError) return secretError;
        const rows = pullEstimate(id, property);
        const at = new Date().toISOString();
        set((state) => ({
          integrations: {
            ...state.integrations,
            [id]: {
              property: property.trim(),
              secret: secret.trim(),
              status: "connected",
              message: "Connection verified. Rows are staged in this browser.",
              lastSync: at,
              rows,
            },
          },
          syncLog: [
            {
              id: `s-${Date.now()}`,
              at: at.slice(0, 16).replace("T", " "),
              title: `${integrationMeta(id).name} connected`,
              detail: `${rows.toLocaleString("en-US")} rows staged from ${property.trim()}.`,
            },
            ...state.syncLog,
          ].slice(0, 24),
        }));
        return null;
      },
      disconnectIntegration: (id) =>
        set((state) => ({
          integrations: { ...state.integrations, [id]: { ...blankIntegration(), property: state.integrations[id]?.property ?? "" } },
          syncLog: [
            {
              id: `s-${Date.now()}`,
              at: new Date().toISOString().slice(0, 16).replace("T", " "),
              title: `${integrationMeta(id).name} disconnected`,
              detail: "The property id was kept. The key was cleared from this browser.",
            },
            ...state.syncLog,
          ].slice(0, 24),
        })),
      syncIntegrations: () => {
        let count = 0;
        const at = new Date().toISOString();
        set((state) => {
          const integrations = { ...state.integrations };
          for (const id of INTEGRATION_IDS) {
            const current = integrations[id];
            if (!current || current.status !== "connected") continue;
            count += 1;
            integrations[id] = {
              ...current,
              lastSync: at,
              rows: pullEstimate(id, current.property),
              message: "Sync finished. The credit graph still uses the compiled ledger.",
            };
          }
          return {
            integrations,
            syncLog: [
              {
                id: `s-${Date.now()}`,
                at: at.slice(0, 16).replace("T", " "),
                title: count ? `Synced ${count} source${count === 1 ? "" : "s"}` : "Nothing to sync",
                detail: count
                  ? "Connected accounts refreshed their staged row counts."
                  : "Connect at least one API before running a sync.",
              },
              ...state.syncLog,
            ].slice(0, 24),
          };
        });
        return count;
      },
      reset: () => set({ ...defaults, integrations: blankIntegrations(), syncLog: [] }),
    }),
    {
      name: "omnigraph",
      version: 1,
      skipHydration: true,
      partialize: (state) => ({
        workspaceId: state.workspaceId,
        range: state.range,
        model: state.model,
        workStatus: state.workStatus,
        notes: state.notes,
        decisions: state.decisions,
        insightState: state.insightState,
        integrations: state.integrations,
        syncLog: state.syncLog,
      }),
    },
  ),
);
