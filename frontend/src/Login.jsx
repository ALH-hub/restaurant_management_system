
import React, { useState } from 'react';
import './Login.css';
import email_icon from './assets/email_icon.svg';
import password_icon from './assets/password_icon.svg';
import user_icon from './assets/user_icon.svg';
import { useNavigate } from "react-router-dom";
import { NavLink } from 'react-router-dom';

const Login = () => {
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [heading, setHeading] = useState('');
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const navigate = useNavigate()

  const handleLoginButtonClick = () => {
    setIsLoginModalOpen(true);
  };

  const handleModalClose = () => {
    setIsLoginModalOpen(false);
  };

  // Implement form submission logic here (e.g., send to server)
  const handleSubmit = (event) => {
    event.preventDefault();
    fetch("http://127.0.0.1:5000/customers", {
      'method': "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name, email, password }),
    })
    .then((r) => {
      if (r.ok) {
        navigate('/menu')
        r.json()
      }
    })
    .catch(error => (
      console.error(error)
    ))
  };

  //Implementing loging logic
  const handleLoginSubmit = (event) => {
    event.preventDefault();
    fetch("http://127.0.0.1:5000/login", {
      'method': 'POST',
      headers: {
        "Content-Type": 'application/json',
      },
      'body': JSON.stringify({name, email, password})
    })
    .then((r) => {
      if (r.status == 200) {
        navigate('/menu')
        r.json()
      }
    })
    .catch (error => {
      console.error(error)
    })
  };

  const LoginForm = (props) => (
    <div className='login-signUp'>
      <form onSubmit={
        props.heading === 'Sign Up' ? handleSubmit : handleLoginSubmit
      }>
        <div className="container">
          <div className="header">
            <div className="text">{props.heading}</div>
            <div className="underline"></div>
          </div>
          <div className="inputs">
            <div className="input">
              <img src={user_icon} alt="user icon" />
              <input type="text" placeholder="Username" value={name} onChange={(e) => setName(e.target.value)} />
            </div>
            <div className="input">
              <img src={email_icon} alt="email icon" />
              <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)}/>
            </div>
            <div className="input">
              <img src={password_icon} alt="password icon" />
              <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)}/>
            </div>
          </div>
          <div className="submit-container">
            <button className='submit' type="submit">{props.heading}</button>
            <button className="close-button" onClick={handleModalClose}>
              Close
            </button>
          </div>
        </div>
      </form>
    </div>
  );

  return (
    <div>
      <div className="buttons">

        <NavLink to='/login'>
          <button>Login</button>
        </NavLink>

        <NavLink to='/sign-up'>
          <button>Sign Up</button>
        </NavLink>
      </div>
    </div>
  );
};

export default Login;