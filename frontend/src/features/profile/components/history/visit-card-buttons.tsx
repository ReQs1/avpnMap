import { Pencil, X } from "lucide-react";

export default function VisitCardButtons({
  pizzeriaName,
  onEdit,
  onDelete,
}: {
  pizzeriaName: string;
  onEdit: () => void;
  onDelete: () => void;
}) {
  return (
    <div className="flex items-center gap-2">
      <button
        className="rounded p-1.5 text-gray-400 transition-colors hover:bg-gray-100 hover:text-gray-600"
        aria-label={`Edit visit to ${pizzeriaName}`}
        onClick={onEdit}
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
