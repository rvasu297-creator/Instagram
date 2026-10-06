import React, { useState } from 'react'
import { FaFacebook } from "react-icons/fa";
import { FaMeta } from "react-icons/fa6";
import '../Login/Login.css'
import { useNavigate } from 'react-router-dom';
import { signInWithEmailAndPassword } from "firebase/auth";  
import { auth } from '../../Firebase';                         

const LoginForm = () => {
  const  navigate=useNavigate();
  const [username , SetUsername]=useState("")
  const [password , SetPassword]=useState("")
  const handlelogin=async()=>{                                
    if(username !=="" && password !==""){
      try{                                                    
        await signInWithEmailAndPassword(auth, username, password) 
        navigate('/homePage')
      }catch(err){                                          
        alert("invalid")                                      
      }
    }
    else{
      alert("invalid")
    }
  }
   

  return (
   <>
   <div className='form'>
   <h5>Log into Instagram</h5>
   <input type="text" placeholder= 'Mobile number,username or email address' className='name'
   value={username} onChange={(e)=>SetUsername(e.target.value)}
   />
   <input type="text" placeholder= 'Password' className='pass'
   value={password} onChange={(e)=>SetPassword(e.target.value)}/>
   <button className='btn' onClick={handlelogin}>Log in</button>
   <button className='word'>Forgot Password?</button>
  <button className='face'><FaFacebook color='#1A8FFB'/> Log in with Facebook</button>
  <button className='account' onClick={()=>navigate('/signup')}>Create new account</button>  {/* ADDED onClick */}
  <h5 className='meta'><FaMeta /> Meta</h5>
  </div>
   </>
 )
}

export default LoginForm