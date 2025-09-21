import ModalHeader from "@/components/map/pizzeria-modal/pizzeria-modal-header";
import ModalPizzeriaInfo from "@/components/map/pizzeria-modal/pizzeria-modal-info";
import ModalLogInBanner from "@/components/map/pizzeria-modal/pizzeria-modal-login";
import { useAuth } from "@/hooks/useAuth";
import type {
  Pizzeria,
  PizzeriaWithVisit,
} from "@/lib/api/query-options/pizza-query-options";
import { hasValidVisit } from "@/lib/utils/map-utils";
import { formatDate } from "@/lib/utils/utils";
import { Edit, X } from "lucide-react";

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
    <div className="absolute top-4 right-4 left-4 z-50 rounded-lg border border-gray-300 bg-white px-4 py-6 shadow-lg sm:left-auto sm:max-w-md sm:px-6">
      <ModalHeader pizzeria={pizzeria} onClose={onClose} />

      {/* address & website section */}
      <ModalPizzeriaInfo pizzeria={pizzeria} />

      {/* visit data section */}
      {!user && <ModalLogInBanner />}

      {/* TODO: add no-visit screen (when user is logged in */}

      {/* TODO: add visit screen (when user is logged in */}
      {user && visitedPizzeria && (
        <div className="rounded-lg border border-green-300 bg-green-100 p-2 sm:p-3">
          <div className="flex items-center justify-between">
            <p className="text-sm font-medium text-gray-500">
              {formatDate(
                new Date(visitedPizzeria.visitedAt),
                visitedPizzeria.timeZone,
              )}
            </p>
            <div className="flex items-center gap-3">
              <button className="rounded p-1 text-gray-800 transition-colors hover:bg-gray-200 hover:text-gray-900">
                <span className="sr-only">Edit a Visit</span>
                <Edit size={18} />
              </button>
              <button className="rounded p-1 text-red-400 transition-colors hover:bg-red-100 hover:text-red-600">
                <span className="sr-only">Delete a Visit</span>
                <X size={18} />
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default PizzeriaModal;
