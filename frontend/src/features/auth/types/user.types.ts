export type User = {
  id: number;
  username: string;
  avatarURL: string;
  rank: {
    name: string;
  };
};

export type AuthResult = {
  user: User | null;
  error: Error | null;
};

export type UserProfile = {
  achievements: {
    unlockedAt: Date | null;
    id: number;
    icon: string;
    title: string;
    description: string;
  }[];
  id: number;
  username: string;
  avatarURL: string;
  joinedAt: Date;
  visits: {
    id: number;
    description: string | null;
    visitedAt: Date;
    rating: number | null;
    timeZone: string;
    pizzeria: {
      id: number;
      name: string;
      memberNumber: number | null;
      nation: string;
      address: string;
    };
  }[];
  rank: {
    name: string;
    color: string;
    icon: string;
  };
};
