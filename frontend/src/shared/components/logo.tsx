import { cn } from "@/shared/utils/utils";
import { Link } from "@tanstack/react-router";
import { PizzaIcon } from "lucide-react";

function Logo({ className }: { className?: string }) {
  return (
    <Link to="/map" className={cn("flex items-center gap-3", className)}>
      <div className="rounded-xl bg-red-500 p-2" aria-hidden="true">
        <PizzaIcon color="white" />
      </div>
      <div>
        <span className="text-lg font-bold text-black md:text-xl dark:text-zinc-100">
          Pizza Tracker
        </span>
        <p className="hidden text-xs text-gray-500 md:block dark:text-zinc-500">
          AVPN Pizzerias Worldwide
        </p>
      </div>
    </Link>
  );
}

export default Logo;
