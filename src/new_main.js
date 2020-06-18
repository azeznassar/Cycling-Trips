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
    //Calculate distance to KMs and miles
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
        this.idCount = Value.One;
    }
    // Add Trip
    CyclingTripTracker.prototype.addTrip = function (newName, newDistance, newLocation, newElevation) {
        newName = newName.trim();
        newLocation = newLocation.trim();
        newElevation = newElevation.trim();
        if (!newName || !newDistance || !newLocation) {
            return;
        }
        if (newDistance <= Value.Zero || typeof newDistance != "number") {
            return;
        }
        var tripId = this.idCount;
        this.idCount += Value.One;
        var trip = new Trip(tripId, newName, newDistance, newLocation, newElevation);
        trip.calcDistance();
        this.allMyTrips.push(trip);
    };
    // Sorts
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
    //Local Storage
    CyclingTripTracker.prototype.saveTrips = function () {
        localStorage.setItem(localStorageKey, JSON.stringify(this.allMyTrips));
    };
    CyclingTripTracker.prototype.loadTrips = function () {
        return JSON.parse(localStorage.getItem(localStorageKey) || '[]');
    };
    //Delete Trip 
    CyclingTripTracker.prototype.removeTrip = function (targetTripId) {
        var tripIndex = this.allMyTrips.findIndex(function (task) { return task.id === targetTripId; });
        this.allMyTrips.splice(tripIndex, Value.One);
    };
    //Toggle Trip Status
    CyclingTripTracker.prototype.updateStatus = function (trip) {
        trip.completed = !trip.completed;
    };
    return CyclingTripTracker;
}());
