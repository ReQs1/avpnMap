import { Link } from "@tanstack/react-router";
import { LogIn } from "lucide-react";

function SignInButton() {
  return (
    <Link
      to="/"
      className="flex w-full items-center justify-center gap-4 rounded-md bg-red-600 py-2 font-semibold text-white transition hover:bg-red-700 lg:max-w-[120px]"
    >
      <LogIn size={20} aria-hidden="true" />
      <span>Sign In</span>
    </Link>
  );
}

export default SignInButton;
