import { createFileRoute } from "@tanstack/react-router";
import { JourneysPage } from "@/components/omnigraph/pages/journeys";

export const Route = createFileRoute("/_app/journeys")({
  component: JourneysPage,
  head: () => ({ meta: [{ title: "Journeys · OmniGraph" }] }),
});
