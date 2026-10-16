import { createFileRoute } from "@tanstack/react-router";
import { SettingsPage } from "@/components/omnigraph/pages/settings";

export const Route = createFileRoute("/_app/settings")({
  component: SettingsPage,
  head: () => ({ meta: [{ title: "Settings · OmniGraph" }] }),
});
