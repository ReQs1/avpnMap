import { pizzeriasQuery } from "@/lib/api/query-options/pizza-query-options";
import { useQuery } from "@tanstack/react-query";
import { Marker } from "@vis.gl/react-maplibre";
import toast from "react-hot-toast";
import MarkerIcon from "@/assets/pizza_marker_icon.webp";

function PizzeriasMarkers() {
  const { data: pizzerias, error } = useQuery(pizzeriasQuery);

  if (error) {
    toast.error("Unable to load pizzeria locations.", {
      position: "bottom-center",
    });
    return null;
  }

  return (
    pizzerias &&
    pizzerias.map((pizzeria) => (
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
    ))
  );
}

export default PizzeriasMarkers;
