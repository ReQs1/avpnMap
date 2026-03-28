import { Link } from "@tanstack/react-router";
import { MapPin, Trophy } from "lucide-react";

export default function NavigationLinks({ onClose }: { onClose: () => void }) {
  return (
    <nav className="border-y border-gray-200 py-4 lg:border-none lg:py-0 dark:border-zinc-700">
      <ul className="space-y-3 lg:flex lg:items-center lg:gap-6 lg:space-y-0">
        <li>
          <Link
            to="/map"
            onClick={onClose}
            className="relative flex items-center gap-2 rounded-sm p-2 font-semibold lg:rounded-none lg:p-0 lg:focus-visible:outline-offset-8"
            activeProps={{
              className:
                "text-red-600 bg-red-50 lg:bg-transparent lg:after:content-[''] lg:after:absolute lg:after:-bottom-1 lg:after:left-0 lg:after:w-full lg:after:h-0.5 lg:after:bg-red-600 dark:text-red-500 dark:bg-red-500/8 lg:dark:bg-transparent lg:dark:after:bg-red-500",
            }}
            inactiveProps={{
              className:
                "text-gray-600 hover:bg-gray-100 hover:text-gray-800 lg:hover:bg-transparent dark:text-zinc-500 dark:hover:bg-zinc-800 dark:hover:text-zinc-100 lg:dark:hover:bg-transparent",
            }}
          >
            <MapPin size={20} aria-hidden="true" />
            <span>Map</span>
          </Link>
        </li>
        <li>
          <Link
            to="/leaderboard"
            search={{ queryOpt: "users", page: 1 }}
            activeOptions={{ includeSearch: false }}
            onClick={onClose}
            className="relative flex items-center gap-2 rounded-sm p-2 font-semibold lg:rounded-none lg:p-0 lg:focus-visible:outline-offset-8"
            activeProps={{
              className:
                "text-green-600 bg-green-50 lg:bg-transparent lg:after:content-[''] lg:after:absolute lg:after:-bottom-1 lg:after:left-0 lg:after:w-full lg:after:h-0.5 lg:after:bg-green-600 dark:text-green-500 dark:bg-green-500/8 lg:dark:bg-transparent lg:dark:after:bg-green-500",
            }}
            inactiveProps={{
              className:
                "text-gray-600 hover:bg-gray-100 hover:text-gray-800 lg:hover:bg-transparent dark:text-zinc-500 dark:hover:bg-zinc-800 dark:hover:text-zinc-100 lg:dark:hover:bg-transparent",
            }}
          >
            <Trophy size={20} aria-hidden="true" />
            <span>Leaderboard</span>
          </Link>
        </li>
      </ul>
    </nav>
  );
}
