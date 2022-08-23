import React  from 'react';
import {Link} from "react-router-dom";
import { navMenuItems } from '../navMenuItems';
import './Navbar.css';

/**
 * Creates a Navbar component using an imported object navMenuItems to build each "Nav" link
 * @param {*} props userid passed in from App.js that is used to set the userid on the Navbar
 * @returns JSX for building the Navbar component
 */

function Navbar(props) {
    // filter Navbar link visibility based on if the user is signed in
    let filteredItems = filteredOnSignIn();

    // trigger the logout API call in app.js
    const logout = e => {
      props.onLogout();
    }


    /* Add Navbar with conditional render to add onClick attribute to logout <Link> */
    return ( 
      <div className='Navbar'>
        <ul>
            <img href="/" src="https://cdn.discordapp.com/attachments/976146657588691008/1004550369164144640/upandaway-logo.png" alt="" className="flight-nav-logo" width="180"/>
            {filteredItems.map((item, index) => {
              return (
                       (item.title === "Logout") ?
                       <li key={index}>
                       <Link to={item.path} onClick={logout}>{item.title}</Link>
                       </li> :
                       <li key={index}>
                       <Link to={item.path}>{item.title}</Link>
                       </li>
                     );
            })}
        </ul>
      </div>
    );

  /*
  * Returns a filtered array of links to be displayed on the Navbar
  */
  function filteredOnSignIn(){
    let filteredItems;
    if (props.data === "") {
      // show only Search SignUp and SignIn if user is not logged in
      filteredItems = navMenuItems.filter(item => {
        return item.title === "Search" || item.title === "SignUp" || item.title === "SignIn";
      });
    }
    else {
      // Show everything but SignUp and SignIn if the user is logged in
      filteredItems = navMenuItems.filter(item => {
        return item.title !== "SignUp" && item.title !== "SignIn";
      });
      // Set and display link with a title matching the user ID
      filteredItems.forEach(item => {
        if (item.title === "Username") {
          item.title = props.data.sub;
        }
      });
    }
    return filteredItems;
  }
}

export default Navbar;