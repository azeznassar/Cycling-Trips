import React from 'react';
import './SubmitForm.css';
import { CyclingTripTracker } from '../../main'

let theCyclingTripTracker = new CyclingTripTracker()

class InputForm extends React.Component {
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
        this.setState({nameInput: e.target.value});
    }

    handleDistanceChange(e) {
        this.setState({distanceInput: e.target.value});
    }

    handleLocationChange(e) {
        this.setState({locationInput: e.target.value});
    }

    handleElevationChange(e) {
        this.setState({elevationInput: e.target.value});
    }


    handleSubmit(e) {
        e.preventDefault();
        theCyclingTripTracker.addTrip(this.state.nameInput, parseInt(this.state.distanceInput, 10), this.state.locationInput, this.state.elevationInput)

        let trips = theCyclingTripTracker.allMyTrips
        console.log(trips[0])
        console.log(trips[1])

        this.setState({
            nameInput: '',
            distanceInput: '',
            locationInput: '',
            elevationInput: '',
            newTrip: trips
        });
    }


    render() {

        return (
            <div>

                <form className="inputForm">
                    <label htmlFor="name">Name</label>
                    <input className="submitBox" id="name" type="text" value={this.state.nameInput} onChange={this.handleNameChange} />
                    <label htmlFor="distance">Distance</label>
                    <input className="submitBox" id="distance" type="text" value={this.state.distanceInput} onChange={this.handleDistanceChange} />
                    <label htmlFor="location">Location</label>
                    <input className="submitBox" id="location" type="text" value={this.state.locationInput} onChange={this.handleLocationChange} />
                    <label htmlFor="elevation">Elevation</label>
                    <input className="submitBox" id="elevation" type="text" value={this.state.elevationInput} onChange={this.handleElevationChange} />
                    <input type="submit" className="submitButton" onClick={this.handleSubmit} value="Submit Trip" />
                </form>

                {this.state.nameInput}
                {this.state.distanceInput}
                {this.state.locationInput}
                {this.state.elevationInput}
            </div>
        );
        
    }
}

export default InputForm;