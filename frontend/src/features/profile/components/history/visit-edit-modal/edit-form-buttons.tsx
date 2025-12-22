type EditFormButtonsProps = {
  form: {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    Subscribe: any;
  };
  onCancel: () => void;
};

export default function EditFormButtons({ form, onCancel }: EditFormButtonsProps) {
  return (
    <div className="mt-6 flex w-full gap-3">
      <form.Subscribe
        selector={(state: {
          canSubmit: boolean;
          isSubmitting: boolean;
          isDefaultValue: boolean;
        }) => [state.canSubmit, state.isSubmitting, state.isDefaultValue]}
        children={([canSubmit, isSubmitting, isDefaultValue]: [
          boolean,
          boolean,
          boolean,
        ]) => (
          <button
            type="submit"
            disabled={!canSubmit || isSubmitting || isDefaultValue}
            className="inline-flex h-10 flex-1 items-center justify-center rounded-md bg-red-600 px-4 text-sm font-medium text-white shadow-sm transition-colors hover:bg-red-700 disabled:opacity-50"
          >
            {isSubmitting ? "Saving..." : "Save Changes"}
          </button>
        )}
      />

      <form.Subscribe
        selector={(state: { isSubmitting: boolean }) => [state.isSubmitting]}
        children={([isSubmitting]: [boolean]) => (
          <button
            type="button"
            onClick={onCancel}
            disabled={isSubmitting}
            className="inline-flex h-10 flex-1 items-center justify-center rounded-md border border-gray-300 bg-white px-4 text-sm font-medium text-gray-900 transition-colors hover:bg-gray-50 disabled:opacity-50"
          >
            Cancel
          </button>
        )}
      />
    </div>
  );
}
