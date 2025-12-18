import { Trophy } from "lucide-react";
import AchievementCard from "./achievement-card";

type Achievement = {
  id: number;
  icon: string;
  title: string;
  description: string;
  unlockedAt: Date | null;
};

type AchievementsProps = {
  achievements: Achievement[];
};

function Achievements({ achievements }: AchievementsProps) {
  const unlockedCount = achievements.reduce(
    (acc, curr) => (curr.unlockedAt !== null ? acc + 1 : acc),
    0,
  );
  const totalCount = achievements.length;

  return (
    <div className="rounded-2xl bg-white px-4 py-8 shadow-sm">
      <div className="flex items-center gap-2">
        <Trophy size={20} className="text-gray-600" aria-hidden="true" />
        <h2 className="text-lg font-semibold text-gray-900">Achievements</h2>
        <span className="rounded-full bg-gray-100 px-2 py-0.5 text-sm text-gray-700">
          {unlockedCount}/{totalCount}
        </span>
      </div>

      <div className="mt-4 space-y-2">
        {achievements.map((achievement) => (
          <AchievementCard
            key={achievement.id}
            icon={achievement.icon}
            title={achievement.title}
            description={achievement.description}
            isUnlocked={achievement.unlockedAt !== null}
          />
        ))}
      </div>
    </div>
  );
}

export default Achievements;
