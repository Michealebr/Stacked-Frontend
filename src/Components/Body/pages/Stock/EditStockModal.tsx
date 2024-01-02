import React, { useEffect } from 'react';
import EditStock from './EditStock';
import "./EditExistingProducts.css";
interface EditStockModalProps {
    isOpen: boolean;
    onClose: () => void;
    // onFormSubmit: (formData: StockEntry) => void;
    onFormSubmit: (selectedProduct: Product, formData: StockEntry) => void;
    selectedProduct: Product | null; 
  }

  const EditStockModal: React.FC<EditStockModalProps> = ({ isOpen, onClose, onFormSubmit, selectedProduct }) => {
    
    if (!isOpen) {
      return null;
    }
    useEffect(() => {
      const modal1 = document.querySelector('.modal1')
      const modal2 = document.querySelector('.modal2')
      const modalContent2 = document.querySelector('.mc2')
      if (modal1 && modal1.classList.contains('open')) {
        // If modal1 is open, remove a class to modal2 to disable blur
        modal2?.classList.remove('blur');
        modalContent2?.classList.remove('shadow')
      } else {
        // If modal1 is not open, add a class from modal2 to enable blur
        modal2?.classList.add('blur');
        modalContent2?.classList.add('shadow')

      }
    }, [isOpen]); // Run the effect whenever isOpen changes

  
  
    return (
      <div className="modal modal2">
        <div className="modal-content mc2">
          <EditStock onClose={onClose} onFormSubmit={onFormSubmit} selectedProduct={selectedProduct || {}} />
        </div>
      </div>
    );
  };

export default EditStockModal