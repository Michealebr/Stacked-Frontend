import React, { useState, useEffect } from 'react'
import './Sold.css'
import SearchIcon from 'src/assets/Search.svg'
import FilterIcon from 'src/assets/Filter.svg'
import Edit from "src/assets/Edit.svg";
import Cross from "src/assets/X.svg";

import DropDownBtn from '@/Components/UsefulComponents/DropDownBtn'
import EditSoldModal from '../Sold/EditSoldModal';
import { useCurrency } from 'src/CurrencyContext'


const Sold: React.FC = () => {

  const { currency } = useCurrency();

  const productStockFilter = [
    { value: 'Recent', label: 'Recent' },
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
const [sortOrder, setSortOrder] = useState('Recent');
const [searchTermSold, setSearchTermSold] = useState("");

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
      handleSoldListUpdate()
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

        const sortedData = formattedData.slice().sort((a, b) => {
          const dateA = new Date(a.sold_date);
          const dateB = new Date(b.sold_date);
  
          return sortOrder === 'Recent' ? dateB - dateA : dateA - dateB;
        });



        setSoldListEntries(sortedData);

        // setSoldListEntries(formattedData)
        // console.log(formattedData)
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
  console.log(existingProductData)
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
  }, [sortOrder, fetchTrigger]);

  const handleCloseBtnModal = () => {
    console.log("closing modal")
    setSoldEditBtnModalOpen(false);
  };
  const handleEditBtn = (productId: string) => {
    // Call the function to fetch and populate the modal with existing data
    fetchSoldDataForEdit(productId);
  };
  function formatDate(dateString: string): string {
    const [year, month, day] = dateString.split('T')[0].split('-');
    return `${day}/${month}/${year}`;
  }   


  const handleSortChange = async (selectedOption) => {
    try {
      const response = await fetch(`http://localhost:3009/api/soldlist?sortOrder=${selectedOption.value}`);
      if (response.ok) {
        const data = await response.json();

        const formattedData = data.map(entry => ({
          ...entry,
          profit: Number(entry.profit).toLocaleString(),
          total_payout: Number(entry.total_payout).toLocaleString(),
          purchase_price: Number(entry.purchase_price).toLocaleString()
        }));

        const sortedData = formattedData.slice().sort((a, b) => {
          const dateA = new Date(a.sold_date);
          const dateB = new Date(b.sold_date);
  
          return sortOrder === 'Recent' ? dateB - dateA : dateA - dateB;
        });

        setSoldListEntries(sortedData);
        setSortOrder(selectedOption.value);
      } else {
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


  const filteredSoldEntries = soldListEntries.filter(
    (entry) =>
      entry.product_name.toLowerCase().includes(searchTermSold.toLowerCase()) ||
      entry.product_sku.toLowerCase().includes(searchTermSold.toLowerCase())
  );

  return (
    <>
      <div className="page page-layout">
        <div className="page-header">
          <div className="search-box">
            <img className="search-icon" src={SearchIcon} alt="search icon" />
            <input
            className="searchbar" 
            type="text"
            value={searchTermSold}
            onChange={(e) => {
              setSearchTermSold(e.target.value);
              console.log("Search Term:", e.target.value);
            }}
            />
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
              onClick={handleSortChange}
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
                <th className="th-title" id="cost">Cost</th>
                <th className="th-title" id="payout">Payout</th>
                <th className="th-title" id="p-l">P/L</th>
                <th className="th-title" id="platform">Platform</th>
                <th className="th-title" id="sold-date">Sold Date</th>
                <th className="th-title" id="sold-Product-btn"></th>
              </tr>
            </thead>
            <tbody>
            {(searchTermSold.length > 0 ? filteredSoldEntries : soldListEntries).map(
    (entry, index) =>(
                
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
                    <td className="stock-text total-cost-box">{currency}{entry.purchase_price}</td>
                    <td className="stock-text">{currency}{entry.total_payout}</td>
                    <td className="stock-text">{currency}{entry.profit}</td>
                    <td className="stock-text platform-box">{entry.platform}</td>

                  {/* </div> */}
                  <td className="stock-text date-box sold-date-box">
                  {entry.sold_date ? formatDate(entry.sold_date) : ''}
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