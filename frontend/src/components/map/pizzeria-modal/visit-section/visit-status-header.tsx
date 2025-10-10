import type { PizzeriaWithVisit } from "@/lib/api/query-options/pizza-query-options";
import { formatDate } from "@/lib/utils/utils";
import { Check, Edit, X } from "lucide-react";

type VisitedPizzeria = PizzeriaWithVisit & {
  visitedAt: string;
  timeZone: string;
};

export default function VisitStatusHeader({
  visitedPizzeria,
  onEdit,
}: {
  visitedPizzeria: VisitedPizzeria;
  onEdit: () => void;
}) {
  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-4">
        <p className="inline-flex items-center gap-1 rounded-full bg-green-200 px-2 py-1 text-sm font-medium text-green-600">
          <Check size={20} aria-hidden="true" />
          <span>Visited</span>
        </p>
        <p className="font text-sm text-gray-500">
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
          className="rounded p-1 text-gray-800 transition-colors hover:bg-gray-200 hover:text-gray-900"
          aria-label="Edit your visit to this pizzeria"
        >
          <Edit size={18} aria-hidden="true" />
        </button>
        {/* TODO: add delete visit */}
        <button
          className="rounded p-1 text-red-400 transition-colors hover:bg-red-100 hover:text-red-600"
          aria-label="Delete your visit to this pizzeria"
        >
          <X size={18} aria-hidden="true" />
        </button>
      </div>
    </div>
  );
}
