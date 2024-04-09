import React from 'react'
import Login from '../Login'
import './About.css'
import about_rms from '../assets/about_rms.jpeg'
import our_story from '../assets/our_story.jpeg'
import services from '../assets/service.jpeg'

const About = () => {
  return (
    <>
      <div className='abt-container1'>
        <h1 className="title">About RMS: Revolutionizing Restaurant Management </h1>
        <div className='about'>
          <p>Welcome to RMS, your go-to solution for efficient restaurant management. Our mission is to streamline operations, enhance customer experiences, and empower restaurant owners and staff. Let's dive into what makes RMS unique: </p>
          <img src={about_rms} alt="about image" className='abt-image'/>
        </div>
      </div>
      <div className="abt-container2">
        <h1 className="title">Our Story </h1>
        <div className='about story'>
          <img src={our_story} alt="our story image" className='abt-image'/>
          <p>As a passionate food enthusiast and someone who frequents restaurants, I've encountered the challenges faced by both diners and restaurant owners. Long wait times, confusing menus, and inefficient processes inspired me to create RMS. I envisioned a dynamic system that adapts to any restaurant, making their operations smoother and more user-friendly. </p>
        </div>
      </div>
      <div className="abt-container3">
        <h1 className='title'>What We Offer </h1>
        <div className='services'>
          <div className='service-container'>
            <div className='service'>
              <h2>Seamles Ordering</h2>
              <p>Menu Ordering: With RMS, customers can explore the menu, customize their orders, and place them seamlessly. No more waiting for a server to take your order—just a few clicks, and your favorite dish is on its way! </p>
            </div>
            <div className='service'>
              <h2>Remote Table Reservation</h2>
              <p>Effortless Reservations: Whether it's a romantic dinner or a business lunch, users can reserve tables remotely through our platform. Say goodbye to phone calls and waiting lists. </p>
            </div>
            <div className='service'>
              <h2>Real-Time Menu Updates</h2>
              <p>Stay Informed: RMS keeps users informed about the restaurant's current menu offerings. Craving a specific dish? Check if it's available before you arrive. </p>
            </div>
            <div className='service'>
              <h2>User Analytics</h2>
              <p>Insights for Success: Restaurant owners and administrators can analyze user data to make informed decisions. Understand peak hours, popular dishes, and customer preferences.</p>
            </div>
          </div> 
          <img src={services} alt="services" className='abt-image service-img'/>
        </div>
      </div>
      <div className='contact-container'>
        <h1>Connect With Me</h1>
        <div className='contacts'>
          <a href="mailto:alhadjioum0@gmail.com">Email</a>
          <a href="https://www.linkedin.com/in/oumate" target="_blank">LinkedIn</a>
          <a href="https://twitter.com/AlhadjiOum0" target="_blank">Twitter</a>
          <a href="tel:+237696555220">Call Me</a>
          <a href="https:///github.com/ALH-hub" target='_blank'>Github</a>
        </div>
      </div>
    </>
  )
}

export default About
