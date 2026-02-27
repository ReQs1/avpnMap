export type UserRank = {
  name: string;
  color: string;
  icon: string;
};

export type LeaderboardUser = {
  position: number;
  userId: number;
  username: string;
  avatarURL: string;
  userRank: UserRank;
  avgRating: number;
  visits: number;
  score: number;
};

export type LeaderboardPizzeria = {
  position: number;
  pizzeriaId: number;
  avpnId: number;
  name: string;
  nation: string;
  avgRating: number;
  visits: number;
  score: number;
};
