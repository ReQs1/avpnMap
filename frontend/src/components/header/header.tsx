import BurgerButton from "@/components/header/burget-btn";
import MobileNavigation from "@/components/header/mobile-navigation";
import { useMobileNavigation } from "@/hooks/useMobileNavigation";
import { PizzaIcon } from "lucide-react";
import DesktopNavigation from "@/components/header/desktop-navigation";

function Header() {
  const { isOpen, toggleMenu, mobileNavRef, burgerButtonRef, headerRef } =
    useMobileNavigation();

  return (
    <header
      ref={headerRef}
      className="border-b border-gray-200 bg-white px-6 py-4 shadow-sm"
    >
      <div className="mx-auto max-w-[600px] lg:max-w-[1400px]">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3 md:grow">
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

          {/* only burger button OR desktop navigation is visible at a time */}
          <BurgerButton
            ref={burgerButtonRef}
            open={isOpen}
            toggleMenu={toggleMenu}
          />
          <DesktopNavigation />
        </div>

        {isOpen && <MobileNavigation ref={mobileNavRef} />}
      </div>
    </header>
  );
}

export default Header;
