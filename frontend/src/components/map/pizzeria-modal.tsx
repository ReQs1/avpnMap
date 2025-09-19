import AvpnIcon from "@/assets/AVPN-Logo.webp";
import { useAuth } from "@/hooks/useAuth";
import type {
  Pizzeria,
  PizzeriaWithVisit,
} from "@/lib/api/query-options/pizza-query-options";
import { isPizzeriaWithVisit } from "@/lib/utils";
import { Link } from "@tanstack/react-router";
import { ExternalLink, LogIn, MapPin, X } from "lucide-react";

function PizzeriaModal({
  pizzeria,
  onClose,
}: {
  pizzeria: Pizzeria | PizzeriaWithVisit;
  onClose: () => void;
}) {
  const { user } = useAuth();
  const hasVisitData = isPizzeriaWithVisit(pizzeria);
  const hasVisited = hasVisitData && pizzeria.visitedAt !== null;

  return (
    <div className="absolute top-4 right-4 left-4 z-50 rounded-lg border border-gray-300 bg-white px-4 py-6 shadow-lg sm:left-auto sm:max-w-md sm:px-6">
      <ModalHeader pizzeria={pizzeria} onClose={onClose} />

      {/* address & website section */}
      <ModalPizzeriaInfo pizzeria={pizzeria} />

      {/* visit data section */}
      {!user && <ModalLogInBanner />}
    </div>
  );
}

export default PizzeriaModal;

function ModalHeader({
  pizzeria,
  onClose,
}: {
  pizzeria: Pizzeria | PizzeriaWithVisit;
  onClose: () => void;
}) {
  return (
    <div className="flex items-start justify-between gap-4">
      <div className="flex gap-3">
        <img
          src={AvpnIcon}
          alt="avpn logo"
          className="h-11 w-11 rounded-full object-cover shadow-xl"
        />

        <div className="flex flex-col items-start justify-between gap-1">
          {pizzeria.memberNumber && (
            <p className="rounded-full bg-gray-100 px-2 py-0.5 text-center text-sm font-semibold text-gray-800">
              <span>#</span>
              {pizzeria.memberNumber}
            </p>
          )}
          <h2 className="text-lg font-bold text-gray-900">{pizzeria.name}</h2>
        </div>
      </div>

      <button
        className="rounded-md p-2 text-gray-600 hover:bg-gray-200 hover:text-gray-800 focus-visible:bg-gray-200 focus-visible:text-gray-800"
        onClick={onClose}
        aria-label="Close"
      >
        <X size={20} />
      </button>
    </div>
  );
}

function ModalPizzeriaInfo({
  pizzeria,
}: {
  pizzeria: Pizzeria | PizzeriaWithVisit;
}) {
  return (
    <div className="my-3 space-y-2">
      <p className="mt-2 flex items-center gap-2 text-sm font-medium text-gray-600">
        <MapPin size={20} aria-hidden="true" />
        <span className="break-words">
          {pizzeria.address}, {pizzeria.nation}
        </span>
      </p>
      <a
        href={pizzeria.website}
        className="inline-flex items-center gap-2 text-sm text-red-500 transition hover:text-red-600"
        target="_blank"
        rel="noopener noreferrer"
      >
        <ExternalLink size={18} aria-hidden="true" />
        <span>Visit Website</span>
      </a>
    </div>
  );
}

function ModalLogInBanner() {
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
