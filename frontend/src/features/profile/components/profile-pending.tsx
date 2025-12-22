import AchievementsSkeleton from "@/features/profile/components/achievements/achievements-skeleton";
import PizzaJourneySkeleton from "@/features/profile/components/history/pizza-journey-skeleton";
import ProfileCardSkeleton from "@/features/profile/components/profile-card/profile-card-skeleton";

export default function PendingComponent() {
  return (
    <main className="grow bg-gray-50 px-4 py-8">
      <div className="mx-auto max-w-6xl">
        <ProfileCardSkeleton />
        <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-[2fr_1fr]">
          <PizzaJourneySkeleton />
          <AchievementsSkeleton />
        </div>
      </div>
    </main>
  );
}
