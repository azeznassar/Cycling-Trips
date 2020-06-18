import React from 'react';
import {CyclingTripTracker,localStorageKey} from './new_main'
import Header from './components/Header/Header';
import SubmitForm from './components/SubmitForm/SubmitForm';

export default class App extends React.Component {
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
          </div>
        );
    }
}