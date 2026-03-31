import MarkerIcon from "@/assets/pizza_marker_icon.webp";
import PizzeriaModal from "@/features/map/components/pizzeria-modal/pizzeria-modal";
import { useCloseOnEsc } from "@/features/map/hooks/useCloseOnEsc";
import type {
  Pizzeria,
  PizzeriaWithVisit,
} from "@/features/map/api/pizza-query-options";
import { Marker } from "@vis.gl/react-maplibre";
import { hasConsent, logEvent } from "@/shared/utils/analytics";

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

  const handleClick = () => {
    const isAccepted = hasConsent();
    if (isAccepted) {
      onClick(pizzeria.id);
      logEvent("Map", "Pizzeria_Click", pizzeria.name);
    } else {
      onClick(pizzeria.id);
    }
  };

  return (
    <>
      <Marker
        longitude={pizzeria.lng}
        latitude={pizzeria.lat}
        onClick={handleClick}
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
