import { Pizzeria, Visit } from 'generated/prisma';

type VisitWithPizzeria = Visit & { pizzeria: Pizzeria };

// todo: implements helped functions

// Helpers to count specific types of visits

function countRated(visits: VisitWithPizzeria[]) {
  return 1;
}

function countReviewed(visits: VisitWithPizzeria[]) {
  return 1;
}

function countFiveStars(visits: VisitWithPizzeria[]) {
  return 1;
}

function countUniqueCountries(visits: VisitWithPizzeria[]) {
  return 1;
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

  // Rating counts
  RATE_1: { check: (visits: VisitWithPizzeria[]) => countRated(visits) >= 1 },
  RATE_10: { check: (visits: VisitWithPizzeria[]) => countRated(visits) >= 10 },
  RATE_25: { check: (visits: VisitWithPizzeria[]) => countRated(visits) >= 25 },
  RATE_50: { check: (visits: VisitWithPizzeria[]) => countRated(visits) >= 50 },
  RATE_100: {
    check: (visits: VisitWithPizzeria[]) => countRated(visits) >= 100,
  },

  // Review counts
  REVIEW_1: {
    check: (visits: VisitWithPizzeria[]) => countReviewed(visits) >= 1,
  },
  REVIEW_10: {
    check: (visits: VisitWithPizzeria[]) => countReviewed(visits) >= 10,
  },
  REVIEW_25: {
    check: (visits: VisitWithPizzeria[]) => countReviewed(visits) >= 25,
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
