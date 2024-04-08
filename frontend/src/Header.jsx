import React from 'react'
import './Header.css'
import { NavLink } from 'react-router-dom'

const Header = () => {
  return (
      <nav id='navbar'>
        <p>RMS</p>
        <ul className='links'>
          <li><NavLink to='/'>Home</NavLink></li>
          <li><NavLink to='/menu'>Menu</NavLink></li>
          <li><NavLink to='/about'>About</NavLink></li>
        </ul>
      </nav>
  )
}

export default Header
