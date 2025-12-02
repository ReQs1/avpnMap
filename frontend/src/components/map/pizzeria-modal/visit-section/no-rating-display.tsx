import { Star } from "lucide-react";

export default function NoRatingDisplay({ onEdit }: { onEdit: () => void }) {
  return (
    <div className="flex items-center justify-between rounded-lg border border-yellow-200 bg-gradient-to-r from-yellow-50 to-yellow-100/80 px-3 py-3">
      <p className="inline-flex items-center gap-2">
        <Star size={18} className="text-yellow-500" aria-hidden="true" />
        <span className="text-sm font-medium text-yellow-700">
          No rating yet
        </span>
      </p>
      <button
        onClick={onEdit}
        className="w-[100px] rounded-lg border border-yellow-300 bg-white px-3 py-2 text-yellow-700 transition-all hover:shadow-md focus-visible:!outline-yellow-500"
      >
        Add Rating
      </button>
    </div>
  );
}
