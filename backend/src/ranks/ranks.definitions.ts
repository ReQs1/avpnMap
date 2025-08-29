export type RankCode =
  | 'NOVICE'
  | 'APPRENTICE'
  | 'EXPERT'
  | 'MASTER'
  | 'NEAPOLITAN'
  | 'LEGEND';

export type RankDefinition = {
  code: RankCode;
  minAchievements: number;
  maxAchievements?: number;
};

const RANK_DEFINITIONS: Record<RankCode, RankDefinition> = {
  NOVICE: {
    code: 'NOVICE',
    minAchievements: 0,
    maxAchievements: 2,
  },
  APPRENTICE: {
    code: 'APPRENTICE',
    minAchievements: 3,
    maxAchievements: 5,
  },
  EXPERT: {
    code: 'EXPERT',
    minAchievements: 6,
    maxAchievements: 10,
  },
  MASTER: {
    code: 'MASTER',
    minAchievements: 11,
    maxAchievements: 15,
  },
  NEAPOLITAN: {
    code: 'NEAPOLITAN',
    minAchievements: 16,
    maxAchievements: 20,
  },
  LEGEND: {
    code: 'LEGEND',
    minAchievements: 21,
  },
};

export const ORDERED_RANKS_DESC: RankDefinition[] = Object.values(
  RANK_DEFINITIONS,
).sort((a, b) => b.minAchievements - a.minAchievements);
