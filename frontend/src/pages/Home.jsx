import React from 'react'
import Login from '../Login'
import './Home.css'
import R1 from '../assets/R1.jpg'
import R3 from '../assets/R3.png'
import R5 from '../assets/R5.jpeg'

const Home = () => {
  return (
    <>
    <div className='home'>
    <Login />
      <div className='content'>
        <p className='welcome'>DELICIOUS DINING EXPERIENCE</p>
        <p className='welcome-message'>Welcome to RMS, our restaurant where we serve the most delicious and nutritious food in town. We take pride in our fantastic vibes and affordable prices, making it the perfect place for diners of all ages. Visit us today or book your table online!
        </p>
      </div>  
    </div>
    <div className='display'>
       <h1>Step Inside [Restaurant Name]:</h1>
       <div className="restaurant-images">
       <p>
        Embark on a visual journey through our restaurant. From our inviting and comfortable [seating type (e.g., booths, chairs)] to the [adjective describing lighting (e.g., warm, modern)] lighting, every detail is designed to create a memorable dining experience.
       </p>
        <label htmlFor="images" className='Rimage'>
          <img src={R1} alt="" />
          <p>Room 1 overview</p>
        </label>
        <label htmlFor="images" className='Rimage'>
          <img src={R3} alt="" />
          <p>Room 2 overview</p>
        </label>
       </div>
       <div className='menu-info-box'>
        <h1>Menu</h1>
        <div className="menu-info">
          <p>
            Embark on a culinary adventure with our menu, featuring a variety of dishes made with passion using fresh, seasonal ingredients. Whether you're craving a hearty steak, a light and flavorful salad, or a creative vegetarian option, we have something to satisfy every palate.
          </p>
          <label htmlFor="images" className='Rimage'>
            <img src={R5} alt="" />
          </label>
          <p>
          Our signature dishes include the [Signature Dish 1 Name], a succulent [Description], and the [Signature Dish 2 Name], a delightful combination of [Flavors and Ingredients]. We also offer a selection of appetizers, sides, and desserts to complete your meal.
          </p>
        </div>
       </div>
    </div>
    <div className="testimonials">
      <h1>Testimonials</h1>
      <div className="quotes">
      <code>
        "The food at [Restaurant Name] is absolutely incredible! The ingredients were fresh and flavorful, and the presentation was beautiful. We also enjoyed the lively atmosphere and attentive service." – Sarah L.
      </code>
      <code>
        "I had a wonderful dining experience at [Restaurant Name]. The menu had a great variety of options, and the staff was friendly and accommodating. I can't wait to come back and try more dishes!" – Alex M.
      </code>
      <code>
        "From the moment we walked in, we were impressed by the ambiance and decor of [Restaurant Name]. The food was delicious, and the service was top-notch. It's the perfect spot for a special occasion or a casual meal with friends." – Emily R.
      </code>
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

export default Home
