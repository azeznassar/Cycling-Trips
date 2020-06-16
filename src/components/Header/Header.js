import React from 'react';
import './Header.css';
import SubmitForm from '../SubmitForm/SubmitForm';

const Header = () => {
    return (
        <div>
            <div className="appHeader">
                <h1 className="headerTitle">Cycling Trip Tracker</h1>
            </div>
            
            <SubmitForm />
        </div>
    );
};

export default Header;