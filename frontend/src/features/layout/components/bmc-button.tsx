import { useEffect, useState } from "react";
import { useRouterState } from "@tanstack/react-router";
import { cn } from "@/shared/utils/utils";

function BmcButton() {
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const isLeaderboard = pathname === "/leaderboard";
  const [hiddenByScroll, setHiddenByScroll] = useState(false);

  const isEffectivelyHidden = isLeaderboard && hiddenByScroll;

  useEffect(() => {
    if (!isLeaderboard) return;

    const handleScroll = () => {
      const isScrollable =
        document.documentElement.scrollHeight > window.innerHeight;
      const isNearBottom =
        window.scrollY + window.innerHeight >=
        document.documentElement.scrollHeight - 100;
      setHiddenByScroll(isScrollable && isNearBottom);
    };

    requestAnimationFrame(handleScroll);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [isLeaderboard]);

  return (
    <a
      href="https://buymeacoffee.com/req___"
      target="_blank"
      rel="noopener noreferrer"
      className={cn(
        "fixed right-5 bottom-5 z-50 flex items-center gap-2.5 rounded-full px-4 py-2.5 text-sm font-bold",
        "bg-white text-zinc-900 shadow-sm ring-1 ring-black/5",
        "dark:bg-zinc-800 dark:text-zinc-100 dark:shadow-black/40 dark:ring-white/[0.06]",
        isEffectivelyHidden
          ? "pointer-events-none translate-y-4 opacity-0"
          : "opacity-100 hover:-translate-y-0.5 active:translate-y-0",
        "transition-all duration-300",
      )}
    >
      <span className="flex h-[26px] w-[26px] shrink-0 items-center justify-center rounded-full bg-red-500 text-[13px]">
        🍕
      </span>
      Buy me a slice
    </a>
  );
}

export default BmcButton;
