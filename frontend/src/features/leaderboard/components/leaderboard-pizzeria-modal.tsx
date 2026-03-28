import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { pizzeriaQueryOptions } from "../api/pizzeria-query-options";
import {
  MapPin,
  Star,
  ChevronDown,
  ChevronUp,
  Store,
  Medal,
  Globe,
  ExternalLink,
} from "lucide-react";
import { cn } from "@/shared/utils/utils";
import Modal from "@/shared/components/modal";
import type { PizzeriaModalData } from "../types/leaderboard.types";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  pizzeria: PizzeriaModalData;
}

export default function LeaderboardPizzeriaModal({
  isOpen,
  onClose,
  pizzeria,
}: Props) {
  const [showAllReviews, setShowAllReviews] = useState(false);

  const { data: details, isLoading } = useQuery(
    pizzeriaQueryOptions(pizzeria.pizzeriaId),
  );

  const displayedReviews = showAllReviews
    ? details?.visits
    : details?.visits?.slice(0, 3);

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      className="flex max-w-lg flex-col sm:w-full"
    >
      {/* Header */}
      <div className="flex items-start gap-4 p-6 pb-4">
        <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-green-500 text-white shadow-sm dark:bg-green-600">
          <Store size={32} />
        </div>
        <div className="flex flex-col items-start pt-1">
          <h2 className="flex items-center gap-2 text-xl font-bold text-slate-900 dark:text-zinc-100">
            {pizzeria.name}
            <Medal size={18} className="text-slate-400 dark:text-zinc-500" />
          </h2>
          <div className="mt-1 flex flex-wrap items-center gap-2 text-xs font-medium text-slate-500 dark:text-zinc-400">
            {details?.memberNumber && (
              <>
                <span className="rounded bg-slate-100 px-1.5 py-0.5 tracking-wider text-slate-600 uppercase dark:bg-zinc-800 dark:text-zinc-400">
                  AVPN #{details.memberNumber}
                </span>
                <span className="text-slate-300 dark:text-zinc-600">
                  &middot;
                </span>
              </>
            )}
            <span className="flex items-center gap-1">
              <Globe size={14} className="text-slate-400 dark:text-zinc-500" />{" "}
              {pizzeria.nation}
            </span>
          </div>
        </div>
      </div>

      {/* Location & Website */}
      <div className="px-6 pb-4">
        {isLoading ? (
          <div className="h-16 w-full animate-pulse rounded-xl bg-slate-100 dark:bg-zinc-800" />
        ) : (
          details?.address && (
            <div className="flex flex-col gap-2 rounded-xl border border-gray-100 bg-slate-50 p-3 text-sm text-slate-600 shadow-sm dark:border-zinc-800 dark:bg-zinc-900/50 dark:text-zinc-400">
              <div className="flex items-start gap-2">
                <MapPin
                  size={16}
                  className="mt-0.5 shrink-0 text-slate-400 dark:text-zinc-500"
                />
                <span>{details.address}</span>
              </div>
              {details.website && (
                <a
                  href={details.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="ml-6 flex w-fit items-center gap-1 text-xs font-semibold text-red-500 transition-colors hover:text-red-600 dark:text-red-400 dark:hover:text-red-300"
                >
                  <ExternalLink size={14} /> Visit Website
                </a>
              )}
            </div>
          )
        )}
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-3 gap-2 px-6 pb-4">
        <StatBox
          value={
            <span className="flex items-center justify-center gap-1">
              <Star size={16} className="fill-orange-500 text-orange-500" />
              {pizzeria.avgRating.toFixed(1)}
            </span>
          }
          label="Avg Rating"
        />
        <StatBox
          value={<span className="text-green-600">{pizzeria.visits}</span>}
          label="Total Visits"
        />
        <StatBox
          value={<span className="text-purple-600">{pizzeria.score}</span>}
          label="Score"
        />
      </div>

      {/* Reviews Section */}
      <div tabIndex={-1} className="h-64 overflow-y-auto px-6 pb-6">
        <div>
          <h3 className="mb-3 flex items-center gap-2 text-sm font-semibold text-slate-700 dark:text-zinc-300">
            <Star size={16} className="text-slate-500 dark:text-zinc-400" />{" "}
            Recent Reviews
          </h3>

          {isLoading ? (
            <div className="space-y-3">
              {[1, 2, 3].map((i) => (
                <SkeletonRow key={i} />
              ))}
            </div>
          ) : details?.visits?.length === 0 ? (
            <p className="text-sm text-slate-500 dark:text-zinc-400">
              No reviews recorded yet.
            </p>
          ) : (
            <div className="flex flex-col">
              {displayedReviews?.map((visit) => (
                <div
                  key={visit.id}
                  className="flex flex-col gap-1.5 border-b border-gray-100 py-4 last:border-0 dark:border-zinc-800"
                >
                  <div className="flex items-start justify-between">
                    <span className="text-sm font-semibold text-slate-800 dark:text-zinc-200">
                      {visit.user.firstName}
                    </span>
                    <RatingStars rating={visit.rating} />
                  </div>
                  {visit.description && (
                    <p className="text-sm text-slate-600 dark:text-zinc-400">
                      {visit.description}
                    </p>
                  )}
                  <span className="mt-0.5 text-xs text-slate-400 dark:text-zinc-500">
                    {new Date(visit.visitedAt).toLocaleDateString()}
                  </span>
                </div>
              ))}

              {details && details.visits?.length > 3 && (
                <button
                  onClick={() => setShowAllReviews(!showAllReviews)}
                  className="mt-2 flex w-full items-center justify-center gap-1 rounded-lg bg-slate-50 py-2.5 text-xs font-semibold text-slate-600 transition-colors hover:bg-slate-100 dark:bg-zinc-800/50 dark:text-zinc-300 dark:hover:bg-zinc-800"
                >
                  {showAllReviews ? (
                    <>
                      Show Less <ChevronUp size={14} />
                    </>
                  ) : (
                    <>
                      View all {details.visits.length} reviews{" "}
                      <ChevronDown size={14} />
                    </>
                  )}
                </button>
              )}
            </div>
          )}
        </div>
      </div>
    </Modal>
  );
}

function StatBox({ value, label }: { value: React.ReactNode; label: string }) {
  return (
    <div className="flex flex-col items-center justify-center rounded-xl border border-slate-100 bg-slate-50 py-3.5 text-center shadow-sm dark:border-zinc-800 dark:bg-zinc-900/50">
      <span className="mb-1 text-lg leading-none font-bold sm:text-xl dark:text-zinc-100">
        {value}
      </span>
      <span className="text-[10px] font-medium text-slate-500 sm:text-xs dark:text-zinc-400">
        {label}
      </span>
    </div>
  );
}

function RatingStars({ rating }: { rating: number | null }) {
  if (rating === null) {
    return (
      <span className="text-xs text-slate-400 italic dark:text-zinc-500">
        Unrated
      </span>
    );
  }
  const roundedRating = Math.round(rating);
  return (
    <div className="flex shrink-0 items-center gap-0.5">
      {[1, 2, 3, 4, 5].map((star) => (
        <Star
          key={star}
          size={12}
          className={cn(
            star <= roundedRating
              ? "fill-yellow-400 text-yellow-400"
              : "fill-gray-200 text-gray-200 dark:fill-zinc-700 dark:text-zinc-700",
          )}
        />
      ))}
    </div>
  );
}

function SkeletonRow() {
  return (
    <div className="h-20 w-full animate-pulse rounded-xl bg-slate-100 dark:bg-zinc-800" />
  );
}
