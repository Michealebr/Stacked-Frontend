import React, { useState } from "react";
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
}) => {
  const currentDate = new Date().toISOString().split("T")[0];

  const [soldDate, SetSoldDate] = useState<string>(currentDate);
  const [payout, SetPayout] = useState<Number>();
  const [shippingFee, SetShippingFee] = useState<Number>(0);
  const [otherFee, SetOtherFee] = useState<Number>();
  // const [payout, SetPayout] = useState<Number>()

  const handleBlur = (
    value: number | string,
    setState: React.Dispatch<React.SetStateAction<number | string>>
  ) => {
    if (value === "") {
      setState(0);
    }
  };

  console.log(selectedProduct);
  //   const handleFormSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
  //     event.preventDefault();

  //     try {
  //       const totalcost = parseFloat(price) + parseFloat(shippingFee);
  //       console.log(price);
  //       console.log(shippingFee);
  //       console.log(totalcost);

  //       const expectedProfit = expectedSalePrice - totalcost;

  //       const updatedProduct = {
  //         ...selectedProduct,
  //         // sizes[0].label: selectedSizes,
  //         // sizes[0].value: selectedSizes,
  //         sizes: parseFloat(selectedSizes),
  //         expected_sale_price: expectedSalePrice,
  //         purchase_price: parseFloat(price),
  //         expected_profit: expectedProfit,
  //         shipping_cost: parseFloat(shippingFee),
  //         total_cost: totalcost,
  //         acquisition_date: acquisitionDate,
  //       };
  //       // Send the updated product data to the server
  //       const response = await fetch(
  //         `http://localhost:3009/api/updateStock/${selectedProduct.stock_id}`,
  //         {
  //           method: "PUT",
  //           headers: {
  //             "Content-Type": "application/json",
  //           },
  //           body: JSON.stringify(updatedProduct),
  //         }
  //       );

  //       if (response.ok) {
  //         updateStockList();
  //         // Optionally, handle success on the client side
  //         console.log("Data updated successfully");
  //         // Reset the form or close the modal
  //         onClose();
  //       } else {
  //         const responseData = await response.json();
  //         console.error(
  //           "Error updating data:",
  //           response.status,
  //           response.statusText,
  //           responseData.details
  //         );
  //         // Handle errors, show a message to the user, etc.
  //       }
  //     } catch (error) {
  //       console.error("Error updating data:", error);
  //       // Handle errors, show a message to the user, etc.
  //     }
  //   };

  // onSubmit={handleFormSubmit}

  return (
    <div className="modal-container">
      <form>
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
              className="input-info-ps "
              type="number"
              value={payout}
              onChange={(e) => SetPayout(Number(e.target.value))}
              onBlur={() => handleBlur(payout, setPayout)}
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
              className="input-info-ps "
              type="number"
              value={shippingFee}
              onChange={(e) => SetShippingFee(Number(e.target.value))}
              onBlur={() => handleBlur(shippingFee, SetShippingFee)}
            />
          </div>
          {/* fees */}
          <div className="input-price-info">
            <label className="price-input-label" htmlFor="Fee">
              Fee's
            </label>
            <input
              name="Fee"
              className="input-info-ps "
              type="number"
              value={otherFee}
              onChange={(e) => SetOtherFee(Number(e.target.value))}
              onBlur={() => handleBlur(otherFee, SetOtherFee)}
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
            />
          </div>
          {/* show profit / loss  */}
        </div>

        <button className="submit-form-btn" type="submit">
          Sold
        </button>
      </form>
    </div>
  );
};

export default AddSoldList;
