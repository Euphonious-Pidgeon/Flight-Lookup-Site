import React, {useState, useEffect} from 'react';
import  './SignIn.css';
/**
 *  Builds the SignIn component which allows the user to submit email and password to sign in to the app
 * @param {*} props HTTP status returned on Signin
 * @returns JSX to build SignIn component
 */

const SignIn = (props) => {

    // update the status state
    const [status, setStatus] = useState(props.status);
   
    useEffect(()=>{
        setStatus(props.status);
    },[props.status]);

    // update the userData state
    const [userData, setUserData] = useState({
        email:"",
        password:""
    });
 
    // clear the status when input field is focused
    const resetStatus = e => {
        setStatus("");
    }

    // set user input
    const setEmail = e => {
        setUserData(previousState => {
            return{...previousState,
                    email: e.target.value
                }
        });
    }
    
    // set user input
    const setPassword = e => {
        setUserData(previousState => {
            return{...previousState, 
                    password: e.target.value
                   }
        });
    }

    // submit user input to server
    const handleSubmit = (e) => {
        e.preventDefault();
        props.onSubmitUser(userData);
        setUserData(previousState => {
            return{...previousState, 
                    email: "",
                    password: ""
                   }
                });
    } 
    // JSX to build SignIn component
    return ( 

        <div className="signupFrm">
            
            <form onSubmit={handleSubmit} action="" className="form">
            <h1 className="title">Sign in</h1>
            {status>=400 && <div className="error">
                <h5>{props.data.msg}</h5>
            </div>}
            <div className="inputContainer">
                <input type="email" onChange={setEmail} onFocus={resetStatus} className="input" value={userData.email} placeholder="a"/>
                <label className="label">Email</label>
            </div>

            <div className="inputContainer">
                <input type="password" onChange={setPassword} onFocus={resetStatus} className="input" value={userData.password} placeholder="a"/>
                <label className="label">Password</label>
            </div>

            <input type="submit" className="submitBtn" value="Sign in"/>
            </form>
        </div>
     );
}

export default SignIn;