import { cn } from "@/shared/utils/utils";
import { X } from "lucide-react";
import { useEffect, type ReactNode } from "react";
import FocusLock from "react-focus-lock";

type ModalProps = {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
  className?: string;
};

export default function Modal({
  isOpen,
  onClose,
  children,
  className = "",
}: ModalProps) {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <FocusLock>
      <div
        className="fixed inset-0 z-50 flex items-center justify-center p-4"
        onKeyDown={(e) => {
          if (e.key === "Escape") {
            onClose();
          }
        }}
      >
        {/* Backdrop */}
        <div
          className="absolute inset-0 bg-black/50 backdrop-blur-sm transition-opacity"
          aria-hidden="true"
          onClick={onClose}
        />

        <div
          className={cn(
            "relative w-full max-w-md overflow-hidden rounded-2xl bg-white shadow-xl",
            className,
          )}
          role="dialog"
          aria-modal="true"
        >
          <button
            data-autofocus
            aria-label="Close modal"
            onClick={onClose}
            className="absolute top-4 right-4 p-1 text-gray-400 transition-colors duration-[100000] hover:text-gray-600 focus:text-gray-600 focus:outline-2! focus:outline-black!"
          >
            <X size={20} />
          </button>

          {children}
        </div>
      </div>
    </FocusLock>
  );
}
