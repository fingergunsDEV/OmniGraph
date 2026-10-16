import { createFileRoute } from "@tanstack/react-router";
import { ChannelsPage } from "@/components/omnigraph/pages/channels";

export const Route = createFileRoute("/_app/channels/")({
  component: ChannelsPage,
  head: () => ({ meta: [{ title: "Channels · OmniGraph" }] }),
});
