import MarkerIcon from "@/assets/pizza_marker_icon.webp";
import type { Pizzeria } from "@/lib/api/query-options/pizza-query-options";
import { Marker } from "@vis.gl/react-maplibre";

function PizzeriaMarker({ pizzeria }: { pizzeria: Pizzeria }) {
  return (
    <Marker
      key={pizzeria.id}
      longitude={pizzeria.lng}
      latitude={pizzeria.lat}
      onClick={() => {
        alert(`Pizzeria: ${pizzeria.name}`);
      }}
      anchor="bottom"
    >
      <img src={MarkerIcon} className="h-14 w-10 cursor-pointer" />
    </Marker>
  );
}

export default PizzeriaMarker;
