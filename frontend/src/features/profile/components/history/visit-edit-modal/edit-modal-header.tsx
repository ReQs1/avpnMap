import { Pencil } from "lucide-react";

type EditModalHeaderProps = {
  pizzeriaName: string;
};

export default function EditModalHeader({
  pizzeriaName,
}: EditModalHeaderProps) {
  return (
    <div className="mb-4 flex items-center gap-3">
      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gray-100 dark:bg-zinc-800">
        <Pencil
          size={20}
          className="text-gray-600 dark:text-zinc-400"
          aria-hidden="true"
        />
      </div>
      <div>
        <h2
          id="edit-modal-title"
          className="text-lg font-semibold text-gray-900 dark:text-zinc-100"
        >
          Edit Visit
        </h2>
        <p className="text-sm text-gray-600 dark:text-zinc-400">
          {pizzeriaName}
        </p>
      </div>
    </div>
  );
}
