import type {
  Pizzeria,
  PizzeriaWithVisit,
} from "@/lib/api/query-options/pizza-query-options";
import { ExternalLink, MapPin } from "lucide-react";

export default function ModalPizzeriaInfo({
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
