import type { PizzeriaWithVisit } from "@/lib/api/query-options/pizza-query-options";
import NoReviewDisplay from "@/components/map/pizzeria-modal/visit-section/no-review-display";
import ReviewDisplay from "@/components/map/pizzeria-modal/visit-section/review-display";

type VisitedPizzeria = PizzeriaWithVisit & {
  visitedAt: string;
  timeZone: string;
};

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
