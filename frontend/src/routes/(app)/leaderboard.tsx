import LeaderboardHeader from "@/features/leaderboard/components/leaderboard-header";
import SearchBar from "@/features/leaderboard/components/search-bar";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/(app)/leaderboard")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <main className="grow bg-gray-50 px-4 py-8">
      <div className="mx-auto max-w-5xl space-y-8">
        <LeaderboardHeader />
        <SearchBar />
      </div>
    </main>
  );
}
