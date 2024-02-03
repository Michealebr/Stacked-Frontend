import React from 'react'
import './Navbar.css'
import {Link, useLocation } from 'react-router-dom';


interface navItems {
  link: string;
  classname: string
  icon: string
  text: string
}

const Navbar: React.FC<{ Navitems: navItems[]}>  = ({Navitems}) => {

  const location = useLocation();

  return (
    <div className='header'>
      <div className='logo-container'>
        <img className="logo" src="https://lh3.googleusercontent.com/3bXLbllNTRoiTCBdkybd1YzqVWWDRrRwJNkVRZ3mcf7rlydWfR13qJlCSxJRO8kPe304nw1jQ_B0niDo56gPgoGx6x_ZOjtVOK6UGIr3kshpmTq46pvFObfJ2K0wzoqk36MWWSnh0y9PzgE7PVSRz6Y"/>
      </div>
      <div className='nav-container'>
      <ul className='navlist'>
        {Navitems.map((item, index) => (
          <Link to={item.link} key={index}>
          <li className={`nav-btn ${item.classname}`}>
            <img src={item.icon} alt={item.text} className={`nav-icon ${location.pathname === item.link ? 'active-page' : ''}`} />
            
           </li>
           </Link>
        ))}
      </ul>
      </div>
    </div>
  )
}

export default Navbar