import React from 'react'
import "./Stock.css"
import FilterIcon from 'src/assets/Filter.svg'
import AddIcon from 'src/assets/Add.svg'
import SearchIcon from 'src/assets/Search.svg'
import Shoe from 'src/assets/Shoe.svg'
import Edit from 'src/assets/Edit.svg'
import Sold from 'src/assets/Sold.svg'
import Cross from 'src/assets/X.svg'




const Stock = () => {
  return (
    <>
    <div className='page page-layout'>
      <div className="page-header">
        <div className="search-box">
        <img className="search-icon" src={SearchIcon} alt='search icon' />
        <input className="searchbar"type='text'></input>
        </div>
        <div className="btn-container">
        <button className=' btn add-stock'><span><img className='add-icon' src={AddIcon} alt="add icon" /></span>Add Stock</button>
        <button className='btn filter'><span><img className='filter-icon' src={FilterIcon} alt="add icon" /></span></button>
        </div>
      </div>
        <div className='page-body'>
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
           </div>
           <div className="icon-container">
            <button className='icon-btn'><img className='edit-icon' src={Edit} alt='edit'/></button>
            <button className='icon-btn'> <img className='edit-icon' src={Sold} alt='sold'/></button>
            <button className='icon-btn'> <img className='edit-icon' src={Cross} alt='cross'/></button>
           
           </div>
         

          </div>
        </div>
    </div>
    </>

  )
}

export default Stock