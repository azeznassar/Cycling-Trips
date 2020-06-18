import React from 'react';
import './SubmitForm.css';
import SubmittedTrip from '../SubmittedTrips/SubmittedTrip';

//import { CyclingTripTracker } from '../../main'

//let theCyclingTripTracker = new CyclingTripTracker()

class SubmitForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            nameInput: '',
            distanceInput: '',
            locationInput: '',
            elevationInput: '',
            newTrip: '',
            submitted: false
        };

        this.handleNameChange = this.handleNameChange.bind(this);
        this.handleDistanceChange = this.handleDistanceChange.bind(this);
        this.handleLocationChange = this.handleLocationChange.bind(this);
        this.handleElevationChange = this.handleElevationChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleNameChange(e) {
        this.setState({ nameInput: e.target.value });
    }

    handleDistanceChange(e) {
        let distance = e.target.value

        if (!Number(distance)) {
            alert("Please only input digits in the distance field")
            return
        }

        this.setState({ distanceInput: distance });
    }

    handleLocationChange(e) {
        this.setState({ locationInput: e.target.value });
    }

    handleElevationChange(e) {
        this.setState({ elevationInput: e.target.value });
    }


    handleSubmit(e) {
        e.preventDefault();
        //theCyclingTripTracker.addTrip(this.state.nameInput, parseInt(this.state.distanceInput, 10), this.state.locationInput, this.state.elevationInput)

        // let distance = parseInt(this.state.distanceInput, 10)

        // let telephone = e.target.value;

        // if (!Number(telephone)) {
        //     return;
        // }
        // if (typeof(distance) === Number) {
        //     alert("Input digits only! (In metres)",typeof(distance))
        this.props.app.addTrip(this.state.nameInput, parseInt(this.state.distanceInput, 10), this.state.locationInput, this.state.elevationInput)
        // } else {
        //     alert("Input digits only! (In metres)")
        // }
        //debugging
        //let trips = theCyclingTripTracker.allMyTrips
        let trips = this.props.app.allMyTrips
        console.log(trips[0])
        console.log(trips[1])

        this.setState({
            nameInput: '',
            distanceInput: '',
            locationInput: '',
            elevationInput: '',
            newTrip: trips,
            submitted: true
        });
    }


    render() {
        let trips;
        if (this.state.submitted) {

            trips = <SubmittedTrip app={this.props.app}/>
        } else {
            trips = "Submit a Trip Above"
        }

        return (
            <div>
            <div className="submitSection">

                <form className="inputForm">

                    <div className="inputSection">
                        <label htmlFor="name">Name</label>
                        <input className="submitBox" id="name" type="text" placeholder="e.g. My Cycling Trip" value={this.state.nameInput} onChange={this.handleNameChange} />
                    </div>

                    <div className="inputSection">
                        <label htmlFor="distance">Distance (Metres)</label>
                        <input className="submitBox" id="distance" type="text" placeholder="e.g. 3000" value={this.state.distanceInput} onChange={this.handleDistanceChange} />
                    </div>

                    <div className="inputSection">
                        <label htmlFor="location">Location</label>
                        <input className="submitBox" id="location" type="text" placeholder="e.g. 32 Ferry Road" value={this.state.locationInput} onChange={this.handleLocationChange} />
                    </div>

                    <div className="inputSection">
                        <label htmlFor="elevation">Elevation</label>
                        <input className="submitBox" id="elevation" type="text" placeholder="e.g. Downhill" value={this.state.elevationInput} onChange={this.handleElevationChange} />
                    </div>
                </form>
                <input type="submit" className="submitButton" onClick={this.handleSubmit} value="Submit New Trip" />
            </div>
                {trips}
            </div>
        );

    }
}



export default SubmitForm;