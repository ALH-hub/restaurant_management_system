import './App.css'
import Header from './Header'
import Login from './Login'
import {Routes, Route} from 'react-router-dom'
import Home from './pages/Home'
import Menu from './pages/Menu'
import About  from './pages/About'
import LoginForm from './component/LoginForm'
import SignUpForm from './component/SignUpForm'
import Payment from './component/Payment'
import { useEffect, useState } from 'react'

function App() {


  return (
    <div className='App'>
      <Header />
      <Login />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/menu' element={<Menu />} />
        <Route path='/about' element={<About />} />
        <Route path='/login' element={<LoginForm />} />
        <Route path='/sign-up' element={<SignUpForm />} />
        <Route path='/payment' element={<Payment />} />
      </Routes> 
    </div>
  )
}

export default App
