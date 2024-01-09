import React from 'react'
import AddSoldList from './AddSoldList';

interface SoldListModalProps {
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


  const SoldListModal: React.FC<SoldListModalProps> = ({ isOpen, onClose, selectedProduct, updateStockList}) => {
    if (!isOpen) {
        return null;
      }

  return (
     <div className={`modal modal1 ${isOpen ? 'open' : ''}`}>
      <div className="modal-content mc1 edit-modal">
      <AddSoldList onClose={onClose}  selectedProduct={selectedProduct} updateStockList={updateStockList} />
      </div>
    </div>
  )
}

export default SoldListModal

// import React, { useState } from 'react';
