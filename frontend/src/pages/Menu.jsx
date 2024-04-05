import React from 'react';
import './Menu.css';
import { useState, useEffect } from 'react';
import {Image} from 'cloudinary-react'
import Login from '../Login';
import { NavLink } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

const Menu = () => {

  const [data, setData] = useState([])
  const navigate = useNavigate()

  useEffect(() => {
    fetch('http://127.0.0.1:5000/menu', {
      'method': 'GET'
    })
    .then(resp => resp.json())
    .then(resp => setData(resp))
    .catch(error => console.log(error) )
  }, [])

  return (
    <>
    <Login />
    <div className='menu-box'>
          {
              data.map(menu => (
              <div key = {String(menu._id)} className="element">
                <div >
                <Image cloudName="dzsv3mhyd" publicId={menu.image_url} className="image" />
                <h2>{String(menu.name)}</h2>
                <p>{String(menu.description)}</p>
                <p>Price: {menu.price}$</p>
                {/* <NavLink to='/payment' > */}
                  <button className="purchase" onClick={() => navigate('/payment', { price: menu.price, menu: menu.name })}>
                    Order
                  </button>
                {/* </NavLink> */}
                </div>
              </div>
            ))
          }
          <div className="element">
            <div>
              <Image cloudName="dzsv3mhyd" publicId="menu images/yoqvt8gbw6lbuu8zjjtu" className="image"/>
              <h2>Hello there</h2>
              <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Maiores quas earum debitis accusamus cumque unde, dicta soluta ipsum dolore vero est molestias laboriosam et officiis suscipit libero blanditiis ea. Velit?</p>
              <button className="purchase">Order</button>
            </div>
          </div>
          <div className="element">
            <div>
              <Image cloudName="dzsv3mhyd" publicId="menu images/yoqvt8gbw6lbuu8zjjtu" className="image"/>
              <h2>Hello there</h2>
              <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Doloremque placeat repellendus, deleniti hic repellat error?</p>
              <button className="purchase">Order</button>
            </div>
          </div>
          <div className="element">
            <div>
              <Image cloudName="dzsv3mhyd" publicId="menu images/yoqvt8gbw6lbuu8zjjtu" className="image"/>
              <h2>Hello there</h2>
              <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Doloremque placeat repellendus, deleniti hic repellat error?</p>
              <button className="purchase">Order</button>
            </div>
          </div>
          <div className="element">
            <div>
              <Image cloudName="dzsv3mhyd" publicId="menu images/yoqvt8gbw6lbuu8zjjtu" className="image"/>
              <h2>Hello there</h2>
              <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Doloremque placeat repellendus, deleniti hic repellat error?</p>
              <button className="purchase">Order</button>
            </div>
          </div>
          <div className="element">
            <div>
              <Image cloudName="dzsv3mhyd" publicId="menu images/yoqvt8gbw6lbuu8zjjtu" className="image"/>
              <h2>Hello there</h2>
              <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Doloremque placeat repellendus, deleniti hic repellat error?</p>
              <button className="purchase">Order</button>
            </div>
          </div>
          <div className="element">
            <div>
              <Image cloudName="dzsv3mhyd" publicId="menu images/yoqvt8gbw6lbuu8zjjtu" className="image"/>
              <h2>Hello there</h2>
              <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Doloremque placeat repellendus, deleniti hic repellat error?</p>
              <button className="purchase">Order</button>
            </div>
          </div>
          <div className="element">
            <div>
              <Image cloudName="dzsv3mhyd" publicId="menu images/yoqvt8gbw6lbuu8zjjtu" className="image"/>
              <h2>Hello there</h2>
              <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Doloremque placeat repellendus, deleniti hic repellat error?</p>
              <button className="purchase">Order</button>
            </div>
          </div>
          <div className="element">
            <div>
              <Image cloudName="dzsv3mhyd" publicId="menu images/yoqvt8gbw6lbuu8zjjtu" className="image"/>
              <h2>Hello there</h2>
              <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Doloremque placeat repellendus, deleniti hic repellat error?</p>
              <button className="purchase">Order</button>
            </div>
          </div>
          <div className="element">
            <div>
              <Image cloudName="dzsv3mhyd" publicId="menu images/yoqvt8gbw6lbuu8zjjtu" className="image"/>
              <h2>Hello there</h2>
              <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Doloremque placeat repellendus, deleniti hic repellat error?</p>
              <button className="purchase">Order</button>
            </div>
          </div>
        </div>
    </>
        
  )
}

export default Menu
