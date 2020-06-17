import React from 'react';
import {CyclingTripTracker,localStorageKey} from './main'
import Header from './components/Header/Header';
import SubmitForm from './components/SubmitForm/SubmitForm';


export default class App extends React.Component {


    //let theCyclingTripTracker = new CyclingTripTracker()
    constructor(props) {
        super(props);
        this.state = {
            trackerInstance: new CyclingTripTracker()
        }
    }

    render(){
        return (
            <div>
            
            <Header />
            <SubmitForm app={this.state.trackerInstance}/>

            
            Hello {this.props.name}!

            {localStorageKey}!!
          </div>
        );
    }
}