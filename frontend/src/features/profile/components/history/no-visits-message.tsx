import { MapPin } from "lucide-react";
import { Link } from "@tanstack/react-router";

function NoVisitsMessage() {
  return (
    <div className="h-fit rounded-2xl bg-white px-6 py-8 shadow-sm">
      <div className="flex items-center gap-2">
        <MapPin size={20} className="text-gray-600" aria-hidden="true" />
        <h2 className="text-lg font-semibold text-gray-900">
          Your Pizza Journey
        </h2>
      </div>
      <div className="mt-6 flex flex-col items-center justify-center py-8 text-center">
        <p className="text-gray-500">No visits yet.</p>
        <p className="mt-1 text-gray-500">
          <Link
            to="/"
            className="font-medium text-red-500 hover:text-red-600 hover:underline"
          >
            Explore the map
          </Link>{" "}
          to make your first visit!
        </p>
      </div>
    </div>
  );
}

export default NoVisitsMessage;
