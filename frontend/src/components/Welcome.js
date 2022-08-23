import './Welcome.css'
import React from "react";

/**
 * Displays a welcome message on user sign in. Also displays other status messages
 * @param {*} props message data sent by server as a response to user input
 * @returns JSX
 */
function Welcome(props) {
    // JSX to build Welcome component
    return (  
        <div className="welcome">
            <h1>{props.data.msg}</h1>
        </div>
    );
}

export default Welcome;