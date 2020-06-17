import React from 'react';
import './SubmitForm.css';
import { CyclingTripTracker } from '../../main'

//let theCyclingTripTracker = new CyclingTripTracker()

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
        this.setState({ nameInput: e.target.value });
    }

    handleDistanceChange(e) {
        this.setState({ distanceInput: e.target.value });
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
        this.props.app.addTrip(this.state.nameInput, parseInt(this.state.distanceInput, 10), this.state.locationInput, this.state.elevationInput)

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
            newTrip: trips
        });
    }


    render() {

        return (
            <div className="submitSection">

                <form className="inputForm">

                    <div className="inputSection">
                        <label htmlFor="name">Name</label>
                        <input className="submitBox" id="name" type="text" placeholder="e.g. My First Cycling Trip" value={this.state.nameInput} onChange={this.handleNameChange} />
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

                {this.state.nameInput}
                {this.state.distanceInput}
                {this.state.locationInput}
                {this.state.elevationInput}
            </div>
        );

    }
}



export default InputForm;