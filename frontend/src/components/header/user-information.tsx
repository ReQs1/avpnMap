import { LogOut } from "lucide-react";
import type { UserSummary } from "@/components/header/header";

export default function UserInformation({
  user,
}: {
  user: Exclude<UserSummary, undefined>;
}) {
  return (
    <div className="grid gap-4" aria-label="User information">
      <div className="flex items-center gap-3">
        <img
          src={user.avatarURL}
          alt={`${user.username} avatar`}
          className="h-11 w-11 rounded-full object-cover"
        />
        <div>
          <p className="font-medium text-gray-800">{user.username}</p>
          <p className="text-sm text-gray-500">{user.rank.name}</p>
        </div>
      </div>
      <button className="inline-flex items-center gap-2 rounded-sm p-2 text-sm font-semibold text-gray-600 transition hover:bg-gray-100 hover:text-gray-900">
        <LogOut size={20} aria-hidden="true" />
        <span className="font-medium">Sign Out</span>
      </button>
    </div>
  );
}
