export default function LeaderboardTableUsersHeader() {
  return (
    <div className="grid grid-cols-[32px_minmax(0,1fr)_50px] gap-3 border-b border-gray-200 bg-slate-50 px-4 py-4 text-xs font-semibold tracking-wider text-slate-500 uppercase sm:grid-cols-[48px_3fr_1fr_1fr_50px] sm:gap-4 md:grid-cols-[48px_1fr_1fr_1fr_50px]">
      <div className="text-center">#</div>
      <div>User</div>
      <div className="hidden text-center sm:block">Visits</div>
      <div className="hidden text-center sm:block">Rating</div>
      <div className="text-right">Score</div>
    </div>
  );
}
