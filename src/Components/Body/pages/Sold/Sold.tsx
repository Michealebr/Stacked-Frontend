import React, { useState, useEffect } from 'react'
import './Sold.css'
import SearchIcon from 'src/assets/Search.svg'
import FilterIcon from 'src/assets/Filter.svg'
import Edit from "src/assets/Edit.svg";
import Cross from "src/assets/X.svg";

import DropDownBtn from '@/Components/UsefulComponents/DropDownBtn'
import EditSoldModal from '../Sold/EditSoldModal';



const Sold: React.FC = () => {
  const productStockFilter = [
    { value: 'Size', label: 'Size' },
    { value: 'Newest', label: 'Newest' },
    { value: 'Oldest', label: 'Oldest' },
  ];
  interface SoldEntry {
    product_name: string;
  size: string;
  purchase_price: number;
  product_sku: string;
  img_url: string;
  sizes: string | [];
  value: string;
  acquisition_date: string;
  total_cost: number;
  profit: number;
  total_payout: number;
  platform: string;
  }

const [soldListEntries, setSoldListEntries] = useState<SoldEntry[]>([])
const [fetchTrigger, setFetchTrigger] = useState(0);
const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
const [isSoldEditBtnModalOpen, setSoldEditBtnModalOpen] = useState(false);

// updates soldlist ui
const handleSoldListUpdate = () => {
  setFetchTrigger((prev) => prev + 1);
}
// deletes sold list entry
const handleDeleteClick = async (productId: string) => {
  try {
    const response = await fetch(
      `http://localhost:3009/api/deleteSold/${productId}`,
      {
        method: "DELETE",
      }
    );
    console.log(productId);

    if (response.ok) {
      console.log("Sold Product deleted successfully");
      // Fetch updated data or update the UI accordingly
      setSoldListEntries((prevStockEntries) =>
        prevStockEntries.filter((entry) => entry.productId !== productId)
      );
      // setFetchTrigger((prev) => prev + 1);
      handleStockListUpdate()
    } else {
      const responseData = await response.json();
      console.error(
        "Error deleting product:",
        response.status,
        response.statusText,
        responseData.error
      );
      // Handle errors, show a message to the user, etc.
    }
  } catch (error) {
    console.error("Error deleting product:", error);
    // Handle errors, show a message to the user, etc.
  }
};


//gets the sold list data
  const fetchData  = async () => {
    try{
      const response = await fetch("http://localhost:3009/api/soldlist");
      if(response.ok){
        const data = await response.json();

        const formattedData = data.map(entry => ({
          ...entry,
          profit: Number(entry.profit).toLocaleString(),
          total_payout: Number(entry.total_payout).toLocaleString(),
          purchase_price: Number(entry.purchase_price).toLocaleString()
        }))

        setSoldListEntries(formattedData)
        console.log(formattedData)
      }else {
        console.error(
          "Error fetching data:",
          response.status,
          response.statusText
        );
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const fetchSoldDataForEdit = async (productId: string) => {
    try {
      // Fetch the existing data for the product
      const response = await fetch(`http://localhost:3009/api/updateSoldEntry/${productId}`);
  
      if (response.ok) {
        // Parse the response to get the existing product data
        const existingProductData = await response.json();
  
        // Set the selected product with the existing data
        setSelectedProduct(existingProductData);
        // Open the Edit modal
      
          setSoldEditBtnModalOpen(true);

      } else {
        // Handle error responses
        console.error(
          "Error fetching data:",
          response.status,
          response.statusText
        );
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };


  useEffect(() => {
    fetchData();
  }, [fetchTrigger]);

  const handleCloseBtnModal = () => {
    console.log("closing modal")
    setSoldEditBtnModalOpen(false);
  };
  const handleEditBtn = (productId: string) => {
    // Call the function to fetch and populate the modal with existing data
    fetchSoldDataForEdit(productId);
  };


  return (
    <>
      <div className="page page-layout">
        <div className="page-header">
          <div className="search-box">
            <img className="search-icon" src={SearchIcon} alt="search icon" />
            <input className="searchbar" type="text"></input>
          </div>
          <div className="btn-container">
            <DropDownBtn
              option={productStockFilter}
              svg={FilterIcon}
              content={"Filter"}
              leftIcon={true}
              textContent={true}
              rightIcon={false}
              dropDownDesign={"stock-filter"}
            />
          </div>
        </div>

        <div className="page-body">
          <table>
            <thead>
              <tr>
                <th className="th-title" id="img"></th>
                <th className="th-title" id="name-sku">Name & Sku</th>
                <th className="th-title" id="size">Size</th>
                <th className="th-title" id="purchase-price">Cost</th>
                <th className="th-title" id="expected-sale-price">Payout</th>
                <th className="th-title" id="expected-profit">P/L</th>
                <th className="th-title" id="expected-profit">Platform</th>
                <th className="th-title" id="purchase-date">Sold Date</th>
                <th className="th-title" id="Product-btn"></th>
              </tr>
            </thead>
            <tbody>
              {soldListEntries.map((entry, index) => (
                
                <tr key={index} className="product-line">
                  {/* <div className="info-container"> */}
                    <td>
                      <img
                        className="product-img"
                        src={entry.img_url}
                        alt="product img"
                      />
                    </td>
                    <td className="product-name">
                      {entry.product_name}
                      <p className="product-sku">{entry.product_sku}</p>
                    </td>

                    <td className="stock-text" id="size">
                      {" "}
                      {entry.sizes &&
                        entry.sizes.length > 0 &&
                        `UK ${entry.sizes[0].value}`}
                    </td>
                  {/* </div> */}
                  {/* <div className="product-price-container"> */}
                    <td className="stock-text total-cost-box">${entry.purchase_price}</td>
                    <td className="stock-text">${entry.total_payout}</td>
                    <td className="stock-text">${entry.profit}</td>
                    <td className="stock-text">{entry.platform}</td>

                  {/* </div> */}
                  <td className="stock-text date-box">
                    {entry.acquisition_date.split("T")[0]}
                  </td>
                  <td>
                    {/* <div className="icon-container"> */}
                      <button className="icon-btn"  
                      onClick={() => handleEditBtn(entry.sold_id)}
                      >
                        <img className="edit-icon" src={Edit} alt="edit" />
                      </button>
                      <button
                        className="icon-btn"
                        onClick={() => {
                          console.log(entry); // Log the entire entry object
                          handleDeleteClick(entry.sold_id);
                        }}
                      >
                        {" "}
                        <img className="edit-icon" src={Cross} alt="cross" />
                      </button>
                    {/* </div> */}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {/* all this needs to be looped  */}
        </div>
<EditSoldModal isOpen={isSoldEditBtnModalOpen} onClose={handleCloseBtnModal} selectedProduct={selectedProduct} updateStockList={handleSoldListUpdate}/>
      </div>
    </>
  )
}

export default Sold