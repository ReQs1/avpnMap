import { LOGIN_FEATURES } from "@/lib/constants";
import { cn } from "@/lib/utils/utils";

export default function LoginFeatures() {
  return (
    <div className="grid grid-rows-4 gap-4">
      {LOGIN_FEATURES.map((feature) => {
        const Icon = feature.icon;

        return (
          <div className="inline-flex items-center gap-2">
            <div
              className={cn(
                "flex h-10 w-10 items-center justify-center rounded-lg px-2 sm:h-12 sm:w-12",
                feature.bgColor,
              )}
            >
              <Icon
                color={feature.mainColor}
                className="h-[1.75rem] w-[1.75rem]"
              />
            </div>
            <div>
              <p className="text-sm font-bold text-gray-800 sm:text-base">
                {feature.text}
              </p>
              <p className="text-xs text-gray-600 sm:text-sm">
                {feature.subText}
              </p>
            </div>
          </div>
        );
      })}
    </div>
  );
}
