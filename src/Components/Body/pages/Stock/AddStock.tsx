import React, { useState, useEffect } from 'react';
import "./AddStock.css";
import SearchIcon from "src/assets/Search.svg";
import Cross from 'src/assets/X.svg'
import Add from 'src/assets/Add.svg'




interface AddStockProps {
  onClose: () => void;
  onProductSelect: (selectedProduct: Product) => void;
}


const AddStock: React.FC<AddStockProps> = ({ onClose , onProductSelect}) => {

  const [searchQuery, setSearchQuery] = useState<string>('');
  const [searchResults, setSearchResults] = useState<Product[]>([]);

  useEffect(() => {
   
          const requestOptions: RequestInit = {
            method: 'GET',
            redirect: 'follow',
          };

          fetch(`http://localhost:3009/api/search/${searchQuery}`, requestOptions)
          .then(response => response.json())
          .then(result => setSearchResults(result))
          .catch(error => console.log('error', error));
    
      }, [searchQuery]); // Include searchQuery as a dependency

      function handleProductClick(product: Product) {
        onProductSelect(product);
      }


  return (
    <div className="modal-container">
      <button className="close-btn" onClick={onClose}><img className="modal-cross" src={Cross}/></button>
      <div className="add-stock-header ">
        <div className="search-box">
          <img className="search-icon" src={SearchIcon} alt="search icon" />
          <input className="searchbar stock-searchbar" type="text" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)}></input>
        </div>
      </div>
        <button className="add-custom-product">
        <img className="custom-product-add-icon" src={Add} alt="add icon"/>
        <p className="custom-product-text">Add Custom Item</p>
        </button>

      <div className="add-stock-container">
        {/* each product line */}
        {searchResults.map((result) => (
        <div className="each-product-container"  onClick={() => handleProductClick(result)} key={result.id} >
          <div className="product-info-container add-product-info-container">
          <img className="product-img add-to-stock-img" src={result.img_url} alt="product img"/>
            <div className="add-product-text">
              <h3 className="product-name">{result.name}</h3>
              <p className="product-sku">{result.sku}</p>
              </div>
           </div>
           <button className="add-to-edit-btn">
           <img className="item-add-icon" src={Add} alt="add-icon" />
           </button>
        </div>
             ))}
      </div>
    </div>
    
  );
};

export default AddStock;
