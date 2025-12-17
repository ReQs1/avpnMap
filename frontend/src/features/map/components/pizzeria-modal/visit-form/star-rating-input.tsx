import { Star } from "lucide-react";
import { useState } from "react";

type StarRatingInputProps = {
  value: number;
  onChange: (rating: number) => void;
  disabled?: boolean;
};

export default function StarRatingInput({
  value,
  onChange,
}: StarRatingInputProps) {
  const [hoverRating, setHoverRating] = useState<number | null>(null);

  const handleClick = (rating: number) => {
    // If clicking the same rating, clear it
    if (value === rating) {
      onChange(0);
    } else {
      onChange(rating);
    }
  };

  const displayRating = hoverRating ?? value;

  return (
    <div className="space-y-2">
      <div className="flex items-center gap-1">
        {[1, 2, 3, 4, 5].map((star) => {
          const isActive = star <= displayRating;

          return (
            <button
              key={star}
              type="button"
              onClick={() => handleClick(star)}
              onMouseEnter={() => setHoverRating(star)}
              onMouseLeave={() => setHoverRating(null)}
              className="group rounded p-1 transition-transform hover:scale-110 disabled:cursor-not-allowed disabled:opacity-50"
              aria-label={`Rate ${star} star${star !== 1 ? "s" : ""}`}
            >
              <Star
                className={`h-6 w-6 transition-colors ${
                  isActive
                    ? "fill-yellow-400 text-yellow-400"
                    : "fill-none text-gray-300 group-hover:text-gray-400"
                }`}
              />
            </button>
          );
        })}

        {value > 0 && (
          <button
            type="button"
            onClick={() => onChange(0)}
            className="ml-2 text-sm text-gray-500 underline hover:text-gray-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-yellow-500 focus-visible:ring-offset-1"
          >
            Clear
          </button>
        )}
      </div>
    </div>
  );
}
