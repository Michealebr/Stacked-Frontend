import "./AddStock.css";
import SearchIcon from "src/assets/Search.svg";
import Cross from 'src/assets/X.svg'
import Add from 'src/assets/Add.svg'
import Shoe from 'src/assets/Shoe.svg'
import Shoe2 from 'src/assets/Shoe2.svg'


interface AddStockProps {
  onClose: () => void;
  onProduct: any;

}


const AddStock: React.FC<AddStockProps> = ({ onClose , onProduct}) => {
  return (
    <div className="modal-container">
      <button className="close-btn" onClick={onClose}><img className="modal-cross" src={Cross}/></button>
      <div className="add-stock-header ">
        <div className="search-box">
          <img className="search-icon" src={SearchIcon} alt="search icon" />
          <input className="searchbar stock-searchbar" type="text"></input>
        </div>
      </div>
        <button className="add-custom-product">
        <img className="custom-product-add-icon" src={Add} alt="add icon"/>
        <p className="custom-product-text">Add Custom Item</p>
        </button>

      <div className="add-stock-container">
        {/* each product line */}
        <div className="each-product-container" onClick={onProduct} >
          
          <div className="product-info-container add-product-info-container">
          <img className="product-img add-to-stock-img" src={Shoe} alt=""/>
            <div className="add-product-text">
              <h3 className="product-name">Jordan 1 high Lost and Found</h3>
              <p className="product-sku">DZ5485-612</p>
              </div>
           </div>
           <button className="add-to-edit-btn">
           <img className="item-add-icon" src={Add} alt="add-icon" />
           </button>
        </div>
        <div className="each-product-container">
          
          <div className="product-info-container add-product-info-container">
          <img className="product-img add-to-stock-img" src={Shoe2} alt=""/>
            <div className="add-product-text">
              <h3 className="product-name">Jordan 1 high Lost and Found </h3>
              <p className="product-sku">DZ5485-612</p>
              </div>
           </div>
           <button className="add-to-edit-btn">
           <img className="item-add-icon" src={Add} alt="add-icon" />
           </button>
        </div>
        
      </div>
    </div>
    
  );
};

export default AddStock;
