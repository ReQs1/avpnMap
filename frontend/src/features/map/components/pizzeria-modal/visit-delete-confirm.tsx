import type { VisitedPizzeria } from "@/features/map/types/pizzeria.types";
import { useDeleteVisit } from "@/features/visits/hooks/useDeleteVisit";
import { AlertCircle } from "lucide-react";

type Props = {
  visitedPizzeria: VisitedPizzeria;
  onCancel: () => void;
  onDeleted: () => void;
};

export default function VisitDeleteConfirm({
  visitedPizzeria,
  onCancel,
  onDeleted,
}: Props) {
  const { mutate: deleteVisit, isPending: isDeleting } = useDeleteVisit({
    onSuccess: onDeleted,
  });

  return (
    <div className="flex flex-col items-center gap-6 py-6">
      <div className="flex h-14 w-14 items-center justify-center rounded-full bg-red-50">
        <AlertCircle size={28} className="text-red-500" aria-hidden="true" />
      </div>
      <div className="text-center">
        <h2 className="text-lg font-semibold text-gray-900">Remove Visit?</h2>
        <p className="mt-1 text-sm text-gray-600">
          This will permanently delete your visit to{" "}
          <span className="font-medium">{visitedPizzeria.name}</span>
        </p>
      </div>
      <div className="mt-2 flex w-full gap-3">
        <button
          onClick={() => deleteVisit(visitedPizzeria.id)}
          disabled={isDeleting}
          className="inline-flex h-10 flex-1 items-center justify-center rounded-md bg-red-600 px-4 text-sm font-medium text-white shadow-sm transition-colors hover:bg-red-700 disabled:opacity-50"
        >
          {isDeleting ? "Removing..." : "Remove"}
        </button>
        <button
          onClick={onCancel}
          disabled={isDeleting}
          className="inline-flex h-10 flex-1 items-center justify-center rounded-md border border-gray-300 bg-white px-4 text-sm font-medium text-gray-900 transition-colors hover:bg-gray-50 disabled:opacity-50"
        >
          Cancel
        </button>
      </div>
    </div>
  );
}
