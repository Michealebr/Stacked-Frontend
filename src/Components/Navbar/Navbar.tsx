import React from 'react'
import './Navbar.css'

const Navbar = ({Navitems}) => {
  return (
    <div className='header'>
      <div className='logo-container'>
        <img className="logo" src="https://lh3.googleusercontent.com/3bXLbllNTRoiTCBdkybd1YzqVWWDRrRwJNkVRZ3mcf7rlydWfR13qJlCSxJRO8kPe304nw1jQ_B0niDo56gPgoGx6x_ZOjtVOK6UGIr3kshpmTq46pvFObfJ2K0wzoqk36MWWSnh0y9PzgE7PVSRz6Y"/>
      </div>
      <div className='nav-container'>
      <ul className='navlist'>
        {Navitems.map((item, index) => (
           <li key={index} className={item.class}>
            <img src={item.icon} alt={item.text} className='nav-icon' />
           </li>
        ))}
      </ul>
      </div>
    </div>
  )
}

export default Navbar