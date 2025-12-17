import type { Pizzeria } from "@/features/map/api/pizza-query-options";
import { submitVisitForm } from "@/features/visits/api/submit-visit-form";

import type { QueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import type { VisitedPizzeria } from "@/features/map/types/pizzeria.types";
import type {
  CreateVisitBody,
  UpdateVisitBody,
} from "@/features/visits/types/visit-form.types";

type VisitFormValues = {
  visitedAt: string;
  rating: number;
  description: string;
};

type HandleVisitFormSubmitParams = {
  value: VisitFormValues;
  isEditing: boolean;
  pizzeria: Pizzeria;
  visitedPizzeria: VisitedPizzeria | null;
  queryClient: QueryClient;
  onCloseEdit: () => void;
  userId?: number;
};

export async function handleVisitFormSubmit({
  value,
  isEditing,
  pizzeria,
  visitedPizzeria,
  queryClient,
  onCloseEdit,
  userId,
}: HandleVisitFormSubmitParams) {
  try {
    const method: "POST" | "PATCH" = isEditing ? "PATCH" : "POST";
    const url = isEditing
      ? `/api/visits/${visitedPizzeria!.id}`
      : `/api/visits`;

    const timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;

    if (method === "POST") {
      const reqBody: CreateVisitBody = {
        pizzeriaId: pizzeria.id,
        visitedAt: new Date(value.visitedAt).toISOString(),
        timeZone,
      };

      // Only include rating if it's greater than 0
      if (value.rating > 0) {
        reqBody.rating = value.rating;
      }

      // Only include description if it's not empty
      if (value.description.trim()) {
        reqBody.description = value.description.trim();
      }

      await submitVisitForm(method, url, reqBody);
    } else {
      const reqBody: UpdateVisitBody = {};

      // Handle rating changes
      const originalRating = visitedPizzeria?.rating ?? 0;
      if (value.rating !== originalRating) {
        // If rating is 0, user wants to remove it → send null
        // If rating is 1-5, user wants to set/update it → send the value
        reqBody.rating = value.rating === 0 ? null : value.rating;
      }

      // Handle description changes
      const originalDescription = visitedPizzeria?.description ?? "";
      const trimmedDescription = value.description.trim();
      if (trimmedDescription !== originalDescription) {
        // If description is empty, user wants to remove it → send null
        // If description has content, user wants to set/update it → send the value
        reqBody.description =
          trimmedDescription === "" ? null : trimmedDescription;
      }

      // Handle visitedAt changes
      const originalVisitedAt = visitedPizzeria?.visitedAt.slice(0, 10);
      if (value.visitedAt !== originalVisitedAt) {
        reqBody.visitedAt = new Date(value.visitedAt).toISOString();
        reqBody.timeZone = timeZone;
      }

      if (Object.keys(reqBody).length === 0) {
        return;
      }

      await submitVisitForm(method, url, reqBody);
    }

    // Success: invalidate queries and close form
    await queryClient.invalidateQueries({ queryKey: ["pizzerias"] });
    if (userId) {
      await queryClient.invalidateQueries({ queryKey: ["profile", userId] });
    }
    onCloseEdit();
  } catch (error) {
    console.error("Failed to submit visit:", error);
    toast.error("Something went wrong, please try again later", {
      position: "bottom-center",
    });
  }
}
