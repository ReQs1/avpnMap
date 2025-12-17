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
      <div className="mt-6 rounded-2xl bg-white px-4 py-8 shadow-sm">
        <div className="flex items-center gap-2">
          <MapPin size={20} className="text-gray-600" aria-hidden="true" />
          <h2 className="text-lg font-semibold text-gray-900">
            Your Pizza Journey
          </h2>
        </div>

        <div className="mt-4">
          {displayedVisits.map((visit) => (
            <VisitCard key={visit.id} visit={visit} />
          ))}
        </div>

        {hasMoreVisits && (
          <button
            onClick={() => setIsModalOpen(true)}
            className="mt-4 w-full rounded-lg border border-gray-200 py-2.5 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-50 hover:text-gray-900"
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
