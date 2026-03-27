import type { VisitedPizzeria } from "@/features/map/types/pizzeria.types";
import { formatDate } from "@/shared/utils/utils";
import { Check, Edit, X } from "lucide-react";

export default function VisitStatusHeader({
  visitedPizzeria,
  onEdit,
  onDelete,
}: {
  visitedPizzeria: VisitedPizzeria;
  onEdit: () => void;
  onDelete: () => void;
}) {
  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-4">
        <p className="inline-flex items-center justify-center gap-1 rounded-full border border-green-300 bg-green-100 px-2 py-1 font-medium text-green-600 dark:border-green-500/20 dark:bg-green-500/10 dark:text-green-500">
          <Check size={16} aria-hidden="true" />
          <span>Visited</span>
        </p>
        <p className="font text-sm text-gray-500 dark:text-zinc-400">
          {formatDate(
            new Date(visitedPizzeria.visitedAt),
            visitedPizzeria.timeZone,
          )}
        </p>
      </div>
      <div
        className="flex items-center gap-3"
        role="group"
        aria-label="Visit actions"
      >
        <button
          onClick={onEdit}
          className="rounded p-1 text-gray-800 transition-colors hover:bg-gray-200 hover:text-gray-900 dark:text-zinc-400 dark:hover:bg-zinc-800 dark:hover:text-zinc-100"
          aria-label="Edit your visit to this pizzeria"
        >
          <Edit size={18} aria-hidden="true" />
        </button>
        <button
          className="rounded p-1 text-red-400 transition-colors hover:bg-red-100 hover:text-red-600 dark:hover:bg-red-500/10 dark:hover:text-red-300"
          aria-label="Delete your visit to this pizzeria"
          onClick={onDelete}
        >
          <X size={18} aria-hidden="true" />
        </button>
      </div>
    </div>
  );
}
