import SignInButton from "@/features/layout/components/header/sign-in-btn";
import UserInformation from "@/features/layout/components/header/user-information";
import NavigationLinks from "@/features/layout/components/header/navigation-links";
import { useAuth } from "@/features/auth/hooks/useAuth";

export default function DesktopNavigation({
  onClose,
}: {
  onClose: () => void;
}) {
  const { user, isLoading } = useAuth();

  return (
    <div className="hidden lg:flex lg:grow lg:items-center lg:justify-between lg:gap-6">
      <NavigationLinks user={user} onClose={onClose} />

      {isLoading ? (
        <div className="h-8 w-20 animate-pulse rounded bg-gray-200" />
      ) : user ? (
        <UserInformation user={user} />
      ) : (
        <SignInButton />
      )}
    </div>
  );
}
