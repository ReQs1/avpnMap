type Props = {
  /** Number of skeleton rows to display. Defaults to 10 (matching the API limit). */
  rows?: number;
};

export default function LeaderboardTableSkeleton({ rows = 10 }: Props) {
  return (
    <div className="mx-auto w-full max-w-5xl overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm">
      {/* Header Skeleton */}
      <div className="grid grid-cols-[32px_minmax(0,1fr)_75px] items-center gap-3 border-b border-gray-200 bg-slate-50 px-4 py-4 sm:grid-cols-[48px_1fr_1fr_1fr_100px] sm:gap-4">
        <div className="mx-auto h-4 w-4 animate-pulse rounded bg-slate-200" />
        <div className="h-4 w-16 animate-pulse rounded bg-slate-200" />
        <div className="mx-auto hidden h-4 w-12 animate-pulse rounded bg-slate-200 sm:block" />
        <div className="mx-auto hidden h-4 w-12 animate-pulse rounded bg-slate-200 sm:block" />
        <div className="ml-auto h-4 w-12 animate-pulse rounded bg-slate-200" />
      </div>

      {/* Rows Skeleton */}
      <div className="flex flex-col">
        {Array.from({ length: rows }).map((_, i) => (
          <div
            key={i}
            className="grid grid-cols-[32px_minmax(0,1fr)_75px] items-center gap-3 border-b border-gray-100 px-4 py-3 last:border-none sm:grid-cols-[48px_1fr_1fr_1fr_100px] sm:gap-4"
          >
            {/* Position Placeholder */}
            <div className="flex justify-center">
              <div className="h-8 w-8 animate-pulse rounded-full bg-slate-200" />
            </div>

            {/* Info Placeholder (Avatar + Text) */}
            <div className="flex min-w-0 items-center gap-3">
              <div className="h-10 w-10 shrink-0 animate-pulse rounded-full bg-slate-200" />
              <div className="flex w-full flex-col gap-2">
                <div className="h-4 w-24 animate-pulse rounded bg-slate-200 sm:w-32" />
                <div className="h-3 w-16 animate-pulse rounded bg-slate-200 sm:w-24" />
              </div>
            </div>

            {/* Middle Columns (Desktop Only) */}
            <div className="hidden justify-center sm:flex">
              <div className="h-4 w-8 animate-pulse rounded bg-slate-200" />
            </div>
            <div className="hidden justify-center sm:flex">
              <div className="h-4 w-8 animate-pulse rounded bg-slate-200" />
            </div>

            {/* Score Placeholder */}
            <div className="flex justify-end">
              <div className="h-5 w-12 animate-pulse rounded bg-slate-200" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
