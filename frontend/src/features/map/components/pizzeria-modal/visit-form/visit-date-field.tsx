type VisitDateFieldProps = {
  field: {
    name: string;
    state: {
      value: string;
      meta: {
        errors: (string | undefined)[];
      };
    };
    handleBlur: () => void;
    handleChange: (value: string) => void;
  };
  isDisabled: boolean;
};

export default function VisitDateField({
  field,
  isDisabled,
}: VisitDateFieldProps) {
  return (
    <div className="flex flex-col gap-2">
      <label
        htmlFor={field.name}
        className="text-sm font-medium text-gray-700 dark:text-zinc-100"
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
        disabled={isDisabled}
        className="rounded-md border border-gray-300 px-3 py-2 text-sm dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-100 dark:[color-scheme:dark]"
      />
      {field.state.meta.errors.length > 0 && field.state.meta.errors[0] && (
        <p className="text-xs text-red-600 dark:text-red-400">
          {field.state.meta.errors[0]}
        </p>
      )}
    </div>
  );
}
