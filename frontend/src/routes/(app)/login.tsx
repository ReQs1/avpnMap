import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/(app)/login")({
  component: LoginPage,
});

function LoginPage() {
  return <div>Hello "/(app)/login"!</div>;
}
