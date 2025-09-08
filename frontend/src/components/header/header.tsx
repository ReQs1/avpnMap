import { PizzaIcon } from "lucide-react";
import BurgerButton from "@/components/header/burget-btn";
import MobileNavigation from "@/components/header/mobile-navigation";
import { useMobileNavigation } from "@/hooks/useMobileNavigation";

export type UserSummary =
  | {
      id: number;
      username: string;
      avatarURL: string;
      rank: {
        name: string;
      };
    }
  | undefined;

const user: UserSummary = {
  id: 1,
  username: "Test User",
  avatarURL: "https://avatar.iran.liara.run/public/80",
  rank: {
    name: "Novice",
  },
};
// const user: UserSummary = undefined;

function Header() {
  const { isOpen, toggleMenu, mobileNavRef, burgerButtonRef, headerRef } =
    useMobileNavigation();

  return (
    <header
      ref={headerRef}
      className="border-b border-gray-200 bg-white px-6 py-4 shadow-sm"
    >
      <div className="container mx-auto">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="rounded-xl bg-red-500 p-2" aria-hidden="true">
              <PizzaIcon color="white" />
            </div>
            <div>
              <h1 className="text-lg font-bold md:text-xl">Pizza Tracker</h1>
              <p className="hidden text-xs text-gray-500 md:block">
                AVPN Pizzerias Worldwide
              </p>
            </div>
          </div>
          <BurgerButton
            ref={burgerButtonRef}
            open={isOpen}
            toggleMenu={toggleMenu}
          />
        </div>

        {isOpen && <MobileNavigation ref={mobileNavRef} user={user} />}
      </div>
    </header>
  );
}

export default Header;
