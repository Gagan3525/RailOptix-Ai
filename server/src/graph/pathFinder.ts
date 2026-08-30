import railwayGraph from "./railwayGraph";

class PathFinder {

    findNextStation(currentStation: string): string | null {

        const neighbors =
            railwayGraph.getNeighbors(currentStation);

        if (neighbors.length === 0) {

            return null;

        }

        return neighbors[0].to;

    }

}

export default new PathFinder();