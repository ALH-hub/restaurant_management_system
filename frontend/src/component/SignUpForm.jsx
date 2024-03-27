import React, { useState } from 'react'
import user_icon from '../assets/user_icon.svg'
import email_icon from '../assets/email_icon.svg'
import password_icon from '../assets/password_icon.svg'
import address_icon from '../assets/address_icon.svg'
import './SignUpForm.css'
import { NavLink } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'

const SignUpForm = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('')
    const [address, setAddress] = useState('')
    const navigate = useNavigate()

    const handleEmailChange = (event) => {
        setEmail(event.target.value);
    }

    const handleNameChange = (event) => {
        setName(event.target.value);
    }

    const handlePasswordChange = (event) => {
        setPassword(event.target.value);
    }

    const handleAddressChange = (event) => {
      setAddress(event.target.value);
    }

    //Implementing loging logic
    const handleSubmit = (event) => {
      event.preventDefault();
      fetch("http://127.0.0.1:5000/customers", {
        'method': "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, email, address, password }),
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


  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div className="container-su">
          <div className="header-su">
            <div className="text-su">Sign Up</div>
            <div className="underline-su"></div>
          </div>
          <label className='input-element-su'>
            <img src={user_icon} alt="user_icon" />
            <input type="text" placeholder='name' onChange={handleNameChange} required />
          </label>
          <label className="input-element-su">
            <img src={email_icon} alt="email_icon" />
            <input type="email" placeholder='email' onChange={handleEmailChange} required />
          </label>
          <label className="input-element-su">
            <img src={address_icon} alt="address_icon" />
            <input type="text" placeholder='address' onChange={handleAddressChange} required />
          </label>
          <label className="input-element-su">
            <img src={password_icon} alt="password_icon" />
            <input type="password" placeholder='password' onChange={handlePasswordChange} required />
          </label>
          <div className='buttons-su'>
          <button type="submit" className='button-su'>Sign Up</button>
            <NavLink to='/'>
                <button className='button-su'>Close</button>
            </NavLink>
          </div>
            
        </div>
      </form>
    </div>
  )
}

export default SignUpForm
