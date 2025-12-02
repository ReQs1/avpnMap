import NoRatingDisplay from "@/components/map/pizzeria-modal/visit-section/no-rating-display";
import StarRating from "@/components/map/pizzeria-modal/visit-section/star-rating";
import type { PizzeriaWithVisit } from "@/lib/api/query-options/pizza-query-options";

type VisitedPizzeria = PizzeriaWithVisit & {
  visitedAt: string;
  timeZone: string;
};

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
