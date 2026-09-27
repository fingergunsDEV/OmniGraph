import { createFileRoute } from "@tanstack/react-router";
import { AttributionPage } from "@/components/omnigraph/pages/attribution";

export const Route = createFileRoute("/_app/attribution")({
  component: AttributionPage,
  head: () => ({ meta: [{ title: "Attribution · OmniGraph" }] }),
});
