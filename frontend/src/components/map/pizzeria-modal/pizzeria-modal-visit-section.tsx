import type { PizzeriaWithVisit } from "@/lib/api/query-options/pizza-query-options";
import RatingSection from "@/components/map/pizzeria-modal/visit-section/rating-section";
import ReviewSection from "@/components/map/pizzeria-modal/visit-section/review-section";
import VisitStatusHeader from "@/components/map/pizzeria-modal/visit-section/visit-status-header";

type VisitedPizzeria = PizzeriaWithVisit & {
  visitedAt: string;
  timeZone: string;
};

// Main Component
export default function PizzeriaModalVisitSection({
  visitedPizzeria,
  onEdit,
}: {
  visitedPizzeria: VisitedPizzeria;
  onEdit: () => void;
}) {
  return (
    <section className="border-avpn-green/30 from-avpn-green/10 space-y-4 rounded-lg border bg-gradient-to-r to-emerald-50 p-4">
      <VisitStatusHeader visitedPizzeria={visitedPizzeria} onEdit={onEdit} />
      <RatingSection visitedPizzeria={visitedPizzeria} />
      <ReviewSection visitedPizzeria={visitedPizzeria} />
    </section>
  );
}
