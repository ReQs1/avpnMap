import { useState, useEffect, useRef } from "react";

export function useMobileNavigation() {
  const [isOpen, setIsOpen] = useState(false);
  const mobileNavRef = useRef<HTMLDivElement>(null);
  const burgerButtonRef = useRef<HTMLButtonElement>(null);
  const headerRef = useRef<HTMLElement>(null);

  const toggleMenu = () => {
    setIsOpen((prev) => !prev);
  };

  const closeMenu = () => {
    setIsOpen(false);
  };

  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      const mobileNav = mobileNavRef.current;
      const burgerButton = burgerButtonRef.current;
      if (!mobileNav || !burgerButton) return;

      const focusableElements = mobileNav.querySelectorAll(
        'a[href], button, [tabindex]:not([tabindex="-1"])',
      );
      const focusableArray = Array.from(focusableElements) as HTMLElement[];
      const firstElement = focusableArray[0];
      const lastElement = focusableArray[focusableArray.length - 1];
      const currentIndex = focusableArray.indexOf(
        document.activeElement as HTMLElement,
      );

      // Tab navigation with burger button integration
      if (e.key === "Tab") {
        if (e.shiftKey) {
          // Shift + Tab (backwards)
          if (document.activeElement === firstElement) {
            e.preventDefault();
            burgerButton.focus(); // Go back to burger button
          } else if (document.activeElement === burgerButton) {
            e.preventDefault();
            lastElement?.focus(); // Go to last element in nav
          }
        } else {
          // Tab (forwards)
          if (document.activeElement === burgerButton) {
            e.preventDefault();
            firstElement?.focus(); // Go to first element in nav
          } else if (document.activeElement === lastElement) {
            e.preventDefault();
            burgerButton.focus(); // Go back to burger button
          }
        }
      }

      // Arrow key navigation (includes burger button in the flow)
      if (e.key === "ArrowDown") {
        e.preventDefault();
        if (document.activeElement === burgerButton) {
          // From burger button, go to first nav element
          firstElement?.focus();
        } else {
          // Within navigation elements
          const nextIndex =
            currentIndex < focusableArray.length - 1
              ? currentIndex + 1
              : focusableArray.length; // Go beyond last element
          if (nextIndex >= focusableArray.length) {
            burgerButton.focus(); // Loop back to burger button
          } else {
            focusableArray[nextIndex]?.focus();
          }
        }
      }

      if (e.key === "ArrowUp") {
        e.preventDefault();
        if (document.activeElement === burgerButton) {
          // From burger button, go to last nav element
          lastElement?.focus();
        } else {
          // Within navigation elements
          const prevIndex = currentIndex > 0 ? currentIndex - 1 : -1; // Go before first element
          if (prevIndex < 0) {
            burgerButton.focus(); // Loop back to burger button
          } else {
            focusableArray[prevIndex]?.focus();
          }
        }
      }

      // Escape key to close menu
      if (e.key === "Escape") {
        setIsOpen(false);
        burgerButton.focus();
      }
    };

    // Click outside to close menu
    const handleClickOutside = (e: MouseEvent) => {
      const header = headerRef.current;
      if (header && !header.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  return {
    isOpen,
    toggleMenu,
    closeMenu,
    mobileNavRef,
    burgerButtonRef,
    headerRef,
  };
}
