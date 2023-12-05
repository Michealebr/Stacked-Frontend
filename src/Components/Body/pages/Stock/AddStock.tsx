import "./AddStock.css";
import SearchIcon from "src/assets/Search.svg";
import Cross from 'src/assets/X.svg'
import Add from 'src/assets/Add.svg'
interface AddStockProps {
  onClose: () => void;
}

const AddStock: React.FC<AddStockProps> = ({ onClose }) => {
  return (
    <div className="modal-container">
      <button className="close-btn" onClick={onClose}><img className="modal-cross" src={Cross}/></button>
      <div className="add-stock-header">
        <div className="search-box">
          <img className="search-icon" src={SearchIcon} alt="search icon" />
          <input className="searchbar stock-searchbar" type="text"></input>
        </div>
      </div>
        <button className="add-custom-product">
        <img className="custom-product-add-icon" src={Add} alt="add icon"/>
        <p className="custom-product-text">Add Custom Item</p>
        </button>

      <div className="add-stock-container"></div>
    </div>
  );
};

export default AddStock;
