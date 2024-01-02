import React, { useState } from 'react';
import Cross from "src/assets/X.svg";
import DropdownButton from "../../DropdownButton";


interface EditBtnModalProps {
    isOpen: boolean;
    onClose: () => void;
    // onProductSelect: (selectedProduct: Product) => void;
    selectedProduct: []
  }

  const currency = [
    { value: "£", label: "£" },
    { value: "$", label: "$" },
    { value: "€", label: "€" },
  ];

  

const EditExistingProducts: React.FC<EditBtnModalProps> = ({ onClose , selectedProduct }) => {


    const currentDate = new Date().toISOString().split("T")[0];

  // for the form

  const [selectedSizes, setSelectedSizes] = useState<Array<SelectSizeBtn>>([selectedProduct.sizes[0].value]);
  const [price, setPrice] = useState<number>(selectedProduct.purchase_price);
  const [acquisitionDate, setAcquisitionDate] = useState<string>(() => selectedProduct.acquisition_date.split("T")[0]);
  const [shippingFee, setShippingFee] = useState<number>(0);
const [expectedSalePrice, setEpectedSalePrice] = useState<number>(selectedProduct.expected_sale_price)

const handleBlur = (value: number | string, setState: React.Dispatch<React.SetStateAction<number | string>>) => {
    if (value === '') {
      setState(0);
    }
  };

//   const handleFormSubmit = (event: React.FormEvent<HTMLFormElement>) => {
//     event.preventDefault();
//   }
// onSubmit={handleFormSubmit}

  return (
    <div className="modal-container">
    <form >
      <button className="close-btn" onClick={onClose}>
        <img className="modal-cross" src={Cross} />
      </button>
      <div className="edit-stock-header edit-modal-header">
        <img className="edit-stock-img" src={selectedProduct.img_url} alt="product img" />
        <div className="add-product-text">
          <h3 className="product-name product-modal-name">{selectedProduct.product_name}</h3>
          <p className="product-sku">{selectedProduct.product_sku}</p>
        </div>
      </div>
      {/* sizes */}

   

      <div className="price-info-container edit-info-container">
        
      <div className="input-price-info">
          <label className="price-input-label" htmlFor="purchaseDate">
            size
          </label>
          <input
            className="input-info-ps buy-date-input"
            type="number"
            value={selectedSizes}
            onChange={(e) => setSelectedSizes(e.target.value)}
            required
            // onBlur={() => handleBlur(selectedSizes, setSelectedSizes)}
          />
        </div>

        {/* product price input */}
        <div className="input-price-info">
          <label className="price-input-label" htmlFor="productPrice">
            Purchase Price
            
          </label>
          <div className="lol">
            <DropdownButton
              intervals={currency}
              buttonWidth="currency-btn"
              arrowSize="currency-btn-arrow-size"
              btnContainerWidth="curreny-btn-ctn-width"
              dropdownWidth="drop-currency-btn-width"
              svg={null}
            />
            <input
              className="purchase-price-input input-info-ps"
              type="number"
              required
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              onBlur={handleBlur}

            />
          </div>
        </div>

        {/* purchase date input */}
        <div className="input-price-info">
          <label className="price-input-label" htmlFor="purchaseDate">
            Date of Purchase
          </label>
          <input
            className="input-info-ps buy-date-input"
            type="date"
            max={currentDate}
            value={acquisitionDate}
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
            onChange={(e) => setShippingFee(e.target.value)}
            onBlur={() => handleBlur(shippingFee, setShippingFee)}
          />
        </div>

        <div className="input-price-info">
          <label className="price-input-label" htmlFor="purchaseDate">
            Expected Sale Price
          </label>
          <input
            className="input-info-ps"
            type="number"
            value={expectedSalePrice}
            onChange={(e) => setEpectedSalePrice(Number(e.target.value))}
            onBlur={() => handleBlur(expectedSalePrice, setEpectedSalePrice)}
            required
          />
        </div>
      </div>

      <button className="submit-form-btn" type="submit">
        Update Stock
      </button>
    </form>
  </div>
  )
}

export default EditExistingProducts