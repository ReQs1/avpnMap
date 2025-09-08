import type { UserSummary } from "@/components/header/header";
import { Link } from "@tanstack/react-router";
import { MapPin, Trophy, User } from "lucide-react";

export default function NavigationLinks({ user }: { user: UserSummary }) {
  return (
    <nav className="grid gap-3 border-y border-gray-200 py-4">
      <Link
        to="/map"
        className="flex items-center gap-2 rounded-sm p-2 font-semibold transition"
        activeProps={{
          className: "text-red-600 bg-red-50",
        }}
        inactiveProps={{
          className: "text-gray-600 hover:bg-gray-100 hover:text-gray-800",
        }}
      >
        <MapPin size={20} aria-hidden="true" />
        <span>Map</span>
      </Link>

      {user && (
        <Link
          to="/"
          className="flex items-center gap-2 rounded-sm p-2 font-semibold transition"
          activeProps={{
            className: "text-red-600 bg-red-50",
          }}
          inactiveProps={{
            className: "text-gray-600 hover:bg-gray-100 hover:text-gray-800",
          }}
        >
          <User size={20} aria-hidden="true" />
          <span>My Profile</span>
        </Link>
      )}

      <Link
        to="/"
        className="flex items-center gap-2 rounded-sm p-2 font-semibold transition"
        activeProps={{
          className: "text-red-600 bg-red-50",
        }}
        inactiveProps={{
          className: "text-gray-600 hover:bg-gray-100 hover:text-gray-800",
        }}
      >
        <Trophy size={20} aria-hidden="true" />
        <span>Leaderboard</span>
      </Link>
    </nav>
  );
}
