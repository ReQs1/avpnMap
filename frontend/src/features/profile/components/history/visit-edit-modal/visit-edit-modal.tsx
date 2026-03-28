import { useAuth } from "@/features/auth/hooks/useAuth";
import { submitVisitForm } from "@/features/visits/api/submit-visit-form";
import type { UpdateVisitBody } from "@/features/visits/types/visit-form.types";
import { useForm, useStore } from "@tanstack/react-form";
import { useQueryClient } from "@tanstack/react-query";
import { useEffect } from "react";
import { createPortal } from "react-dom";
import toast from "react-hot-toast";
import EditDateField from "./edit-date-field";
import EditDescriptionField from "./edit-description-field";
import EditFormButtons from "./edit-form-buttons";
import EditModalHeader from "./edit-modal-header";
import EditRatingField from "./edit-rating-field";
import type { EditVisitModalProps } from "./visit-edit-modal.types";
import { validateDateNotFuture } from "@/features/profile/utils/validate-date-not-future";

export default function EditVisitModal({
  visit,
  onCancel,
  onSuccess,
}: EditVisitModalProps) {
  const queryClient = useQueryClient();
  const { user } = useAuth();

  const form = useForm({
    defaultValues: {
      visitedAt: new Date(visit.visitedAt).toISOString().slice(0, 10),
      rating: visit.rating ?? 0,
      description: visit.description ?? "",
    },
    onSubmit: async ({ value }) => {
      try {
        const reqBody: UpdateVisitBody = {};

        // Handle rating changes
        const originalRating = visit.rating ?? 0;
        if (value.rating !== originalRating) {
          reqBody.rating = value.rating === 0 ? null : value.rating;
        }

        // Handle description changes
        const originalDescription = visit.description ?? "";
        const trimmedDescription = value.description.trim();
        if (trimmedDescription !== originalDescription) {
          reqBody.description =
            trimmedDescription === "" ? null : trimmedDescription;
        }

        // Handle visitedAt changes
        const originalVisitedAt = new Date(visit.visitedAt)
          .toISOString()
          .slice(0, 10);
        if (value.visitedAt !== originalVisitedAt) {
          reqBody.visitedAt = new Date(value.visitedAt).toISOString();
          reqBody.timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
        }

        if (Object.keys(reqBody).length === 0) {
          onCancel();
          return;
        }

        await submitVisitForm(
          "PATCH",
          `/api/visits/${visit.pizzeria.id}`,
          reqBody,
        );

        // Invalidate queries in parallel
        const invalidations = [
          queryClient.invalidateQueries({ queryKey: ["pizzerias"] }),
        ];
        if (user) {
          invalidations.push(
            queryClient.invalidateQueries({ queryKey: ["profile", user.id] }),
          );
        }
        await Promise.all(invalidations);

        onSuccess();
      } catch (error) {
        console.error("Failed to update visit:", error);
        toast.error("Something went wrong, please try again later", {
          position: "bottom-center",
        });
      }
    },
  });

  const isSubmitting = useStore(form.store, (state) => state.isSubmitting);

  useEffect(() => {
    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape" && !isSubmitting) {
        event.stopPropagation();
        onCancel();
      }
    }

    window.addEventListener("keydown", handleKeyDown, true);
    return () => {
      window.removeEventListener("keydown", handleKeyDown, true);
    };
  }, [onCancel, isSubmitting]);

  return createPortal(
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50"
      onClick={!isSubmitting ? onCancel : undefined}
    >
      <div
        className="mx-4 w-full max-w-md rounded-lg border border-transparent bg-white p-6 shadow-xl dark:border-zinc-700 dark:bg-zinc-900"
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-labelledby="edit-modal-title"
      >
        <EditModalHeader pizzeriaName={visit.pizzeria.name} />

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
              onSubmit: ({ value }) => validateDateNotFuture(value),
            }}
          >
            {(field) => (
              <EditDateField field={field} isDisabled={isSubmitting} />
            )}
          </form.Field>

          <form.Field name="rating">
            {(field) => (
              <EditRatingField field={field} isDisabled={isSubmitting} />
            )}
          </form.Field>

          <form.Field name="description">
            {(field) => (
              <EditDescriptionField field={field} isDisabled={isSubmitting} />
            )}
          </form.Field>

          <EditFormButtons form={form} onCancel={onCancel} />
        </form>
      </div>
    </div>,
    document.body,
  );
}
