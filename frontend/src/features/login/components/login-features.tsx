import { useThemeStore } from "@/features/layout/theme-store";
import { LOGIN_FEATURES } from "@/shared/constants";
import { cn } from "@/shared/utils/utils";

export default function LoginFeatures() {
  const { theme } = useThemeStore();

  return (
    <div className="grid grid-rows-4 gap-4">
      {LOGIN_FEATURES.map((feature) => {
        const Icon = feature.icon;

        return (
          <div key={feature.text} className="inline-flex items-center gap-2">
            <div
              className={cn(
                "flex h-10 w-10 items-center justify-center rounded-lg px-2 sm:h-12 sm:w-12",
                theme === "dark"
                  ? feature.darkBgColorClass
                  : feature.bgColorClass,
              )}
            >
              <Icon
                className={cn(
                  "h-[1.75rem] w-[1.75rem]",
                  theme === "dark"
                    ? feature.darkIconColorClass
                    : feature.iconColorClass,
                )}
              />
            </div>
            <div>
              <p className="text-sm font-bold text-gray-800 sm:text-base dark:text-zinc-100">
                {feature.text}
              </p>
              <p className="text-xs text-gray-600 sm:text-sm dark:text-zinc-500">
                {feature.subText}
              </p>
            </div>
          </div>
        );
      })}
    </div>
  );
}
