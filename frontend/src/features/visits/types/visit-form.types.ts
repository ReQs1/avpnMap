export type CreateVisitBody = {
  pizzeriaId: number;
  visitedAt: string;
  timeZone: string;
  rating?: number;
  description?: string;
};

export type UpdateVisitBody = {
  rating?: number | null;
  description?: string | null;
  visitedAt?: string;
  timeZone?: string;
};
