import ApiStatusIndicator from "@/features/layout/components/header/api-status-indicator";
import BurgerButton from "@/features/layout/components/header/burger-btn";
import DesktopNavigation from "@/features/layout/components/header/desktop-navigation";
import MobileNavigation from "@/features/layout/components/header/mobile-navigation";
import { useMobileNavigation } from "@/features/layout/hooks/useMobileNavigation";
import Logo from "@/shared/components/logo";
import { ThemeToggle } from "../theme-toggle";

function Header() {
  const {
    isOpen,
    toggleMenu,
    mobileNavRef,
    burgerButtonRef,
    headerRef,
    closeMenu,
  } = useMobileNavigation();

  return (
    <header
      ref={headerRef}
      className="border-b border-gray-200 bg-white px-6 py-4 shadow-sm"
    >
      <div className="mx-auto max-w-[600px] lg:max-w-[1400px]">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3 md:grow">
            <Logo />
            <ApiStatusIndicator />
          </div>

          <div className="flex items-center gap-4 lg:hidden">
            <ThemeToggle />
            {/* only burger button OR desktop navigation is visible at a time */}
            <BurgerButton
              ref={burgerButtonRef}
              open={isOpen}
              toggleMenu={toggleMenu}
            />
          </div>
          <DesktopNavigation onClose={closeMenu} />
        </div>

        {isOpen && <MobileNavigation ref={mobileNavRef} onClose={closeMenu} />}
      </div>
    </header>
  );
}

export default Header;
