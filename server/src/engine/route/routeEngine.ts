import railwayState from "../../services/railwayState";

export interface RouteReservation {

    trainNumber: string;

    trackId: string;

    reservedAt: Date;

}

class RouteEngine {

    private reservations = new Map<string, RouteReservation>();

    reserveTrack(
        trainNumber: string,
        trackId: string
    ): boolean {

        if (this.reservations.has(trackId)) {

            return false;

        }

        this.reservations.set(trackId, {

            trainNumber,

            trackId,

            reservedAt: new Date()

        });

        return true;

    }

    releaseTrack(trackId: string): void {

        this.reservations.delete(trackId);

    }

    isReserved(trackId: string): boolean {

        return this.reservations.has(trackId);

    }

    getReservations(): RouteReservation[] {

        return [...this.reservations.values()];

    }

}

export default new RouteEngine();