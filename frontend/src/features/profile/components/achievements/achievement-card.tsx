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
          ? "border-green-200 bg-green-50"
          : "border-gray-200 bg-gray-50",
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
            isUnlocked ? "text-green-900" : "text-gray-500",
          )}
        >
          {title}
        </h3>
        <p
          className={cn(
            "truncate text-xs",
            isUnlocked ? "text-green-700" : "text-gray-400",
          )}
        >
          {description}
        </p>
      </div>

      {isUnlocked && (
        <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-green-600">
          <Check className="h-4 w-4 text-white" strokeWidth={3} />
        </div>
      )}
    </div>
  );
}

export default AchievementCard;
