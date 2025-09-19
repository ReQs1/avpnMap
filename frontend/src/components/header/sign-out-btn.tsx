import { useLogout } from "@/hooks/useLogout";
import { LogOut } from "lucide-react";

function SignOutButton() {
  const { mutate, error, isPending } = useLogout();

  return (
    <button
      className="inline-flex items-center gap-2 rounded-sm p-2 text-sm font-semibold text-gray-600 transition hover:bg-gray-100 hover:text-gray-900 disabled:cursor-not-allowed disabled:opacity-50"
      aria-label="Sign out"
      onClick={() => mutate()}
      disabled={isPending}
    >
      {isPending ? (
        <div
          className="h-5 w-5 animate-spin rounded-full border-2 border-gray-400 border-t-transparent"
          aria-hidden="true"
        />
      ) : (
        <LogOut size={20} aria-hidden="true" />
      )}
      <span className="font-medium lg:sr-only">
        {isPending ? "Signing out..." : error ? "Retry" : "Sign Out"}
      </span>
    </button>
  );
}

export default SignOutButton;
