import { parse } from "twemoji-parser";

type RankBadgeProps = {
  icon: string;
  name: string;
  color: string;
};

function RankBadge({ icon, name, color }: RankBadgeProps) {
  const entities = parse(icon);
  const rankIcon = entities[0];

  return (
    <p
      className="mt-1 inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-sm font-medium dark:bg-zinc-800"
      style={{
        borderColor: color,
        color: color,
        backgroundColor: `${color}1A`,
      }}
    >
      <img src={rankIcon.url} alt={rankIcon.text} className="h-5 w-5" />
      {name}
    </p>
  );
}

export default RankBadge;
