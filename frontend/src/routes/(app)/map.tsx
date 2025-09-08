import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/(app)/map")({
  component: RouteComponent,
});

function RouteComponent() {
  return <div>Hello /map!</div>;
}
