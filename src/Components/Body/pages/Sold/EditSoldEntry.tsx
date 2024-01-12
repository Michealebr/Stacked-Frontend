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

const sellingPlatform = [
    { value: "StockX", label: "StockX" },
    { value: "Laced", label: "Laced" },
    { value: "Ebay", label: "Ebay" },
    { value: "Alias", label: "Alias" },
    { value: "Instagram", label: "Instagram" },
    { value: "Website", label: "Website" },
    { value: "Other", label: "Other" },
  ];

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
    other_fee: number;
    platform: string;
    shipping_fee: number;
    sale_price: number;
  };

const EditSoldEntry: React.FC<SoldListModalProps> = ({
    onClose,
    selectedProduct,
    updateStockList,
}) => {

    const currentDate = new Date().toISOString().split("T")[0];

    const [selectedPlatform, setSelectedPlatform] = useState(selectedProduct.platform);
    const [otherFee, setNewOtherFee] = useState<number>(selectedProduct.other_fee);
    const [shippingFee, setNewShippingFee] = useState<number>(selectedProduct.shipping_fee );
    const [payout, setNewPayout] = useState<number>(selectedProduct.sale_price);
    const [profit, setNewProfit] = useState(selectedProduct.sale_price);
    const [payoutAfterFees, setNewPayoutAfterFees] = useState(selectedProduct.sale_price);
    const [soldDate , setNewSoldDate] = useState(selectedProduct.sold_date)
   


    // console.log(selectedPlatform)


    useEffect(() => {
        // This effect will be triggered whenever selectedPlatform changes
        // console.log("Selected Platform:", selectedPlatform);
      }, [selectedPlatform]);
    
      const handlePlatformSelect = (selectedValue: string) => {
        setSelectedPlatform(selectedValue);
      };


      const calculateProfit = () => {
        if (payout !== undefined && shippingFee !== undefined && otherFee !== undefined) {
          const totalCost = selectedProduct.purchase_price;
          const payoutAfterFees = payout - (Number(shippingFee) + Number(otherFee));
          const netProfit = payoutAfterFees - totalCost;
    
          // Update the profit state
          setNewProfit(netProfit);
          setNewPayoutAfterFees(payoutAfterFees)
    
          // Log for demonstration (you can remove this in production)
        //   console.log('Updated Profit:', netProfit);
        //   console.log(totalCost)
        //   console.log(payoutAfterFees)
        //   console.log(netProfit)

        }
      };
      const handleBlur = () => {
        calculateProfit();
      };

      const handleFormSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
    
        try {
          const updatedProduct = {
            ...selectedProduct,
            profit: profit,
            sale_price: payout,
            shipping_fee: shippingFee,
            other_fee: parseFloat(otherFee),
            total_payout: payoutAfterFees,
            sold_date: soldDate.split('T')[0],
            platform: selectedPlatform,
          }
          // Send the updated product data to the server
          const response = await fetch(`http://localhost:3009/api/updateSoldEntry/${selectedProduct.sold_id}`, {
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
              value={selectedProduct.purchase_price}
              disabled
            />
          </div>
          {/* size input */}
          <div className="input-price-info ">
            <label className="price-input-label" htmlFor="Size">
              size
            </label>
            <input
            name="Size"
              className="input-info-ps prev-data"
              type="number"
              value={selectedProduct.sizes[0].value}
              disabled
            />
          </div>
          <div className="input-price-info ">
            <label className="price-input-label" htmlFor="purchaseDate">
            Date of Purchase
            </label>
            <input
            name="purchaseDate"
              className="input-info-ps prev-data"
              type="date"
              value={selectedProduct.acquisition_date.split('T')[0]}
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
              onChange={(e) => setNewPayout(e.target.value)}
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
              onChange={(e) => setNewShippingFee(Number(e.target.value))}
              
            />
          </div>
          {/* fees */}
          <div className="input-price-info">
            <label className="price-input-label" htmlFor="Fee">
              Other Fee's
            </label>
            <input
              name="Fee"
              className="input-info-ps profit-inp"
              type="number"
              value={otherFee}
              onBlur={handleBlur}
              onChange={(e) => setNewOtherFee(Number(e.target.value))}
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
              value={soldDate.split('T')[0]}
              onChange={(e) => {
                const newDate = e.target.value;
                setNewSoldDate(newDate !== currentDate ? newDate : currentDate);
              }}
            />
          </div>
          <div className="input-price-info">
            <label className="price-input-label" htmlFor="Platform">
              Platform
            </label>
            <DropdownButton
              intervals={sellingPlatform}
              buttonWidth="platform-btn"
              arrowSize="currency-btn-arrow-size"
              btnContainerWidth="platform-btn-ctn-width"
              dropdownWidth="drop-platform-btn-width"
              svg={null}
              onSelect={handlePlatformSelect}
              selectedValue={selectedPlatform}
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
                value={profit}
              onChange={(e) => setNewProfit(Number(e.target.value))}
            />
          </div>
        </div>

        <button className="submit-form-btn sold-btn-modal" type="submit">
          Update Item
        </button>
      </form>
    </div>
  )
}

export default EditSoldEntry