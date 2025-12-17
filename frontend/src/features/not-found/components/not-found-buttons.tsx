import { Link, useRouter } from "@tanstack/react-router";
import { ArrowLeft, Home } from "lucide-react";

function NotFoundNavigation() {
  const router = useRouter();
  return (
    <div className="flex gap-4">
      <button
        onClick={() => router.history.back()}
        className="inline-flex items-center gap-2 rounded-lg border border-gray-200 px-4 py-2 transition-colors hover:border-gray-300 hover:bg-gray-50"
      >
        <ArrowLeft size={18} />
        <span>Go Back</span>
      </button>

      <Link
        to="/map"
        className="inline-flex items-center gap-2 rounded-lg bg-red-500 px-4 py-2 text-white transition-colors hover:bg-red-600"
      >
        <Home size={18} />
        <span>Back to Home</span>
      </Link>
    </div>
  );
}

export default NotFoundNavigation;
