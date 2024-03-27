import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { BrowserRouter } from 'react-router-dom'
import CloudinaryConfigProvider from './cloudinaryConfig';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <CloudinaryConfigProvider>
        <App />
      </CloudinaryConfigProvider>  
    </BrowserRouter>
  </React.StrictMode>,
)
