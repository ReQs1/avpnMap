import Logo from "@/shared/components/logo";
import { Link } from "@tanstack/react-router";
import { ThemeToggle } from "./theme-toggle";

function MinimalHeader() {
  return (
    <header className="border-b border-gray-200 bg-white px-2 py-4 shadow-sm sm:px-6 dark:border-zinc-700 dark:bg-zinc-900">
      <div className="mx-auto flex max-w-[600px] items-center justify-between lg:max-w-[1400px]">
        <Logo />
        <div className="flex items-center gap-2">
          <ThemeToggle />
          <Link
            to="/map"
            className="inline-flex items-center rounded-md border border-gray-200 px-2 py-1.5 text-xs font-medium whitespace-nowrap text-gray-800 transition-colors hover:border-red-300 hover:bg-red-100 hover:text-red-500 sm:px-4 sm:py-2 sm:text-sm dark:border-zinc-700 dark:text-zinc-100 dark:hover:border-red-500/50 dark:hover:bg-red-500/10 dark:hover:text-red-400"
          >
            Back To Map
          </Link>
        </div>
      </div>
    </header>
  );
}

export default MinimalHeader;
