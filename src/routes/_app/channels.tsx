import { createFileRoute, Outlet } from "@tanstack/react-router";

export const Route = createFileRoute("/_app/channels")({
  component: ChannelsLayout,
});

function ChannelsLayout() {
  return <Outlet />;
}
