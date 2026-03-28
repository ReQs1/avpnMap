import { parse } from "twemoji-parser";
import { Check } from "lucide-react";
import { cn } from "@/shared/utils/utils";

type AchievementCardProps = {
  icon: string;
  title: string;
  description: string;
  isUnlocked: boolean;
};

function AchievementCard({
  icon,
  title,
  description,
  isUnlocked,
}: AchievementCardProps) {
  const entities = parse(icon);
  const achievementIcon = entities[0];

  return (
    <div
      className={cn(
        "flex h-16 items-center gap-2 rounded-xl border px-3 py-3",
        isUnlocked
          ? "border-green-200 bg-green-50 dark:border-green-500/20 dark:bg-green-500/10"
          : "border-gray-200 bg-gray-50 dark:border-zinc-700 dark:bg-zinc-800",
      )}
    >
      <div className="flex h-10 w-10 shrink-0 items-center justify-center">
        {achievementIcon && (
          <img
            src={achievementIcon.url}
            alt={achievementIcon.text}
            className={cn("h-6 w-6", !isUnlocked && "opacity-50 grayscale")}
          />
        )}
      </div>

      <div className="min-w-0 flex-1">
        <h3
          className={cn(
            "truncate text-sm font-semibold",
            isUnlocked
              ? "text-green-900 dark:text-green-400"
              : "text-gray-500 dark:text-zinc-400",
          )}
        >
          {title}
        </h3>
        <p
          className={cn(
            "truncate text-xs",
            isUnlocked
              ? "text-green-700 dark:text-green-500"
              : "text-gray-400 dark:text-zinc-500",
          )}
        >
          {description}
        </p>
      </div>

      {isUnlocked && (
        <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-green-600 dark:bg-green-500">
          <Check className="h-4 w-4 text-white" strokeWidth={3} />
        </div>
      )}
    </div>
  );
}

export default AchievementCard;
