import { Trophy } from "lucide-react";

function AchievementsSkeleton() {
  return (
    <div className="rounded-2xl bg-white px-4 py-8 shadow-sm">
      <div className="flex items-center gap-2">
        <Trophy size={20} className="text-gray-600" aria-hidden="true" />
        <h2 className="text-lg font-semibold text-gray-900">Achievements</h2>
        <div className="h-4 w-10 animate-pulse rounded bg-gray-200" />
      </div>

      <div className="mt-4 space-y-2">
        {Array.from({ length: 6 }).map((_, index) => (
          <div
            key={index}
            className="flex items-center gap-3 rounded-xl border border-gray-200 bg-gray-50 px-4 py-3"
          >
            <div className="h-10 w-10 shrink-0 animate-pulse rounded-lg bg-gray-200" />

            <div className="min-w-0 flex-1 space-y-2">
              <div className="h-4 w-24 animate-pulse rounded bg-gray-200" />
              <div className="h-3 w-40 animate-pulse rounded bg-gray-200" />
            </div>

            <div className="h-6 w-6 shrink-0 animate-pulse rounded-full bg-gray-200" />
          </div>
        ))}
      </div>
    </div>
  );
}

export default AchievementsSkeleton;
