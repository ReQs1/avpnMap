import StatCard from "./stat-card";

type ProfileStatsProps = {
  totalVisits: number;
  avgRating: string;
  fiveStarCount: number;
  achievementsCount: number;
};

function ProfileStats({
  totalVisits,
  avgRating,
  fiveStarCount,
  achievementsCount,
}: ProfileStatsProps) {
  return (
    <div className="grid w-full grow grid-cols-2 gap-3 sm:grid-cols-4 md:max-w-[700px] lg:w-auto lg:max-w-none">
      <StatCard
        value={totalVisits}
        label="Visited"
        bgColor="bg-blue-50"
        textColor="text-blue-600"
      />
      <StatCard
        value={avgRating}
        label="Avg Rating"
        bgColor="bg-pink-50"
        textColor="text-pink-500"
      />
      <StatCard
        value={fiveStarCount}
        label="5-Star"
        bgColor="bg-purple-50"
        textColor="text-purple-600"
      />
      <StatCard
        value={achievementsCount}
        label="Achievements"
        bgColor="bg-green-50"
        textColor="text-green-600"
      />
    </div>
  );
}

export default ProfileStats;
