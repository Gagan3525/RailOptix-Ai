interface StatusBadgeProps {
  label: string;
  color: "green" | "yellow" | "red";
}

const colors = {
  green: "bg-green-400",
  yellow: "bg-yellow-400",
  red: "bg-red-500",
};

const StatusBadge = ({ label, color }: StatusBadgeProps) => {
  return (
    <div className="flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 backdrop-blur-md">
      <span
        className={`h-3 w-3 rounded-full animate-pulse ${colors[color]}`}
      />

      <span className="text-xs font-semibold tracking-widest text-gray-200 uppercase">
        {label}
      </span>
    </div>
  );
};

export default StatusBadge;