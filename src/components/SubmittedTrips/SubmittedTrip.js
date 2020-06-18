import React from 'react';
import './SubmittedTrip.css';

class SubmittedTrip extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            trips: this.props.app.getAllTrips(),
            completed: false
        };
        this.handleUpdate = this.handleUpdate.bind(this);
        this.delete = this.delete.bind(this);
    }

    handleUpdate(trip){
        this.props.app.updateStatus(trip)
        this.setState({ completed: !this.state.completed });
    }

    delete(tripId){
        this.props.app.removeTrip(tripId)
        this.setState({ trips: this.props.app.getAllTrips() });
    }

    handleShowAll() {
        this.setState({ trips: this.props.app.getAllTrips() });
    }

    handleShowActive() {
        this.setState({ trips: this.props.app.getActiveTrips() });
    }

    handleShowCompleted() {
        this.setState({ trips: this.props.app.getCompletedTrips() });
    }

    render() {
        //TODO: change html elements, css for the trips
        return (
            <div>
             <div className="trips">

                    {this.state.trips.map((trip) =>
                        <div className="trip" key={trip.id}>

                            <div className="delete">
                                <div className="deleteButton"><a href="#" className="delete" onClick={() => this.delete(trip.id)}>&times;</a></div>
                            </div>

                            <p> <b>Name:</b> {trip.name}</p>
                            <p><b>Distance (Metres):</b> {trip.distance}</p>
                            <p><b>Distance (KMs):</b> {trip.distanceKilometers}</p>
                            <p><b>Distance (Miles):</b> {trip.distanceMiles}</p>
                            <p><b>Location</b> {trip.location}</p>
                            <p><b>Elevation:</b> {trip.elevation}</p>
                            <div id="status"> 
                                <p><b>Status:</b> {trip.completed ? "Completed" : "Active"}</p>
                                <input type="checkbox" onChange={() => this.handleUpdate(trip)} name="status" />
                            </div>
                        </div>
                    )}
            </div>

                <div className="sortTrips">
                    <button onClick={() => this.handleShowAll()}>Show All</button>
                    <button onClick={() => this.handleShowActive()}>Show Active</button>
                    <button onClick={() => this.handleShowCompleted()}>Show Completed</button>
                </div>
            </div>
        );

    }
}

export default SubmittedTrip;