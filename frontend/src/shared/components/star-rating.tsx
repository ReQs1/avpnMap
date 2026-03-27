import { cn } from "@/shared/utils/utils";
import { Star } from "lucide-react";

type StarRatingProps = {
  rating: number;
  showLabel?: boolean;
};

export default function StarRating({
  rating,
  showLabel = true,
}: StarRatingProps) {
  return (
    <div className="flex items-center gap-2">
      {showLabel && (
        <p className="text-sm font-medium text-gray-800 dark:text-zinc-100">
          Your Rating:
        </p>
      )}
      <div
        className="flex items-center gap-1"
        aria-label={`${rating} out of 5 stars`}
      >
        {Array.from({ length: 5 }).map((_, index) => {
          const isActive = index + 1 <= rating;
          return (
            <Star
              key={index}
              size={18}
              className={cn(
                isActive
                  ? "fill-yellow-400 text-yellow-400 dark:fill-amber-400 dark:text-amber-400"
                  : "fill-none text-gray-300 dark:text-zinc-600",
              )}
              aria-hidden="true"
            />
          );
        })}
        <p
          className="text-sm font-medium text-gray-600 dark:text-zinc-400"
          aria-hidden="true"
        >
          ({rating}/5)
        </p>
      </div>
    </div>
  );
}
