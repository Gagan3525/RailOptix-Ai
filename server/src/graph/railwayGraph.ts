export interface GraphNode {
    stationId: string;
}

export interface GraphEdge {
    from: string;
    to: string;
    trackId: string;
    distance: number;
}

class RailwayGraph {

    private nodes = new Map<string, GraphNode>();
    private edges: GraphEdge[] = [];

    addStation(stationId: string): void {

        this.nodes.set(stationId, {
            stationId
        });

    }

    addTrack(
        from: string,
        to: string,
        trackId: string,
        distance: number
    ): void {

        this.edges.push({
            from,
            to,
            trackId,
            distance
        });

    }

    getNeighbors(stationId: string): GraphEdge[] {

        return this.edges.filter(edge =>
            edge.from === stationId
        );

    }

}

export default new RailwayGraph();