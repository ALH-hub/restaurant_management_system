import React, { useState } from 'react'
import './Payment.css'
import {NavLink} from 'react-router-dom'
import { useNavigate } from 'react-router-dom'

const Payment = (props) => {
    const [email, setEmail] = useState('')
    const navigate = useNavigate()

    const handleEmailChange = (event) => {
        setEmail(event.target.value);
    }
    
    //Implementing loging logic
    const handleSubmit = (event) => {
        event.preventDefault();
        fetch("http://127.0.0.1:5000/pay", {
          'method': "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            'email': email,
            'menu': props.menu,
            'price': props.price,
          }),
        })
        .then((r) => {
          if (r.ok) {
            console.log(props.menu, props.price)
            navigate('/menu')
            r.json()
          }
        })
        .catch(error => {
            console.log(props.menu, props.price)
            // console.error(error)
        })
    };

  return (
    <div className="pay-page">
      <div className="payment-form">
        <h1 className='title'>Payment Form</h1>
        <form className='pay-form' onSubmit={handleSubmit}>
            <label htmlFor="card-number" className='pay-label'>
                <p>Card Number:</p>
                <input className='pay-input' type="text" id="card-number" placeholder="1234 5678 9012 3456" required/>
            </label>
            <label htmlFor="email" className='pay-label'>
                <p>Email:</p>
                <input className='pay-input' type="email" id="email" placeholder="Enter your Email" onChange={handleEmailChange} required/>
            </label>
            <label htmlFor="cardholder-name" className='pay-label'>
                <p>Name:</p>
                <input className='pay-input' type="text" id="name" placeholder="Enter your name" required/>
            </label>
            
           <div className="pay-buttons">
                <button className='pay-submit' type="submit">Pay</button>
                <NavLink to='/menu'>
                    <button className='pay-submit'>Cancel</button>
                </NavLink>
           </div>
        </form>
    </div>
    </div>
  )
}

export default Payment
