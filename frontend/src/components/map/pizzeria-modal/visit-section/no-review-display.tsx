import { MessageCircle } from "lucide-react";

export default function NoReviewDisplay() {
  return (
    <div className="flex items-center justify-between rounded-lg border border-gray-200 bg-gray-50 px-3 py-3">
      <p className="inline-flex items-center gap-2 text-sm font-medium text-gray-600">
        <MessageCircle size={18} aria-hidden="true" />
        <span>No review yet</span>
      </p>
      <button className="w-[100px] rounded-lg border border-gray-300 bg-white px-3 py-2 transition-all hover:bg-gray-50 hover:shadow-md">
        Add Review
      </button>
    </div>
  );
}
