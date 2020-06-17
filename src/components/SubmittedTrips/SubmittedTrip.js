import React from 'react';
import './SubmittedTrip.css';

class SubmittedTrip extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            trips: this.props.app.allMyTrips
        };

    }


    render() {
        //TODO: change html elements, css for the trips
        //let aTripExists = this.props.app.allMyTrips[0]

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

                    {this.props.app.allMyTrips.map((trip) =>
                        <div className="trip" key={trip.id}>
                            <p> <b>Name:</b> {trip.name}</p>
                            <p><b>Distance (Metres):</b> {trip.distance}</p>
                            <p><b>Distance (KMs):</b> {trip.distanceKilometers}</p>
                            <p><b>Distance (Miles):</b> {trip.distanceMiles}</p>
                            <p><b>Location</b> {trip.location}</p>
                            <p><b>Elevation:</b> {trip.elevation}</p>
                                {trip.completed 
                                        ? <p><b>Status: </b>Completed</p>
                                        : <p><b>Status: </b>Active</p>
                                }
                        </div>
                    )}
            </div>
        );

    }
}



export default SubmittedTrip;