import React, { useState, useEffect } from 'react';
import './Login.css';
import { NavLink } from 'react-router-dom';

const Login = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const storedToken = localStorage.getItem('jwtToken');

    if (storedToken) {
      setIsLoggedIn(true);
    }

    // Add event listener for local storage changes
    window.addEventListener('storage', (event) => {
      if (event.key === 'jwtToken') {
        setIsLoggedIn(localStorage.getItem('jwtToken') !== null);
      }
    });
    //  window.reload();
    // Remove event listener on component unmount
    return () => {
      window.removeEventListener('storage', (event) => {
        if (event.key === 'jwtToken') {
          setIsLoggedIn(true); // This line might not be necessary here
        }
      });
    };
  }, []); // Empty dependency array to run effect only once (on component mount)

  const handleLogout = () => {
    localStorage.removeItem('jwtToken');
    setIsLoggedIn(false);
  };

  return (
    <div>
      {isLoggedIn ? (
        <div className='logout'>
          <button onClick={handleLogout}>Logout</button>
        </div>
      ) : (
        <div className="buttons">
          <NavLink to='/login'>
            <button>Login</button>
          </NavLink>

          <NavLink to='/sign-up'>
            <button>Sign Up</button>
          </NavLink>
        </div>
      )}
    </div>
  );
};

export default Login;
