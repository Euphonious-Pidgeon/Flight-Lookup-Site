import React from 'react';
import SubResult from './SubResult.js'

/**
 * Display flights a user has saved on the user's Profile page. Delete functionality to be implemented in the future.
 * @param {*} props user saved flights
 * @returns JSX to build UserSave component
 */
const UserSave = (props) => {

    // JSX to buld UserSave component
    return (
    
    <div className="result">
        <div className="upper-grid">
            <div className="info airline title">
                {props.flights === undefined ?
                 <h1>{""}</h1> :
                 <h1 >{props.flights[0].airlineName}</h1>
                }
            </div>
            <div className="button">
                <input type="submit" index={props.index} className="saveBtn" value="Delete"/>
            </div>
        </div>
        <div className="info price">
            <h3 >Total Price: ${props.flights[0].price}</h3>
        </div>
        <div className='info numstops'>
            <h5 >Number of stops: {props.flights.length - 1}</h5>
        </div>
        <div className="wrapper">
            {props.flights.map((flight) => {
          return (
                <SubResult 
                departCode={flight.departureAirport}
                arriveCode={flight.arrivalAirport}
                departDate={flight.departureDateTime}
                arriveDate={flight.arrivalDateTime}
                />
                )
            })
        }
            
            
        </div>
    </div>
    );
}

export default UserSave;