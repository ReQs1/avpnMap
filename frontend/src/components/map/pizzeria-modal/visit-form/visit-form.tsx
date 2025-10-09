import StarRatingInput from "@/components/map/pizzeria-modal/visit-form/star-rating-input";
import type { Pizzeria } from "@/lib/api/query-options/pizza-query-options";
import { cn } from "@/lib/utils/utils";
import { handleVisitFormSubmit } from "@/lib/utils/visit-form-utils";
import { useForm } from "@tanstack/react-form";
import { useQueryClient } from "@tanstack/react-query";
import { Calendar } from "lucide-react";

export default function VisitForm({
  isEditing,
  pizzeria,
  visitedPizzeria,
  onCloseEdit,
}: {
  isEditing: boolean;
  pizzeria: Pizzeria;
  visitedPizzeria:
    | (Pizzeria & {
        rating: number | null;
        description: string | null;
        visitedAt: string | null;
        timeZone: string | null;
      } & {
        visitedAt: string;
        timeZone: string;
      })
    | null;
  onCloseEdit: () => void;
}) {
  const queryClient = useQueryClient();

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
        children={(field) => (
          <div className="flex flex-col gap-2">
            <label
              htmlFor={field.name}
              className="text-sm font-medium text-gray-700"
            >
              Visit Date
            </label>
            <input
              type="date"
              id={field.name}
              name={field.name}
              value={field.state.value}
              onBlur={field.handleBlur}
              onChange={(e) => field.handleChange(e.target.value)}
              className="rounded-md border border-gray-300 px-3 py-2 text-sm"
            />
          </div>
        )}
      />

      <form.Field
        name="rating"
        children={(field) => (
          <div className="flex flex-col gap-2">
            <label className="text-sm font-medium text-gray-700">
              Rating (optional)
            </label>
            <StarRatingInput
              value={field.state.value}
              onChange={(rating) => field.handleChange(rating)}
            />
          </div>
        )}
      />

      <form.Field
        name="description"
        children={(field) => (
          <div className="flex flex-col gap-2">
            <label
              htmlFor={field.name}
              className="text-sm font-medium text-gray-700"
            >
              Review (optional)
            </label>
            <textarea
              id={field.name}
              name={field.name}
              value={field.state.value}
              onBlur={field.handleBlur}
              onChange={(e) => field.handleChange(e.target.value)}
              rows={3}
              maxLength={500}
              placeholder="Share your thoughts about this pizzeria..."
              className="rounded-md border border-gray-300 px-3 py-2 text-sm"
            />
            <p
              className={cn("text-xs text-gray-500", {
                ["text-red-500"]: field.state.value.length >= 500,
              })}
            >
              {field.state.value.length}/500 characters
            </p>
          </div>
        )}
      />

      {isEditing ? (
        <div className="flex gap-3">
          <form.Subscribe
            selector={(state) => [state.canSubmit, state.isSubmitting]}
            children={([canSubmit, isSubmitting]) => (
              <button
                type="submit"
                disabled={!canSubmit || isSubmitting}
                className="inline-flex h-10 flex-1 items-center justify-center gap-2 rounded-md bg-red-600 px-4 py-2 text-sm font-medium text-white shadow-lg transition-colors hover:bg-red-700 disabled:opacity-50"
              >
                <span>{isSubmitting ? "Updating..." : "Update Visit"}</span>
              </button>
            )}
          />
          <form.Subscribe
            selector={(state) => [state.isSubmitting]}
            children={([isSubmitting]) => (
              <button
                type="button"
                onClick={onCloseEdit}
                disabled={isSubmitting}
                className="inline-flex h-10 flex-1 items-center justify-center gap-2 rounded-md border border-gray-400 bg-white px-4 py-2 text-sm font-medium text-gray-900 transition-colors hover:bg-gray-100 disabled:opacity-50"
              >
                <span>Cancel</span>
              </button>
            )}
          />
        </div>
      ) : (
        <form.Subscribe
          selector={(state) => [state.canSubmit, state.isSubmitting]}
          children={([canSubmit, isSubmitting]) => (
            <button
              className="inline-flex h-10 w-full items-center justify-center gap-2 rounded-md bg-red-600 px-4 py-2 text-sm font-medium text-white shadow-lg transition-colors hover:bg-red-700 disabled:opacity-50"
              type="submit"
              disabled={!canSubmit || isSubmitting}
            >
              {!isSubmitting && <Calendar size={20} />}
              <span>Mark as Visited</span>
            </button>
          )}
        />
      )}
    </form>
  );
}
