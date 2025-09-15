import type { UserSummary } from "@/hooks/useAuth";
import SignOutButton from "@/components/header/sign-out-btn";

export default function UserInformation({
  user,
}: {
  user: Exclude<UserSummary, undefined>;
}) {
  return (
    <div
      className="grid gap-4 lg:flex lg:items-center lg:gap-4"
      aria-label="User information"
    >
      <div className="flex items-center gap-3">
        <img
          src={user.avatarURL}
          alt={`${user.username} avatar`}
          className="h-10 w-10 rounded-full object-cover"
          referrerPolicy="no-referrer"
        />
        <div>
          <p className="font-medium text-gray-800">{user.username}</p>
          <p className="text-sm text-gray-500">{user.rank.name}</p>
        </div>
      </div>
      <SignOutButton />
    </div>
  );
}
