import { MapPin } from "lucide-react";
import { useEffect, useState } from "react";
import VisitCard from "./visit-card";
import AllVisitsModal from "./all-visits-modal";
import type { Visit } from "@/features/visits/types/visit.types";

type PizzaJourneyProps = {
  visits: Visit[];
};

const INITIAL_DISPLAY_COUNT = 10;

function PizzaJourney({ visits }: PizzaJourneyProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const displayedVisits = visits.slice(0, INITIAL_DISPLAY_COUNT);
  const hasMoreVisits = visits.length > INITIAL_DISPLAY_COUNT;

  useEffect(() => {
    if (isModalOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
  }, [isModalOpen]);

  return (
    <>
      <div className="flex h-[600px] flex-col rounded-2xl border border-transparent bg-white px-4 py-8 shadow-sm dark:border-zinc-700 dark:bg-zinc-900">
        <div className="flex shrink-0 items-center gap-2">
          <MapPin
            size={20}
            className="text-gray-600 dark:text-zinc-500"
            aria-hidden="true"
          />
          <h2 className="text-lg font-semibold text-gray-900 dark:text-zinc-100">
            Your Pizza Journey
          </h2>
        </div>

        <div className="mt-4 flex-1 overflow-y-auto pr-2">
          {displayedVisits.map((visit) => (
            <VisitCard key={visit.id} visit={visit} />
          ))}
        </div>

        {hasMoreVisits && (
          <button
            onClick={() => setIsModalOpen(true)}
            className="mt-4 w-full shrink-0 rounded-lg border border-gray-200 py-2.5 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-50 hover:text-gray-900 dark:border-zinc-700 dark:text-zinc-400 dark:hover:bg-zinc-800 dark:hover:text-zinc-100"
          >
            View All {visits.length} Visits
          </button>
        )}
      </div>

      {isModalOpen && (
        <AllVisitsModal visits={visits} onClose={() => setIsModalOpen(false)} />
      )}
    </>
  );
}

export default PizzaJourney;
