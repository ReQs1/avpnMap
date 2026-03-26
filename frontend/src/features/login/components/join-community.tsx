export default function JoinCommunity() {
  return (
    <div className="border-avpn-green/20 space-y-4 rounded-lg border bg-white py-6 dark:border-zinc-700 dark:bg-zinc-900">
      <p className="px-6 text-sm font-semibold text-gray-900 md:text-base dark:text-zinc-100">
        Join the Community
      </p>
      <div className="flex items-center justify-around px-6 md:px-0">
        <div className="text-center">
          <p className="text-lg font-bold text-red-500 md:text-xl">500+</p>
          <p className="md:text-md text-xs text-gray-600 dark:text-zinc-500">
            AVPN Pizzerias
          </p>
        </div>
        <div className="text-center">
          <p className="text-lg font-bold text-orange-500 md:text-xl dark:text-amber-400">
            50+
          </p>
          <p className="md:text-md text-xs text-gray-600 dark:text-zinc-500">
            Countries
          </p>
        </div>
        <div className="text-center">
          <p className="text-lg font-bold text-purple-500 md:text-xl dark:text-violet-400">
            1000+
          </p>
          <p className="md:text-md text-xs text-gray-600 dark:text-zinc-500">
            Pizza Hunters
          </p>
        </div>
      </div>
    </div>
  );
}
