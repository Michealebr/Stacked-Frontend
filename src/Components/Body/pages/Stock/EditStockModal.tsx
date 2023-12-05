import React from 'react'
import EditStock from './EditStock';

interface EditStockModalProps {
    isOpen: boolean;
    onClose: () => void;
  }

  const EditStockModal: React.FC<EditStockModalProps> = ({ isOpen, onClose }) => {
    if (!isOpen) {
      return null;
    }
  
    return (
      <div className="modal">
        <div className="modal-content">
          <EditStock onClose={onClose} />
        </div>
      </div>
    );
  };

export default EditStockModal