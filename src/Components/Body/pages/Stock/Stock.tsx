import React, { useState, useEffect  } from 'react';
import "./Stock.css"
import FilterIcon from 'src/assets/Filter.svg'
import AddIcon from 'src/assets/Add.svg'
import SearchIcon from 'src/assets/Search.svg'
import Edit from 'src/assets/Edit.svg'
import Sold from 'src/assets/Sold.svg'
import Cross from 'src/assets/X.svg'
import DropDownBtn from '@/Components/UsefulComponents/DropDownBtn'
import AddStockModal from './AddStockModal';
import EditStockModal from './EditStockModal';


interface StockEntry {
  productName: string;
  size: string;
  quantity: number;
  totalcost: number;
  sku: string;
  img: string;
  sizes: string | [];
  value: string;
  acquisitionDate: string;
  expectedSalePrice: number;
  expectedProfit: number
}


const Stock: React.FC = () => {

  const [isAddModalOpen, setAddModalOpen] = useState(false);
  const [isEditModalOpen, setEditModalOpen] = useState(false);
  const [stockEntries, setStockEntries] = useState<StockEntry[]>([]);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);


  const productStockFilter = [
    { value: 'Size', label: 'Size' },
    { value: 'Newest', label: 'Newest' },
    { value: 'Oldest', label: 'Oldest' },
 
  ];

  const handleAddClick = () => {
    setAddModalOpen(true);
  };

  // const handleEditClick = (productId: string) => {
  //   // Fetch data for the product based on productId
  //   // Set the data to a state variable
  //   // Open the Edit modal
  //   setEditModalOpen(true);
  // };
  const handleEditClick = (product: Product) => {
    // Fetch data for the product based on productId
    // Set the data to a state variable
    // Open the Edit modal
    setSelectedProduct(product);
    setEditModalOpen(true);
  };

  const handleCloseAddModal = () => {
    setAddModalOpen(false);
  };

  const handleCloseEditModal = () => {
    setEditModalOpen(false);
  };

// const handleFormSubmit = (formData: StockEntry) => {
//     if (selectedProduct) {
//       const newProductData: StockEntry = {
//         ...formData,
//       };

//       setStockEntries((prevStockEntries) => [...prevStockEntries, newProductData]);
//       console.log(newProductData);
//       // Optionally, you can reset the selected product
//       setSelectedProduct(null);
//     }
// };

// this works

// const handleFormSubmit = (formData: StockEntry) => {
//   if (selectedProduct) {
//     const { sizes, ...restFormData } = formData;

//     if (sizes && sizes.length > 0) {
//       // Create a new entry for each size and quantity
//       const newProductData = sizes.flatMap((size) => {
//         const entries = [];
//         for (let i = 0; i < size.quantity; i++) {
//           entries.push({
//             ...restFormData,
//             sizes: [{ ...size, quantity: 1 }],
//           });
//         }

//         return entries;
//       });
//       console.log(newProductData)
// // current state gets updated to previous stock and new products 
//       setStockEntries((prevStockEntries) => [...newProductData, ...prevStockEntries ]);
//     } else {
//       // If there are no sizes, just add the original entry
//       setStockEntries((prevStockEntries) => [...prevStockEntries, formData]);
//     }

//     // Optionally, you can reset the selected product
//     setSelectedProduct(null);
//   }
// };

const handleFormSubmit = async (formData: StockEntry) => {
  try {
    if (selectedProduct) {
      const { sizes , ...restFormData } = formData;

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
        console.log(newProductData)

        // Send the newProductData array to the server
        const response = await fetch('http://localhost:3009/api/submitStock', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          // body: JSON.stringify(newProductData),
          body: JSON.stringify( newProductData ),
        });

        if (response.ok) {
          // Optionally, handle success on the client side
          console.log('Data submitted successfully');
          // Reset the form or perform any other necessary actions

          fetchData();
        } else {
          const responseData = await response.json();
          console.error('Error submitting data:', response.status, response.statusText, responseData.details);
          // Handle errors, show a message to the user, etc.
        }
      }
    }
  } catch (error) {
    console.error('Error submitting data:', error);
    // Handle errors, show a message to the user, etc.
  }
};


