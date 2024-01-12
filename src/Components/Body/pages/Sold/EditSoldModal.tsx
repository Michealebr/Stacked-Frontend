import React from 'react'
import EditSoldEntry from './EditSoldEntry'

interface EditSoldListModalProps {
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

const EditSoldModal: React.FC<EditSoldListModalProps> = ({ isOpen, onClose, selectedProduct, updateStockList }) => {
    if (!isOpen) {
        return null;
      }

    return (
     <div className={`modal poo modal1 ${isOpen ? 'open' : ''}`}>
      <div className="modal-content mc1 ">
      <EditSoldEntry onClose={onClose}  selectedProduct={selectedProduct} updateStockList={updateStockList}  />
      </div>
    </div>
  )
}

export default EditSoldModal