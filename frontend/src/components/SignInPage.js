import React, {useState} from 'react';
import Login from './login';
import Signup from './signup';

const SingIn = () =>{
    const[viewSignUp, setSignUp]= useState(false);

    const toggleForm = () =>{
        setSignUp(!viewSignUp);
    }

    return (
        <div className='SignInContainer'>
           {viewSignUp ? <Signup /> : <Login />}
           <h3>
            {viewSignUp ?
                <> Already have an account? <button onClick={toggleForm}>Log In</button></>
                : <> Don't have an accoutn? <button onClick={toggleForm}>Sign Up</button> </>
            } 
           </h3>
        </div>
    );
}

export default SingIn;