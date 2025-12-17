import { useEffect } from "react";

export function useCloseOnEsc(
  isActive: boolean,
  onClose: (id: number | null) => void,
) {
  useEffect(() => {
    function closeOnEsc(event: KeyboardEvent) {
      if (event.key === "Escape") {
        onClose(null);
      }
    }

    if (isActive) {
      window.addEventListener("keydown", closeOnEsc);
      return () => {
        window.removeEventListener("keydown", closeOnEsc);
      };
    }
  }, [isActive, onClose]);
}
