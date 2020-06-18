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
    protected editedTrip: Trip
    protected beforeEditNameCache: string
    protected beforeEditDistanceCache: number
    protected beforeEditLocationCache: string
    protected beforeEditElevationCache: string
    protected idCount: number

    constructor() {
        this.allMyTrips = []
        this.editedTrip = null
        this.beforeEditNameCache = ''
        this.beforeEditDistanceCache = 0
        this.beforeEditLocationCache = ''
        this.beforeEditElevationCache = ''
        this.idCount = Value.One
    }

    addTrip(newName: string, newDistance: number, newLocation: string, newElevation: string): string {
        newName = newName.trim()
        newLocation = newLocation.trim()
        newElevation = newElevation.trim()

        if (!newName || !newDistance || !newLocation) {
            return "Please fill in all the fields"
        }

        if (newDistance <= Value.Zero || typeof newDistance != "number") {
            return "Please fill in a valid distance in meters, this must be a numerical value"
        }

        const tripId: number = this.idCount
        this.idCount += Value.One
        const trip: Trip = new Trip(tripId, newName, newDistance, newLocation, newElevation)
        trip.calcDistance()
        this.allMyTrips.push(trip)
    }

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

    saveTrips(): void {
        localStorage.setItem(localStorageKey, JSON.stringify(this.allMyTrips))
    }

    loadTrips(): JSON {
        return JSON.parse(localStorage.getItem(localStorageKey) || '[]')
    }

    calcActiveTrips(): number {
        return this.getActiveTrips().length
    }

    getAllCompleted(): boolean {
        return this.calcActiveTrips() === Value.Zero
    }

    setAllCompleted(): void {
        this.allMyTrips.forEach(trip => trip.completed = true)
    }

    removeTrip(targetTripId: number): void {
        const tripIndex: number = this.allMyTrips.findIndex(task => task.id === targetTripId)
        this.allMyTrips.splice(tripIndex, Value.One)
    }

    updateTrip(trip: Trip): void {
        this.beforeEditNameCache = trip.name
        this.beforeEditDistanceCache = trip.distance
        this.beforeEditLocationCache = trip.location
        this.beforeEditElevationCache = trip.elevation
        this.editedTrip = trip
    }

    updateStatus(trip: Trip): void  {
        trip.completed = !trip.completed
    }

    finalizeUpdate(trip: Trip): void {

        if (!trip) {
            return
        }

        this.editedTrip = null
        trip.name = trip.name.trim()
        trip.location = trip.location.trim()

        if (!trip.name || !trip.location || !trip.distance) {
            this.removeTrip(trip.id)
        }
    }

    cancelUpdate(trip: Trip): void {
        this.editedTrip = null
        trip.name = this.beforeEditNameCache
        trip.distance = this.beforeEditDistanceCache
        trip.location = this.beforeEditLocationCache
        trip.elevation = this.beforeEditElevationCache
    }

    removeCompleted(): void {
        this.allMyTrips = this.getActiveTrips()
    }
}
