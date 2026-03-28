import { MapPin, X } from "lucide-react";
import { useEffect } from "react";
import VisitCard from "./visit-card";
import type { Visit } from "@/features/visits/types/visit.types";

type AllVisitsModalProps = {
  visits: Visit[];
  onClose: () => void;
};

function AllVisitsModal({ visits, onClose }: AllVisitsModalProps) {
  useEffect(() => {
    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        onClose();
      }
    }

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [onClose]);

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50"
      onClick={onClose}
    >
      <div
        className="relative flex max-h-[85vh] w-full max-w-2xl flex-col overflow-hidden rounded-2xl border border-transparent bg-white shadow-xl dark:border-zinc-700 dark:bg-zinc-900"
        onClick={(e) => e.stopPropagation()}
        role="dialog"
      >
        {/* Header */}
        <div className="flex shrink-0 items-center justify-between border-b border-gray-100 bg-white p-4 dark:border-zinc-700 dark:bg-zinc-900">
          <div className="flex items-center gap-2">
            <MapPin
              size={20}
              className="text-gray-600 dark:text-zinc-500"
              aria-hidden="true"
            />
            <h2 className="text-lg font-semibold text-gray-900 dark:text-zinc-100">
              All Visits ({visits.length})
            </h2>
          </div>
          <button
            onClick={onClose}
            className="rounded-lg p-2 text-gray-400 transition-colors hover:bg-gray-100 hover:text-gray-600 dark:hover:bg-zinc-800 dark:hover:text-zinc-300"
            aria-label="Close modal"
          >
            <X size={20} aria-hidden="true" />
          </button>
        </div>

        {/* Scrollable content */}
        <div className="flex-1 overflow-y-auto p-4">
          {visits.map((visit) => (
            <VisitCard key={visit.id} visit={visit} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default AllVisitsModal;
