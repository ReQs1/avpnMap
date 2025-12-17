function ProfileCardSkeleton() {
  return (
    <div className="rounded-2xl bg-white px-6 py-8 shadow-sm">
      <div className="flex flex-col items-center gap-6 lg:flex-row lg:items-center lg:justify-between lg:gap-6">
        {/* Avatar and username section */}
        <div className="flex shrink-0 grow-[2] flex-col items-center gap-4 sm:flex-row">
          {/* Avatar skeleton */}
          <div className="relative">
            <div className="h-20 w-20 animate-pulse rounded-full bg-gray-200" />
          </div>

          {/* Username and rank badge skeleton */}
          <div className="flex flex-col items-center gap-2 sm:items-start">
            {/* Username */}
            <div className="h-7 w-32 animate-pulse rounded bg-gray-200" />
            {/* Rank badge */}
            <div className="h-8 w-24 animate-pulse rounded-full bg-gray-200" />
          </div>
        </div>

        {/* Stats skeleton */}
        <div className="grid w-full grow grid-cols-2 gap-3 sm:grid-cols-4 md:max-w-[700px] lg:w-auto lg:max-w-none">
          {/* Visited */}
          <div className="flex flex-col items-center rounded-xl bg-blue-50 px-4 py-3">
            <div className="h-7 w-8 animate-pulse rounded bg-blue-200" />
            <div className="mt-1 h-4 w-12 animate-pulse rounded bg-blue-100" />
          </div>
          {/* Avg Rating */}
          <div className="flex flex-col items-center rounded-xl bg-pink-50 px-4 py-3">
            <div className="h-7 w-8 animate-pulse rounded bg-pink-200" />
            <div className="mt-1 h-4 w-16 animate-pulse rounded bg-pink-100" />
          </div>
          {/* 5-Star */}
          <div className="flex flex-col items-center rounded-xl bg-purple-50 px-4 py-3">
            <div className="h-7 w-8 animate-pulse rounded bg-purple-200" />
            <div className="mt-1 h-4 w-10 animate-pulse rounded bg-purple-100" />
          </div>
          {/* Achievements */}
          <div className="flex flex-col items-center rounded-xl bg-green-50 px-4 py-3">
            <div className="h-7 w-8 animate-pulse rounded bg-green-200" />
            <div className="mt-1 h-4 w-20 animate-pulse rounded bg-green-100" />
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProfileCardSkeleton;
