
import React from 'react';
import './NonStop.css';
/**
 * Builds a component used on the Search form to select for Non stop flights
 * @param {*} props 
 * @returns JSX to build NonStop component
 */
const NonStop= (props) => {

    // sends selection value to function on Search component
    const selectNonStopHandler = e => {
        props.onSelection(e.target.value);
    }

    // JSX used to build the NonStop component
    return (
    <div className='dropdown'>
        <select value={props.selected} onChange={selectNonStopHandler}>
            <option value = {"false"} selected>With Layovers</option>
            <option value = {"true"}>Non Stop</option>
        </select>
    </div>
    );
}

export default NonStop;
