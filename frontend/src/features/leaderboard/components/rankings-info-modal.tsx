import Modal from "@/shared/components/modal";
import { Trophy, Clock, Star, Users } from "lucide-react";

interface RankingsInfoModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const RankingsInfoModal = ({
  isOpen,
  onClose,
}: RankingsInfoModalProps) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className="p-6">
        <div className="mb-6 flex items-center gap-3 pr-8">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-red-50">
            <Trophy className="h-5 w-5 text-red-500" />
          </div>
          <h2 className="text-xl font-bold text-slate-900">
            How Rankings Work
          </h2>
        </div>

        <div className="space-y-6">
          {/* Item 1: Daily Refresh */}
          <div className="flex gap-4">
            <div className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-orange-50">
              <Clock className="h-4 w-4 text-orange-500" />
            </div>
            <div>
              <h3 className="mb-1 text-sm font-semibold text-slate-900">
                Daily Refresh
              </h3>
              <p className="text-sm leading-relaxed text-slate-500">
                Rankings are recalculated and updated every day at 00:00 UTC.
                Check back after the reset to see the latest standings.
              </p>
            </div>
          </div>

          {/* Item 2: Score Calculation */}
          <div className="flex gap-4">
            <div className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-green-50">
              <Star className="h-4 w-4 text-green-500" />
            </div>
            <div>
              <h3 className="mb-1 text-sm font-semibold text-slate-900">
                Score Calculation
              </h3>
              <p className="text-sm leading-relaxed text-slate-500">
                Your ranking score is determined by a special formula that takes
                into account multiple factors including visits, ratings, and
                achievements.
              </p>
            </div>
          </div>

          {/* Item 3: Fair Competition */}
          <div className="flex gap-4">
            <div className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-purple-50">
              <Users className="h-4 w-4 text-purple-500" />
            </div>
            <div>
              <h3 className="mb-1 text-sm font-semibold text-slate-900">
                Fair Competition
              </h3>
              <p className="text-sm leading-relaxed text-slate-500">
                Both users and pizzerias are ranked separately. User rankings
                reward exploration and engagement, while pizzeria rankings
                reflect community ratings and popularity.
              </p>
            </div>
          </div>
        </div>

        <div className="mt-8">
          <button
            onClick={onClose}
            className="w-full rounded-xl bg-red-600 py-3 font-semibold text-white transition-colors hover:bg-red-700 active:scale-[0.98]"
          >
            Got it
          </button>
        </div>
      </div>
    </Modal>
  );
};
