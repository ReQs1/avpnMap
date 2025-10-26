import BurgerButton from "@/components/app-header/burget-btn";
import DesktopNavigation from "@/components/app-header/desktop-navigation";
import MobileNavigation from "@/components/app-header/mobile-navigation";
import { useMobileNavigation } from "@/hooks/useMobileNavigation";
import Logo from "@/components/common/logo";

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
          <Logo className="md:grow" />

          {/* only burger button OR desktop navigation is visible at a time */}
          <BurgerButton
            ref={burgerButtonRef}
            open={isOpen}
            toggleMenu={toggleMenu}
          />
          <DesktopNavigation onClose={closeMenu} />
        </div>

        {isOpen && <MobileNavigation ref={mobileNavRef} onClose={closeMenu} />}
      </div>
    </header>
  );
}

export default Header;
