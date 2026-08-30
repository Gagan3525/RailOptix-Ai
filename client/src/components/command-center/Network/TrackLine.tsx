interface Props {
  x1: number;
  y1: number;
  x2: number;
  y2: number;
}

const TrackLine = ({
  x1,
  y1,
  x2,
  y2,
}: Props) => {
  const sleeperCount = 12;

  return (
    <g>
      {/* Track Bed */}
      <line
        x1={x1}
        y1={y1}
        x2={x2}
        y2={y2}
        stroke="#334155"
        strokeWidth={8}
        strokeLinecap="round"
      />

      {/* Left Rail */}
      <line
        x1={x1}
        y1={y1 - 3}
        x2={x2}
        y2={y2 - 3}
        stroke="#CBD5E1"
        strokeWidth={2}
      />

      {/* Right Rail */}
      <line
        x1={x1}
        y1={y1 + 3}
        x2={x2}
        y2={y2 + 3}
        stroke="#CBD5E1"
        strokeWidth={2}
      />

      {/* Sleepers */}
      {Array.from({ length: sleeperCount }).map((_, index) => {
        const t = index / (sleeperCount - 1);

        const x = x1 + (x2 - x1) * t;
        const y = y1 + (y2 - y1) * t;

        return (
          <line
            key={index}
            x1={x}
            y1={y - 7}
            x2={x}
            y2={y + 7}
            stroke="#7C5A2A"
            strokeWidth={2}
          />
        );
      })}
    </g>
  );
};

export default TrackLine;