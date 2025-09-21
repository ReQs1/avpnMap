import MarkerIcon from "@/assets/pizza_marker_icon.webp";
import PizzeriaModal from "@/components/map/pizzeria-modal/pizzeria-modal";
import type {
  Pizzeria,
  PizzeriaWithVisit,
} from "@/lib/api/query-options/pizza-query-options";
import { Marker } from "@vis.gl/react-maplibre";
import { useEffect } from "react";

function PizzeriaMarker({
  pizzeria,
  currOpenPizzeriaId,
  onCLick,
}: {
  pizzeria: Pizzeria | PizzeriaWithVisit;
  currOpenPizzeriaId: number | null;
  onCLick: (id: number | null) => void;
}) {
  useEffect(() => {
    function closeOnEsc(event: KeyboardEvent) {
      if (event.key === "Escape") {
        onCLick(null);
      }
    }

    if (currOpenPizzeriaId === pizzeria.id) {
      window.addEventListener("keydown", closeOnEsc);
      return () => {
        window.removeEventListener("keydown", closeOnEsc);
      };
    }
  }, [currOpenPizzeriaId, onCLick, pizzeria.id]);

  return (
    <>
      <Marker
        longitude={pizzeria.lng}
        latitude={pizzeria.lat}
        onClick={() => onCLick(pizzeria.id)}
        anchor="bottom"
      >
        <img
          src={MarkerIcon}
          className="h-14 w-10 cursor-pointer transition-opacity duration-200"
        />
      </Marker>

      {currOpenPizzeriaId === pizzeria.id && (
        <PizzeriaModal pizzeria={pizzeria} onClose={() => onCLick(null)} />
      )}
    </>
  );
}

export default PizzeriaMarker;
