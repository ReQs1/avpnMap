export default function LeaderboardTablePizzeriaHeader() {
  return (
    <div className="grid grid-cols-[32px_minmax(0,1fr)_50px] items-center gap-3 border-b border-gray-200 bg-slate-50 px-4 py-4 text-xs font-semibold tracking-wider text-slate-500 uppercase sm:grid-cols-[48px_3fr_1fr_1fr_50px] sm:gap-4 md:grid-cols-[48px_1fr_1fr_1fr_50px] dark:border-zinc-800 dark:bg-zinc-900/50 dark:text-zinc-400">
      <div className="flex justify-center">#</div>
      <div>Pizzeria</div>
      <div className="hidden justify-center sm:flex">Rating</div>
      <div className="hidden justify-center sm:flex">Visits</div>
      <div className="flex justify-end">Score</div>
    </div>
  );
}
