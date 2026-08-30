import { Station } from "../../../simulation/types/Station";

export function interpolatePosition(
  from: Station,
  to: Station,
  progress: number
) {

  return {

    x:
      from.x +
      (to.x - from.x) *
      progress,

    y:
      from.y +
      (to.y - from.y) *
      progress,

  };

}