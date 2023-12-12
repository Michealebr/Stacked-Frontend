import React from 'react'
import './Sold.css'
import Shoe from 'src/assets/Shoe.svg'
import SearchIcon from 'src/assets/Search.svg'
import FilterIcon from 'src/assets/Filter.svg'

import DropDownBtn from '@/Components/UsefulComponents/DropDownBtn'



const Sold = () => {
  const productStockFilter = [
    { value: 'Size', label: 'Size' },
    { value: 'Newest', label: 'Newest' },
    { value: 'Oldest', label: 'Oldest' },
 
  ];
  return (
    <>
    <div className='page page-layout'>
      <div className="page-header">
        <div className="search-box">
        <img className="search-icon" src={SearchIcon} alt='search icon' />
        <input className="searchbar"type='text'></input>
        </div>
        <div className="btn-container">
       
       <DropDownBtn option={productStockFilter} svg={FilterIcon} content={"Filter"} leftIcon={true} textContent={true} rightIcon={false} dropDownDesign={'stock-filter'}/>
        </div>
      </div>
        <div className='page-body'>
          {/* each product  */}
          <div className="product-line">
          <div className="info-container">
            <img className="product-img" src={Shoe}/>
            <div className="product-info-container">
              <h3 className="product-name">Jordan 1 high Lost and Found</h3>
              <p className="product-sku">DZ5485-612</p>
           </div>
           </div>
           <div className="product-price-container">
           <p className="product-size">10 UK</p>
            <p className="bought-price">$165</p>
            <p className="market-price">$300</p>
            <p className="projected-profit">$135</p>
            <p className="product-aquired-date">11/12/2023</p>

           </div>
          </div>
          {/* all this needs to be looped  */}
        </div>
    </div>
    </>
  )
}

export default Sold