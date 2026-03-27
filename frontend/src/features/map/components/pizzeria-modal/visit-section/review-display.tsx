export default function ReviewDisplay({
  description,
}: {
  description: string;
}) {
  return (
    <div className="border-avpn-green/30 space-y-2 rounded-lg border bg-white px-4 py-3 dark:border-green-500/20 dark:bg-zinc-900">
      <div className="flex items-center gap-2">
        <div
          className="h-2 w-2 rounded-full bg-green-400 dark:bg-green-500"
          aria-hidden="true"
        />
        <p className="text-sm font-medium text-gray-600 dark:text-zinc-400">
          Your Review
        </p>
      </div>
      <blockquote className="max-h-32 overflow-y-auto pl-4 text-sm break-words whitespace-pre-wrap text-gray-700 italic dark:text-zinc-300">
        "{description}"
      </blockquote>
    </div>
  );
}
