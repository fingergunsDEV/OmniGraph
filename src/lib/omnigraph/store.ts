import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { ChannelId, ModelId, RangeKey, WorkStatus, WorkspaceId } from "./content";

export type Decision = {
  id: string;
  workspaceId: WorkspaceId;
  title: string;
  detail: string;
  at: string;
};

type InsightMark = "accepted" | "snoozed";

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
  setWorkspace: (id: WorkspaceId) => void;
  setRange: (range: RangeKey) => void;
  setModel: (model: ModelId) => void;
  setNav: (open: boolean) => void;
  setFocusChannel: (id: ChannelId | null) => void;
  setWorkStatus: (id: string, status: WorkStatus) => void;
  setNote: (id: string, note: string) => void;
  addDecision: (input: { workspaceId: WorkspaceId; title: string; detail: string }) => void;
  setInsight: (id: string, state: InsightMark | "open") => void;
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
      reset: () => set({ ...defaults }),
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
      }),
    },
  ),
);
