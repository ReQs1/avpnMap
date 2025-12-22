import DeleteVisitModal from "@/features/profile/components/history/visit-delete-modal";
import { useDeleteVisit } from "@/features/visits/hooks/useDeleteVisit";
import StarRating from "@/shared/components/star-rating";
import { formatDate } from "@/shared/utils/utils";
import { Calendar, Pencil, X } from "lucide-react";
import { useState } from "react";

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
    </>
  );
}

export default VisitCard;

function VisitCardButtons({
  pizzeriaName,
  onDelete,
}: {
  pizzeriaName: string;
  onDelete: () => void;
}) {
  return (
    <div className="flex items-center gap-2">
      {/* TODO: add mutate functionality to buttons */}
      <button
        className="rounded p-1.5 text-gray-400 transition-colors hover:bg-gray-100 hover:text-gray-600"
        aria-label={`Edit visit to ${pizzeriaName}`}
      >
        <Pencil size={16} aria-hidden="true" />
      </button>

      <button
        className="rounded p-1.5 text-red-400 transition-colors hover:bg-red-50 hover:text-red-600"
        aria-label={`Delete visit to ${pizzeriaName}`}
        onClick={onDelete}
      >
        <X size={16} aria-hidden="true" />
      </button>
    </div>
  );
}
