import MarkerIcon from "@/assets/pizza_marker_icon.webp";
import AvpnIcon from "@/assets/AVPN-Logo.webp";
import type {
  Pizzeria,
  PizzeriaWithVisit,
} from "@/lib/api/query-options/pizza-query-options";
import { Marker } from "@vis.gl/react-maplibre";
import { useEffect, useState } from "react";
import { ExternalLink, MapPin, X } from "lucide-react";

function isPizzeriaWithVisit(
  pizzeria: Pizzeria | PizzeriaWithVisit,
): pizzeria is PizzeriaWithVisit {
  return (
    "rating" in pizzeria && "description" in pizzeria && "visitedAt" in pizzeria
  );
}

function PizzeriaMarker({
  pizzeria,
}: {
  pizzeria: Pizzeria | PizzeriaWithVisit;
}) {
  const [isOpen, setIsOpen] = useState(false);
  const hasVisitData = isPizzeriaWithVisit(pizzeria);
  const hasVisited = hasVisitData && pizzeria.visitedAt !== null;

  useEffect(() => {
    function closeOnEsc(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setIsOpen(false);
      }
    }

    if (isOpen) {
      window.addEventListener("keydown", closeOnEsc);
      return () => {
        window.removeEventListener("keydown", closeOnEsc);
      };
    }
  }, [isOpen]);

  return (
    <>
      <Marker
        longitude={pizzeria.lng}
        latitude={pizzeria.lat}
        onClick={() => setIsOpen((prev) => !prev)}
        anchor="bottom"
      >
        <img
          src={MarkerIcon}
          className="h-14 w-10 cursor-pointer transition-opacity duration-200"
        />
      </Marker>

      {isOpen && (
        <div className="absolute top-4 right-4 left-4 z-50 rounded-lg border border-gray-300 bg-white px-4 py-6 shadow-lg">
          {/* modal header */}
          <div className="flex items-start justify-between gap-4">
            <div className="flex gap-3">
              <img
                src={AvpnIcon}
                alt="avpn logo"
                className="h-11 w-11 rounded-full object-cover shadow-xl"
              />

              <div className="flex flex-col items-start justify-between gap-1">
                {pizzeria.memberNumber && (
                  <p className="rounded-full bg-gray-100 px-2 py-0.5 text-center text-sm font-semibold text-gray-800">
                    <span>#</span>
                    {pizzeria.memberNumber}
                  </p>
                )}
                <h2 className="text-lg font-bold text-gray-900">
                  {pizzeria.name}
                </h2>
              </div>
            </div>
            <button
              className="rounded-md p-2 text-gray-600 hover:bg-gray-200 hover:text-gray-800 focus-visible:bg-gray-200 focus-visible:text-gray-800"
              onClick={() => setIsOpen(false)}
              aria-label="Close"
            >
              <X size={20} />
            </button>
          </div>
          {/* address & website section */}
          <div className="space-y-2">
            <p className="mt-2 flex items-center gap-2 text-sm font-medium text-gray-600">
              <MapPin size={20} />
              <span className="break-words">
                {pizzeria.address}, {pizzeria.nation}
              </span>
            </p>
            <a
              href={pizzeria.website}
              className="inline-flex items-center gap-2 text-sm text-red-500 transition hover:text-red-600"
              target="_blank"
              rel="noopener noreferrer"
            >
              <ExternalLink size={18} />
              <span>Visit Website</span>
            </a>
          </div>
        </div>
      )}
    </>
  );
}

export default PizzeriaMarker;
