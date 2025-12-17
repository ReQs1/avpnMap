import RatingSection from "@/features/map/components/pizzeria-modal/visit-section/rating-section";
import ReviewSection from "@/features/map/components/pizzeria-modal/visit-section/review-section";
import VisitStatusHeader from "@/features/map/components/pizzeria-modal/visit-section/visit-status-header";
import type { VisitedPizzeria } from "@/features/map/types/pizzeria.types";

export default function PizzeriaModalVisitSection({
  visitedPizzeria,
  onEdit,
  onDelete,
}: {
  visitedPizzeria: VisitedPizzeria;
  onEdit: () => void;
  onDelete: () => void;
}) {
  return (
    <section className="border-avpn-green/30 from-avpn-green/10 space-y-4 rounded-lg border bg-gradient-to-r to-emerald-50 p-4">
      <VisitStatusHeader
        visitedPizzeria={visitedPizzeria}
        onEdit={onEdit}
        onDelete={onDelete}
      />
      <RatingSection visitedPizzeria={visitedPizzeria} onEdit={onEdit} />
      <ReviewSection visitedPizzeria={visitedPizzeria} onEdit={onEdit} />
    </section>
  );
}
