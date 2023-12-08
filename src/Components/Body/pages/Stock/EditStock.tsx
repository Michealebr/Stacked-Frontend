import "./EditStock.css";
import Cross from "src/assets/X.svg";
import Shoe from "src/assets/Shoe.svg";
import Trash from "src/assets/Trash.svg"
import { useState, useEffect } from "react";

interface SelectSizeBtn {
  value: string;
  label: string;
  quantity: number;
}
interface EditStockProps {
  onClose: () => void;
}
const shoeSizeFilter = [
  { value: "UK", label: "UK" },
  { value: "EU", label: "EU" },
  { value: "US", label: "US" },
];

const productSizes = [
  { value: "3", label: "3", quantity: 0 },
  { value: "3.5", label: "3.5", quantity: 0 },
  { value: "4", label: "4", quantity: 0 },
  { value: "4.5", label: "4.5", quantity: 0 },
  { value: "5", label: "5", quantity: 0 },
  { value: "5.5", label: "5.5", quantity: 0 },
  { value: "6 EU39", label: "6 (39)", quantity: 0 },
  { value: "6 EU40", label: "6 (40)", quantity: 0 },
  { value: "6.5", label: "6.5", quantity: 0 },
  { value: "7", label: "7", quantity: 0 },
  { value: "7.5", label: "7.5", quantity: 0 },
  { value: "8", label: "8", quantity: 0 },
  { value: "8.5", label: "8.5", quantity: 0 },
  { value: "9", label: "9", quantity: 0 },
  { value: "9.5", label: "9.5", quantity: 0 },
  { value: "10", label: "10", quantity: 0 },
  { value: "10.5", label: "10.5", quantity: 0 },
  { value: "11", label: "11", quantity: 0 },
  { value: "11.5", label: "11.5", quantity: 0 },
  { value: "12", label: "12", quantity: 0 },
  { value: "13", label: "13", quantity: 0 },
  { value: "14", label: "14", quantity: 0 },
  { value: "15", label: "15", quantity: 0 },
  { value: "16", label: "16", quantity: 0 },
  { value: "17", label: "17", quantity: 0 },
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

  // for the form

  const [selectedSizes, setSelectedSizes] = useState<Array<SelectSizeBtn>>([]);
  const [price, setPrice] = useState<number>(0);
  const [acquisitionDate, setAcquisitionDate] = useState<string>("");

  // const handleSelectedSize = (size: SelectSizeBtn) => {
  //   setSelectedSizes((prevSizes) => {
  //     const updatedSizes = [...prevSizes];
  //     const index = updatedSizes.findIndex(
  //       (prevSize) => prevSize.value === size.value
  //     );

  //     if (index !== -1) {
  //       // If the size is already selected, update the quantity
  //       updatedSizes[index] = {
  //         ...updatedSizes[index],
  //         quantity: updatedSizes[index].quantity + 1,
  //       };
  //     } else {
  //       // If the size is not selected, add it with quantity 1
  //       updatedSizes.push({ ...size, quantity: 1 });
  //     }
  //     console.log("Updated Sizes:", updatedSizes); // Log the updated sizes
  //     return updatedSizes;
  //   });
  // };
  const handleSizeInteraction = (size: SelectSizeBtn, newQuantity?: number) => {
    setSelectedSizes((prevSizes) => {
      const updatedSizes = [...prevSizes];
      const index = updatedSizes.findIndex(
        (prevSize) => prevSize.value === size.value
      );

      if (index !== -1) {
        updatedSizes[index] = {
          ...updatedSizes[index],
          quantity:
            newQuantity !== undefined
              ? newQuantity
              : updatedSizes[index].quantity + 1,
        };
      } else {
        updatedSizes.push({ ...size, quantity: 1 });
      }

      // Sort the updatedSizes array by size.value in ascending order
      updatedSizes.sort((a, b) => parseFloat(a.value) - parseFloat(b.value));

      console.log("Updated Sizes:", updatedSizes);
      return updatedSizes;
    });
  };

  const handleFormSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    // Gather form data
    const formData = {
      sizes: selectedSizes.map((size) => size.label),
      price,
      acquisitionDate,
    };

    // Log or perform other actions with the form data
    console.log("Form data:", formData);

    // Clear form data
    setSelectedSizes([]);
    setPrice(0);
    setAcquisitionDate("");

    // Close the modal or perform other actions
    onClose();
  };
  const handleQuantityChange = (size, newQuantity) => {
    setSelectedSizes((prevSizes) =>
      prevSizes.map((prevSize) =>
        prevSize.value === size.value
          ? { ...prevSize, quantity: parseInt(newQuantity, 10) || 0 }
          : prevSize
      )
    );
  };

  useEffect(() => {
    console.log("Updated Sizes:", selectedSizes);
  }, [selectedSizes]);

  const handleDeleteSize = (sizeToDelete: SelectSizeBtn) => {
    setSelectedSizes((prevSizes) =>
      prevSizes.filter((size) => size.value !== sizeToDelete.value)
    );
  };

  return (
    
      <div className="modal-container">
      <form action={handleFormSubmit}>
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
          <button
            className="shoe-size-btn"
            onClick={(e) => {
              e.preventDefault(); // Prevent the form from submitting
              handleCLick();
            }}
          >
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
        {/* sizes */}
        <div className="product-size-container">
          {productSizes.map((eachSize) => (
            <button
              className="product-size-btn"
              key={eachSize.value}
              onClick={(e) => {
                e.preventDefault(); // Prevent the form from submitting
                // handleSelectedSize(eachSize);
                handleSizeInteraction(eachSize);
              }}
            >
              {eachSize.label}
            </button>
          ))}
        </div>
        
          <div className="size-list-container">
            {selectedSizes.map((size) => (
              <div className="slected-size-container">
              <div 
              className="size-list"
              key={size.value}>
                {size.label} x{" "}
                </div>
                <div>
                <input
                  className="quantity-input"
                  type="number"
                  value={size.quantity}
                  onChange={(e) => handleQuantityChange(size, e.target.value)}
                />
                </div>
                <button 
                 className="fix-cross"
                onClick={(e) => {
                    e.preventDefault()
                  handleDeleteSize(size)}}
                  >
                <img className="cancel-selected-size" src={Cross} alt="" />
                </button>
              </div>
            ))}
          </div>

        <button type="submit"></button>
      </form>
    </div>
  );
};

export default EditStock;