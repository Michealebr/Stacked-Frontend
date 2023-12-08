import "./EditStock.css";
import Cross from "src/assets/X.svg";
import Shoe from "src/assets/Shoe.svg";
import { useState } from "react";

interface SelectSizeBtn {
  value: string;
  label: string;
}
interface EditStockProps {
  onClose: () => void;
}
const shoeSizeFilter = [
  { value: "UK", label: "UK" },
  { value: "EU", label: "EU" },
  { value: "US", label: "US" },
];

const EditStock: React.FC<EditStockProps> = ({ onClose }) => {
  // Your logic for handling the editing of an existing stock item
  const [isClicked, setClick] = useState(false);
  const handleCLick = () => {
    setClick(!isClicked);
  };
  const [selectedSize, setSelectedSize] = useState<SelectSizeBtn>(
    shoeSizeFilter[0]
  );

  const handleSizeClicked = (size: SelectSizeBtn) => {
    setSelectedSize(size);
    setClick(!isClicked);
  };

  return (
    <div>
      <div className="modal-container"></div>
      <button className="close-btn" onClick={onClose}>
        <img className="modal-cross" src={Cross} />
      </button>
      <div className="edit-stock-header">
        <img className="edit-stock-img" src={Shoe} alt="product img" />
        <div className="add-product-text">
          <h3 className="product-name">Jordan 1 high Lost and Found</h3>
          <p className="product-sku">DZ5485-612</p>
        </div>
      </div>
      <div className="size-btn-container">
        <button className="shoe-size-btn" onClick={handleCLick}>
          {selectedSize.label}
        </button>
        <div className={`drop-down-size ${isClicked ? "active" : "closed"}`}>
          {shoeSizeFilter.map((size) => (
            <div key={size.value} onClick={() => handleSizeClicked(size)}>
              {size.label}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default EditStock;
