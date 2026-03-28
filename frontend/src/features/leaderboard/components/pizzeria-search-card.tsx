import avpnLogo from "@/assets/AVPN-Logo.webp";
import SearchCard from "./search-card";
import type { SearchPizzeria } from "../types/search.types";
import { useLeaderboardModalStore } from "../store/leaderboard-modal-store";

export default function PizzeriaSearchCard({
  pizzeria,
}: {
  pizzeria: SearchPizzeria;
}) {
  const openPizzeriaModal = useLeaderboardModalStore(
    (s) => s.openPizzeriaModal,
  );

  return (
    <SearchCard
      onClick={() =>
        openPizzeriaModal({
          pizzeriaId: pizzeria.id,
          name: pizzeria.name,
          nation: pizzeria.nation,
          avgRating: pizzeria.avgRating,
          visits: pizzeria.visits,
          score: pizzeria.score,
        })
      }
    >
      <img className="h-10 w-10" src={avpnLogo} alt={"AVPN logo"} />
      <div>
        <p className="font-medium dark:text-zinc-100">{pizzeria.name}</p>
        <div className="flex items-center gap-1 text-xs text-gray-500 dark:text-zinc-400">
          <p>AVPN #{pizzeria.memberNumber}</p>
          <span> &middot;</span>
          <p>{pizzeria.nation}</p>
        </div>
      </div>
    </SearchCard>
  );
}
