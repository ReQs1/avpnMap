import ModalHeader from "@/components/map/pizzeria-modal/pizzeria-modal-header";
import ModalPizzeriaInfo from "@/components/map/pizzeria-modal/pizzeria-modal-info";
import LogInBanner from "@/components/map/pizzeria-modal/pizzeria-modal-login";
import PizzeriaModalVisitSection from "@/components/map/pizzeria-modal/pizzeria-modal-visit-section";
import VisitDeleteConfirm from "@/components/map/pizzeria-modal/visit-delete-confirm";
import VisitForm from "@/components/map/pizzeria-modal/visit-form";
import { useAuth } from "@/hooks/useAuth";
import type {
  Pizzeria,
  PizzeriaWithVisit,
} from "@/lib/api/query-options/pizza-query-options";
import { hasValidVisit } from "@/lib/utils/map-utils";
import { useState } from "react";

export default function PizzeriaModal({
  pizzeria,
  onClose,
}: {
  pizzeria: Pizzeria | PizzeriaWithVisit;
  onClose: () => void;
}) {
  const [isEditing, setIsEditing] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const { user } = useAuth();

  const visitedPizzeria = hasValidVisit(pizzeria) ? pizzeria : null;

  return (
    <div
      className="absolute top-4 right-4 left-4 z-50 rounded-lg border border-gray-300 bg-white px-4 py-6 shadow-lg sm:left-auto sm:max-w-md sm:px-6"
      role="dialog"
    >
      {isDeleting && visitedPizzeria ? (
        <VisitDeleteConfirm
          visitedPizzeria={visitedPizzeria}
          onCancel={() => setIsDeleting(false)}
          onDeleted={() => setIsDeleting(false)}
        />
      ) : (
        <>
          <ModalHeader pizzeria={pizzeria} onClose={onClose} />

          {/* address & website section */}
          <ModalPizzeriaInfo pizzeria={pizzeria} />

          {/* visit data section */}
          {!user && <LogInBanner />}

          {user && (!visitedPizzeria || isEditing) && (
            <VisitForm
              key={isEditing ? `edit-${visitedPizzeria?.id}` : "create"}
              isEditing={isEditing}
              pizzeria={pizzeria}
              visitedPizzeria={visitedPizzeria}
              onCloseEdit={() => setIsEditing(false)}
            />
          )}

          {user && visitedPizzeria && !isEditing && (
            <PizzeriaModalVisitSection
              visitedPizzeria={visitedPizzeria}
              onEdit={() => setIsEditing(true)}
              onDelete={() => setIsDeleting(true)}
            />
          )}
        </>
      )}
    </div>
  );
}
