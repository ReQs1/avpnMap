import { Menu, X } from "lucide-react";

export default function BurgerButton({
  open,
  toggleMenu,
  ref,
}: {
  open: boolean;
  toggleMenu: () => void;
  ref: React.Ref<HTMLButtonElement>;
}) {
  return (
    <button
      ref={ref}
      className="rounded-md p-2 transition hover:bg-gray-200 md:hidden"
      onClick={toggleMenu}
      aria-label={open ? "Close navigation menu" : "Open navigation menu"}
      aria-expanded={open}
      aria-controls="mobile-navigation"
    >
      {open ? <X /> : <Menu />}
    </button>
  );
}
