import type { UserProfile } from "@/features/auth/types/user.types";
import ProfileAvatar from "./profile-avatar";
import RankBadge from "./rank-badge";
import ProfileStats from "./profile-stats";

type ProfileCardProps = {
  profile: UserProfile;
};

function ProfileCard({ profile }: ProfileCardProps) {
  const totalVisits = profile.visits.length;
  const ratingsWithValue = profile.visits.filter((v) => v.rating !== null);
  const avgRating =
    ratingsWithValue.length > 0
      ? (
          ratingsWithValue.reduce((sum, v) => sum + (v.rating ?? 0), 0) /
          ratingsWithValue.length
        ).toFixed(1)
      : "N/A";
  const fiveStarCount = profile.visits.filter((v) => v.rating === 5).length;
  const achievementsCount = profile.achievements.filter(
    (a) => a.unlockedAt !== null,
  ).length;

  return (
    <div className="rounded-2xl bg-white px-6 py-8 shadow-sm">
      <div className="flex flex-col items-center gap-6 lg:flex-row lg:items-center lg:justify-between lg:gap-6">
        <div className="flex shrink-0 grow-[2] flex-col items-center gap-4 sm:flex-row">
          <ProfileAvatar
            avatarURL={profile.avatarURL}
            username={profile.username}
          />

          <div className="text-center sm:text-left">
            <h1 className="text-xl font-bold text-gray-900">
              {profile.username}
            </h1>
            <RankBadge
              icon={profile.rank.icon}
              name={profile.rank.name}
              color={profile.rank.color}
            />
          </div>
        </div>

        <ProfileStats
          totalVisits={totalVisits}
          avgRating={avgRating}
          fiveStarCount={fiveStarCount}
          achievementsCount={achievementsCount}
        />
      </div>
    </div>
  );
}

export default ProfileCard;
