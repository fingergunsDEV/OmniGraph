import { createFileRoute } from "@tanstack/react-router";
import { OverviewPage } from "@/components/omnigraph/pages/overview";

export const Route = createFileRoute("/_app/")({
  component: OverviewPage,
  head: () => ({ meta: [{ title: "Overview · OmniGraph" }] }),
});
