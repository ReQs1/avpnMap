import { NOT_FOUND_FEATURES } from "@/lib/constants";
import { Link } from "@tanstack/react-router";

export default function NotFoundFeatureCards() {
  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
      {NOT_FOUND_FEATURES.map((feature) => (
        <Link
          key={feature.title}
          to={feature.to}
          className={`group flex flex-col items-center gap-3 rounded-lg border border-gray-100 bg-linear-to-br from-white from-30% ${feature.gradientClass} px-4 py-3 text-center shadow-lg transition-shadow hover:shadow-xl`}
        >
          <div
            className={`rounded-md ${feature.bgColorClass} p-3 transition-colors ${feature.hoverBgClass}`}
            aria-hidden="true"
          >
            <feature.icon className={feature.iconColorClass} />
          </div>

          <div className="space-y-2">
            <p className="font-bold text-gray-700">{feature.title}</p>
            <p className="text-sm text-gray-500">{feature.description}</p>
          </div>
        </Link>
      ))}
    </div>
  );
}
