import './App.css';
import React, {useState, useEffect} from 'react';
import Search from './components/Search';
import ResultList from './components/ResultList';
import Profile from './Pages/Profile';
import ErrorPage from './Pages/ErrorPage';
import SignIn from './components/SignIn';
import SignUp from './components/SignUp';
import Navbar from './components/Navbar';
import axios from 'axios';
import Welcome from './components/Welcome';

import {
  Route,
  Routes,
  useNavigate
} from "react-router-dom";



function App() {

  // hook to navigate to different page views
  let navigate = useNavigate();

  // set API response
  const [getMessage, setGetMessage] = useState([]);
  const [getStatus, setGetStatus] = useState("");
  const [getToken, setGetToken] = useState("");
  const [tripData, setTripData] = useState({});


  // set state variable to token in local storage if one exists
  useEffect(()=>{
    if(localStorage.getItem('token')){
      setGetToken(localStorage.getItem('token'));
    }else{
      setGetToken("");
    }
  });

 // get flight data from Amadeus
  const searchHandler = (params) => {
    axios.get('http://localhost:5000/flask/search',params)
    .then(response =>{
      setGetMessage(response.data);
      setGetStatus(response.status);
      setTripData(params);
      // navigate to results page on successful response
      navigate("/searchResults");
    }).catch(error =>{
      console.error("Error: ", error);
      setGetMessage(error.response.data);
      navigate("/welcome");
    })
   
  }

  // sign in user and set local storage to JWT
  const signInHandler = (params) => {
    axios.post('http://localhost:5000/token', params)
    .then(response => {
      localStorage.setItem("token",response.data.access_token);
      setGetToken(response.data.access_token);
      setGetStatus(response.status);
      // return to previous page after signing in
      navigate("/");
    }).catch(error => {
      console.log("Error: ", error)
      setGetMessage(error.response.data);
      setGetStatus(error.response.status);
    })
  }

  // Submit user sign up data to server 
  const signUpHandler = (params) => {
    console.log(params)
    axios.post('http://localhost:5000/flask/register', params)
    .then(response => {
      setGetMessage(response.data);
      setGetStatus(response.status);
  
      navigate('/welcome');
    }).catch(error => {
      console.error("Error: ", error);
      setGetMessage(error.response.data);
      setGetStatus(error.response.status);
    })
  }

  // logout user and unset JWT from localstorage  
  const logoutHandler = () => {
    const config = {
      headers: {'Authorization': `Bearer ${getToken}`}
    };
    axios.get('http://localhost:5000/logout',config)
    .then(response =>{
      console.log(response);
      localStorage.clear();
      setGetToken("");
    }).catch(error => {
      console.error("Error: ", error);
    })
  }
  
  // get email from JWT to use in Navbar HTML
  function extractEmailFromToken() {
    let userEmail;
    if (getToken !== "") {
      userEmail = getToken.split(".");
      userEmail = JSON.parse(atob(userEmail[1]));
    }
    else {
      userEmail = "";
    }
    return userEmail;
  }
  let userEmail = extractEmailFromToken();

  // save flight to database for use in profile display

  const saveFlightHandler = (params) => {
    const config = {
      headers: {'Authorization': `Bearer ${getToken}`}
    };
    axios.post('http://localhost:5000/saveflight', params, config)
    .then(response => {
      navigate('/welcome');
      setGetMessage(response.data);
      setGetStatus(response.status);
    }).catch(error => {
      console.error("Error: ", error);
      //setGetMessage(error.response.data);
      //setGetStatus(error.response.status);
    })
  }



  return (
      <>
      <Navbar data={userEmail} onLogout={logoutHandler}/>      
      <Routes>
        <Route path="/" element={<Search onSearch={searchHandler}/>}/>
        <Route path="/searchResults" element={<ResultList data={getMessage} 
                                     tripData={tripData} onSaveFlight={saveFlightHandler}/>}/> 
        <Route path="/sign-in" element={<SignIn data={getMessage} status={getStatus} onSubmitUser={signInHandler}/>} />
        <Route path="/register" element={<SignUp data={getMessage} status={getStatus} onSignUp={signUpHandler}/>} />
        <Route path="/profile" element={<Profile  token={getToken}/>} />
        <Route path="/welcome" element={<Welcome data={getMessage}/>} />
        <Route path="*" element={<ErrorPage/>} />
      </Routes >
      </>
  );
  


}

export default App;

