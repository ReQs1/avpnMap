import { cn } from "@/shared/utils/utils";
import { Link } from "@tanstack/react-router";
import { Store, Users } from "lucide-react";

export default function LeaderboardSwitchButtons({
  queryOpt,
}: {
  queryOpt: "users" | "pizzerias";
}) {
  return (
    <div className="grid grid-cols-2 gap-1 rounded-lg border border-gray-200 bg-white p-1">
      <Link
        to="."
        resetScroll={false}
        search={(prev) => {
          if (prev.queryOpt !== "users") {
            return { queryOpt: "users", page: 1 };
          }
          return { ...prev };
        }}
        className={cn(
          "inline-flex items-center justify-center gap-2 rounded-md px-2 py-3 text-sm transition-colors",
          {
            ["bg-red-500 text-white"]: queryOpt === "users",
            ["bg-white text-gray-600 hover:bg-gray-100 focus-visible:bg-gray-100"]:
              queryOpt !== "users",
          },
        )}
      >
        <span className="hidden sm:block">
          <Users size={20} />
        </span>
        Top Pizza Hunters
      </Link>
      <Link
        to="."
        resetScroll={false}
        search={(prev) => {
          if (prev.queryOpt !== "pizzerias") {
            return { queryOpt: "pizzerias", page: 1 };
          }
          return { ...prev };
        }}
        className={cn(
          "inline-flex items-center justify-center gap-2 rounded-md px-2 py-3 text-sm transition-colors",
          {
            ["bg-green-600 text-white"]: queryOpt === "pizzerias",
            ["bg-white text-gray-600 hover:bg-gray-100 focus-visible:bg-gray-100"]:
              queryOpt !== "pizzerias",
          },
        )}
      >
        <span className="hidden sm:block">
          <Store size={20} />
        </span>
        Top Pizzerias
      </Link>
    </div>
  );
}
