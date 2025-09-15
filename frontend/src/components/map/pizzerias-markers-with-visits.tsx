import { pizzeriasWithVisits } from "@/lib/api/query-options/pizza-query-options";
import { useQuery } from "@tanstack/react-query";
import toast from "react-hot-toast";
import PizzeriaMarker from "./pizzeria-marker";

function PizzeriasMarkersWithVisits() {
  const { data: pizzerias, error } = useQuery(pizzeriasWithVisits);

  if (error) {
    toast.error("Unable to load pizzeria locations.", {
      id: "pizzerias-error",
      position: "bottom-center",
    });
    return null;
  }

  return (
    pizzerias &&
    pizzerias.map((pizzeria) => (
      <PizzeriaMarker key={pizzeria.id} pizzeria={pizzeria} />
    ))
  );
}

export default PizzeriasMarkersWithVisits;
