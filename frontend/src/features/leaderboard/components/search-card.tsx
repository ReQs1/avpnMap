import type { ReactNode } from "react";

export default function SearchCard({ children }: { children: ReactNode }) {
  return (
    <div
      tabIndex={0}
      className="flex cursor-pointer items-center gap-2 border-b border-b-gray-200 bg-white px-3 py-2.5 -outline-offset-2 transition-colors last:border-b-0 hover:bg-gray-100 focus-visible:bg-gray-100"
    >
      {children}
    </div>
  );
}
