import React from 'react';
import './Numberofadults.css';
/**
 * Builds a component to select for a number adults taking a flight. Used on the Search component
 * @param {*} props 
 * @returns 
 */
const NumberOfAdults = (props) => {

    // Send the selection value to the Search component
    const selectHandler = e => {
        props.onSelection(e.target.value);
    }

    // JSX used to build the NumberOfAdults component
    return (
    <div className='dropdown'>
        <select value={props.selected} onChange={selectHandler}>
            <option value = {"1"} selected>1 Adult</option>
            <option value = {"2"}>2 Adults</option>
            <option value = {"3"}>3 Adults</option>
            <option value = {"4"}>4 Adults</option>
            <option value = {"5"}>5 Adults</option>
        </select>
    </div>
    );
}

export default NumberOfAdults;

