import "./EditStock.css";
import Cross from "src/assets/X.svg";
import { useState, useEffect } from "react";
import DropdownButton from "../../DropdownButton";
import { useCurrency } from 'src/CurrencyContext'

interface SelectSizeBtn {
  value: string;
  label: string;
  quantity: number;
}


interface EditStockProps {
  onClose: () => void;
  closeAddModal: () => void;
  onFormSubmit: (formData: any) => void;
  selectedProduct: Product;
}
const shoeSizeFilter = [
  { value: "UK", label: "UK" },
  { value: "EU", label: "EU" },
  { value: "US", label: "US" },
];


const mensProductSizes = [
  { value: "3", label: "3", quantity: 0, eu:"35.5", us:"3.5" },
  { value: "3.5", label: "3.5", quantity: 0, eu:"36", us:"4" },
  { value: "4", label: "4", quantity: 0 , eu:"36.5", us:"4.5" },
  { value: "4.5", label: "4.5", quantity: 0 , eu:"37.5", us:"5" },
  { value: "5", label: "5", quantity: 0 , eu:"38", us:"5.5" },
  { value: "5.5", label: "5.5", quantity: 0 , eu:"38.5", us:"6" },
  { value: "6 (39)", label: "6 (39)", quantity: 0 , eu:"39", us:"6.5" },
  { value: "6 (40)", label: "6 (40)", quantity: 0 , eu:"40", us:"7" },
  { value: "6.5", label: "6.5", quantity: 0 , eu:"40.5", us:"7.5" },
  { value: "7", label: "7", quantity: 0 , eu:"41", us:"8" },
  { value: "7.5", label: "7.5", quantity: 0 , eu:"42", us:"8.5" },
  { value: "8", label: "8", quantity: 0 , eu:"42.5", us:"9" },
  { value: "8.5", label: "8.5", quantity: 0 , eu:"43", us:"9.5" },
  { value: "9", label: "9", quantity: 0 , eu:"44", us:"10" },
  { value: "9.5", label: "9.5", quantity: 0 , eu:"44.5", us:"10.5" },
  { value: "10", label: "10", quantity: 0 , eu:"45", us:"11" },
  { value: "10.5", label: "10.5", quantity: 0 , eu:"45.5", us:"11.5" },
  { value: "11", label: "11", quantity: 0 , eu:"46", us:"12" },
  { value: "11.5", label: "11.5", quantity: 0 , eu:"47", us:"12.5" },
  { value: "12", label: "12", quantity: 0 , eu:"47.5", us:"13" },
  { value: "13", label: "13", quantity: 0 , eu:"48.5", us:"14" },
  { value: "14", label: "14", quantity: 0 , eu:"49.5", us:"15" },
  { value: "15", label: "15", quantity: 0 , eu:"50.5", us:"16" },
  { value: "16", label: "16", quantity: 0 , eu:"51.5", us:"17" },
  { value: "17", label: "17", quantity: 0 , eu:"52.5", us:"18" },
];

const womensProductSizes = [
  { value: "2.5", label: "2.5", quantity: 0, eu:"35.5", us:"5" },
  { value: "3", label: "3", quantity: 0, eu:"36", us:"5.5" },
  { value: "3.5", label: "3.5", quantity: 0, eu:"36.5", us:"6" },
  { value: "4", label: "4", quantity: 0 , eu:"37.5", us:"6.5" },
  { value: "4.5", label: "4.5", quantity: 0 , eu:"38", us:"7" },
  { value: "5", label: "5", quantity: 0 , eu:"38.5", us:"7.5" },
  { value: "5.5", label: "5.5", quantity: 0 , eu:"39", us:"8" },
  { value: "6", label: "6", quantity: 0 , eu:"40", us:"8.5" },
  { value: "6.5", label: "6.5", quantity: 0 , eu:"40.5", us:"9" },
  { value: "7", label: "7", quantity: 0 , eu:"41", us:"9.5" },
  { value: "7.5", label: "7.5", quantity: 0 , eu:"42", us:"10" },
  { value: "8", label: "8", quantity: 0 , eu:"42.5", us:"10.5" },
  { value: "8.5", label: "8.5", quantity: 0 , eu:"43", us:"11" },
  { value: "9", label: "9", quantity: 0 , eu:"44", us:"11.5" },
  { value: "9.5", label: "9.5", quantity: 0 , eu:"44.5", us:"12" },
];

