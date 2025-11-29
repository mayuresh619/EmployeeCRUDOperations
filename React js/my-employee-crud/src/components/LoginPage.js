import "./LoginPage.css"
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import * as serv from '../services/ApiService'

const generateCaptcha = () => {
    // Generates a random 6-character alphanumeric string
    return Math.random().toString(36).substring(2, 8).toUpperCase();
};

export default  function LoginPage(prop) {
    const navigate = useNavigate();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const [isModalOpen, setIsModalOpen] = useState(false);

    //Registration Form

    const [regUsername, setRegUsername] = useState('');
    const [regEmail, setRegEmail] = useState('');
    const [regPassword, setRegPassword] = useState('');
    const [regConfirmPassword, setRegConfirmPassword] = useState('');
    const [captcha, setCaptcha] = useState(generateCaptcha()); // The CAPTCHA code to display
    const [captchaInput, setCaptchaInput] = useState('');  

    const handleUsernameChange = (event) => {
        setUsername(event.target.value);
    };

    const handlePasswordChange = (event) => {
        setPassword(event.target.value);
    };

    const handleSubmit =async (event) => {
      event.preventDefault(); // Prevents the default browser form submission (page reload)

      const resp = await serv.fetchData(username,password)

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

  // --- Registration Handlers ---
    const handleRegisterSubmit = async (event) => {
        event.preventDefault();

        if (regPassword !== regConfirmPassword) {
            alert("Passwords do not match!");
            setCaptcha(generateCaptcha());
            setCaptchaInput('');
            return;
        }

        if (captchaInput.toUpperCase() !== captcha) {
            alert("CAPTCHA validation failed!");
            setCaptcha(generateCaptcha());
            setCaptchaInput('');
            return;
        }
                
        const registrationSuccess = await serv.registerUser(regUsername, regEmail, regPassword);
        if (registrationSuccess == 'Registered') {
            alert(`Registration successful for ${regUsername}!`);
            setIsModalOpen(false); 
        } else {
            alert("Registration failed. Please try again.");
            setCaptcha(generateCaptcha()); // Re-generate CAPTCHA
            setCaptchaInput('');
        }
        
        // Clear registration form states
        setRegUsername('');
        setRegEmail('');
        setRegPassword('');
        setRegConfirmPassword('');
        setCaptchaInput('');
        setCaptcha(generateCaptcha()); // Prepare a new CAPTCHA for next time

    };
    
    const openModal = (e) => {
        e.preventDefault(); // Prevent default link navigation
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };

  return (
 <div className="login-page"> {/* Use className instead of class in React */}
            
            {/* --- Login Form Container --- */}
            <div className="container">
                <h2>{prop.test}</h2>
                <form onSubmit={handleSubmit}>
                    <input type="text" placeholder="Username" value={username} onChange={handleUsernameChange} required />
                    <input type="password" placeholder="Password" value={password} onChange={handlePasswordChange} required />
                    <button type="submit">Login</button>
                </form>
                <p className="register">
                    Don't have an account? <a href="#" onClick={openModal}>Register</a>
                </p>
            </div>


            {/* --- Registration Modal --- */}
            {isModalOpen && (
                <div className="modal-backdrop" onClick={closeModal}>
                    <div className="modal-content" onClick={e => e.stopPropagation()}> {/* Stop propagation to prevent closing when clicking inside the modal */}
                        <h3>Register New Account</h3>
                        <form onSubmit={handleRegisterSubmit}>
                            <input
                                type="text"
                                placeholder="Username"
                                value={regUsername}
                                onChange={(e) => setRegUsername(e.target.value)}
                                required
                            />
                            <input
                                type="email"
                                placeholder="Email"
                                value={regEmail}
                                onChange={(e) => setRegEmail(e.target.value)}
                                required
                            />
                            <input
                                type="password"
                                placeholder="Password"
                                value={regPassword}
                                onChange={(e) => setRegPassword(e.target.value)}
                                required
                            />
                            <input
                                type="password"
                                placeholder="Confirm Password"
                                value={regConfirmPassword}
                                onChange={(e) => setRegConfirmPassword(e.target.value)}
                                required
                            />

                            {/* CAPTCHA Section */}
                            <div className="captcha-container">
                                <div className="captcha-display">{captcha}</div>
                                <input
                                    type="text"
                                    placeholder="Enter CAPTCHA"
                                    value={captchaInput}
                                    onChange={(e) => setCaptchaInput(e.target.value)}
                                    maxLength="6"
                                    required
                                />
                                <button type="button" onClick={() => setCaptcha(generateCaptcha())}>
                                    &#x21BB; {/* Refresh icon */}
                                </button>
                            </div>
                            
                            <button type="submit">Register</button>
                            <button type="button" onClick={closeModal}>Cancel</button>
                        </form>
                    </div>
                </div>
            )}
        </div>
  );
}
