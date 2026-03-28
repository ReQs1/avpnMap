import { AlertCircle } from "lucide-react";

export default function LeaderboardTableError() {
  return (
    <div className="mx-auto flex w-full max-w-5xl flex-col items-center justify-center gap-2 rounded-xl border border-red-200 bg-red-50 p-8 text-center text-red-600 shadow-sm dark:border-red-500/20 dark:bg-red-500/10 dark:text-red-500">
      <AlertCircle size={32} className="mb-2 text-red-500" />
      <p className="text-lg font-semibold">Failed to load leaderboard</p>
      <p className="text-sm text-red-500/80">
        Something went wrong while fetching the data. Please try refreshing the
        page.
      </p>
    </div>
  );
}
