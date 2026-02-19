import { cn } from "@/shared/utils/utils";
import { PizzaIcon } from "lucide-react";

function Logo({ className }: { className?: string }) {
  return (
    <div className={cn("flex items-center gap-3", className)}>
      <div className="rounded-xl bg-red-500 p-2" aria-hidden="true">
        <PizzaIcon color="white" />
      </div>
      <div>
        <span className="text-lg font-bold md:text-xl">Pizza Tracker</span>
        <p className="hidden text-xs text-gray-500 md:block">
          AVPN Pizzerias Worldwide
        </p>
      </div>
    </div>
  );
}

export default Logo;
