import { useRailwaySimulation } from "../../../hooks/useRailwaySimulation";

import TrackLine from "./TrackLine";
import StationNode from "./StationNode";
import TrainMarker from "./TrainMarker";
import SignalMarker from "./SignalMarker";

const RailwayCanvas = () => {

  const simulation = useRailwaySimulation();

  return (

    <svg
      viewBox="0 0 900 450"
      className="h-full w-full"
    >

      {/* Background */}

      <rect
        width="900"
        height="450"
        fill="#0B1220"
      />

      {/* Grid */}

      {Array.from({ length: 18 }).map((_, i) => (

        <line
          key={i}
          x1={i * 50}
          y1={0}
          x2={i * 50}
          y2={450}
          stroke="#1e293b"
          strokeWidth="0.5"
        />

      ))}

      {Array.from({ length: 9 }).map((_, i) => (

        <line
          key={i}
          x1={0}
          y1={i * 50}
          x2={900}
          y2={i * 50}
          stroke="#1e293b"
          strokeWidth="0.5"
        />

      ))}

      {/* Tracks */}

      {simulation.tracks.map(track => {

        const fromStation = simulation.stations.find(
          station => station.id === track.fromStationId
        );

        const toStation = simulation.stations.find(
          station => station.id === track.toStationId
        );

        if (!fromStation || !toStation) return null;

        return (
          <TrackLine
            key={track.id}
            x1={fromStation.x}
            y1={fromStation.y}
            x2={toStation.x}
            y2={toStation.y}
          />
        );

      })}

      {/* Stations */}

      {simulation.stations.map(station => (

        <StationNode
          key={station.id}
          x={station.x}
          y={station.y}
          name={station.name}
        />

      ))}

      {/* Signals */}

      {simulation.signals.map(signal => (

        <SignalMarker
          key={signal.id}
          signal={signal}
          stations={simulation.stations}
          tracks={simulation.tracks}
        />

      ))}

      {/* Trains */}

      {simulation.trains.map(train => (

        <TrainMarker
          key={train.id}
          train={train}
          stations={simulation.stations}
          tracks={simulation.tracks}
        />

      ))}

    </svg>

  );

};

export default RailwayCanvas;