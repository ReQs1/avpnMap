import { Pizzeria, Visit } from 'prisma/generated/client';

export type VisitWithPizzeria = Visit & { pizzeria: Pizzeria };

// Helpers to count specific types of visits
function countFullReviews(visits: VisitWithPizzeria[]) {
  return visits.reduce(
    (acc, curr) =>
      acc +
      (curr.rating !== null ||
      (curr?.description && curr.description.length > 0)
        ? 1
        : 0),
    0,
  );
}

function countFiveStars(visits: VisitWithPizzeria[]) {
  return visits.reduce((acc, curr) => acc + (curr.rating === 5 ? 1 : 0), 0);
}

function countUniqueCountries(visits: VisitWithPizzeria[]) {
  const countries = new Set(visits.map((visit) => visit.pizzeria.nation));
  return countries.size;
}

export const ACHIEVEMENT_DEFINITIONS = {
  // Visit counts
  VISIT_1: { check: (visits: VisitWithPizzeria[]) => visits.length >= 1 },
  VISIT_10: { check: (visits: VisitWithPizzeria[]) => visits.length >= 10 },
  VISIT_25: { check: (visits: VisitWithPizzeria[]) => visits.length >= 25 },
  VISIT_50: { check: (visits: VisitWithPizzeria[]) => visits.length >= 50 },
  VISIT_100: { check: (visits: VisitWithPizzeria[]) => visits.length >= 100 },
  VISIT_250: { check: (visits: VisitWithPizzeria[]) => visits.length >= 250 },
  VISIT_500: { check: (visits: VisitWithPizzeria[]) => visits.length >= 500 },

  // Full Review counts (either rating or description)
  REVIEW_1: {
    check: (visits: VisitWithPizzeria[]) => countFullReviews(visits) >= 1,
  },
  REVIEW_10: {
    check: (visits: VisitWithPizzeria[]) => countFullReviews(visits) >= 10,
  },
  REVIEW_25: {
    check: (visits: VisitWithPizzeria[]) => countFullReviews(visits) >= 25,
  },
  REVIEW_50: {
    check: (visits: VisitWithPizzeria[]) => countFullReviews(visits) >= 50,
  },

  // 5-star rating counts
  FIVE_STAR_1: {
    check: (visits: VisitWithPizzeria[]) => countFiveStars(visits) >= 1,
  },
  FIVE_STAR_10: {
    check: (visits: VisitWithPizzeria[]) => countFiveStars(visits) >= 10,
  },
  FIVE_STAR_25: {
    check: (visits: VisitWithPizzeria[]) => countFiveStars(visits) >= 25,
  },
  FIVE_STAR_50: {
    check: (visits: VisitWithPizzeria[]) => countFiveStars(visits) >= 50,
  },

  // Country-based
  ITALY_VISIT: {
    check: (visits: VisitWithPizzeria[]) =>
      visits.some((v) => v.pizzeria.nation.toLowerCase() === 'italy'),
  },
  INTERNATIONAL_3: {
    check: (visits: VisitWithPizzeria[]) => countUniqueCountries(visits) >= 3,
  },
  INTERNATIONAL_5: {
    check: (visits: VisitWithPizzeria[]) => countUniqueCountries(visits) >= 5,
  },
  INTERNATIONAL_10: {
    check: (visits: VisitWithPizzeria[]) => countUniqueCountries(visits) >= 10,
  },
} as const;

export type AchievementCode = keyof typeof ACHIEVEMENT_DEFINITIONS;
