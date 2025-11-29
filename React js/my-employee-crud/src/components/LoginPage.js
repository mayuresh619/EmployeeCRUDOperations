import "./LoginPage.css"
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import * as serv from '../services/ApiService'

export default  function LoginPage(prop) {
    const navigate = useNavigate();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');


    const handleUsernameChange = (event) => {
        setUsername(event.target.value);
    };

    const handlePasswordChange = (event) => {
        setPassword(event.target.value);
    };

    const handleSubmit =async (event) => {
    event.preventDefault(); // Prevents the default browser form submission (page reload)

    const resp = await serv.fetchData('GetEmp',username,password)

    if(resp == 'Invalid user')
    {
        alert('Invalid user details')
    }
    else if (resp == 'Valid User')
    {
        navigate('/home',{ 
        state: { 
          loggedInUsername: username 
        } 
      }); 
    }
  };

  return (
    <div class="container">
    <h2>{prop.test}</h2>
    <form onSubmit={handleSubmit}>
        <input type="text" placeholder="Username" value={username} onChange={handleUsernameChange} required />
        <input type="password" placeholder="Password" value={password} onChange={handlePasswordChange} required />
        <button type="submit">Login</button>
    </form>
    <p class="register">Don't have an account? <a href="#">Register</a></p>
</div>
  );
}
