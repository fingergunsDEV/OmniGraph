import { createFileRoute } from "@tanstack/react-router";
import { CampaignsPage } from "@/components/omnigraph/pages/campaigns";

export const Route = createFileRoute("/_app/campaigns")({
  component: CampaignsPage,
  head: () => ({ meta: [{ title: "Campaigns · OmniGraph" }] }),
});
