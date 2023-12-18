import React, { useState } from 'react';
import AddStock from './AddStock'
import "./Modal.css"

interface AddStockModalProps {
    isOpen: boolean;
    onClose: () => void;
    onProductSelect: (selectedProduct: Product) => void;
  }

const AddStockModal: React.FC<AddStockModalProps> = ({ isOpen, onClose, onProductSelect}) => {
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

 const handleProductSelect = (product: Product) => {
    setSelectedProduct(product);
    onProductSelect(product);
  };

  if (!isOpen) {
    return null;
  }

  return (
    <div className={`modal modal1 ${isOpen ? 'open' : ''}`}>
      <div className="modal-content mc1">
      <AddStock onClose={onClose} onProductSelect={handleProductSelect}/>
      </div>
    </div>
  );
};

export default AddStockModal