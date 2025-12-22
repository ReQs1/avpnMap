export type EditableVisit = {
  id: number;
  description: string | null;
  visitedAt: Date;
  rating: number | null;
  timeZone: string;
  pizzeria: {
    id: number;
    name: string;
  };
};

export type EditVisitModalProps = {
  visit: EditableVisit;
  onCancel: () => void;
  onSuccess: () => void;
};
