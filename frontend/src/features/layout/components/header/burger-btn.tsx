import { Menu, X } from "lucide-react";
import { useThrottle } from "@/shared/hooks/use-throttle";

export default function BurgerButton({
  open,
  toggleMenu,
  ref,
}: {
  open: boolean;
  toggleMenu: () => void;
  ref: React.Ref<HTMLButtonElement>;
}) {
  const { isThrottled, throttledAction: handleClick } = useThrottle(toggleMenu);

  return (
    <button
      ref={ref}
      className="rounded-md p-2 transition hover:bg-gray-200 lg:hidden"
      onClick={handleClick}
      disabled={isThrottled}
      aria-label={open ? "Close navigation menu" : "Open navigation menu"}
      aria-expanded={open}
      aria-controls="mobile-navigation"
    >
      {open ? <X /> : <Menu />}
    </button>
  );
}
