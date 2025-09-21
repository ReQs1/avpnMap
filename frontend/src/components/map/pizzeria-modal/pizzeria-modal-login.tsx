import { Link } from "@tanstack/react-router";
import { LogIn } from "lucide-react";

export default function ModalLogInBanner() {
  return (
    <div className="space-y-3 rounded-xl border border-blue-300 bg-blue-100 px-2 py-3 sm:px-4">
      <p className="inline-flex items-center gap-2 text-base font-semibold text-blue-900">
        <LogIn size={20} aria-hidden="true" />
        <span>Sign in to Track Visits</span>
      </p>
      <p className="text-sm leading-5 font-semibold text-pretty text-blue-700">
        Create an account to mark this pizzeria as visited, rate your experience
        and track your pizza journey.
      </p>
      <Link
        to="/login"
        className="flex items-center justify-center gap-2 rounded-md bg-red-600 py-2 text-sm font-semibold text-white transition hover:bg-red-700"
      >
        <LogIn size={20} aria-hidden="true" />
        <span>Sign in to Get Started</span>
      </Link>
    </div>
  );
}
