import { createFileRoute, redirect } from "@tanstack/react-router";
import { ChannelDetailPage } from "@/components/omnigraph/pages/channel-detail";
import { CHANNEL_IDS, type ChannelId } from "@/lib/omnigraph/content";

export const Route = createFileRoute("/_app/channels/$channelId")({
  validateSearch: (search: Record<string, unknown>): { campaign?: string } => ({
    campaign: typeof search.campaign === "string" && search.campaign.length > 0 ? search.campaign : undefined,
  }),
  beforeLoad: ({ params }) => {
    if (!CHANNEL_IDS.includes(params.channelId as ChannelId)) {
      throw redirect({ to: "/channels" });
    }
  },
  component: ChannelDetailRoute,
  head: ({ params }) => ({
    meta: [{ title: `${params.channelId} · OmniGraph` }],
  }),
});

function ChannelDetailRoute() {
  const { channelId } = Route.useParams();
  const { campaign } = Route.useSearch();
  return <ChannelDetailPage channelId={channelId as ChannelId} campaignId={campaign} />;
}
