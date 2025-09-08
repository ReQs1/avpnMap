import type { UserSummary } from "@/components/header/header";
import NavigationLinks from "@/components/header/navigation-links";
import SignInButton from "@/components/header/sign-in-btn";
import UserInformation from "@/components/header/user-information";
import { type RefObject } from "react";

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
      className="mt-4 grid gap-6 lg:hidden"
      id="mobile-navigation"
      role="navigation"
      aria-label="Main navigation"
    >
      <NavigationLinks user={user} />

      {user ? <UserInformation user={user} /> : <SignInButton />}
    </div>
  );
}
