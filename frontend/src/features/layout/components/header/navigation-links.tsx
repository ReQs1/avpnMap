import type { UserSummary } from "@/features/auth/types/user.types";
import { Link } from "@tanstack/react-router";
import { MapPin, Trophy, User } from "lucide-react";

export default function NavigationLinks({
  user,
  onClose,
}: {
  user: UserSummary;
  onClose: () => void;
}) {
  return (
    <nav className="border-y border-gray-200 py-4 lg:border-none lg:py-0">
      <ul className="space-y-3 lg:flex lg:items-center lg:gap-6 lg:space-y-0">
        <li>
          <Link
            to="/map"
            onClick={onClose}
            className="flex items-center gap-2 rounded-sm p-2 font-semibold transition lg:rounded-none lg:p-0 lg:pb-2 lg:focus-visible:outline-offset-8"
            activeProps={{
              className:
                "text-red-600 bg-red-50 lg:bg-transparent lg:border-b-2 lg:border-red-600",
            }}
            inactiveProps={{
              className:
                "text-gray-600 hover:bg-gray-100 hover:text-gray-800 lg:hover:bg-transparent",
            }}
          >
            <MapPin size={20} aria-hidden="true" />
            <span>Map</span>
          </Link>
        </li>
        <li>
          {user && (
            <Link
              to="/profile"
              onClick={onClose}
              className="flex items-center gap-2 rounded-sm p-2 font-semibold transition lg:rounded-none lg:p-0 lg:pb-2 lg:focus-visible:outline-offset-8"
              activeProps={{
                className:
                  "text-red-600 bg-red-50 lg:bg-transparent lg:border-b-2 lg:border-red-600",
              }}
              inactiveProps={{
                className:
                  "text-gray-600 hover:bg-gray-100 hover:text-gray-800 lg:hover:bg-transparent",
              }}
            >
              <User size={20} aria-hidden="true" />
              <span>My Profile</span>
            </Link>
          )}
        </li>
        <li>
          <Link
            to="/"
            onClick={onClose}
            className="flex items-center gap-2 rounded-sm p-2 font-semibold transition lg:rounded-none lg:p-0 lg:pb-2 lg:focus-visible:outline-offset-8"
            activeProps={{
              className:
                "text-red-600 bg-red-50 lg:bg-transparent lg:border-b-2 lg:border-red-600",
            }}
            inactiveProps={{
              className:
                "text-gray-600 hover:bg-gray-100 hover:text-gray-800 lg:hover:bg-transparent",
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
