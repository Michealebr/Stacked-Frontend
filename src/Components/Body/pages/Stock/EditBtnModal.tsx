import React, { useState } from 'react';
import EditExistingProducts from './EditExistingProducts';


interface EditBtnModalProps {
    isOpen: boolean;
    onClose: () => void;
    onProductSelect: (selectedProduct: Product) => void;
    selectedProduct: [];
  }

const EditBtnModal: React.FC<EditBtnModalProps> = ({ isOpen, onClose, selectedProduct}) => {
    // const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  
//    const handleProductSelect = (product: Product) => {
//       setSelectedProduct(product);
//       onProductSelect(product);
//     };
  
    if (!isOpen) {
      return null;
    }

  return (
    <div className={`modal modal1 ${isOpen ? 'open' : ''}`}>
      <div className="modal-content mc1 edit-modal">
      <EditExistingProducts onClose={onClose}  selectedProduct={selectedProduct} />
      </div>
    </div>
  )

}

export default EditBtnModal