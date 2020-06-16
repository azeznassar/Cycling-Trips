import React from 'react';
import {CyclingTripTracker,localStorageKey} from './main'
import Header from './components/Header/Header';


export default class App extends React.Component {

    render(){
        return (
            <div>
            
            <Header />


            
            Hello {this.props.name}!

            {localStorageKey}!!
          </div>
        );
    }
}