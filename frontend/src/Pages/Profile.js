import React,{useEffect,useState} from "react"; 
import axios from 'axios';
import './Profile.css';
import UserSave from '../components/UserSave';

function Profile({token, onDelete}) {

  // store database response
  const [message, setMessage] = useState([])
  const [username, setUsername] = useState("")
  const [email, setEmail] = useState("")



// connect to flask api on page load to retrieve profile data from database
useEffect(()=>{
  const config = {
    headers: {'Authorization': `Bearer ${token}`}
  };
  axios.get('http://localhost:5000/profile',config)
  .then(response =>{
    console.log("Response",response.data);

    // check if response includes any saved flights
    if('flightId' in response.data[0]){
      // call function to format flights for display
      let flightObj = buildFlightsObj(response.data);
      setMessage(flightObj);
    }

    // save username and email to display in profile
    setUsername(response.data[0].username);
    setEmail(response.data[0].email);

  }).catch(error => {
    console.error("Error: ", error);
  })
},[])





// builds a new object that is easier to display
const buildFlightsObj = (response) => {
  let prevFlightId= response[0].flightId;
  let currentFlightId = ""
  let flightArr = [];
  let messageArr = [];
  for(let i = 0; i<response.length; i++){
    currentFlightId = response[i].flightId;
    if(currentFlightId === prevFlightId) {
      flightArr.push(response[i]);
    }
    else{
      messageArr.push({flights: flightArr});
      flightArr = [];
      flightArr.push(response[i]);
    }
      prevFlightId = currentFlightId;
  }

  messageArr.push({flights: flightArr});
  return messageArr;
}

    return (

        <div className="container">
            <div className="main-body">    
                <div className="row gutters-sm">
                    <div className="col-md-4 mb-3">
                    <div className="card">
                <div className="card-body">
                  <div className="d-flex flex-column align-items-center text-center">
                    <img src="https://cdn.pixabay.com/photo/2016/08/08/09/17/avatar-1577909_960_720.png" alt="profile-pic" class="rounded-circle" width="150"/>
                    <div className="mt-3">
                     
                    </div>
                    <hr/>
                   
                    <hr/>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-md-8">
              <div className="card mb-3">
                <div className="card-body">
                  <div className="row">
                    <p/>
                    <div className="col-sm-3">
                      <h6 className="mb-0">Name </h6>
                    </div>
                    <div className="col-sm-9 text-secondary">
                    {username}
                    </div>
                  </div>
                  <hr/>
                  <div className="row">
                    <div className="col-sm-3">
                      <h6 className="mb-0">Email</h6>
                    </div>
                    <div className="col-sm-9 text-secondary">
                    {email}
                    </div>
                  </div>
                  <hr/>
                
                  <div className="row">
                    <div className="col-sm-12">
                    </div>
                  </div>
                </div>
              </div>
            </div>
              {message.map((item,index) => { 
                return (
                      <div className="card">
                      <UserSave key={index} flights={item.flights}/>
                      </div>
                )
                })
              }
              </div>

            </div>
        </div>

    );
    
    
}

export default Profile;


/*
                    hr/>
                    <button className="btn btn-outline-primary" onClick={deleteAccount}>Delete Account</button>
*/

/*
<a className="btn btn-info " target="__blank" href="">Edit</a>
*/