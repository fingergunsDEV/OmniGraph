import { createFileRoute } from "@tanstack/react-router";
import { AlignmentPage } from "@/components/omnigraph/pages/alignment";

export const Route = createFileRoute("/_app/alignment")({
  component: AlignmentPage,
  head: () => ({ meta: [{ title: "Alignment · OmniGraph" }] }),
});
