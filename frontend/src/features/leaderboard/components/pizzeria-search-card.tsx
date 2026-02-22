import avpnLogo from "@/assets/AVPN-Logo.webp";
import SearchCard from "./search-card";
import type { SearchPizzeria } from "../types/search.types";

export default function PizzeriaSearchCard({
  pizzeria,
}: {
  pizzeria: SearchPizzeria;
}) {
  return (
    <SearchCard>
      <img className="h-10 w-10" src={avpnLogo} alt={"AVPN logo"} />
      <div>
        <p className="font-medium">{pizzeria.name}</p>
        <div className="flex items-center gap-1 text-xs text-gray-500">
          <p>AVPN #{pizzeria.memberNumber}</p>
          <span> &middot;</span>
          <p>{pizzeria.nation}</p>
        </div>
      </div>
    </SearchCard>
  );
}
