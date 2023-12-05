import React from 'react'
import AddStock from './AddStock'
import "./Modal.css"

interface AddStockModalProps {
    isOpen: boolean;
    onClose: () => void;
  }

const AddStockModal: React.FC<AddStockModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) {
    return null;
  }

  return (
    <div className="modal">
      <div className="modal-content">
        <AddStock onClose={onClose} />
      </div>
    </div>
  );
};

export default AddStockModal