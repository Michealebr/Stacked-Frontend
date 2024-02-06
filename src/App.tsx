import { useState } from 'react'
import './App.css'
import Navbar from "./Components/Navbar/Navbar"
import MainDashboard from "./Components/Body/MainDashboard"
import StockPage from "./Components/Body/pages/Stock/Stock"
import SoldPage from "./Components/Body/pages/Sold/Sold"
import SettingsPage from "./Components/Body/pages/settings/Settings"


import Home from 'src/assets/Home.svg'
import Stock from 'src/assets/Stock.svg'
import Sales from 'src/assets/Sales.svg'
import Settings from 'src/assets/Settings.svg'
import { BrowserRouter as Router, Routes, Route,} from 'react-router-dom';
import { CurrencyProvider } from './CurrencyContext'



function App() {

  
 const navItems = [
  {text: 'Home', classname: 'nav-item', icon: Home , link: '/MainDashboard'},
  {text: 'Stock', classname: 'nav-item', icon: Stock, link: '/Stock'},
  {text: 'Sales', classname: 'nav-item', icon: Sales, link: '/Sold'},
  {text: 'Settings', classname: 'nav-item', icon: Settings, link: '/Settings'},
 ]

  return (
   <CurrencyProvider>
    <Router>
       {/* <> */}
     <Navbar Navitems = {navItems}/>
     {/* <MainDashboard></MainDashboard> */}
     <Routes>
     <Route path="/MainDashboard" element={<MainDashboard/>} />
     <Route path="/Stock" element={<StockPage/>} />
     <Route path="/Sold" element={<SoldPage/>} />
     <Route path="/Settings" element={<SettingsPage/>} />
     </Routes>

     {/* <MainDashboard></MainDashboard> */}
     {/* </> */}
     </Router>
     </CurrencyProvider>
  )
}

export default App
