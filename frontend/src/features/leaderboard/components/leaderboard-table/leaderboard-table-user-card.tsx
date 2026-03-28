import { Award, Crown, Medal } from "lucide-react";
import type { LeaderboardUser } from "../../types/leaderboard.types";
import { cn } from "@/shared/utils/utils";
import { useLeaderboardModalStore } from "../../store/leaderboard-modal-store";

interface Props {
  user: LeaderboardUser;
}

export default function LeaderboardTableUserCard({ user }: Props) {
  const openUserModal = useLeaderboardModalStore((s) => s.openUserModal);

  const isFirst = user.position === 1;
  const isSecond = user.position === 2;
  const isThird = user.position === 3;
  const isEven = user.position % 2 === 0;

  let bgClass = "bg-white dark:bg-zinc-900";
  if (isFirst || isSecond || isThird) bgClass = "bg-red-50 dark:bg-red-500/10";
  else if (isEven) bgClass = "bg-gray-200/60 dark:bg-zinc-800/50";

  return (
    <button
      onClick={() =>
        openUserModal({
          userId: user.userId,
          username: user.username,
          avatarURL: user.avatarURL,
          userRank: user.userRank,
          avgRating: user.avgRating,
          visits: user.visits,
          score: user.score,
        })
      }
      className={cn(
        "relative z-0 grid grid-cols-[32px_minmax(0,1fr)_50px] items-center gap-3 border-b border-gray-100 px-4 py-3 transition-colors last:border-none last:-outline-offset-2 hover:bg-slate-200 focus-visible:z-10 focus-visible:bg-slate-200 sm:grid-cols-[48px_3fr_1fr_1fr_50px] sm:gap-4 md:grid-cols-[48px_1fr_1fr_1fr_50px] dark:border-zinc-800 dark:hover:bg-zinc-800 dark:focus-visible:bg-zinc-800",
        bgClass,
      )}
    >
      {/* Position / Medal */}
      <div className="flex items-center justify-center">
        {isFirst ? (
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-yellow-100 text-lg text-yellow-600 shadow-sm dark:bg-yellow-500/20 dark:text-yellow-500">
            <Crown size={18} />
          </div>
        ) : isSecond ? (
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-slate-200 text-lg text-slate-600 shadow-sm dark:bg-zinc-700 dark:text-zinc-300">
            <Medal size={18} />
          </div>
        ) : isThird ? (
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-orange-200 text-lg text-orange-700 shadow-sm dark:bg-orange-500/20 dark:text-orange-500">
            <Award size={18} />
          </div>
        ) : (
          <span className="text-sm font-medium text-slate-500 dark:text-zinc-400">
            {user.position}
          </span>
        )}
      </div>

      {/* User Info */}
      <div className="flex min-w-0 items-center gap-3">
        <img
          src={user.avatarURL}
          alt={user.username}
          loading="lazy"
          className="h-10 w-10 shrink-0 rounded-full border border-gray-200 bg-white object-cover dark:border-zinc-700 dark:bg-zinc-800"
        />
        <div className="flex w-full min-w-0 flex-col">
          <span className="block w-full truncate text-left font-semibold text-slate-800 dark:text-zinc-100">
            {user.username}
          </span>
          <div className="mt-0.5 flex w-full min-w-0 items-center">
            <span
              className="inline-flex max-w-full items-center gap-1 rounded-full border px-2 py-0.5 text-[10px] font-bold shadow-sm dark:bg-zinc-800"
              style={{
                borderColor: user.userRank.color,
                color: user.userRank.color,
                backgroundColor: `${user.userRank.color}1A`,
              }}
            >
              <span className="shrink-0">{user.userRank.icon}</span>
              <span className="min-w-0 truncate">{user.userRank.name}</span>
            </span>
          </div>
        </div>
      </div>

      {/* Visits (Desktop Only) */}
      <div className="hidden items-center justify-center font-bold text-slate-700 sm:flex dark:text-zinc-300">
        {user.visits}
      </div>

      {/* Rating (Desktop Only) */}
      <div className="hidden items-center justify-center gap-1 font-bold text-slate-700 sm:flex dark:text-zinc-300">
        <span className="text-yellow-400">⭐</span> {user.avgRating.toFixed(1)}
      </div>

      {/* Score */}
      <div className="flex items-baseline justify-end gap-1 text-right text-lg font-bold text-red-600 dark:text-red-500">
        {user.score}
        <span className="text-xs font-normal text-slate-400 dark:text-zinc-500">
          pts
        </span>
      </div>
    </button>
  );
}
