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
    <div className="flex h-[600px] flex-col rounded-2xl border border-transparent bg-white px-4 py-8 shadow-sm dark:border-zinc-700 dark:bg-zinc-900">
      <div className="flex shrink-0 items-center gap-2">
        <Trophy
          size={20}
          className="text-gray-600 dark:text-zinc-500"
          aria-hidden="true"
        />
        <h2 className="text-lg font-semibold text-gray-900 dark:text-zinc-100">
          Achievements
        </h2>
        <span className="rounded-full bg-gray-100 px-2 py-0.5 text-sm text-gray-700 dark:bg-zinc-800 dark:text-zinc-400">
          {unlockedCount}/{totalCount}
        </span>
      </div>

      <div className="mt-4 flex-1 space-y-2 overflow-y-auto pr-2">
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
