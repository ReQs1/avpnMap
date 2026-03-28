import { Link } from "@tanstack/react-router";
import { cn } from "@/shared/utils/utils";
import type { LeaderboardMeta } from "../../types/leaderboard.types";

type Props = {
  meta: LeaderboardMeta;
  isDisabled?: boolean;
};

export default function LeaderboardTablePagination({
  meta,
  isDisabled,
}: Props) {
  const { page, limit, totalCount, totalPages } = meta;

  const startItem = totalCount === 0 ? 0 : (page - 1) * limit + 1;
  const endItem = Math.min(page * limit, totalCount);

  const getPageNumbers = () => {
    const safeTotalPages = Math.max(1, totalPages);

    if (safeTotalPages <= 5) {
      return Array.from({ length: safeTotalPages }, (_, i) => i + 1);
    }

    if (page <= 3) {
      return [1, 2, 3, 4, "...", safeTotalPages];
    }

    if (page >= safeTotalPages - 2) {
      return [
        1,
        "...",
        safeTotalPages - 3,
        safeTotalPages - 2,
        safeTotalPages - 1,
        safeTotalPages,
      ];
    }

    return [1, "...", page - 1, page, page + 1, "...", safeTotalPages];
  };

  const pages = getPageNumbers();
  const safeTotalPages = Math.max(1, totalPages);

  return (
    <div className="mx-auto mt-4 flex w-full max-w-5xl flex-col items-center justify-between gap-3 rounded-xl border border-gray-200 bg-white px-2 py-3 shadow-sm sm:flex-row sm:gap-4 sm:px-4 dark:border-zinc-700 dark:bg-zinc-900">
      {/* Left side: Info */}
      <div className="text-xs text-slate-500 sm:text-sm dark:text-zinc-400">
        Showing{" "}
        <span className="font-medium text-slate-700 dark:text-zinc-200">
          {startItem}
        </span>
        -
        <span className="font-medium text-slate-700 dark:text-zinc-200">
          {endItem}
        </span>{" "}
        of{" "}
        <span className="font-medium text-slate-700 dark:text-zinc-200">
          {totalCount}
        </span>
      </div>

      {/* Right side: Controls */}
      <div className="flex flex-wrap items-center justify-center gap-1 sm:gap-2">
        {/* Prev Button */}
        {page <= 1 ? (
          <span className="px-1 py-1 text-xs font-medium text-slate-300 sm:px-2 sm:text-sm dark:text-zinc-600">
            Prev
          </span>
        ) : (
          <Link
            to="."
            resetScroll={false}
            disabled={isDisabled}
            search={(prev) => ({ ...prev, page: page - 1 })}
            className={cn(
              "px-1 py-1 text-xs font-medium text-slate-500 transition-colors hover:text-slate-800 sm:px-2 sm:text-sm dark:text-zinc-400 dark:hover:text-zinc-200",
              isDisabled && "pointer-events-none opacity-50",
            )}
          >
            Prev
          </Link>
        )}

        {/* Page Numbers */}
        <div className="flex flex-wrap items-center justify-center gap-1">
          {pages.map((p, index) => {
            if (p === "...") {
              return (
                <span
                  key={`ellipsis-${index}`}
                  className="flex h-7 w-7 items-center justify-center text-xs text-slate-400 sm:h-8 sm:w-8 sm:text-sm dark:text-zinc-500"
                >
                  ...
                </span>
              );
            }

            const isCurrentPage = p === page;
            const isOnlyPage = safeTotalPages === 1;

            return isOnlyPage ? (
              <span
                key={`page-${p}`}
                className="bg-brand-slate flex h-7 w-7 items-center justify-center rounded-lg text-xs font-semibold text-white shadow-sm sm:h-8 sm:w-8 sm:text-sm dark:bg-zinc-800 dark:text-zinc-100"
              >
                {p}
              </span>
            ) : (
              <Link
                key={`page-${p}`}
                to="."
                resetScroll={false}
                disabled={isDisabled}
                search={(prev) => ({ ...prev, page: p as number })}
                className={cn(
                  "flex h-7 w-7 items-center justify-center rounded-lg text-xs font-semibold transition-colors sm:h-8 sm:w-8 sm:text-sm",
                  isCurrentPage
                    ? "bg-brand-slate text-white shadow-sm dark:bg-zinc-700 dark:text-zinc-100"
                    : "text-slate-600 hover:bg-slate-100 hover:text-slate-900 dark:text-zinc-400 dark:hover:bg-zinc-800 dark:hover:text-zinc-200",
                  isDisabled && "pointer-events-none opacity-50",
                )}
              >
                {p}
              </Link>
            );
          })}
        </div>

        {/* Next Button */}
        {page >= safeTotalPages ? (
          <span className="px-1 py-1 text-xs font-medium text-slate-300 sm:px-2 sm:text-sm dark:text-zinc-600">
            Next
          </span>
        ) : (
          <Link
            to="."
            resetScroll={false}
            disabled={isDisabled}
            search={(prev) => ({ ...prev, page: page + 1 })}
            className={cn(
              "px-1 py-1 text-xs font-medium text-slate-500 transition-colors hover:text-slate-800 sm:px-2 sm:text-sm dark:text-zinc-400 dark:hover:text-zinc-200",
              isDisabled && "pointer-events-none opacity-50",
            )}
          >
            Next
          </Link>
        )}
      </div>
    </div>
  );
}
