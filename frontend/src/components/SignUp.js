import React, {useEffect, useState} from 'react';
import  './SignUp.css';

function SignUp(props) {

    // store Sign Up state
    const [userData, setUserData] = useState({
        name:"",
        email:"",
        password:"",
        confirmPassword:""
    });

    // set HTTP status returned when Sign Up submitted. For error messaging
    const [status, setStatus] = useState(props.status);
    useEffect(()=>{
        setStatus(props.status);
    },[props.status]);

    // store state of passwordMatches
    const [passwordMatches, setPasswordMatches] = useState(true);
    const setUserName = e => {
        setUserData(previousState => {
            return{...previousState, 
                    name: e.target.value
                   }
        });
    }

    // set email state with user input
    const setEmail = e => {
        setUserData(previousState => {
            return{...previousState,
                    email: e.target.value
                }
        });
    }
    
    // set password state with user input
    const setPassword = e => {
        setUserData(previousState => {
            return{...previousState, 
                    password: e.target.value
                   }
        });
    }

    // set state of password matches to true if user input password matches user input confirm password
    const comparePassword = e => {
        setUserData(previousState => {
            return{...previousState, 
                    confirmPassword: e.target.value
                   }
        });
        setPasswordMatches(e.target.value === userData.password || e.target.value === "");
    }

    // reset status when input field focused
    const resetStatus = e => {
        setStatus("");
    }

    // submit user sign up form data to server
    const handleSubmit = (e) => {
        e.preventDefault();
        props.onSignUp(userData);
        setUserData(previousState => {
            return{...previousState, 
                    name: "",
                    email: "",
                    password: "",
                    confirmPassword:""
                };
        });
    } 

    // JSX data to build SignUp component
    return ( 

        <div className="signupForm">
            <form onSubmit={handleSubmit} action="" className="form">
            <h1 className="title">Sign up</h1>
            {status>=400 && <div className="error">
                <h5>{props.data.msg}</h5>
            </div>}
            <div className="inputContainer">
                <input type="text" onChange={setUserName} onFocus={resetStatus} className="input" value={userData.name} placeholder="a"/>
                <label className="label">Name</label>
            </div>

            <div className="inputContainer">
                <input type="text" onChange={setEmail}onFocus={resetStatus} className="input" value={userData.email} placeholder="a"/>
                <label className="label">Email</label>
            </div>


            <div className="inputContainer">
                <input type="password" onChange={setPassword} onFocus={resetStatus} className="input" value={userData.password} placeholder="a"/>
                <label className="label">Password</label>
            </div>

            {!passwordMatches && <div className="error">
                <h5>Passwords do not match!</h5>
            </div>}

            <div className="inputContainer">
                <input type="password" onChange={comparePassword} onFocus={resetStatus} className="input" value={userData.confirmPassword} placeholder="a"/>
                <label className="label">Confirm Password</label>
            </div>

            <input type="submit" className="submitBtn" disabled={!passwordMatches} value="Sign up"/>
            </form>
        </div>
     );
}

export default SignUp;