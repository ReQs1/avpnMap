import { CircleQuestionMark, Clock, LoaderCircle } from "lucide-react";
import { useEffect, useState } from "react";
import { RankingsInfoModal } from "@/features/leaderboard/components/rankings-info-modal";

const ICON_SIZE = 20;

type Props = {
  nextRefresh?: string | null;
  onTimerComplete: () => void;
  isFetching?: boolean;
};

export default function LeaderboardHeader({
  nextRefresh,
  onTimerComplete,
  isFetching,
}: Props) {
  const [timeRemaining, setTimeRemaining] = useState("00:00:00");
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    if (!nextRefresh) return;

    const targetTime = new Date(nextRefresh).getTime();

    const updateTimer = () => {
      const now = Date.now();
      const diff = targetTime - now;

      if (diff <= 0) {
        setTimeRemaining("00:00:00");
        onTimerComplete();
        return true; // Signal to stop the interval
      }

      const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
      const minutes = Math.floor((diff / (1000 * 60)) % 60);
      const seconds = Math.floor((diff / 1000) % 60);

      const format = (n: number) => n.toString().padStart(2, "0");
      setTimeRemaining(
        `${format(hours)}:${format(minutes)}:${format(seconds)}`,
      );
      return false;
    };

    const isFinished = updateTimer();

    if (isFinished) return;

    const intervalId = setInterval(() => {
      const done = updateTimer();
      if (done) {
        clearInterval(intervalId);
      }
    }, 1000);

    return () => clearInterval(intervalId);
  }, [nextRefresh, onTimerComplete]);
  return (
    <>
      <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <div className="grid gap-1">
          <h1 className="text-2xl font-bold text-gray-900 lg:text-3xl dark:text-zinc-100">
            Rankings
          </h1>
          <p className="text-sm text-gray-500 lg:text-base dark:text-zinc-400">
            Discover top pizza hunters and pizzerias worldwide
          </p>
        </div>
        <div className="flex items-center gap-4">
          <div className="inline-flex items-center gap-1.5 rounded-lg border border-gray-200 bg-white px-3 py-2 shadow dark:border-zinc-700 dark:bg-zinc-900">
            {isFetching ? (
              <LoaderCircle
                className="animate-spin text-gray-500 dark:text-zinc-400"
                size={ICON_SIZE}
              />
            ) : (
              <Clock
                className="text-gray-500 dark:text-zinc-400"
                size={ICON_SIZE}
              />
            )}
            <p className="inline-flex gap-1.5 text-sm text-gray-600 lg:text-base dark:text-zinc-300">
              Resets in
              <span className="font-mono! font-semibold text-red-600 dark:text-red-500">
                {timeRemaining}
              </span>
            </p>
          </div>
          <button
            onClick={() => setIsModalOpen(true)}
            aria-label="How rankings works"
            className="inline-flex h-[38px] w-[38px] items-center justify-center rounded-lg border border-gray-200 bg-white text-gray-500 shadow transition-colors duration-200 hover:border-gray-400 hover:text-gray-700 lg:h-[42px] lg:w-[42px] dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-400 dark:hover:border-zinc-600 dark:hover:text-zinc-200"
          >
            <CircleQuestionMark size={ICON_SIZE} />
          </button>
        </div>
      </div>

      {isModalOpen && (
        <RankingsInfoModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
        />
      )}
    </>
  );
}
