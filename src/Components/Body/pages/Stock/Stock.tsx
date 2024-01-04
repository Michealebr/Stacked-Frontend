import React, { useState, useEffect } from "react";
import "./Stock.css";
import FilterIcon from "src/assets/Filter.svg";
import AddIcon from "src/assets/Add.svg";
import SearchIcon from "src/assets/Search.svg";
import Edit from "src/assets/Edit.svg";
import Sold from "src/assets/Sold.svg";
import Cross from "src/assets/X.svg";
import DropDownBtn from "@/Components/UsefulComponents/DropDownBtn";
import AddStockModal from "./AddStockModal";
import EditStockModal from "./EditStockModal";
import EditBtnModal from "./EditBtnModal";

interface StockEntry {
  product_name: string;
  size: string;
  quantity: number;
  purchase_price: number;
  product_sku: string;
  img_url: string;
  sizes: string | [];
  value: string;
  acquisition_date: string;
  expected_sale_price: number;
  expected_profit: number;
  total_cost: number;
}
interface Product {}

const Stock: React.FC = () => {
  const [isAddModalOpen, setAddModalOpen] = useState(false);
  const [isEditModalOpen, setEditModalOpen] = useState(false);
  const [isEditBtnModalOpen, setEditBtnModalOpen] = useState(false);
  const [stockEntries, setStockEntries] = useState<StockEntry[]>([]);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [fetchTrigger, setFetchTrigger] = useState(0);

  const productStockFilter = [
    { value: "Size", label: "Size" },
    { value: "Newest", label: "Newest" },
    { value: "Oldest", label: "Oldest" },
  ];

  const handleAddClick = () => {
    setAddModalOpen(true);
  };

  

  const handleEditClick = (product: Product) => {
    setSelectedProduct(product);
    setEditModalOpen(true);
  };

  const handleCloseAddModal = () => {
    setAddModalOpen(false);
  };

  const handleCloseEditModal = () => {
  
    setEditModalOpen(false);
  };

  const handleCloseBtnEditModal = () => {
    console.log("closing modal")
    setEditBtnModalOpen(false);
  };

  const handleStockListUpdate = () => {
    setFetchTrigger((prev) => prev + 1);
  }

  const handleFormSubmit = async (formData: StockEntry) => {
    try {
      if (selectedProduct) {
        const { sizes, ...restFormData } = formData;

        if (sizes && sizes.length > 0) {
          // Create a new entry for each size and quantity
          const newProductData = sizes.flatMap((size) => {
            const entries = [];
            for (let i = 0; i < size.quantity; i++) {
              entries.push({
                ...restFormData,
                sizes: [{ ...size, quantity: 1 }],
              });
            }

            return entries;
          });
          console.log(newProductData);

          // Send the newProductData array to the server
          const response = await fetch(
            "http://localhost:3009/api/submitStock",
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify(newProductData),
            }
          );

          if (response.ok) {
            // Optionally, handle success on the client side
            console.log("Data submitted successfully");
            // Reset the form or perform any other necessary actions
            // setFetchTrigger((prev) => prev + 1);
            handleStockListUpdate()
          } else {
            const responseData = await response.json();
            console.error(
              "Error submitting data:",
              response.status,
              response.statusText,
              responseData.details
            );
            // Handle errors, show a message to the user, etc.
          }
        }
      }
    } catch (error) {
      console.error("Error submitting data:", error);
      // Handle errors, show a message to the user, etc.
    }
  };
  // const fetchData = async () => {
  //   try {
  //     const response = await fetch("http://localhost:3009/api/stocklist");
  //     if (response.ok) {
  //       const data = await response.json();
  //       setStockEntries(data);
  //       console.log(data)
        
  //     } else {
  //       console.error(
  //         "Error fetching data:",
  //         response.status,
  //         response.statusText
  //       );
  //     }
  //   } catch (error) {
  //     console.error("Error fetching data:", error);
  //   }
  // };

  const fetchData = async () => {
    try {
      const response = await fetch("http://localhost:3009/api/stocklist");
      if (response.ok) {
        const data = await response.json();
  
        // Convert numeric fields to numbers
        const formattedData = data.map(entry => ({
          ...entry,
          total_cost: Number(entry.total_cost).toLocaleString(),
          expected_sale_price: Number(entry.expected_sale_price).toLocaleString(),
          expected_profit: Number(entry.expected_profit).toLocaleString()
          
          // Add more fields as needed
        }));
  
        setStockEntries(formattedData);
        console.log(formattedData);
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

  useEffect(() => {
    fetchData();
  }, [fetchTrigger]); // The empty dependency array ensures this effect runs only once when the component mounts

  // function to delete stocklist item

  // const handleDeleteClick = async (userId: string , productId: string) => {}

  const handleDeleteClick = async (productId: string) => {
    try {
      const response = await fetch(
        `http://localhost:3009/api/deleteStock/${productId}`,
        {
          method: "DELETE",
        }
      );
      console.log(productId);

      if (response.ok) {
        console.log("Product deleted successfully");
        // Fetch updated data or update the UI accordingly
        setStockEntries((prevStockEntries) =>
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

  // function to take to sold stock modal
  // function to edit stock item

  const fetchDataForEdit = async (productId: string) => {
    try {
      // Fetch the existing data for the product
      const response = await fetch(`http://localhost:3009/api/updateStock/${productId}`);
  
      if (response.ok) {
        // Parse the response to get the existing product data
        const existingProductData = await response.json();
  
        // Set the selected product with the existing data
        setSelectedProduct(existingProductData);
        // Open the Edit modal
        setEditBtnModalOpen(true);
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
  
  const handleEditBtn = (productId: string) => {
    // Call the function to fetch and populate the modal with existing data
    fetchDataForEdit(productId);
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
            <button className=" btn add-stock" onClick={handleAddClick}>
              <span>
                <img className="add-icon" src={AddIcon} alt="add icon" />
              </span>
              Add Stock
            </button>
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
                <th className="th-title" id="expected-sale-price">TSP</th>
                <th className="th-title" id="expected-profit">Projected P/L</th>
                <th className="th-title" id="purchase-date">Purchase Date</th>
                <th className="th-title" id="Product-btn"></th>
              </tr>
            </thead>
            <tbody>
              {stockEntries.map((entry, index) => (
                
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
                    <td className="stock-text total-cost-box">${entry.total_cost}</td>
                    <td className="stock-text">${entry.expected_sale_price}</td>
                    <td className="stock-text">{entry.expected_profit}</td>
                  {/* </div> */}
                  <td className="stock-text date-box">
                    {entry.acquisition_date.split("T")[0]}
                  </td>
                  <td>
                    {/* <div className="icon-container"> */}
                      <button className="icon-btn"  onClick={() => handleEditBtn(entry.stock_id)}>
                        <img className="edit-icon" src={Edit} alt="edit" />
                      </button>
                      <button className="icon-btn">
                        {" "}
                        <img className="edit-icon" src={Sold} alt="sold" />
                      </button>
                      <button
                        className="icon-btn"
                        onClick={() => {
                          console.log(entry); // Log the entire entry object
                          handleDeleteClick(entry.stock_id);
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
        <AddStockModal
          isOpen={isAddModalOpen}
          onClose={handleCloseAddModal}
          onProductSelect={handleEditClick}
        />
        <EditStockModal
          isOpen={isEditModalOpen}
          onClose={handleCloseEditModal}
          onFormSubmit={handleFormSubmit}
          selectedProduct={selectedProduct}
        />
        < EditBtnModal
        isOpen={isEditBtnModalOpen}
        onClose={handleCloseBtnEditModal}
        selectedProduct={selectedProduct}
        updateStockList={handleStockListUpdate}
        />
      </div>
    </>
  );
};

export default Stock;
