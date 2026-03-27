import { cn } from "@/shared/utils/utils";

type VisitDescriptionFieldProps = {
  field: {
    name: string;
    state: { value: string };
    handleBlur: () => void;
    handleChange: (value: string) => void;
  };
  isDisabled: boolean;
};

export default function VisitDescriptionField({
  field,
  isDisabled,
}: VisitDescriptionFieldProps) {
  return (
    <div className="flex flex-col gap-2">
      <label
        htmlFor={field.name}
        className="text-sm font-medium text-gray-700 dark:text-zinc-100"
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
        disabled={isDisabled}
        placeholder="Share your thoughts about this pizzeria..."
        className="rounded-md border border-gray-300 px-3 py-2 text-sm dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-100 dark:placeholder:text-zinc-500"
      />
      <p
        className={cn("text-xs text-gray-500 dark:text-zinc-400", {
          ["text-red-500 dark:text-red-400"]: field.state.value.length >= 500,
        })}
      >
        {field.state.value.length}/500 characters
      </p>
    </div>
  );
}
