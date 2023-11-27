import { useState } from 'react'
import './App.css'
import Navbar from "./Components/Navbar/Navbar"
import MainDashboard from "./Components/Body/MainDashboard"
import Home from 'src/assets/Home.svg'
import Stock from 'src/assets/Stock.svg'
import Sales from 'src/assets/Sales.svg'
import Settings from 'src/assets/Settings.svg'

function App() {
 const navItems = [
  {text: 'Home', classname: 'nav-item', icon: Home},
  {text: 'Stock', classname: 'nav-item', icon: Stock},
  {text: 'Sales', classname: 'nav-item', icon: Sales},
  {text: 'Settings', classname: 'nav-item', icon: Settings},
 ]

  return (
    <>
     <Navbar Navitems = {navItems}/>
     <MainDashboard></MainDashboard>
    </>
  )
}

export default App
