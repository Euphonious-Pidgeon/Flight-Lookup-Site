import React from 'react';
import './Result.css';
import SubResult from './SubResult';

/**
 * build Result component containing data from one API response array index
 * @param {*} props response object passed in from ResultList
 * @returns JSX to build Result component
 */
const Result = (props) => {
    
    // sends array index value of object to save to database
    const saveHandler = (e) => {
        props.onSaveSubmit(e.target.attributes[1].value);
    }

// JSX for building Result component
    return (
    <div className="result" >
        <div className="upper-grid">
            <div className="info airline title">
                <h1 >{props.flights[0].airline}</h1>
            </div>
            <div className="button">
                <input type="submit" onClick={e => saveHandler(e)} index={props.index} className="saveBtn" value="Save"/>
            </div>
        </div>
        <div className="info price">
            <h3 >Total Price: ${props.totalPrice}</h3>
        </div>
        <div className='info numstops'>
            <h5 >Number of stops: {props.flights.length - 1}</h5>
        </div>
        <div className="wrapper">
            {props.flights.map((flight,index) =>
                <SubResult 
                key={index}
                departCode={flight.departureAirport}
                arriveCode={flight.arrivalAirport}
                departDate={flight.departureTime}
                arriveDate={flight.arrivalTime}
                />
            )}
            
        </div>
    </div>
    );
}

export default Result;