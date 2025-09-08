import type { UserSummary } from "@/components/header/header";
import NavigationLinks from "@/components/header/mobile-navigation-links";
import { Link } from "@tanstack/react-router";
import { LogIn } from "lucide-react";
import { type RefObject } from "react";
import UserInformation from "@/components/header/user-information";

export default function MobileNavigation({
  user,
  ref,
}: {
  user: UserSummary;
  ref: RefObject<HTMLDivElement | null>;
}) {
  return (
    <div
      ref={ref}
      className="mt-4 grid gap-6 md:hidden"
      id="mobile-navigation"
      role="navigation"
      aria-label="Main navigation"
    >
      <NavigationLinks user={user} />

      {user ? (
        <UserInformation user={user} />
      ) : (
        <Link
          to="/"
          className="flex w-full items-center justify-center gap-4 rounded-md bg-red-600 px-4 py-2 font-semibold text-white transition hover:bg-red-700"
        >
          <LogIn size={20} aria-hidden="true" />
          <span>Sign In</span>
        </Link>
      )}
    </div>
  );
}
