import { useThemeStore } from "@/features/layout/theme-store";
import { cn } from "@/shared/utils/utils";
import { NOT_FOUND_FEATURES } from "@/shared/constants";
import { Link } from "@tanstack/react-router";

export default function NotFoundFeatureCards() {
  const { theme } = useThemeStore();

  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
      {NOT_FOUND_FEATURES.map((feature) => (
        <Link
          key={feature.title}
          to={feature.to}
          className={cn(
            "group flex flex-col items-center gap-3 rounded-lg border border-gray-100 bg-linear-to-br from-white from-30% px-4 py-3 text-center shadow-lg transition-shadow hover:shadow-xl dark:border-zinc-700 dark:bg-zinc-900 dark:bg-none",
            theme !== "dark" && feature.gradientClass,
          )}
        >
          <div
            className={cn(
              "rounded-md p-3 transition-colors",
              theme === "dark"
                ? [feature.darkBgColorClass, feature.darkHoverBgClass]
                : [feature.bgColorClass, feature.hoverBgClass],
            )}
            aria-hidden="true"
          >
            <feature.icon
              className={cn(
                theme === "dark"
                  ? feature.darkIconColorClass
                  : feature.iconColorClass,
              )}
            />
          </div>

          <div className="space-y-2">
            <p className="font-bold text-gray-700 dark:text-zinc-100">
              {feature.title}
            </p>
            <p className="text-sm text-gray-500 dark:text-zinc-500">
              {feature.description}
            </p>
          </div>
        </Link>
      ))}
    </div>
  );
}
