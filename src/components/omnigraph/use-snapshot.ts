import { useEffect, useMemo, useState } from "react";
import { workFor, alignmentScore, getSnapshot } from "@/lib/omnigraph/engine";
import { useUi } from "@/lib/omnigraph/store";

export function useSnapshot() {
  const workspaceId = useUi((state) => state.workspaceId);
  const range = useUi((state) => state.range);
  const model = useUi((state) => state.model);
  return useMemo(() => getSnapshot(workspaceId, range, model), [workspaceId, range, model]);
}

export function useWork() {
  const workspaceId = useUi((state) => state.workspaceId);
  const overrides = useUi((state) => state.workStatus);
  return useMemo(() => {
    const items = workFor(workspaceId).map((item) => ({
      ...item,
      status: overrides[item.id] ?? item.status,
    }));
    return { items, score: alignmentScore(items) };
  }, [workspaceId, overrides]);
}

export function useReducedMotion() {
  const [reduced, setReduced] = useState(false);
  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    const apply = () => setReduced(media.matches);
    apply();
    media.addEventListener("change", apply);
    return () => media.removeEventListener("change", apply);
  }, []);
  return reduced;
}

export function useMounted() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  return mounted;
}
