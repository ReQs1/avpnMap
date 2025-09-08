import type { UserSummary } from "@/components/header/header";
import { Link } from "@tanstack/react-router";
import { MapPin, Trophy, User } from "lucide-react";
import SignInButton from "@/components/header/sign-in-btn";
import UserInformation from "@/components/header/user-information";

export default function DesktopNavigation({ user }: { user: UserSummary }) {
  return (
    <div className="hidden lg:flex lg:grow lg:items-center lg:justify-between lg:gap-6">
      <nav className="hidden lg:block">
        <ul className="flex items-center gap-8">
          <li>
            <Link
              to="/map"
              className="flex items-center gap-2 pb-2 font-semibold transition focus-visible:outline-offset-8"
              activeProps={{
                className: "text-red-600 border-b-2 border-red-600",
              }}
              inactiveProps={{
                className: "text-gray-600 hover:text-gray-800",
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
                className="flex items-center gap-2 pb-2 font-semibold transition focus-visible:outline-offset-8"
                activeProps={{
                  className: "text-red-600 border-b-2 border-red-600",
                }}
                inactiveProps={{
                  className: "text-gray-600 hover:text-gray-800",
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
              className="flex items-center gap-2 pb-2 font-semibold transition focus-visible:outline-offset-8"
              activeProps={{
                className: "text-red-600 border-b-2 border-red-600",
              }}
              inactiveProps={{
                className: "text-gray-600 hover:text-gray-800",
              }}
            >
              <Trophy size={20} aria-hidden="true" />
              <span>Leaderboard</span>
            </Link>
          </li>
        </ul>
      </nav>

      {user ? <UserInformation user={user} /> : <SignInButton />}
    </div>
  );
}
