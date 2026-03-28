type StatCardProps = {
  value: number | string;
  label: string;
  bgColor: string;
  textColor: string;
};

function StatCard({ value, label, bgColor, textColor }: StatCardProps) {
  return (
    <div
      className={`flex flex-col items-center rounded-xl ${bgColor} px-4 py-3 dark:bg-zinc-800`}
    >
      <span className={`text-xl font-bold ${textColor} dark:text-zinc-100`}>
        {value}
      </span>
      <span className="text-xs text-gray-500 dark:text-zinc-500">{label}</span>
    </div>
  );
}

export default StatCard;