useEffect(() => {
  const fetchData = async () => {
    try {
      const response = await fetch('http://localhost:3009/api/stocklist');
      if (response.ok) {
        const data = await response.json();
        setStockEntries(data);
      } else {
        console.error('Error fetching data:', response.status, response.statusText);
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  fetchData();
}, []); // The empty dependency array ensures this effect runs only once when the component mounts

  return (
    <>
    <div className='page page-layout'>
      <div className="page-header">
        <div className="search-box">
        <img className="search-icon" src={SearchIcon} alt='search icon' />
        <input className="searchbar"type='text'></input>
        </div>
        <div className="btn-container">
        <button className=' btn add-stock' onClick={handleAddClick}><span><img className='add-icon' src={AddIcon} alt="add icon" /></span>Add Stock</button>
       <DropDownBtn option={productStockFilter} svg={FilterIcon} content={"Filter"} leftIcon={true} textContent={true} rightIcon={false} dropDownDesign={'stock-filter'}/>
        </div>
      </div>
    
        <div className='page-body'>
          {/* each product  */}
          {/* <div className="product-line">
          <div className="info-container">
            <img className="product-img" src={Shoe}/>
            <div className="product-info-container">
              <h3 className="product-name">Jordan 1 high Lost and Found</h3>
              <p className="product-sku">DZ5485-612</p>
           </div>
           </div>
           <div className="product-price-container">
           <p className="product-size">10 UK</p>
            <p className="bought-price">$165</p>
            <p className="market-price">$300</p>
            <p className="projected-profit">$135</p>
            <p className="product-aquired-date">11/12/2023</p>

           </div>
           <div className="icon-container">
            <button className='icon-btn' onClick={handleEditClick}><img className='edit-icon' src={Edit} alt='edit'/></button>
            <button className='icon-btn'> <img className='edit-icon' src={Sold} alt='sold'/></button>
            <button className='icon-btn'> <img className='edit-icon' src={Cross} alt='cross'/></button>
           </div>
          </div> */}
          <table>
        <thead>
          <tr>
            <th id='img'></th>
            <th id='name-sku'></th>
            <th id='size'></th>
            <th id='purchase-price'></th>
            <th id='expected-sale-price'></th>
            <th id='expected-profit'></th>
            <th id='purchase-date'></th>
            <th id='Product-btn'></th>
          </tr>
        </thead>
        <tbody>
           {stockEntries.map((entry, index) => (
          <tr key={index} className='product-line'>
            <div className="info-container">
            <td>
              <img className="product-img" src={entry.img_url} alt="product img" />
            </td>
            <td className="product-name">
              {entry.product_name}
              <p className="product-sku">{entry.product_sku}</p>
            </td>
            
            <td className="stock-text" id='size'> {entry.sizes && entry.sizes.length > 0 && `UK ${entry.sizes[0].value}`}</td>
            </div>
            <div className="product-price-container">
            <td className="stock-text">${entry.purchase_price}</td>
            <td className="stock-text">${entry.expected_sale_price}</td>
            <td className="stock-text">{entry.expected_profit}</td>
            </div>
            <td className="stock-text">{entry.acquisition_date.split("T")[0]}</td>
            <td>
            <div className="icon-container">
            <button className='icon-btn' onClick={handleEditClick}><img className='edit-icon' src={Edit} alt='edit'/></button>
            <button className='icon-btn'> <img className='edit-icon' src={Sold} alt='sold'/></button>
            <button className='icon-btn'> <img className='edit-icon' src={Cross} alt='cross'/></button>
           </div>
            </td>

          </tr>
        ))}
      
        </tbody>
      </table>
          {/* all this needs to be looped  */}
        </div>
        <AddStockModal isOpen={isAddModalOpen} onClose={handleCloseAddModal} onProductSelect={handleEditClick} />
      <EditStockModal isOpen={isEditModalOpen} onClose={handleCloseEditModal} onFormSubmit={handleFormSubmit}  selectedProduct={selectedProduct}/>
    </div>
    </>

  )
}

export default Stock
  