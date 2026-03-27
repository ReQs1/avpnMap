import { MapPin } from "lucide-react";

function VisitCardSkeleton() {
  return (
    <div className="border-b border-gray-100 py-4 last:border-b-0 dark:border-zinc-700">
      {/* Pizzeria name */}
      <div className="h-5 w-48 animate-pulse rounded bg-gray-200 dark:bg-zinc-800" />

      {/* Date */}
      <div className="mt-2 flex items-center gap-1.5">
        <div className="h-3.5 w-3.5 animate-pulse rounded bg-gray-200 dark:bg-zinc-800" />
        <div className="h-4 w-28 animate-pulse rounded bg-gray-200 dark:bg-zinc-800" />
      </div>

      {/* Description (shown on some cards) */}
      <div className="mt-2 h-4 w-64 animate-pulse rounded bg-gray-100 dark:bg-zinc-800" />

      {/* Rating and actions row */}
      <div className="mt-3 flex items-center justify-between">
        <div className="flex items-center gap-1">
          {/* Stars */}
          {Array.from({ length: 5 }).map((_, index) => (
            <div
              key={index}
              className="h-4 w-4 animate-pulse rounded bg-yellow-100 dark:bg-zinc-800"
            />
          ))}
          {/* Rating text */}
          <div className="ml-1 h-4 w-8 animate-pulse rounded bg-gray-200 dark:bg-zinc-800" />
        </div>

        {/* Action buttons */}
        <div className="flex items-center gap-2">
          <div className="h-7 w-7 animate-pulse rounded bg-gray-100 dark:bg-zinc-800" />
          <div className="h-7 w-7 animate-pulse rounded bg-gray-100 dark:bg-zinc-800" />
        </div>
      </div>
    </div>
  );
}

function PizzaJourneySkeleton() {
  return (
    <div className="flex h-[600px] flex-col rounded-2xl border border-transparent bg-white px-4 py-8 shadow-sm dark:border-zinc-700 dark:bg-zinc-900">
      {/* Header */}
      <div className="flex shrink-0 items-center gap-2">
        <MapPin
          size={20}
          className="text-gray-600 dark:text-zinc-500"
          aria-hidden="true"
        />
        <p className="text-lg font-semibold text-gray-900 dark:text-zinc-100">
          Your Pizza Journey
        </p>
      </div>

      {/* Visit cards */}
      <div className="mt-4 flex-1 overflow-y-hidden pr-2">
        <VisitCardSkeleton />
        <VisitCardSkeleton />
        <VisitCardSkeleton />
      </div>
    </div>
  );
}

export default PizzaJourneySkeleton;
