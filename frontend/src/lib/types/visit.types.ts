export type Visit = {
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
};
