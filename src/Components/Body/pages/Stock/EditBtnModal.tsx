// import React, { useState } from 'react';
import EditExistingProducts from './EditExistingProducts';


interface EditBtnModalProps {
    isOpen: boolean;
    onClose: () => void;
    onProductSelect: (selectedProduct: Product) => void;
    selectedProduct: Product;
    updateStockList: number
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
    acquisition_date: string
    shipping_cost: number

  }

const EditBtnModal: React.FC<EditBtnModalProps> = ({ isOpen, onClose, selectedProduct, updateStockList}) => {
  
    if (!isOpen) {
      return null;
    }
    console.log(selectedProduct)

  return (
    <div className={`modal modal1 ${isOpen ? 'open' : ''}`}>
      <div className="modal-content mc1 edit-modal">
      <EditExistingProducts onClose={onClose}  selectedProduct={selectedProduct} updateStockList={updateStockList} />
      </div>
    </div>
  )

}

export default EditBtnModal