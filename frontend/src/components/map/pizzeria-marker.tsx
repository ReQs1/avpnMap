import MarkerIcon from "@/assets/pizza_marker_icon.webp";
import PizzeriaModal from "@/components/map/pizzeria-modal/pizzeria-modal";
import { useCloseOnEsc } from "@/hooks/useCloseOnEsc";
import type {
  Pizzeria,
  PizzeriaWithVisit,
} from "@/lib/api/query-options/pizza-query-options";
import { Marker } from "@vis.gl/react-maplibre";

function PizzeriaMarker({
  pizzeria,
  currOpenPizzeriaId,
  onClick,
}: {
  pizzeria: Pizzeria | PizzeriaWithVisit;
  currOpenPizzeriaId: number | null;
  onClick: (id: number | null) => void;
}) {
  const isActive = currOpenPizzeriaId === pizzeria.id;
  useCloseOnEsc(isActive, onClick);

  return (
    <>
      <Marker
        longitude={pizzeria.lng}
        latitude={pizzeria.lat}
        onClick={() => onClick(pizzeria.id)}
        anchor="bottom"
      >
        <img
          src={MarkerIcon}
          className="h-14 w-10 cursor-pointer transition-opacity duration-200"
        />
      </Marker>

      {currOpenPizzeriaId === pizzeria.id && (
        <PizzeriaModal pizzeria={pizzeria} onClose={() => onClick(null)} />
      )}
    </>
  );
}

export default PizzeriaMarker;
