import type { UserSummary } from "@/components/header/header";
import SignInButton from "@/components/header/sign-in-btn";
import UserInformation from "@/components/header/user-information";
import NavigationLinks from "@/components/header/navigation-links";

export default function DesktopNavigation({ user }: { user: UserSummary }) {
  return (
    <div className="hidden lg:flex lg:grow lg:items-center lg:justify-between lg:gap-6">
      <NavigationLinks user={user} />

      {user ? <UserInformation user={user} /> : <SignInButton />}
    </div>
  );
}
