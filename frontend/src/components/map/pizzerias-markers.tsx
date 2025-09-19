import PizzeriaMarker from "@/components/map/pizzeria-marker";
import { pizzeriasQuery } from "@/lib/api/query-options/pizza-query-options";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import toast from "react-hot-toast";

function PizzeriasMarkers() {
  const [currentOpenPizzeriaId, setCurrentOpenPizzeriaId] = useState<
    number | null
  >(null);
  const { data: pizzerias, error } = useQuery(pizzeriasQuery);

  if (error) {
    toast.error("Unable to load pizzeria locations.", {
      id: "pizzerias-error",
      position: "bottom-center",
    });
    return null;
  }

  const handleCurrentOpenPizzeriaId = (targetId: number | null) => {
    if (currentOpenPizzeriaId === targetId) {
      setCurrentOpenPizzeriaId(null);
      return;
    }
    setCurrentOpenPizzeriaId(targetId);
  };

  return (
    pizzerias &&
    pizzerias.map((pizzeria) => (
      <PizzeriaMarker
        key={pizzeria.id}
        pizzeria={pizzeria}
        currOpenPizzeriaId={currentOpenPizzeriaId}
        onCLick={handleCurrentOpenPizzeriaId}
      />
    ))
  );
}

export default PizzeriasMarkers;
