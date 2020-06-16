// MAKE SURE I HAVE ALL THE TYPESCRIPT FEATURES I NEED FOR ASSIGNMENT 1
export var localStorageKey = 'azezcyclingtripapp';
var Value;
(function (Value) {
    Value[Value["Zero"] = 0] = "Zero";
    Value[Value["One"] = 1] = "One";
})(Value || (Value = {}));
var Distance;
(function (Distance) {
    Distance[Distance["Kilometers"] = 1000] = "Kilometers";
    Distance[Distance["Miles"] = 1.609] = "Miles";
})(Distance || (Distance = {}));
export var Trip = /** @class */ (function () {
    function Trip(newId, newName, newDistance, newLocation, newElevation) {
        this.id = newId;
        this.name = newName;
        this.distance = newDistance;
        this.distanceKilometers = Value.Zero;
        this.distanceMiles = Value.Zero;
        this.location = newLocation;
        this.elevation = newElevation;
        this.completed = false;
    }
    Trip.prototype.calcDistance = function () {
        var formulaKilometers = Distance.Kilometers;
        var formulaMiles = Distance.Miles;
        this.distanceKilometers = this.distance / formulaKilometers;
        this.distanceMiles = this.distanceKilometers / formulaMiles;
        this.distanceMiles = this.distanceMiles.toFixed(2);
    };
    return Trip;
}());
export var CyclingTripTracker = /** @class */ (function () {
    function CyclingTripTracker() {
        this.allMyTrips = [];
        this.editedTrip = null;
        this.beforeEditNameCache = '';
        this.beforeEditDistanceCache = 0;
        this.beforeEditLocationCache = '';
        this.beforeEditElevationCache = '';
        this.idCount = Value.One;
    }
    CyclingTripTracker.prototype.addTrip = function (newName, newDistance, newLocation, newElevation) {
        newName = newName.trim();
        newLocation = newLocation.trim();
        newElevation = newElevation.trim();
        if (!newName || !newDistance || !newLocation) {
            return "Please fill in all the fields";
        }
        if (newDistance <= Value.Zero || typeof newDistance != "number") {
            return "Please fill in a valid distance in meters, this must be a numerical value";
        }
        var tripId = this.idCount;
        this.idCount += Value.One;
        var trip = new Trip(tripId, newName, newDistance, newLocation, newElevation);
        trip.calcDistance();
        this.allMyTrips.push(trip);
    };
    CyclingTripTracker.prototype.getAllTrips = function () {
        return this.allMyTrips;
    };
    CyclingTripTracker.prototype.getCompletedTrips = function () {
        var completedTrips = this.allMyTrips.filter(function (trip) { return trip.completed; });
        return completedTrips;
    };
    CyclingTripTracker.prototype.getActiveTrips = function () {
        var activeTrips = this.allMyTrips.filter(function (trip) { return !trip.completed; });
        return activeTrips;
    };
    CyclingTripTracker.prototype.saveTrips = function () {
        localStorage.setItem(localStorageKey, JSON.stringify(this.allMyTrips));
    };
    CyclingTripTracker.prototype.loadTrips = function () {
        return JSON.parse(localStorage.getItem(localStorageKey) || '[]');
    };
    CyclingTripTracker.prototype.calcActiveTrips = function () {
        return this.getActiveTrips().length;
    };
    CyclingTripTracker.prototype.getAllCompleted = function () {
        return this.calcActiveTrips() === Value.Zero;
    };
    CyclingTripTracker.prototype.setAllCompleted = function () {
        this.allMyTrips.forEach(function (trip) { return trip.completed = true; });
    };
    CyclingTripTracker.prototype.removeTrip = function (targetTripId) {
        var tripIndex = this.allMyTrips.findIndex(function (task) { return task.id === targetTripId; });
        this.allMyTrips.splice(tripIndex, Value.One);
    };
    CyclingTripTracker.prototype.updateTrip = function (trip) {
        this.beforeEditNameCache = trip.name;
        this.beforeEditDistanceCache = trip.distance;
        this.beforeEditLocationCache = trip.location;
        this.beforeEditElevationCache = trip.elevation;
        this.editedTrip = trip;
    };
    CyclingTripTracker.prototype.finalizeUpdate = function (trip) {
        if (!trip) {
            return;
        }
        this.editedTrip = null;
        trip.name = trip.name.trim();
        trip.location = trip.location.trim();
        if (!trip.name || !trip.location || !trip.distance) {
            this.removeTrip(trip.id);
        }
    };
    CyclingTripTracker.prototype.cancelUpdate = function (trip) {
        this.editedTrip = null;
        trip.name = this.beforeEditNameCache;
        trip.distance = this.beforeEditDistanceCache;
        trip.location = this.beforeEditLocationCache;
        trip.elevation = this.beforeEditElevationCache;
    };
    CyclingTripTracker.prototype.removeCompleted = function () {
        this.allMyTrips = this.getActiveTrips();
    };
    return CyclingTripTracker;
}());
