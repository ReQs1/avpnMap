type StatCardProps = {
  value: number | string;
  label: string;
  bgColor: string;
  textColor: string;
};

function StatCard({ value, label, bgColor, textColor }: StatCardProps) {
  return (
    <div
      className={`flex flex-col items-center rounded-xl ${bgColor} px-4 py-3`}
    >
      <span className={`text-xl font-bold ${textColor}`}>{value}</span>
      <span className="text-xs text-gray-500">{label}</span>
    </div>
  );
}

export default StatCard;
