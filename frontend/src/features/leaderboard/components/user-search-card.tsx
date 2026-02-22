import type { SearchUser } from "../types/search.types";
import SearchCard from "./search-card";

export default function UserSearchCard({ user }: { user: SearchUser }) {
  return (
    <SearchCard>
      <img
        className="h-10 w-10 rounded-full"
        src={user.avatarURL}
        alt={`${user.name} avatar`}
      />
      <div>
        <p className="font-medium">{user.name}</p>
        <div className="flex items-center gap-1 text-xs text-gray-500">
          <p>
            {user.visits} {user.visits === 1 ? "visit" : "visits"}
          </p>
          <span> &middot;</span>
          <p>{user.avgRating} avg rating</p>
        </div>
      </div>
    </SearchCard>
  );
}
