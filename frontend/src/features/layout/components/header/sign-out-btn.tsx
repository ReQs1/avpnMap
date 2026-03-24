import { useLogout } from "@/features/auth/hooks/useLogout";
import { LogOut } from "lucide-react";

function SignOutButton() {
  const { mutate, error, isPending } = useLogout();

  return (
    <button
      className="inline-flex items-center gap-2 rounded-sm text-sm font-semibold text-black hover:bg-gray-200 disabled:cursor-not-allowed disabled:opacity-50 lg:h-10 lg:w-10 lg:justify-center dark:text-zinc-100 dark:hover:bg-zinc-800"
      aria-label="Sign out"
      onClick={() => mutate()}
      disabled={isPending}
    >
      {isPending ? (
        <div
          className="h-5 w-5 animate-spin rounded-full border-2 border-gray-400 border-t-transparent dark:border-zinc-500 dark:border-t-transparent"
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
