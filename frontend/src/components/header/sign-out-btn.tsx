import { LogOut } from "lucide-react";

function SignOutButton() {
  // const { mutate } = useMutation({

  // })

  return (
    <button
      className="inline-flex items-center gap-2 rounded-sm p-2 text-sm font-semibold text-gray-600 transition hover:bg-gray-100 hover:text-gray-900"
      aria-label="Sign out"
    >
      <LogOut size={20} aria-hidden="true" />
      <span className="font-medium lg:sr-only">Sign Out</span>
    </button>
  );
}

export default SignOutButton;
