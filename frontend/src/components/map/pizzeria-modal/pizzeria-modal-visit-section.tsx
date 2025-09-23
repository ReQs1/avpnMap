import type { PizzeriaWithVisit } from "@/lib/api/query-options/pizza-query-options";
import { formatDate } from "@/lib/utils/utils";
import { Check, Edit, MessageCircle, Star, X } from "lucide-react";

type VisitedPizzeria = PizzeriaWithVisit & {
  visitedAt: string;
  timeZone: string;
};

// Visit Status Header Component
function VisitStatusHeader({
  visitedPizzeria,
}: {
  visitedPizzeria: VisitedPizzeria;
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
          className="rounded p-1 text-gray-800 transition-colors hover:bg-gray-200 hover:text-gray-900"
          aria-label="Edit your visit to this pizzeria"
        >
          <Edit size={18} aria-hidden="true" />
        </button>
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

// Star Rating Display Component
function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex items-center gap-2">
      <p className="text-sm font-medium text-gray-800">Your Rating:</p>
      <div
        className="flex items-center gap-1"
        aria-label={`${rating} out of 5 stars`}
      >
        {Array.from({ length: 5 }).map((_, index) => (
          <Star
            key={index}
            size={18}
            color="#f0b100"
            fill={index + 1 <= rating ? "#f0b100" : "none"}
            aria-hidden="true"
          />
        ))}
        <p className="text-sm font-medium text-gray-600" aria-hidden="true">
          ({rating}/5)
        </p>
      </div>
    </div>
  );
}

// No Rating Display Component
function NoRatingDisplay() {
  return (
    <div className="flex items-center justify-between rounded-lg border border-yellow-200 bg-gradient-to-r from-yellow-50 to-yellow-100/80 px-4 py-3">
      <p className="inline-flex items-center gap-2">
        <Star size={18} className="text-yellow-500" aria-hidden="true" />
        <span className="text-sm font-medium text-yellow-700">
          No rating yet
        </span>
      </p>
      <button className="w-[100px] rounded-lg border border-yellow-300 bg-white px-3 py-2 text-yellow-700 transition-all hover:shadow-md focus-visible:!outline-yellow-500">
        Add Rating
      </button>
    </div>
  );
}

// Rating Section Component
function RatingSection({
  visitedPizzeria,
}: {
  visitedPizzeria: VisitedPizzeria;
}) {
  return (
    <div>
      {visitedPizzeria.rating ? (
        <StarRating rating={visitedPizzeria.rating} />
      ) : (
        <NoRatingDisplay />
      )}
    </div>
  );
}

// Review Display Component
function ReviewDisplay({ description }: { description: string }) {
  return (
    <div className="border-avpn-green/30 space-y-2 rounded-lg border bg-white px-4 py-3">
      <p className="flex items-center gap-4">
        <div className="h-2 w-2 rounded-full bg-green-400" aria-hidden="true" />
        <span className="text-sm font-medium text-gray-600">Your Review</span>
      </p>
      <blockquote className="pl-6 text-sm text-gray-700 italic">
        "{description}"
      </blockquote>
    </div>
  );
}

// No Review Display Component
function NoReviewDisplay() {
  return (
    <div className="flex items-center justify-between rounded-lg border border-gray-200 bg-gray-50 px-4 py-3">
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

// Review Section Component
function ReviewSection({
  visitedPizzeria,
}: {
  visitedPizzeria: VisitedPizzeria;
}) {
  return (
    <div>
      {visitedPizzeria.description ? (
        <ReviewDisplay description={visitedPizzeria.description} />
      ) : (
        <NoReviewDisplay />
      )}
    </div>
  );
}

// Main Component
export default function PizzeriaModalVisitSection({
  visitedPizzeria,
}: {
  visitedPizzeria: VisitedPizzeria;
}) {
  return (
    <section className="border-avpn-green/30 from-avpn-green/10 space-y-4 rounded-lg border bg-gradient-to-r to-emerald-50 p-4">
      <VisitStatusHeader visitedPizzeria={visitedPizzeria} />
      <RatingSection visitedPizzeria={visitedPizzeria} />
      <ReviewSection visitedPizzeria={visitedPizzeria} />
    </section>
  );
}
