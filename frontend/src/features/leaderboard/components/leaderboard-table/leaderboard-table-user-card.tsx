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

  let bgClass = "bg-white";
  if (isFirst || isSecond || isThird) bgClass = "bg-red-50";
  else if (isEven) bgClass = "bg-gray-200/60";

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
        "relative z-0 grid grid-cols-[32px_minmax(0,1fr)_50px] items-center gap-3 border-b border-gray-100 px-4 py-3 transition-colors last:border-none last:-outline-offset-2 hover:bg-slate-200 focus-visible:z-10 focus-visible:bg-slate-200 focus-visible:ring-2 focus-visible:ring-slate-400 focus-visible:outline-none sm:grid-cols-[48px_3fr_1fr_1fr_50px] sm:gap-4 md:grid-cols-[48px_1fr_1fr_1fr_50px]",
        bgClass,
      )}
    >
      {/* Position / Medal */}
      <div className="flex items-center justify-center">
        {isFirst ? (
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-yellow-100 text-lg text-yellow-600 shadow-sm">
            <Crown size={18} />
          </div>
        ) : isSecond ? (
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-slate-200 text-lg text-slate-600 shadow-sm">
            <Medal size={18} />
          </div>
        ) : isThird ? (
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-orange-200 text-lg text-orange-700 shadow-sm">
            <Award size={18} />
          </div>
        ) : (
          <span className="text-sm font-medium text-slate-500">
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
          className="h-10 w-10 shrink-0 rounded-full border border-gray-200 bg-white object-cover"
        />
        <div className="flex w-full min-w-0 flex-col">
          <span className="block w-full truncate text-left font-semibold text-slate-800">
            {user.username}
          </span>
          <div className="mt-0.5 flex w-full min-w-0 items-center">
            <span
              className="inline-flex max-w-full items-center gap-1 rounded-full px-2 py-0.5 text-[10px] font-bold text-white shadow-sm"
              style={{ backgroundColor: user.userRank.color }}
            >
              <span className="shrink-0">{user.userRank.icon}</span>
              <span className="min-w-0 truncate">{user.userRank.name}</span>
            </span>
          </div>
        </div>
      </div>

      {/* Visits (Desktop Only) */}
      <div className="hidden items-center justify-center font-bold text-slate-700 sm:flex">
        {user.visits}
      </div>

      {/* Rating (Desktop Only) */}
      <div className="hidden items-center justify-center gap-1 font-bold text-slate-700 sm:flex">
        <span className="text-yellow-400">⭐</span> {user.avgRating.toFixed(1)}
      </div>

      {/* Score */}
      <div className="flex items-baseline justify-end gap-1 text-right text-lg font-bold text-red-600">
        {user.score}
        <span className="text-xs font-normal text-slate-400">pts</span>
      </div>
    </button>
  );
}
