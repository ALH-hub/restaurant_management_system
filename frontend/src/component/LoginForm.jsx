import React, { useState, useEffect } from 'react';
import user_icon from '../assets/user_icon.svg';
import email_icon from '../assets/email_icon.svg';
import password_icon from '../assets/password_icon.svg';
import address_icon from '../assets/address_icon.svg';
import './LoginForm.css';
import { NavLink } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

const LoginForm = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [address, setAddress] = useState('');
  const navigate = useNavigate();

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handleNameChange = (event) => {
    setName(event.target.value);
  };

  const handleAddressChange = (event) => {
    setAddress(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  // Implement login logic with JWT generation
  const handleLoginSubmit = async (event) => {
    event.preventDefault();

    await fetch("https://rmsb.onrender.com/login", {
      'method': 'POST',
      headers: {
                "Content-Type": 'application/json',
              },
      'body': JSON.stringify({name, email, address, password})
    })
    .then((r) => {
      if (r.status == 200) {
        localStorage.setItem('jwtToken', r.token);
        navigate('/menu');
      } else {
        console.error('Login failed:', r.message);
      }
    })
    .catch (error => {
      console.error('Login error:', error);
    })
};

  return (
    <div id='login-page'>
      <form onSubmit={handleLoginSubmit}>
        <div className="container-login">
          <div className="header-login">
            <div className="text-login">Login</div>
            <div className="underline-login"></div>
          </div>
          <label className='input-element-login'>
            <img src={user_icon} alt="user_icon" />
            <input type="text" placeholder='name' onChange={handleNameChange} required />
          </label>
          <label className="input-element-login">
            <img src={email_icon} alt="email_icon" />
            <input type="email" placeholder='email' onChange={handleEmailChange} required />
          </label>
          <label className="input-element-su">
            <img src={address_icon} alt="address_icon" />
            <input type="text" placeholder='address' onChange={handleAddressChange} required />
          </label>
          <label className="input-element-login">
            <img src={password_icon} alt="password_icon" />
            <input type="password" placeholder='password' onChange={handlePasswordChange} required />
          </label>
          <div className='log-buttons'>
          <button type="submit" className='log-button'>Login</button>
            <NavLink to='/'>
                <button className='log-button'>Close</button>
            </NavLink>
          </div>
            
        </div>
      </form>
    </div>
  )
}

export default LoginForm
