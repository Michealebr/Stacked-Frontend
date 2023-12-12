import React, { useState, useEffect } from 'react';
import "./AddStock.css";
import SearchIcon from "src/assets/Search.svg";
import Cross from 'src/assets/X.svg'
import Add from 'src/assets/Add.svg'
// import Shoe from 'src/assets/Shoe.svg'
// import Shoe2 from 'src/assets/Shoe2.svg'



interface AddStockProps {
  onClose: () => void;
  onProduct: any;

}


const AddStock: React.FC<AddStockProps> = ({ onClose , onProduct}) => {

  const [searchQuery, setSearchQuery] = useState<string>('');
  const [searchResults, setSearchResults] = useState<Product[]>([]);

  useEffect(() => {
    // Trigger API call when searchQuery changes
    if (searchQuery.trim() !== '') {
      // Make your API call here with the searchQuery
      // Replace 'YOUR_API_ENDPOINT' with the actual API endpoint
      fetch(`http://localhost:3001/lol/browse?_search=${searchQuery}`)
        .then(response => response.json())
        .then(data => {
          // Update searchResults with the data from the API
          setSearchResults(data);
        })
        .catch(error => {
          console.error('Error fetching data:', error);
        });
    } else {
      // Clear searchResults when searchQuery is empty
      setSearchResults([]);
    }
  }, [searchQuery]); 

  

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
        <div className="each-product-container" onClick={onProduct} key={result.id} >
          <div className="product-info-container add-product-info-container">
          <img className="product-img add-to-stock-img" src={result.media.smallImageUrl} alt=""/>
            <div className="add-product-text">
              <h3 className="product-name">{result.title}</h3>
              <p className="product-sku">{result.styleId}</p>
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
