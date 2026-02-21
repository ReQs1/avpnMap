import type { ReactNode } from "react";

export default function SearchCard({ children }: { children: ReactNode }) {
  return (
    <div
      tabIndex={0}
      className="flex cursor-pointer items-center gap-2 rounded-md bg-gray-50 p-3 transition-colors hover:bg-gray-100 focus-visible:bg-gray-100"
    >
      {children}
    </div>
  );
}
