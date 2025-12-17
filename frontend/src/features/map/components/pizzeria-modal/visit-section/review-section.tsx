import type { VisitedPizzeria } from "@/features/map/types/pizzeria.types";
import NoReviewDisplay from "@/features/map/components/pizzeria-modal/visit-section/no-review-display";
import ReviewDisplay from "@/features/map/components/pizzeria-modal/visit-section/review-display";

export default function ReviewSection({
  visitedPizzeria,
  onEdit,
}: {
  visitedPizzeria: VisitedPizzeria;
  onEdit: () => void;
}) {
  return (
    <div>
      {visitedPizzeria.description ? (
        <ReviewDisplay description={visitedPizzeria.description} />
      ) : (
        <NoReviewDisplay onEdit={onEdit} />
      )}
    </div>
  );
}
