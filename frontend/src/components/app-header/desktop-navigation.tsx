import SignInButton from "@/components/app-header/sign-in-btn";
import UserInformation from "@/components/app-header/user-information";
import NavigationLinks from "@/components/app-header/navigation-links";
import { useAuth } from "@/hooks/useAuth";

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
