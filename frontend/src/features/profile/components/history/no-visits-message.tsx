import { MapPin } from "lucide-react";
import { Link } from "@tanstack/react-router";

function NoVisitsMessage() {
  return (
    <div className="flex h-[600px] flex-col rounded-2xl border border-transparent bg-white px-6 py-8 shadow-sm dark:border-zinc-700 dark:bg-zinc-900">
      <div className="flex items-center gap-2">
        <MapPin
          size={20}
          className="text-gray-600 dark:text-zinc-500"
          aria-hidden="true"
        />
        <h2 className="text-lg font-semibold text-gray-900 dark:text-zinc-100">
          Your Pizza Journey
        </h2>
      </div>
      <div className="mt-6 flex grow flex-col items-center justify-center py-8 text-center">
        <p className="text-gray-500 dark:text-zinc-500">No visits yet.</p>
        <p className="mt-1 text-gray-500 dark:text-zinc-500">
          <Link
            to="/"
            className="font-medium text-red-500 hover:text-red-600 hover:underline dark:text-red-400 dark:hover:text-red-300"
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
