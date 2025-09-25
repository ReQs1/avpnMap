import Logo from "@/components/common/logo";
import { Link } from "@tanstack/react-router";
import { Home } from "lucide-react";

function MinimalHeader() {
  return (
    <header className="border-b border-gray-200 bg-white px-2 py-4 shadow-sm sm:px-6">
      <div className="mx-auto flex max-w-[600px] items-center justify-between lg:max-w-[1400px]">
        <Logo />
        <Link
          to="/map"
          className="inline-flex items-center gap-3 rounded-md border border-gray-200 px-4 py-2 text-gray-800 transition-all hover:border-red-300 hover:bg-red-100 hover:text-red-500"
        >
          <Home size={20} />
          <span>Home</span>
        </Link>
      </div>
    </header>
  );
}

export default MinimalHeader;
