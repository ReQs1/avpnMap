import { Calendar } from "lucide-react";

type VisitFormButtonsProps = {
  form: {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    Subscribe: any;
  };
  isEditing: boolean;
  onCloseEdit: () => void;
};

export default function VisitFormButtons({
  form,
  isEditing,
  onCloseEdit,
}: VisitFormButtonsProps) {
  if (isEditing) {
    return (
      <div className="flex gap-3">
        <form.Subscribe
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          selector={(state: any) => [state.canSubmit, state.isSubmitting]}
          children={([canSubmit, isSubmitting]: [boolean, boolean]) => (
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
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          selector={(state: any) => [state.isSubmitting]}
          children={([isSubmitting]: [boolean]) => (
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
    );
  }

  return (
    <form.Subscribe
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      selector={(state: any) => [state.canSubmit, state.isSubmitting]}
      children={([canSubmit, isSubmitting]: [boolean, boolean]) => (
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
  );
}
