import React, { useState } from 'react';
import "./Stock.css"
import FilterIcon from 'src/assets/Filter.svg'
import AddIcon from 'src/assets/Add.svg'
import SearchIcon from 'src/assets/Search.svg'
// import Shoe from 'src/assets/Shoe.svg'
// import Edit from 'src/assets/Edit.svg'
// import Sold from 'src/assets/Sold.svg'
// import Cross from 'src/assets/X.svg'
import DropDownBtn from '@/Components/UsefulComponents/DropDownBtn'
import AddStockModal from './AddStockModal';
import EditStockModal from './EditStockModal';


interface StockEntry {
  productName: string;
  size: string;
  quantity: number;
  price: number;
}


const Stock: React.FC = () => {

  const [isAddModalOpen, setAddModalOpen] = useState(false);
  const [isEditModalOpen, setEditModalOpen] = useState(false);
  const [stockEntries, setStockEntries] = useState<StockEntry[]>([]);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);


  const productStockFilter = [
    { value: 'Size', label: 'Size' },
    { value: 'Newest', label: 'Newest' },
    { value: 'Oldest', label: 'Oldest' },
 
  ];

  const handleAddClick = () => {
    setAddModalOpen(true);
  };

  // const handleEditClick = (productId: string) => {
  //   // Fetch data for the product based on productId
  //   // Set the data to a state variable
  //   // Open the Edit modal
  //   setEditModalOpen(true);
  // };
  const handleEditClick = (product: Product) => {
    // Fetch data for the product based on productId
    // Set the data to a state variable
    // Open the Edit modal
    setSelectedProduct(product);
    setEditModalOpen(true);
  };

  const handleCloseAddModal = () => {
    setAddModalOpen(false);
  };

  const handleCloseEditModal = () => {
    setEditModalOpen(false);
  };


  // const handleFormSubmit = (formData: StockEntry) => {
  //   setStockEntries((prevStockEntries) => [...prevStockEntries, formData]);
  //   console.log("Form submitted with data:", formData);
  // };
  // const handleFormSubmit = (selectedProduct: Product, formData: StockEntry) => {
  //   const newProductData: StockEntry = {
  //     productName: selectedProduct.name,
  //     // ... other keys
  //     ...formData,
  //   };
  
  //   setStockEntries((prevStockEntries) => [...prevStockEntries, newProductData]);
  //   console.log("Form submitted with data:", newProductData);
  // };

  const handleFormSubmit = (formData: StockEntry) => {
    if (selectedProduct) {
      const newProductData: StockEntry = {
        ...formData,
      };

      setStockEntries((prevStockEntries) => [...prevStockEntries, newProductData]);
      console.log(newProductData);
      // Optionally, you can reset the selected product
      setSelectedProduct(null);
    }


};
  return (
    <>
    <div className='page page-layout'>
      <div className="page-header">
        <div className="search-box">
        <img className="search-icon" src={SearchIcon} alt='search icon' />
        <input className="searchbar"type='text'></input>
        </div>
        <div className="btn-container">
        <button className=' btn add-stock' onClick={handleAddClick}><span><img className='add-icon' src={AddIcon} alt="add icon" /></span>Add Stock</button>
       <DropDownBtn option={productStockFilter} svg={FilterIcon} content={"Filter"} leftIcon={true} textContent={true} rightIcon={false} dropDownDesign={'stock-filter'}/>
        </div>
      </div>
    
        <div className='page-body'>
          {/* each product  */}
          {/* <div className="product-line">
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
           <div className="icon-container">
            <button className='icon-btn' onClick={handleEditClick}><img className='edit-icon' src={Edit} alt='edit'/></button>
            <button className='icon-btn'> <img className='edit-icon' src={Sold} alt='sold'/></button>
            <button className='icon-btn'> <img className='edit-icon' src={Cross} alt='cross'/></button>
           </div>
          </div> */}
          <table>
        <thead>
          <tr>
            <th>img</th>
            <th>name & sku</th>
            <th>size</th>
            <th>Purchase Price</th>
            <th>expected sale price</th>
            <th>expected profit</th>
            <th>Purchase date</th>
            <th>Product btn</th>
          </tr>
        </thead>
        <tbody>
           {stockEntries.map((entry, index) => (
          <tr key={index}>
            <td>{entry.productName}</td>
            <td>{entry.sizes[0].value}</td>
            <td>{entry.quantity}</td>
            <td>{entry.price}</td>
          </tr>
        ))}
        </tbody>
      </table>
          {/* all this needs to be looped  */}
        </div>
        <AddStockModal isOpen={isAddModalOpen} onClose={handleCloseAddModal} onProductSelect={handleEditClick} />
      <EditStockModal isOpen={isEditModalOpen} onClose={handleCloseEditModal} onFormSubmit={handleFormSubmit}  selectedProduct={selectedProduct}/>
    </div>
    </>

  )
}

export default Stock