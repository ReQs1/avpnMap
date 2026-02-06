import LeaderboardHeader from "@/features/leaderboard/components/leaderboard-header";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/(app)/leaderboard")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <main className="grow bg-gray-50 px-4 py-8">
      <div className="mx-auto max-w-5xl">
        <LeaderboardHeader />
      </div>
    </main>
  );
}
