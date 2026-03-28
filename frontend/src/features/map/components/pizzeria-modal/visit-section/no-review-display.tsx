import { MessageCircle } from "lucide-react";

export default function NoReviewDisplay({ onEdit }: { onEdit: () => void }) {
  return (
    <div className="flex items-center justify-between rounded-lg border border-gray-200 bg-gray-50 px-3 py-3 dark:border-zinc-700 dark:bg-zinc-800">
      <p className="inline-flex items-center gap-2 text-sm font-medium text-gray-600 dark:text-zinc-400">
        <MessageCircle size={18} aria-hidden="true" />
        <span>No review yet</span>
      </p>
      <button
        onClick={onEdit}
        className="w-[100px] rounded-lg border border-gray-300 bg-white px-3 py-2 transition-all hover:bg-gray-50 hover:shadow-md dark:border-zinc-600 dark:bg-zinc-900 dark:text-zinc-100 dark:hover:bg-zinc-700"
      >
        Add Review
      </button>
    </div>
  );
}
