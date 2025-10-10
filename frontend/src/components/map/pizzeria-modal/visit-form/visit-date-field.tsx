type VisitDateFieldProps = {
  field: {
    name: string;
    state: { value: string };
    handleBlur: () => void;
    handleChange: (value: string) => void;
  };
};

export default function VisitDateField({ field }: VisitDateFieldProps) {
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
        className="rounded-md border border-gray-300 px-3 py-2 text-sm"
      />
    </div>
  );
}
