import { Pizza } from "lucide-react";

export default function GlobalPending() {
  return (
    <div className="fixed inset-0 z-9999 flex flex-col items-center justify-center bg-white p-6 text-center">
      <div className="relative mb-8">
        {/* Soft pulse glow behind the icon */}
        <div className="absolute inset-0 animate-ping rounded-full bg-red-100 opacity-75"></div>

        <div className="relative">
          <Pizza size={80} className="text-red-500" strokeWidth={1.5} />
        </div>
      </div>

      <h1 className="text-3xl font-black tracking-tight text-gray-900">
        Pizza <span className="text-red-500">Tracker</span>
      </h1>

      <div className="mt-4 space-y-4">
        <p className="animate-pulse font-medium text-gray-500">
          Preheating the oven...
        </p>

        <div className="h-1.5 w-64 overflow-hidden rounded-full bg-gray-100">
          <div className="h-full w-full origin-left animate-[shimmer_2s_infinite] bg-red-500"></div>
        </div>
      </div>

      <p className="mt-12 max-w-70 text-sm leading-relaxed text-gray-400">
        Our free-tier servers are waking up to fetch the freshest certified
        pizzerias. This might take about 30 seconds.
      </p>
    </div>
  );
}
