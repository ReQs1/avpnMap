import StarRating from "@/shared/components/star-rating";
import NoRatingDisplay from "@/features/map/components/pizzeria-modal/visit-section/no-rating-display";
import type { VisitedPizzeria } from "@/features/map/types/pizzeria.types";

export default function RatingSection({
  visitedPizzeria,
  onEdit,
}: {
  visitedPizzeria: VisitedPizzeria;
  onEdit: () => void;
}) {
  return (
    <div>
      {visitedPizzeria.rating ? (
        <StarRating rating={visitedPizzeria.rating} />
      ) : (
        <NoRatingDisplay onEdit={onEdit} />
      )}
    </div>
  );
}