const gsProductSizes = [
  { value: "3", label: "3", quantity: 0 , eu:"35.5", us:"3.5"},
  { value: "3.5", label: "3.5", quantity: 0 , eu:"36", us:"4"},
  { value: "4", label: "4", quantity: 0 , eu:"36.5", us:"4.5"},
  { value: "4.5", label: "4.5", quantity: 0 , eu:"37.5", us:"5"},
  { value: "5", label: "5", quantity: 0 , eu:"38", us:"5.5"},
  { value: "5.5", label: "5.5", quantity: 0 , eu:"38.5", us:"6"},
  { value: "6 (39)", label: "6 (39)", quantity: 0 , eu:"39", us:"6.5"},
  { value: "6 (40)", label: "6 (40)", quantity: 0 , eu:"40", us:"7"},
];
const psProductSizes = [
  { value: "10C", label: "10C", quantity: 0 , eu:"27.5", us:"10.5C"},
  { value: "10.5C", label: "10.5C", quantity: 0 , eu:"28", us:"11C"},
  { value: "11C", label: "11C", quantity: 0 , eu:"28.5", us:"11.5C"},
  { value: "11.5C", label: "11.5C", quantity: 0 , eu:"29.5", us:"12C"},
  { value: "12C", label: "12C", quantity: 0 , eu:"30", us:"12.5C"},
  { value: "12.5C", label: "12.5C", quantity: 0 , eu:"31", us:"13C"},
  { value: "13C", label: "13C", quantity: 0 , eu:"31.5", us:"13.5C"},
  { value: "13.5C", label: "13.5C", quantity: 0 , eu:"32", us:"1Y"},
  { value: "1", label: "1", quantity: 0 , eu:"33", us:"1.5Y"},
  { value: "1.5", label: "1.5", quantity: 0 , eu:"33.5", us:"2Y"},
  { value: "2", label: "2", quantity: 0 , eu:"34", us:"2.5Y"},
  { value: "2.5", label: "2.5", quantity: 0 , eu:"35", us:"3Y"},
];
const tdProductSizes = [
  { value: "0.5C", label: "0.5C", quantity: 0 , eu:"16", us:"1C"},
  { value: "1.5C", label: "1.5C", quantity: 0 , eu:"17", us:"2C"},
  { value: "2.5C", label: "2.5C", quantity: 0 , eu:"18.5", us:"3C"},
  { value: "3.5C", label: "3.5C", quantity: 0 , eu:"19.5", us:"4C"},
  { value: "4.5C", label: "4.5C", quantity: 0 , eu:"21", us:"5C"},
  { value: "5.5C", label: "5.5C", quantity: 0 , eu:"22", us:"6C"},
  { value: "6.5C", label: "6.5C", quantity: 0 , eu:"23.5", us:"7C"},
  { value: "7.5C", label: "7.5C", quantity: 0 , eu:"25", us:"8C"},
  { value: "8.5C", label: "8.5C", quantity: 0 , eu:"26", us:"9C"},
  { value: "9.5C", label: "9.5C", quantity: 0 , eu:"27", us:"10C"},
];

const EditStock: React.FC<EditStockProps> = ({ onClose,  onFormSubmit, selectedProduct, closeAddModal }) => {

  const { currency } = useCurrency();

  // Your logic for handling the editing of an existing stock item
  const [isClicked, setClick] = useState(false);
  const handleCLick = () => {
    setClick(!isClicked);
  };
  const [selectedSize, setSelectedSize] = useState<SelectSizeBtn>(shoeSizeFilter[0]);

  const handleSizeClicked = (size: SelectSizeBtn) => {
    setSelectedSize(size);
    setClick(!isClicked);
  };

  const currentDate = new Date().toISOString().split("T")[0];

  // for the form

  const [selectedSizes, setSelectedSizes] = useState<Array<SelectSizeBtn>>([]);
  const [price, setPrice] = useState<number>();
  const [acquisitionDate, setAcquisitionDate] = useState<string>(() => currentDate);
  const [shippingFee, setShippingFee] = useState<number>(0);
const [expectedSalePrice, setEpectedSalePrice] = useState<number>()

const [errorMessage, setErrorMessage] = useState<string>('');

const [sizeCategoryArray, setSizeCategoryArray] = useState<ProductSize[]>([]);

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

      return updatedSizes;
    });
  };

  const handleFormSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    // need to pass the shipping fee as its own pram 
    // dont pass totalcost to mysql instead price and shippingprice 

    if (selectedSizes.length === 0) {
      // Show an error message or perform any other action to notify the user
      setErrorMessage('Please select at least one size.');
      return;
    }

