import { AlertCircle } from "lucide-react";
import { useEffect } from "react";
import { createPortal } from "react-dom";

export default function DeleteVisitModal({
  pizzeriaName,
  isDeleting,
  onCancel,
  onConfirm,
}: {
  pizzeriaName: string;
  isDeleting: boolean;
  onCancel: () => void;
  onConfirm: () => void;
}) {
  useEffect(() => {
    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape" && !isDeleting) {
        event.stopPropagation();
        onCancel();
      }
    }

    window.addEventListener("keydown", handleKeyDown, true);
    return () => {
      window.removeEventListener("keydown", handleKeyDown, true);
    };
  }, [onCancel]);

  return createPortal(
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50"
      onClick={!isDeleting ? onCancel : undefined}
    >
      <div
        className="mx-4 w-full max-w-sm rounded-lg bg-white p-6 shadow-xl"
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-labelledby="delete-modal-title"
      >
        <div className="flex flex-col items-center gap-6">
          <div className="flex h-14 w-14 items-center justify-center rounded-full bg-red-50">
            <AlertCircle
              size={28}
              className="text-red-500"
              aria-hidden="true"
            />
          </div>
          <div className="text-center">
            <h2
              id="delete-modal-title"
              className="text-lg font-semibold text-gray-900"
            >
              Remove Visit?
            </h2>
            <p className="mt-1 text-sm text-gray-600">
              This will permanently delete your visit to{" "}
              <span className="font-medium">{pizzeriaName}</span>
            </p>
          </div>
          <div className="mt-2 flex w-full gap-3">
            <button
              onClick={onConfirm}
              disabled={isDeleting}
              className="inline-flex h-10 flex-1 items-center justify-center rounded-md bg-red-600 px-4 text-sm font-medium text-white shadow-sm transition-colors hover:bg-red-700 disabled:opacity-50"
            >
              {isDeleting ? "Removing..." : "Remove"}
            </button>
            <button
              onClick={onCancel}
              disabled={isDeleting}
              className="inline-flex h-10 flex-1 items-center justify-center rounded-md border border-gray-300 bg-white px-4 text-sm font-medium text-gray-900 transition-colors hover:bg-gray-50 disabled:opacity-50"
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>,
    document.body,
  );
}
