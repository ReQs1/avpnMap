import StarRatingInput from "@/features/map/components/pizzeria-modal/visit-form/star-rating-input";

type EditRatingFieldProps = {
  field: {
    state: {
      value: number;
    };
    handleChange: (value: number) => void;
  };
  isDisabled?: boolean;
};

export default function EditRatingField({
  field,
  isDisabled,
}: EditRatingFieldProps) {
  return (
    <div className="flex flex-col gap-2">
      <label className="text-sm font-medium text-gray-700 dark:text-zinc-100">
        Rating (optional)
      </label>
      <StarRatingInput
        value={field.state.value}
        onChange={(rating) => field.handleChange(rating)}
        disabled={isDisabled}
      />
    </div>
  );
}
