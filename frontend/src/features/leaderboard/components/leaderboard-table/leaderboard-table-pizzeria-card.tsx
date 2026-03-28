import { Award, Crown, Medal, Store } from "lucide-react";
import type { LeaderboardPizzeria } from "../../types/leaderboard.types";
import { cn } from "@/shared/utils/utils";
import { useLeaderboardModalStore } from "../../store/leaderboard-modal-store";

type Props = {
  pizzeria: LeaderboardPizzeria;
};

export default function LeaderboardTablePizzeriaCard({ pizzeria }: Props) {
  const openPizzeriaModal = useLeaderboardModalStore(
    (s) => s.openPizzeriaModal,
  );

  const isFirst = pizzeria.position === 1;
  const isSecond = pizzeria.position === 2;
  const isThird = pizzeria.position === 3;
  const isEven = pizzeria.position % 2 === 0;

  let bgClass = "bg-white dark:bg-zinc-900";
  if (isFirst || isSecond || isThird)
    bgClass = "bg-green-50 dark:bg-green-500/10";
  else if (isEven) bgClass = "bg-gray-200/60 dark:bg-zinc-800/50";

  return (
    <button
      onClick={() =>
        openPizzeriaModal({
          pizzeriaId: pizzeria.pizzeriaId,
          name: pizzeria.name,
          nation: pizzeria.nation,
          avgRating: pizzeria.avgRating,
          visits: pizzeria.visits,
          score: pizzeria.score,
        })
      }
      className={cn(
        "relative z-0 grid grid-cols-[32px_minmax(0,1fr)_50px] items-center gap-3 border-b border-gray-100 px-4 py-3 transition-colors last:border-none last:-outline-offset-2 hover:bg-slate-200 focus-visible:z-10 focus-visible:bg-slate-200 focus-visible:ring-2 focus-visible:ring-slate-400 focus-visible:outline-none sm:grid-cols-[48px_3fr_1fr_1fr_50px] sm:gap-4 md:grid-cols-[48px_1fr_1fr_1fr_50px] dark:border-zinc-800 dark:hover:bg-zinc-800 dark:focus-visible:bg-zinc-800 dark:focus-visible:ring-zinc-600",
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
            {pizzeria.position}
          </span>
        )}
      </div>

      {/* Pizzeria Info */}
      <div className="flex min-w-0 items-center gap-3">
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-green-500 text-white shadow-sm dark:bg-green-600">
          <Store size={20} />
        </div>
        <div className="flex w-full min-w-0 flex-col">
          <span className="block w-full truncate text-left font-semibold text-slate-800 dark:text-zinc-100">
            {pizzeria.name}
          </span>
          <div className="mt-0.5 flex w-full min-w-0 items-center text-xs text-slate-500 dark:text-zinc-400">
            <span className="block w-full truncate text-left">
              #{pizzeria.avpnId} &middot; {pizzeria.nation}
            </span>
          </div>
        </div>
      </div>

      {/* Rating (Desktop Only) */}
      <div className="hidden items-center justify-center gap-1 font-bold text-slate-700 sm:flex dark:text-zinc-300">
        <span className="text-yellow-400">⭐</span>{" "}
        {pizzeria.avgRating.toFixed(1)}
      </div>

      {/* Visits (Desktop Only) */}
      <div className="hidden items-center justify-center font-bold text-slate-700 sm:flex dark:text-zinc-300">
        {pizzeria.visits}
      </div>

      {/* Score */}
      <div className="flex items-baseline justify-end gap-1 text-right text-lg font-bold text-green-600 dark:text-green-500">
        {Math.floor(pizzeria.score)}
        <span className="text-xs font-normal text-slate-400 dark:text-zinc-500">
          pts
        </span>
      </div>
    </button>
  );
}