const totalcost = price + shippingFee
const expectedProfit =  expectedSalePrice - totalcost 

    // Gather form data
    const formData = {
      img: selectedProduct.img_url,
      productName: selectedProduct.name,
      sku: selectedProduct.sku,
      sizes: selectedSizes.map((size) => ({
        value: size.value,
        label: size.label,
        quantity: size.quantity,
      })),
      price,
      totalcost,
      acquisitionDate,
      shippingFee,
      expectedSalePrice,
      expectedProfit,
    };


    onFormSubmit(formData)

    // Log or perform other actions with the form data
    console.log(formData);
    setErrorMessage('');


    // Clear form data
    setSelectedSizes([]);
    setPrice(0);
    setAcquisitionDate("");

    // Close the modal or perform other actions
    onClose();
    closeAddModal()
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
  }, [selectedSizes]);

  const handleDeleteSize = (sizeToDelete: SelectSizeBtn) => {
    setSelectedSizes((prevSizes) =>
      prevSizes.filter((size) => size.value !== sizeToDelete.value)
    );
  };

  useEffect(() => {
    if(selectedProduct){
      const sizeCategoryValue = selectedProduct.size_category;
      let categoryArray = [];
      switch (sizeCategoryValue) {
        case 0:
          categoryArray = mensProductSizes;
          break;
        case 1:
          categoryArray = womensProductSizes;
          break;
        case 2:
          categoryArray = gsProductSizes;
          break;
        case 3:
          categoryArray = psProductSizes;
          break;
        case 4:
          categoryArray = tdProductSizes;
          break;
        default:
          break;
      }
      setSizeCategoryArray(categoryArray);

    }
  }, [selectedProduct])

  return (
    <div className="modal-container">
      <form onSubmit={handleFormSubmit}>
        <button className="close-btn" onClick={onClose}>
          <img className="modal-cross" src={Cross} />
        </button>
        <div className="edit-stock-header">
          <img className="edit-stock-img" src={selectedProduct.img_url} alt="product img" />
          <div className="add-product-text">
            <h3 className="product-name product-modal-name">{selectedProduct.name}</h3>
            <p className="product-sku">{selectedProduct.sku}</p>
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
        <div className="form-scroll">
        {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
        <div className="product-size-container">



{/* {isTdSize ? (


mensProductSizes.map((eachSize) => (
            <button
              className="product-size-btn"
              key={eachSize.value}
              onClick={(e) => {
                e.preventDefault();
               // Prevent the form from submitting
                // handleSelectedSize(eachSize);
    setErrorMessage('');
                
                handleSizeInteraction(eachSize);
              }}
            >
              {eachSize.label}
            </button>
          ))
        
) : 
        } */}

          {/* {mensProductSizes.map((eachSize) => (
            <button
              className="product-size-btn"
              key={eachSize.value}
              onClick={(e) => {
                e.preventDefault();
               // Prevent the form from submitting
                // handleSelectedSize(eachSize);
    setErrorMessage('');
                
                handleSizeInteraction(eachSize);
              }}
            >
              {eachSize.label}
            </button>
          ))} */}

{sizeCategoryArray.map((eachSize) => (
        <button
          className="product-size-btn"
          key={eachSize.value}
          onClick={(e) => {
            e.preventDefault();
            setErrorMessage('');
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
              <div className="size-list" key={size.value}>
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
                  e.preventDefault();
                  handleDeleteSize(size);
                }}
              >
                <img className="cancel-selected-size" src={Cross} alt="" />
              </button>
            </div>
          ))}
        </div>

        <div className="price-info-container">
          {/* product price input */}
          <div className="input-price-info">
            <label className="price-input-label" htmlFor="productPrice">
              Purchase Price*
            </label>
            <div className="lol">
              {/* <DropdownButton
                intervals={currency}
                buttonWidth="currency-btn"
                arrowSize="currency-btn-arrow-size"
                btnContainerWidth="curreny-btn-ctn-width"
                dropdownWidth="drop-currency-btn-width"
                svg={null}
              /> */}
              <div className="currency-box">
              {currency}
              </div>
              <input
                className="purchase-price-input input-info-ps"
                type="number"
                required
                placeholder="0.00"
                value={price}
                onChange={(e) => setPrice(Number(e.target.value))}
              />
            </div>
          </div>

          {/* purchase date input */}
          <div className="input-price-info">
            <label className="price-input-label" htmlFor="purchaseDate">
              Date of Purchase*
            </label>
            <input
              className="input-info-ps buy-date-input"
              type="date"
              required
              max={currentDate}
              value={acquisitionDate || currentDate}
              onChange={(e) => {
                const newDate = e.target.value;
                setAcquisitionDate(newDate !== currentDate ? newDate : currentDate);
              }}
            />
          </div>

          {/* shipping price input */}
          <div className="input-price-info">
            <label className="price-input-label" htmlFor="shippingPrice">
              Shipping fee
            </label>
            <input
              className="input-info-ps"
              type="number"
              value={shippingFee}
              onChange={(e) => setShippingFee(Number(e.target.value))}
            />
          </div>

          <div className="input-price-info">
            <label className="price-input-label" htmlFor="purchaseDate">
              Expected Sale Price*
            </label>
            <input
              className="input-info-ps"
              type="number"
              required
              value={expectedSalePrice}
              onChange={(e) => setEpectedSalePrice(Number(e.target.value))}
            />
          </div>
        </div>

        <button className="submit-form-btn" type="submit">
          Add Stock
        </button>
        </div>
      </form>
    </div>
  );
};

export default EditStock;
