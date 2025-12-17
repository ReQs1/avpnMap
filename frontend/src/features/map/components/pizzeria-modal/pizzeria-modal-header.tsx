import type {
  Pizzeria,
  PizzeriaWithVisit,
} from "@/features/map/api/pizza-query-options";
import AvpnIcon from "@/assets/AVPN-Logo.webp";
import { X } from "lucide-react";

export default function ModalHeader({
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
