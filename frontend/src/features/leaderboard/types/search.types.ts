import type { UserRank } from "./leaderboard.types";

export type SearchUser = {
  id: number;
  avatarURL: string;
  name: string;
  userRank: UserRank;
  visits: number;
  avgRating: number;
  score: number;
};

export type SearchPizzeria = {
  id: number;
  name: string;
  memberNumber: number;
  nation: string;
  avgRating: number;
  visits: number;
  score: number;
};
