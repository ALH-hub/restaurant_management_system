import { useState } from 'react'
import './App.css'
import Header from './Header'
import Login from './Login'
import {Routes, Route} from 'react-router-dom'
import Home from './pages/Home'
import Menu from './pages/Menu'
import About  from './pages/About'
import LoginForm from './component/LoginForm'
import SignUpForm from './component/SignUpForm'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div className='App'>
      <Header />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/menu' element={<Menu />} />
        <Route path='/about' element={<About />} />
        <Route path='/login' element={<LoginForm />} />
        <Route path='/sign-up' element={<SignUpForm />} />
      </Routes> 
    </div>
  )
}

export default App
