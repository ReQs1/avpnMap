import { useState, useEffect } from "react";

export function CookieBanner() {
  const [showBanner, setShowBanner] = useState(() => {
    return !localStorage.getItem("cookie-consent");
  });

  useEffect(() => {
    const consent = localStorage.getItem("cookie-consent");
    if (consent === "accepted") {
      console.log("foo");
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem("cookie-consent", "accepted");
    setShowBanner(false);
  };

  const handleDecline = () => {
    localStorage.setItem("cookie-consent", "declined");
    setShowBanner(false);
  };

  if (!showBanner) return null;

  return (
    <div className="fixed right-0 bottom-0 left-0 z-[100] flex flex-col items-center justify-between gap-4 border-t border-zinc-200 bg-white p-4 shadow-lg sm:flex-row sm:p-6 dark:border-zinc-800 dark:bg-zinc-900">
      <div className="flex-1 text-sm text-zinc-600 dark:text-zinc-300">
        We use cookies to improve your experience and load third-party widgets
        like Buy Me a Coffee. Do you accept?
      </div>
      <div className="flex shrink-0 gap-3">
        <button
          onClick={handleDecline}
          className="rounded-md border border-zinc-300 bg-transparent px-4 py-2 text-sm font-medium text-zinc-700 transition-colors hover:bg-zinc-50 dark:border-zinc-700 dark:text-zinc-300 dark:hover:bg-zinc-800"
        >
          Decline
        </button>
        <button
          onClick={handleAccept}
          className="rounded-md bg-red-500 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-red-600"
        >
          Accept
        </button>
      </div>
    </div>
  );
}
