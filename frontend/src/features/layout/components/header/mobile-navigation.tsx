import NavigationLinks from "@/features/layout/components/header/navigation-links";
import SignInButton from "@/features/layout/components/header/sign-in-btn";
import UserInformation from "@/features/layout/components/header/user-information";
import { useAuth } from "@/features/auth/hooks/useAuth";
import { type RefObject } from "react";

export default function MobileNavigation({
  ref,
  onClose,
}: {
  ref: RefObject<HTMLDivElement | null>;
  onClose: () => void;
}) {
  const { user, isLoading } = useAuth();

  return (
    <div
      ref={ref}
      className="mt-4 grid gap-6 lg:hidden"
      id="mobile-navigation"
      role="navigation"
      aria-label="Main navigation"
    >
      <NavigationLinks user={user} onClose={onClose} />

      <div className="flex items-center">
        {isLoading ? (
          <div className="h-8 w-24 animate-pulse rounded bg-gray-200" />
        ) : user ? (
          <UserInformation user={user} />
        ) : (
          <SignInButton />
        )}
      </div>
    </div>
  );
}
