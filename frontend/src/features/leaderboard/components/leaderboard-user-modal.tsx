import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import {
  MapPin,
  Trophy,
  Star,
  ChevronDown,
  ChevronUp,
  Info,
} from "lucide-react";
import { cn } from "@/shared/utils/utils";
import type { LeaderboardUser } from "../types/leaderboard.types";
import { profileQueryOptions } from "@/features/profile/api/profile-query-options";
import Modal from "@/shared/components/modal";
import type { UserProfile } from "@/features/auth/types/user.types";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  user: LeaderboardUser;
}

export default function LeaderboardUserModal({ isOpen, onClose, user }: Props) {
  const [showAllVisits, setShowAllVisits] = useState(false);

  const { data: profile, isLoading } = useQuery(
    profileQueryOptions(user.userId),
  );

  // Determine which achievements are unlocked
  const unlockedAchievements =
    profile?.achievements.filter((a) => a.unlockedAt) || [];

  // Handle visits pagination/display
  const displayedVisits = showAllVisits
    ? profile?.visits
    : profile?.visits.slice(0, 3);

  return (
    <Modal isOpen={isOpen} onClose={onClose} className="max-w-lg sm:w-full">
      {/* Header */}
      <div className="flex items-center gap-4 p-6 pb-4">
        <img
          src={user.avatarURL}
          alt={user.username}
          className="h-16 w-16 shrink-0 rounded-full border border-gray-100 object-cover shadow-sm"
        />
        <div className="flex flex-col items-start">
          <h2 className="text-xl font-bold text-slate-900">{user.username}</h2>
          <span
            className="mt-1 inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-xs font-bold text-white shadow-sm"
            style={{ backgroundColor: user.userRank.color }}
          >
            <span className="shrink-0">{user.userRank.icon}</span>
            <span className="truncate">{user.userRank.name}</span>
          </span>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-4 gap-2 px-6 pb-4">
        <StatBox value={user.visits} label="Visits" colorClass="text-red-500" />
        <StatBox
          value={user.avgRating.toFixed(1)}
          label="Avg Rating"
          colorClass="text-orange-500"
        />
        <StatBox
          value={isLoading ? "-" : unlockedAchievements.length}
          label="Achievements"
          colorClass="text-green-500"
        />
        <StatBox
          value={user.score}
          label="Score"
          colorClass="text-purple-600"
        />
      </div>

      {/* Scrollable Body area */}
      <div className="max-h-[55vh] overflow-y-auto px-6 pb-6">
        {/* Recent Visits Section */}
        <div className="mb-6">
          <h3 className="mb-3 flex items-center gap-2 text-sm font-semibold text-slate-700">
            <MapPin size={16} /> Recent Visits
          </h3>

          {isLoading ? (
            <div className="space-y-3">
              {[1, 2, 3].map((i) => (
                <SkeletonRow key={i} />
              ))}
            </div>
          ) : profile?.visits.length === 0 ? (
            <p className="text-sm text-slate-500">No visits recorded yet.</p>
          ) : (
            <div className="flex flex-col">
              {displayedVisits?.map((visit) => (
                <div
                  key={visit.id}
                  className="flex items-start justify-between border-b border-gray-100 py-3 last:border-0"
                >
                  <div className="flex flex-col">
                    <span className="text-sm font-semibold text-slate-800">
                      {visit.pizzeria.name}
                    </span>
                    <span className="text-xs text-slate-500">
                      {new Date(visit.visitedAt).toLocaleDateString()}
                    </span>
                  </div>
                  <RatingStars rating={visit.rating} />
                </div>
              ))}

              {/* Show More/Less Button */}
              {profile && profile.visits.length > 3 && (
                <button
                  onClick={() => setShowAllVisits(!showAllVisits)}
                  className="mt-2 flex w-full items-center justify-center gap-1 rounded-lg bg-slate-50 py-2 text-xs font-semibold text-slate-600 transition-colors hover:bg-slate-100"
                >
                  {showAllVisits ? (
                    <>
                      Show Less <ChevronUp size={14} />
                    </>
                  ) : (
                    <>
                      View all {profile.visits.length} visits{" "}
                      <ChevronDown size={14} />
                    </>
                  )}
                </button>
              )}
            </div>
          )}
        </div>

        {/* Achievements Section */}
        <div>
          <h3 className="mb-3 flex items-center gap-2 text-sm font-semibold text-slate-700">
            <Trophy size={16} /> Achievements
          </h3>

          {isLoading ? (
            <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
              {[1, 2, 3, 4].map((i) => (
                <SkeletonRow key={i} />
              ))}
            </div>
          ) : unlockedAchievements.length === 0 ? (
            <p className="text-sm text-slate-500">
              No achievements unlocked yet.
            </p>
          ) : (
            <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
              {unlockedAchievements.map((ach) => (
                <AchievementItem key={ach.id} achievement={ach} />
              ))}
            </div>
          )}
        </div>
      </div>
    </Modal>
  );
}

// --- Subcomponents & Helpers ---

function AchievementItem({
  achievement,
}: {
  achievement: UserProfile["achievements"][number];
}) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div
      className="flex cursor-pointer flex-col overflow-hidden rounded-xl bg-green-50 shadow-sm transition-colors hover:bg-green-100/80"
      onClick={() => setIsOpen(!isOpen)}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          setIsOpen(!isOpen);
        }
      }}
    >
      {/* Top Banner */}
      <div className="flex items-center gap-2 px-3 py-2 text-sm font-medium text-green-700">
        <span className="shrink-0">{achievement.icon}</span>
        <span className="flex-1 truncate">{achievement.title}</span>
        <Info
          size={14}
          className={cn(
            "shrink-0 text-green-600/60 transition-transform duration-200",
            isOpen && "rotate-180",
          )}
        />
      </div>

      {/* Expandable Description */}
      {isOpen && (
        <div className="mt-1 border-t border-green-200/50 px-3 pt-0 pb-2 text-xs text-green-800/80">
          <p className="pt-2">{achievement.description}</p>
          <p className="mt-1 text-[10px] font-medium text-green-600/70">
            Unlocked:{" "}
            {achievement.unlockedAt
              ? new Date(achievement.unlockedAt).toLocaleDateString()
              : "Unknown"}
          </p>
        </div>
      )}
    </div>
  );
}

function StatBox({
  value,
  label,
  colorClass,
}: {
  value: string | number;
  label: string;
  colorClass: string;
}) {
  return (
    <div className="flex flex-col items-center justify-center rounded-xl bg-slate-50 py-3 text-center shadow-sm">
      <span
        className={cn(
          "mb-1 text-lg leading-none font-bold sm:text-xl",
          colorClass,
        )}
      >
        {value}
      </span>
      <span className="text-[10px] font-medium text-slate-500 sm:text-xs">
        {label}
      </span>
    </div>
  );
}

function RatingStars({ rating }: { rating: number | null }) {
  if (rating === null) {
    return <span className="text-xs text-slate-400 italic">Unrated</span>;
  }

  const roundedRating = Math.round(rating);

  return (
    <div className="flex items-center gap-0.5">
      {[1, 2, 3, 4, 5].map((star) => (
        <Star
          key={star}
          size={12}
          className={cn(
            star <= roundedRating
              ? "fill-yellow-400 text-yellow-400"
              : "fill-gray-200 text-gray-200",
          )}
        />
      ))}
    </div>
  );
}

function SkeletonRow() {
  return <div className="h-10 w-full animate-pulse rounded-xl bg-slate-100" />;
}
