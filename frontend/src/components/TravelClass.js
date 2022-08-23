import React from 'react';
import './TravelClass.css';

/**
 * Builds drop down component for a user to select a travel class on the search form
 * @param {*} props onSelection function from Search component
 * @returns 
 */
const TravelClass= (props) => {

    // passes the selected value to Search
    const selectClassHandler = e => {
        props.onSelection(e.target.value);
    }

    // JSX to build TravelClass componenet
    return (
    <div className='dropdown'>
        <select value={props.selected} onChange={selectClassHandler}>
            <option value = {"ECONOMY"} selected>ECONOMY</option>
            <option value = {"PREMIUM_ECONOMY"}>PREMIUM_ECONOMY</option>
            <option value = {"BUSINESS"}>BUSINESS</option>
            <option value = {"FIRST"}>FIRST</option>
        </select>
    </div>
    );
}

export default TravelClass;