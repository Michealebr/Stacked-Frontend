import React, { useState, useEffect  } from "react";
import Cross from "src/assets/X.svg";
import DropdownButton from "../../DropdownButton";

interface SoldListModalProps {
  isOpen: boolean;
  onClose: () => void;
  onProductSelect: (selectedProduct: Product) => void;
  selectedProduct: Product;
  updateStockList: number;
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
  shipping_cost: number;
  total_cost: number;
};
const currency = [
  { value: "£", label: "£" },
  { value: "$", label: "$" },
  { value: "€", label: "€" },
];

const sellingPlatform = [
  { value: "StockX", label: "StockX" },
  { value: "Laced", label: "Laced" },
  { value: "Ebay", label: "Ebay" },
  { value: "Alias", label: "Alias" },
  { value: "Instagram", label: "Instagram" },
  { value: "Website", label: "Website" },
  { value: "Other", label: "Other" },
];

const AddSoldList: React.FC<SoldListModalProps> = ({
  onClose,
  selectedProduct,
  updateStockList,
  handleDeleteStock,
}) => {
  const currentDate = new Date().toISOString().split("T")[0];

  const [soldDate, SetSoldDate] = useState<string>(currentDate);
  const [payout, SetPayout] = useState<number>();
  const [shippingFee, SetShippingFee] = useState<number>(0);
  const [otherFee, SetOtherFee] = useState<number>(0);
  const [profit, setProfit] = useState<number>(0);
  const [payoutAfterFee, setPayoutAfterFees] = useState<number>(0);
  const [selectedPlatform, setSelectedPlatform] = useState('StockX');

  useEffect(() => {
    // This effect will be triggered whenever selectedPlatform changes
    console.log("Selected Platform:", selectedPlatform);
  }, [selectedPlatform]);

  const handlePlatformSelect = (selectedValue: string) => {
    setSelectedPlatform(selectedValue);
  };

const calculateProfit = () => {
    if (payout !== undefined && shippingFee !== undefined && otherFee !== undefined) {
      const totalCost = selectedProduct.total_cost;
      const payoutAfterFees = payout - (shippingFee + otherFee);
      const netProfit = payoutAfterFees - totalCost;

      // Update the profit state
      setProfit(netProfit);
      setPayoutAfterFees(payoutAfterFees)

      // Log for demonstration (you can remove this in production)
      console.log('Updated Profit:', netProfit);
    }
  };
  const handleBlur = () => {
    calculateProfit();
  };

//   const handleBlur = (
//     value: number | string,
//     setState: React.Dispatch<React.SetStateAction<number | string>>
//   ) => {
//     if (value === "") {
//       setState(0);
//     }
//   };

  console.log(selectedProduct);
    const handleFormSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault();

      try {

        const updatedProduct = {
          ...selectedProduct,
          profit,
          soldDate,
          shippingFee,
          otherFee,
          payout,
          total_payout: payoutAfterFee,
          platform: selectedPlatform,

        };
        // Send the updated product data to the server
        const response = await fetch(
          'http://localhost:3009/api/submitSale',
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(updatedProduct),
          }
        );

        if (response.ok) {
        //   updateStockList();
          // Optionally, handle success on the client side
          console.log("Data updated successfully");
          handleDeleteStock(updatedProduct.stock_id)
          // Reset the form or close the modal
          onClose();
        } else {
          const responseData = await response.json();
          console.error(
            "Error updating data:",
            response.status,
            response.statusText,
            responseData.details
          );
          // Handle errors, show a message to the user, etc.
        }
      } catch (error) {
        console.error("Error updating data:", error);
        // Handle errors, show a message to the user, etc.
      }
    };

  // onSubmit={handleFormSubmit}

  return (
    <div className="modal-container">
      <form onSubmit={handleFormSubmit}>
        <button className="close-btn" onClick={onClose}>
          <img className="modal-cross" src={Cross} />
        </button>
        <div className="edit-stock-header edit-modal-header">
          <img
            className="edit-stock-img"
            src={selectedProduct.img_url}
            alt="product img"
          />
          <div className="add-product-text">
            <h3 className="product-name product-modal-name">
              {selectedProduct.product_name}
            </h3>
            <p className="product-sku">{selectedProduct.product_sku}</p>
          </div>
        </div>

        <div className="price-info-container edit-info-container">
          {/* Total cost input */}
          <div className="input-price-info ">
            <label className="price-input-label" htmlFor="productPrice">
              Total Cost
            </label>
            <input
              name="productPrice"
              className=" input-info-ps prev-data"
              type="number"
              required
              value={selectedProduct.total_cost}
              disabled
            />
          </div>
          {/* size input */}
          <div className="input-price-info ">
            <label className="price-input-label" htmlFor="purchaseDate">
              size
            </label>
            <input
              className="input-info-ps prev-data"
              type="number"
              value={selectedProduct.sizes[0].value}
              disabled
            />
          </div>
        </div>
        {/* add sold info */}
        <div className="price-info-container edit-info-container">
          {/* payout */}
          <div className="input-price-info">
            <label className="price-input-label" htmlFor="SaleDate">
              Payout*
            </label>
            <input
              name="SaleDate"
              className="input-info-ps profit-inp"
              type="number"
              value={payout}
              onChange={(e) => SetPayout(e.target.value)}
              onBlur={handleBlur}
              required
            />
          </div>
          {/* shipping */}
          <div className="input-price-info">
            <label className="price-input-label" htmlFor="ShippingFee">
              Shipping Fee
            </label>
            <input
              name="ShippingFee"
              className="input-info-ps profit-inp"
              type="number"
              value={shippingFee}
              onBlur={handleBlur}
              onChange={(e) => SetShippingFee(Number(e.target.value))}
              
            />
          </div>
          {/* fees */}
          <div className="input-price-info">
            <label className="price-input-label" htmlFor="Fee">
              Fee's
            </label>
            <input
              name="Fee"
              className="input-info-ps profit-inp"
              type="number"
              value={otherFee}
              onBlur={handleBlur}
              onChange={(e) => SetOtherFee(Number(e.target.value))}
            />
          </div>
          {/* sold date  */}
          <div className="input-price-info">
            <label className="price-input-label" htmlFor="SaleDate">
              Sale Date
            </label>
            <input
              name="SaleDate"
              className="input-info-ps buy-date-input"
              type="date"
              max={currentDate}
              value={soldDate}
              onChange={(e) => {
                const newDate = e.target.value;
                SetSoldDate(newDate !== currentDate ? newDate : currentDate);
              }}
            />
          </div>
          <div className="input-price-info">
            <label className="price-input-label" htmlFor="Platform">
              Platform
            </label>
            {/* <input
                name='SaleDate'
              className="input-info-ps buy-date-input"
              type="date"
              max={currentDate}
              value={soldDate}
              onChange={(e) => {
                const newDate = e.target.value;
                SetSoldDate(
                  newDate !== currentDate ? newDate : currentDate
                );
              }}

            /> */}
            <DropdownButton
              intervals={sellingPlatform}
              buttonWidth="platform-btn"
              arrowSize="currency-btn-arrow-size"
              btnContainerWidth="platform-btn-ctn-width"
              dropdownWidth="drop-platform-btn-width"
              svg={null}
              onSelect={handlePlatformSelect}
            />
          </div>
        </div>
        <div className="price-info-container edit-info-container">
          {/* show profit / loss  */}
          <div className="input-price-info">
            <label className="price-input-label" htmlFor="Profit">
              Profit / Loss
            </label>
            <input
              name="Profit"
              className="input-info-ps show-profit"
              type="number"
              disabled
                value={profit|| 0}
            //   onChange={(e) => SetProfit(Number(e.target.value))}
            />
          </div>
        </div>

        <button className="submit-form-btn sold-btn-modal" type="submit">
          Sold
        </button>
      </form>
    </div>
  );
};

export default AddSoldList;
