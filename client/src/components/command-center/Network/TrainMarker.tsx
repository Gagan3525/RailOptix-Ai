import { motion } from "framer-motion";

import { Train } from "../../../simulation/types/Train";
import { Station } from "../../../simulation/types/Station";
import { Track } from "../../../simulation/types/Track";

interface Props {
  train: Train;
  stations: Station[];
  tracks: Track[];
}

const TrainMarker = ({
  train,
  stations,
  tracks,
}: Props) => {
  const track = tracks.find(
    t => t.id === train.currentTrackId
  );

  if (!track) return null;

  const fromStation = stations.find(
    s => s.id === track.fromStationId
  );

  const toStation = stations.find(
    s => s.id === track.toStationId
  );

  if (!fromStation || !toStation) return null;

  const x =
    fromStation.x +
    (toStation.x - fromStation.x) * train.position;

  const y =
    fromStation.y +
    (toStation.y - fromStation.y) * train.position;

  const color =
    train.status === "RUNNING"
      ? "#22C55E"
      : train.status === "WAITING_SIGNAL"
      ? "#EAB308"
      : train.status === "DELAYED"
      ? "#EF4444"
      : "#3B82F6";

  return (
    <motion.g
      animate={{
        translateX: x,
        translateY: y,
      }}
      transition={{
        duration: 0.1,
        ease: "linear",
      }}
    >
      <circle
        r={12}
        fill={color}
        stroke="white"
        strokeWidth={2}
      />

      <text
        textAnchor="middle"
        dy={5}
        fontSize={14}
      >
        🚆
      </text>

      <text
        y={-18}
        textAnchor="middle"
        fill="white"
        fontSize={10}
        fontWeight="bold"
      >
        {train.trainNumber}
      </text>

      <text
        y={28}
        textAnchor="middle"
        fill="#CBD5E1"
        fontSize={9}
      >
        {train.speed} km/h
      </text>
    </motion.g>
  );
};

export default TrainMarker;