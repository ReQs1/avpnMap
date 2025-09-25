import { Link } from "@tanstack/react-router";
import { MapPin, Pizza, Search } from "lucide-react";

export default function NotFoundFeatureCards() {
  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
      <Link
        to="/map"
        className="group flex flex-col items-center gap-3 rounded-lg border border-gray-100 bg-linear-to-br from-white from-30% to-red-500/10 px-4 py-3 text-center shadow-lg transition-shadow hover:shadow-xl"
      >
        <div
          className="rounded-md bg-red-500/10 p-3 transition-colors group-hover:bg-red-500/20"
          aria-hidden="true"
        >
          <MapPin color="#fb2c36" />
        </div>

        <div className="space-y-2">
          <p className="font-bold text-gray-700">Explore Map</p>
          <p className="text-sm text-gray-500">
            Discover AVPN pizzerias worldwide
          </p>
        </div>
      </Link>

      <Link
        to="/"
        className="group flex flex-col items-center gap-3 rounded-lg border border-gray-100 bg-linear-to-br from-white from-30% to-green-500/10 px-4 py-3 text-center shadow-lg transition-shadow hover:shadow-xl"
      >
        <div
          className="rounded-md bg-green-500/10 p-3 transition-colors group-hover:bg-green-500/20"
          aria-hidden="true"
        >
          <Search color="#00c951" />
        </div>

        <div className="space-y-2">
          <p className="font-bold text-gray-700">Find Users</p>
          <p className="text-sm text-gray-500">
            Connect with pizza enthusiasts
          </p>
        </div>
      </Link>

      <Link
        to="/login"
        className="group flex flex-col items-center gap-3 rounded-lg border border-gray-100 bg-linear-to-br from-white from-30% to-blue-500/10 px-4 py-3 text-center shadow-lg transition-shadow hover:shadow-xl"
      >
        <div
          className="rounded-md bg-blue-500/10 p-3 transition-colors group-hover:bg-blue-500/20"
          aria-hidden="true"
        >
          <Pizza color="#2b7fff" />
        </div>

        <div className="space-y-2">
          <p className="font-bold text-gray-700">Start Tracking</p>
          <p className="text-sm text-gray-500">Begin your pizza journey</p>
        </div>
      </Link>
    </div>
  );
}
