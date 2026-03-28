import { cn } from "@/shared/utils/utils";
import { Link } from "@tanstack/react-router";
import { Store, Users } from "lucide-react";

export default function LeaderboardSwitchButtons({
  queryOpt,
}: {
  queryOpt: "users" | "pizzerias";
}) {
  return (
    <div className="grid grid-cols-2 gap-1 rounded-lg border border-gray-200 bg-white p-1 dark:border-zinc-700 dark:bg-zinc-900">
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
            ["bg-red-500 text-white dark:bg-red-500/10 dark:text-red-500"]:
              queryOpt === "users",
            ["bg-white text-gray-600 hover:bg-gray-100 focus-visible:bg-gray-100 dark:bg-transparent dark:text-zinc-400 dark:hover:bg-zinc-800 dark:focus-visible:bg-zinc-800"]:
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
            ["bg-green-600 text-white dark:bg-green-500/10 dark:text-green-500"]:
              queryOpt === "pizzerias",
            ["bg-white text-gray-600 hover:bg-gray-100 focus-visible:bg-gray-100 dark:bg-transparent dark:text-zinc-400 dark:hover:bg-zinc-800 dark:focus-visible:bg-zinc-800"]:
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
