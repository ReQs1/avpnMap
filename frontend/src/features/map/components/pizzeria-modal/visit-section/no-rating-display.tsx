import { Star } from "lucide-react";

export default function NoRatingDisplay({ onEdit }: { onEdit: () => void }) {
  return (
    <div className="flex items-center justify-between rounded-lg border border-yellow-200 bg-gradient-to-r from-yellow-50 to-yellow-100/80 px-3 py-3 dark:border-amber-400/20 dark:from-amber-400/10 dark:to-transparent">
      <p className="inline-flex items-center gap-2">
        <Star
          size={18}
          className="text-yellow-500 dark:text-amber-400"
          aria-hidden="true"
        />
        <span className="text-sm font-medium text-yellow-700 dark:text-amber-400">
          No rating yet
        </span>
      </p>
      <button
        onClick={onEdit}
        className="w-[100px] rounded-lg border border-yellow-300 bg-white px-3 py-2 text-yellow-700 transition-all hover:shadow-md focus-visible:!outline-yellow-500 dark:border-amber-400/30 dark:bg-amber-400/10 dark:text-amber-400 dark:hover:bg-amber-400/20"
      >
        Add Rating
      </button>
    </div>
  );
}
