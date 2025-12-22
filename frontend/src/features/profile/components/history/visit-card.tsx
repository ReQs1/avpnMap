import DeleteVisitModal from "@/features/profile/components/history/visit-delete-modal";
import { useDeleteVisit } from "@/features/visits/hooks/useDeleteVisit";
import StarRating from "@/shared/components/star-rating";
import { formatDate } from "@/shared/utils/utils";
import { Calendar } from "lucide-react";
import { useState } from "react";
import VisitCardButtons from "@/features/profile/components/history/visit-card-buttons";
import EditVisitModal from "@/features/profile/components/history/visit-edit-modal/visit-edit-modal";

type VisitCardProps = {
  visit: {
    id: number;
    description: string | null;
    visitedAt: Date;
    rating: number | null;
    timeZone: string;
    pizzeria: {
      id: number;
      name: string;
      memberNumber: number | null;
      nation: string;
      address: string;
    };
  };
};

function VisitCard({ visit }: VisitCardProps) {
  const { pizzeria, visitedAt, timeZone, rating, description } = visit;
  const [isDeleting, setIsDeleting] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  const { mutate: deleteVisit, isPending: isDeletePending } = useDeleteVisit({
    onSuccess: () => setIsDeleting(false),
  });

  return (
    <>
      <div className="flex flex-col gap-3 rounded-md border-b border-gray-100 p-2 transition-colors last:border-b-0 hover:bg-gray-200 lg:flex-row lg:justify-between lg:gap-8">
        <div>
          <h3 className="text-base font-bold text-gray-900">{pizzeria.name}</h3>

          <p className="mt-1 flex items-center gap-1.5 text-sm text-gray-500">
            <Calendar size={14} aria-hidden="true" />
            <span>{formatDate(new Date(visitedAt), timeZone)}</span>
          </p>

          {description && (
            <p className="mt-2 text-sm text-balance text-gray-600 italic">
              "{description}"
            </p>
          )}
        </div>
        <div className="flex items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            {rating !== null ? (
              <StarRating rating={rating} showLabel={false} />
            ) : (
              <span className="text-sm text-gray-400">No rating</span>
            )}
          </div>

          <VisitCardButtons
            pizzeriaName={pizzeria.name}
            onEdit={() => setIsEditing(true)}
            onDelete={() => setIsDeleting(true)}
          />
        </div>
      </div>

      {isDeleting && (
        <DeleteVisitModal
          pizzeriaName={pizzeria.name}
          isDeleting={isDeletePending}
          onCancel={() => setIsDeleting(false)}
          onConfirm={() => deleteVisit(pizzeria.id)}
        />
      )}

      {isEditing && (
        <EditVisitModal
          visit={visit}
          onCancel={() => setIsEditing(false)}
          onSuccess={() => setIsEditing(false)}
        />
      )}
    </>
  );
}

export default VisitCard;
