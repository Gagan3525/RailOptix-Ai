import { Signal } from "../../../simulation/types/Signal";
import { Station } from "../../../simulation/types/Station";
import { Track } from "../../../simulation/types/Track";

interface Props {
  signal: Signal;
  stations: Station[];
  tracks: Track[];
}

const SignalMarker = ({
  signal,
  stations,
  tracks,
}: Props) => {

  const track = tracks.find(
    t => t.id === signal.trackId
  );

  if (!track) return null;

  const fromStation = stations.find(
    s => s.id === track.fromStationId
  );

  const toStation = stations.find(
    s => s.id === track.toStationId
  );

  if (!fromStation || !toStation)
    return null;

  const x =
    (fromStation.x + toStation.x) / 2;

  const y =
    (fromStation.y + toStation.y) / 2;

  const color =
    signal.aspect === "GREEN"
      ? "#22c55e"
      : signal.aspect === "YELLOW"
      ? "#facc15"
      : "#ef4444";

  return (
    <g>

      <circle
        cx={x}
        cy={y - 22}
        r={7}
        fill={color}
      />

      <rect
        x={x - 2}
        y={y - 15}
        width={4}
        height={18}
        fill="#94a3b8"
      />

    </g>
  );
};

export default SignalMarker;