type VisitWithRating = { rating: number | null };

type VisitWithRatingAndDescription = VisitWithRating & {
  description: string | null;
};

export function computeAvgRating(visits: VisitWithRating[]): number {
  let ratingSum = 0;
  let ratedCount = 0;

  for (const v of visits) {
    if (v.rating !== null) {
      ratingSum += v.rating;
      ratedCount++;
    }
  }

  if (ratedCount === 0) return 0;
  return Math.round((ratingSum / ratedCount) * 100) / 100;
}

/**
 * User score formula:
 * +1 per visit
 * +1 per text review (non-empty description)
 * +2 per star rating
 * +5 per achievement
 */
export function computeUserScore(
  visits: VisitWithRatingAndDescription[],
  achievementsCount: number,
): number {
  let ratedVisitsCount = 0;
  let textReviewsCount = 0;

  for (const visit of visits) {
    if (visit.rating !== null) {
      ratedVisitsCount++;
    }
    if (visit.description && visit.description.trim().length > 0) {
      textReviewsCount++;
    }
  }

  const score =
    visits.length +
    textReviewsCount +
    ratedVisitsCount * 2 +
    achievementsCount * 5;

  return Math.round(score * 100) / 100;
}

/**
 * Pizzeria score formula:
 * avgRating * log10(visits + 1) * 10
 * We use (visits + 1) to prevent log10(0) issues.
 */
export function computePizzeriaScore(
  avgRating: number,
  visitsCount: number,
): number {
  const score = avgRating * Math.log10(visitsCount + 1) * 10;
  return Math.round(score * 100) / 100;
}
