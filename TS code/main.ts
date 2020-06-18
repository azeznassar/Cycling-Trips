// MAKE SURE I HAVE ALL THE TYPESCRIPT FEATURES I NEED FOR ASSIGNMENT 1

const localStorageKey: string = 'azezcyclingtripapp'
//const lettersRegexp = /^[A-Za-z]+$/;

interface iTrip {
    id: number
    name: string
    distance: number
    location: string
    elevation: string
}

enum Value {
    Zero = 0,
    One = 1,
}

enum Distance {
    Kilometers = 1000,
    Miles = 1.609,
}

class Trip implements iTrip {
    id: number
    name: string
    distance: number
    location: string
    elevation: string
    distanceKilometers: number
    distanceMiles: any
    completed: boolean

    constructor(newId: number, newName: string, newDistance: number, newLocation: string, newElevation: string) {
        this.id = newId
        this.name = newName
        this.distance = newDistance
        this.distanceKilometers = Value.Zero
        this.distanceMiles = Value.Zero
        this.location = newLocation
        this.elevation = newElevation
        this.completed = false
    }

    //Calculate distance to KMs and miles

    calcDistance(): void {
        const formulaKilometers: number = Distance.Kilometers
        const formulaMiles: number = Distance.Miles
        this.distanceKilometers = this.distance / formulaKilometers
        this.distanceMiles = this.distanceKilometers / formulaMiles
        this.distanceMiles = this.distanceMiles.toFixed(2)
    }
}

class CyclingTripTracker {
    protected allMyTrips: any
    protected idCount: number

    constructor() {
        this.allMyTrips = []
        this.idCount = Value.One
    }

    // Add Trip

    addTrip(newName: string, newDistance: number, newLocation: string, newElevation: string): void {
        newName = newName.trim()
        newLocation = newLocation.trim()
        newElevation = newElevation.trim()

        if (!newName || !newDistance || !newLocation) {
            return
        }

        if (newDistance <= Value.Zero || typeof newDistance != "number") {
            return 
        }

        const tripId: number = this.idCount
        this.idCount += Value.One
        const trip: Trip = new Trip(tripId, newName, newDistance, newLocation, newElevation)
        trip.calcDistance()
        this.allMyTrips.push(trip)
    }

    // Sorts

    getAllTrips(): Trip[] {
        return this.allMyTrips
    }

    getCompletedTrips(): Trip[] {
        let completedTrips: Trip[] = this.allMyTrips.filter(trip => trip.completed)
        return completedTrips
    }

    getActiveTrips(): Trip[] {
        let activeTrips: Trip[] = this.allMyTrips.filter(trip => !trip.completed)
        return activeTrips
    }
    

    //Local Storage

    saveTrips(): void {
        localStorage.setItem(localStorageKey, JSON.stringify(this.allMyTrips))
    }

    loadTrips(): JSON {
        return JSON.parse(localStorage.getItem(localStorageKey) || '[]')
    }

    //Delete Trip 

    removeTrip(targetTripId: number): void {
        const tripIndex: number = this.allMyTrips.findIndex(task => task.id === targetTripId)
        this.allMyTrips.splice(tripIndex, Value.One)
    }

    //Toggle Trip Status

    updateStatus(trip: Trip): void  {
        trip.completed = !trip.completed
    }

}
