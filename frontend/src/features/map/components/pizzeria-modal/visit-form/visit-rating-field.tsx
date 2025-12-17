import StarRatingInput from "@/features/map/components/pizzeria-modal/visit-form/star-rating-input";

type VisitRatingFieldProps = {
  field: {
    state: { value: number };
    handleChange: (value: number) => void;
  };
};

export default function VisitRatingField({ field }: VisitRatingFieldProps) {
  return (
    <div className="flex flex-col gap-2">
      <label className="text-sm font-medium text-gray-700">
        Rating (optional)
      </label>
      <StarRatingInput
        value={field.state.value}
        onChange={(rating) => field.handleChange(rating)}
      />
    </div>
  );
}
