import React from 'react'
import AddStock from './AddStock'
import "./Modal.css"

interface AddStockModalProps {
    isOpen: boolean;
    onClose: () => void;
    onProductSelect: any;
  }

const AddStockModal: React.FC<AddStockModalProps> = ({ isOpen, onClose, onProductSelect}) => {
  if (!isOpen) {
    return null;
  }

  return (
    <div className={`modal modal1 ${isOpen ? 'open' : ''}`}>
      <div className="modal-content mc1">
      <AddStock onClose={onClose} onProduct={onProductSelect}/>
      </div>
    </div>
  );
};

export default AddStockModal