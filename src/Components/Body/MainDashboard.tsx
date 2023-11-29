import { useState } from 'react';
import "./MainDashboard.css"
import Calander from "src/assets/Calander.svg"
import Stock from "src/assets/Stock.svg"
import DropdownButton from './DropdownButton';


const mainDashboard = () => {
 
  const timeIntervals = [
    { value: 'This month', label: 'This Month' },
    { value: '3months', label: '3 Months' },
    { value: '6months', label: '6 Months' },
    { value: 'This yearl', label: 'This Year' },
  ];
  const products = [
    { value: 'All Products', label: 'All Products' },
    { value: 'Footwear', label: 'Footwear' },
    { value: 'Clothes', label: 'Clothes' },
    { value: 'Other', label: 'Other' },
 
  ];


  return (
    <div className='main-dash'>
      <div className="filter-container">
<DropdownButton intervals={timeIntervals} svg={Calander}/>
<DropdownButton intervals={products} svg={Stock}/>
     
      </div>
      <div className="grid-container">
        <div className="card c1"></div>
        <div className="card c2"></div>
        <div className="card c3"></div>
        <div className="card c4"></div>

      </div>
    </div>
  )
}

export default mainDashboard