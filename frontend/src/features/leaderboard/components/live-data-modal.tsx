import Modal from "@/shared/components/modal";
import { Zap, Clock, RefreshCw, TableProperties } from "lucide-react";

interface LiveDataModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function LiveDataModal({ isOpen, onClose }: LiveDataModalProps) {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className="p-6">
        <div className="mb-6 flex items-center gap-3 pr-8">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-green-50 dark:bg-green-500/10">
            <Zap className="h-5 w-5 fill-green-500 text-green-500" />
          </div>
          <h2 className="text-xl font-bold text-slate-900 dark:text-zinc-100">
            Live Search Data
          </h2>
        </div>

        <div className="space-y-6">
          <div className="flex gap-4">
            <div className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-green-50 dark:bg-green-500/10">
              <RefreshCw className="h-4 w-4 text-green-500" />
            </div>
            <div>
              <h3 className="mb-1 text-sm font-semibold text-slate-900 dark:text-zinc-100">
                Always up to date
              </h3>
              <p className="text-sm leading-relaxed text-slate-500 dark:text-zinc-400">
                Search results show real-time data pulled directly from the
                database — visits, ratings, scores, and ranks reflect the
                current state right now.
              </p>
            </div>
          </div>

          <div className="flex gap-4">
            <div className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-orange-50 dark:bg-orange-500/10">
              <Clock className="h-4 w-4 text-orange-500" />
            </div>
            <div>
              <h3 className="mb-1 text-sm font-semibold text-slate-900 dark:text-zinc-100">
                Leaderboard table updates daily
              </h3>
              <p className="text-sm leading-relaxed text-slate-500 dark:text-zinc-400">
                The rankings table is a snapshot that refreshes once per day at
                00:00 UTC. Numbers shown there may be slightly behind what you
                see in search results.
              </p>
            </div>
          </div>

          <div className="flex gap-4">
            <div className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-blue-50 dark:bg-blue-500/10">
              <TableProperties className="h-4 w-4 text-blue-500" />
            </div>
            <div>
              <h3 className="mb-1 text-sm font-semibold text-slate-900 dark:text-zinc-100">
                Why the difference?
              </h3>
              <p className="text-sm leading-relaxed text-slate-500 dark:text-zinc-400">
                Rank positions in the table are fixed until the next daily
                reset, so a user's rank or score in search can differ from what
                the table currently shows. Use search to see someone's latest
                stats.
              </p>
            </div>
          </div>
        </div>

        <div className="mt-8">
          <button
            onClick={onClose}
            className="w-full rounded-xl bg-red-600 py-3 font-semibold text-white transition-colors hover:bg-red-700 active:scale-[0.98] dark:bg-red-500/10 dark:text-red-500 dark:hover:bg-red-500/20"
          >
            Got it
          </button>
        </div>
      </div>
    </Modal>
  );
}
