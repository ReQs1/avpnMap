import { Star } from "lucide-react";

export default function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex items-center gap-2">
      <p className="text-sm font-medium text-gray-800">Your Rating:</p>
      <div
        className="flex items-center gap-1"
        aria-label={`${rating} out of 5 stars`}
      >
        {Array.from({ length: 5 }).map((_, index) => (
          <Star
            key={index}
            size={18}
            color="#f0b100"
            fill={index + 1 <= rating ? "#f0b100" : "none"}
            aria-hidden="true"
          />
        ))}
        <p className="text-sm font-medium text-gray-600" aria-hidden="true">
          ({rating}/5)
        </p>
      </div>
    </div>
  );
}
