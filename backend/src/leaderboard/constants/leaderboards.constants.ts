export const LB_REDIS_KEYS = {
  USERS: {
    CURRENT: 'leaderboard:users:current',
    NEXT: 'leaderboard:users:next',
  },
  PIZZERIAS: {
    CURRENT: 'leaderboard:pizzerias:current',
    NEXT: 'leaderboard:pizzerias:next',
  },
  META: 'leaderboard:meta',
} as const;
