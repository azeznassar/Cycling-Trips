import React from 'react';
import './SubmittedTrip.css';

class SubmittedTrip extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            trips: this.props.app.allMyTrips,
            completed: false
        };
        this.handleUpdate = this.handleUpdate.bind(this);
    }

    handleUpdate(trip){
        this.props.app.updateStatus(trip)
        this.setState({ completed: !this.state.completed });
    }

    render() {
        //TODO: change html elements, css for the trips
        //let aTripExists = this.props.app.allMyTrips[0]

        // let status
        // if (this.state.completed) {
        //     status = "Completed"
        // } else {
        //   status = "Active"
        // }
    

        return (

             <div className="trips">
            {/* //    {this.props.app.allMyTrips.map((trip) =>    
                    <h1 key={trip.id}>{trip.name}</h1>
               )} */}
                   
                    {/* {aTripExists &&
                        <div className="trip">
                            <h2>Name: {this.props.app.allMyTrips[0].name}</h2>
                            <h2>Distance (Metres): {this.props.app.allMyTrips[0].distance}</h2>
                            <h2>Distance (KMs): {this.props.app.allMyTrips[0].distanceKilometers}</h2>
                            <h2>Distance (Miles): {this.props.app.allMyTrips[0].distanceMiles}</h2>
                            <h2>Location {this.props.app.allMyTrips[0].location}</h2>
                            <h2>Elevation: {this.props.app.allMyTrips[0].elevation}</h2>
                            <h2> 
                                {this.props.app.allMyTrips[0].completed 
                                        ? "Status: Completed"
                                        : "Status: Active"
                                }
                            </h2>
                        </div>
                    } */}

                    {this.state.trips.map((trip) =>
                        <div className="trip" key={trip.id}>
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
        );

    }
}



export default SubmittedTrip;