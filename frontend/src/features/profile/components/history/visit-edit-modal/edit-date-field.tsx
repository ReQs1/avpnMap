import { isFuture } from "date-fns";

type EditDateFieldProps = {
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
};

export default function EditDateField({ field }: EditDateFieldProps) {
  return (
    <div className="flex flex-col gap-2">
      <label htmlFor={field.name} className="text-sm font-medium text-gray-700">
        Visit Date
      </label>
      <input
        type="date"
        id={field.name}
        name={field.name}
        value={field.state.value}
        onBlur={field.handleBlur}
        onChange={(e) => field.handleChange(e.target.value)}
        max={new Date().toISOString().slice(0, 10)}
        className="rounded-md border border-gray-300 px-3 py-2 text-sm"
      />
      {field.state.meta.errors.length > 0 && field.state.meta.errors[0] && (
        <p className="text-xs text-red-600">{field.state.meta.errors[0]}</p>
      )}
    </div>
  );
}

export function validateDateNotFuture(value: string): string | undefined {
  if (isFuture(value)) {
    return "Future dates are not allowed";
  }
  return undefined;
}
