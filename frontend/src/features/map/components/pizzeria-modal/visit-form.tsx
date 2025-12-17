import VisitDateField from "@/features/map/components/pizzeria-modal/visit-form/visit-date-field";
import VisitDescriptionField from "@/features/map/components/pizzeria-modal/visit-form/visit-description-field";
import VisitFormButtons from "@/features/map/components/pizzeria-modal/visit-form/visit-form-buttons";
import VisitRatingField from "@/features/map/components/pizzeria-modal/visit-form/visit-rating-field";
import { useAuth } from "@/features/auth/hooks/useAuth";
import type { Pizzeria } from "@/features/map/api/pizza-query-options";
import type { VisitedPizzeria } from "@/features/map/types/pizzeria.types";
import { handleVisitFormSubmit } from "@/features/visits/utils/visit-form-utils";
import { useForm } from "@tanstack/react-form";
import { useQueryClient } from "@tanstack/react-query";
import { isFuture } from "date-fns";

export default function VisitForm({
  isEditing,
  pizzeria,
  visitedPizzeria,
  onCloseEdit,
}: {
  isEditing: boolean;
  pizzeria: Pizzeria;
  visitedPizzeria: VisitedPizzeria | null;
  onCloseEdit: () => void;
}) {
  const queryClient = useQueryClient();
  const { user } = useAuth();

  const form = useForm({
    defaultValues: {
      visitedAt:
        visitedPizzeria?.visitedAt.slice(0, 10) ||
        new Date().toISOString().slice(0, 10),
      rating: visitedPizzeria?.rating ?? 0,
      description: visitedPizzeria?.description ?? "",
    },
    onSubmit: async ({ value }) => {
      await handleVisitFormSubmit({
        value,
        isEditing,
        pizzeria,
        visitedPizzeria,
        queryClient,
        onCloseEdit,
        userId: user?.id,
      });
    },
  });

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        e.stopPropagation();
        form.handleSubmit();
      }}
      className="space-y-4"
    >
      <form.Field
        name="visitedAt"
        validators={{
          onSubmit: ({ value }) => {
            if (isFuture(value)) {
              return "Future dates are not allowed";
            }

            return undefined;
          },
        }}
        children={(field) => <VisitDateField field={field} />}
      />

      <form.Field
        name="rating"
        children={(field) => <VisitRatingField field={field} />}
      />

      <form.Field
        name="description"
        children={(field) => <VisitDescriptionField field={field} />}
      />

      <VisitFormButtons
        form={form}
        isEditing={isEditing}
        onCloseEdit={onCloseEdit}
      />
    </form>
  );
}
