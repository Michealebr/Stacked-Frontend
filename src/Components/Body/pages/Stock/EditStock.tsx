
import "./EditStock.css"

interface EditStockProps {
    onClose: () => void;
  }
  

  const EditStock: React.FC<EditStockProps> = ({ onClose }) => {
    // Your logic for handling the editing of an existing stock item
  
    return (
      <div>
        {/* Your JSX for the EditStock component */}
        <button onClick={onClose}>Close</button>
      </div>
    );
  };
  
  export default EditStock;