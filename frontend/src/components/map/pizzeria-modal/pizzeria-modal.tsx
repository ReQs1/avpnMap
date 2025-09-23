import ModalHeader from "@/components/map/pizzeria-modal/pizzeria-modal-header";
import ModalPizzeriaInfo from "@/components/map/pizzeria-modal/pizzeria-modal-info";
import ModalLogInBanner from "@/components/map/pizzeria-modal/pizzeria-modal-login";
import PizzeriaModalVisitSection from "@/components/map/pizzeria-modal/pizzeria-modal-visit-section";
import { useAuth } from "@/hooks/useAuth";
import type {
  Pizzeria,
  PizzeriaWithVisit,
} from "@/lib/api/query-options/pizza-query-options";
import { hasValidVisit } from "@/lib/utils/map-utils";

function PizzeriaModal({
  pizzeria,
  onClose,
}: {
  pizzeria: Pizzeria | PizzeriaWithVisit;
  onClose: () => void;
}) {
  const { user } = useAuth();

  const visitedPizzeria = hasValidVisit(pizzeria) ? pizzeria : null;

  return (
    <div
      className="absolute top-4 right-4 left-4 z-50 rounded-lg border border-gray-300 bg-white px-4 py-6 shadow-lg sm:left-auto sm:max-w-md sm:px-6"
      role="dialog"
    >
      <ModalHeader pizzeria={pizzeria} onClose={onClose} />

      {/* address & website section */}
      <ModalPizzeriaInfo pizzeria={pizzeria} />

      {/* visit data section */}
      {!user && <ModalLogInBanner />}

      {/* TODO: add no-visit screen (when user is logged in */}

      {user && visitedPizzeria && (
        <PizzeriaModalVisitSection visitedPizzeria={visitedPizzeria} />
      )}
    </div>
  );
}

export default PizzeriaModal;
