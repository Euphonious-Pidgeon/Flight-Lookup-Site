import React from "react";

/**
 * Flight data is contained in array as a component of the response object. This array is looped and Subresult is created for each flight within
 * a Result such that each Result displayed in ResultList contains all the associated connecting flights
 * @param {*} props flight data contained within Amadeus API component
 * @returns JSX to build SubResult component
 */
function SubResult(props) {

    // JSX for SubResult component
    return (  
        <>
        <div className="info four">
            <h5>From: {props.departCode}</h5>
        </div>
        <div className="info five">
            <h5>To: {props.arriveCode}</h5>
        </div>
        <div className="info date depart">
            <h5 >Depart on: {props.departDate}</h5>
        </div>
        <div className="info date arrive">
            <h5 >Arrive on: {props.arriveDate}</h5>
        </div>
        </>
    );
}

export default SubResult;