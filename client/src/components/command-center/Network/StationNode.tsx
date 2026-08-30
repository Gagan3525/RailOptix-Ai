interface StationNodeProps {
  x: number;
  y: number;
  name: string;
}

const StationNode = ({
  x,
  y,
  name,
}: StationNodeProps) => {
  return (
    <g>

      <circle
        cx={x}
        cy={y}
        r={16}
        fill="#0f172a"
        stroke="#22c55e"
        strokeWidth={3}
      />

      <circle
        cx={x}
        cy={y}
        r={8}
        fill="#22c55e"
      />

      <text
        x={x}
        y={y + 35}
        textAnchor="middle"
        fill="#f8fafc"
        fontWeight="bold"
        fontSize={13}
      >
        {name}
      </text>

    </g>
  );
};

export default StationNode;