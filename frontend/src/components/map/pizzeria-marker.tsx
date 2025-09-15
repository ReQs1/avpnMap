import MarkerIcon from "@/assets/pizza_marker_icon.webp";
import type {
  Pizzeria,
  PizzeriaWithVisit,
} from "@/lib/api/query-options/pizza-query-options";
import { Marker } from "@vis.gl/react-maplibre";
import { useState } from "react";

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

  // useEffect((

  // ) => {},[])

  return (
    <Marker
      key={pizzeria.id}
      longitude={pizzeria.lng}
      latitude={pizzeria.lat}
      onClick={() => setIsOpen((prev) => !prev)}
      anchor="bottom"
    >
      <div className="relative">
        {/* Marker Icon */}
        <img
          src={MarkerIcon}
          className={`h-14 w-10 cursor-pointer transition-opacity duration-200 ${
            hasVisited ? "opacity-100" : "opacity-80"
          }`}
        />

        {/* Visit indicator for authenticated users */}
        {hasVisitData && hasVisited && (
          <div className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-green-500 text-xs text-white shadow-md">
            ✓
          </div>
        )}

        {/* Popup */}
        {isOpen && (
          <div className="absolute bottom-16 left-1/2 z-10 min-w-48 -translate-x-1/2 transform rounded-lg border bg-white p-3 shadow-lg">
            <div className="absolute -bottom-2 left-1/2 h-0 w-0 -translate-x-1/2 transform border-t-4 border-r-4 border-l-4 border-transparent border-t-white"></div>

            <h3 className="mb-1 font-semibold text-gray-900">
              {pizzeria.name}
            </h3>
            <p className="mb-2 text-sm text-gray-600">{pizzeria.address}</p>
            <p className="text-xs text-gray-500">{pizzeria.nation}</p>

            {hasVisitData && (
              <div className="mt-3 border-t border-gray-100 pt-2">
                {hasVisited ? (
                  <div>
                    <p className="text-xs font-medium text-green-600">
                      Visited!
                    </p>
                    <p className="text-xs text-gray-500">
                      {new Date(pizzeria.visitedAt!).toLocaleDateString()}
                    </p>
                    {pizzeria.rating && (
                      <p className="text-xs text-yellow-600">
                        Rating: {"★".repeat(pizzeria.rating)}
                      </p>
                    )}
                  </div>
                ) : (
                  <p className="text-xs text-gray-500">Not visited yet</p>
                )}
              </div>
            )}
          </div>
        )}
      </div>
    </Marker>
  );
}

export default PizzeriaMarker;
