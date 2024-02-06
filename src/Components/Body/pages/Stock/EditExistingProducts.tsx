import React, { useState } from 'react';
import Cross from "src/assets/X.svg";
import DropdownButton from "../../DropdownButton";
import { useCurrency } from 'src/CurrencyContext'
// import { Product } from 'electron';


interface EditBtnModalProps {
    isOpen: boolean;
    onClose: () => void;
    // onProductSelect: (selectedProduct: Product) => void;
    selectedProduct: Product;
    // updateStockList: number;
  }

  type Product = {
    user_id: number;
    stock_id: number;
    img_url: string;
    product_name: string;
    product_sku: string;
    purchase_price: number;
    sizes: number;
    expected_sale_price: number;
    expected_profit: number;
    acquisition_date: string;
    total_cost: number;
    shipping_cost: number;
    price: number
  }


  

const EditExistingProducts: React.FC<EditBtnModalProps> = ({ onClose , selectedProduct, updateStockList }) => {

  const { currency } = useCurrency();
    const currentDate = new Date().toISOString().split("T")[0];

  // for the form

  const [selectedSizes, setSelectedSizes] = useState<Array<SelectSizeBtn>>([selectedProduct.sizes[0].value]);
  const [price, setPrice] = useState<number>(selectedProduct.purchase_price);
  const [acquisitionDate, setAcquisitionDate] = useState<string>(() => selectedProduct.acquisition_date.split("T")[0]);
  const [shippingFee, setShippingFee] = useState<number>(selectedProduct.shipping_cost);
const [expectedSalePrice, setEpectedSalePrice] = useState<number>(selectedProduct.expected_sale_price)

const handleBlur = (value: number | string, setState: React.Dispatch<React.SetStateAction<number | string>>) => {
    if (value === '') {
      setState(0);
    }
  };

  // submit the form to endpoint to update data 

  const handleFormSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    try {
      const totalcost = parseFloat(price) + parseFloat(shippingFee);
    console.log(price)
    console.log(shippingFee)
    console.log(totalcost)


    const expectedProfit =  expectedSalePrice - totalcost 
    
      const updatedProduct = {
        ...selectedProduct,
        sizes: parseFloat(selectedSizes),
        expected_sale_price: expectedSalePrice,
        purchase_price: parseFloat(price),
        expected_profit: expectedProfit,
        shipping_cost: parseFloat(shippingFee),
        total_cost: totalcost,
        acquisition_date: acquisitionDate,
      }
      // Send the updated product data to the server
      const response = await fetch(`http://localhost:3009/api/updateStock/${selectedProduct.stock_id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedProduct),
      });

      if (response.ok) {
        updateStockList()
        // Optionally, handle success on the client side
        console.log('Data updated successfully');
        // Reset the form or close the modal
        onClose();
      } else {
        const responseData = await response.json();
        console.error('Error updating data:', response.status, response.statusText, responseData.details);
        // Handle errors, show a message to the user, etc.
      }
    } catch (error) {
      console.error('Error updating data:', error);
      // Handle errors, show a message to the user, etc.
    }
  }
// 

  return (
    <div className="modal-container">
    <form onSubmit={handleFormSubmit}>
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