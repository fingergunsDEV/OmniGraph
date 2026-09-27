import { createFileRoute } from "@tanstack/react-router";
import { InsightsPage } from "@/components/omnigraph/pages/insights";

export const Route = createFileRoute("/_app/insights")({
  component: InsightsPage,
  head: () => ({ meta: [{ title: "Insights · OmniGraph" }] }),
});
