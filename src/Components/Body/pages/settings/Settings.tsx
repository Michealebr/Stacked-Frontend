import { useEffect  } from "react";
import './Settings.css'
import DropdownButton from '../../DropdownButton'
import { useCurrency } from 'src/CurrencyContext';

const currencyTable = [
  { value: "£", label: "Pounds £" },
  { value: "$", label: "Dollars $" },
  { value: "€", label: "Euro €" },
];

const sizePreference  = [
  { value: "UK", label: "UK" },
  { value: "EU", label: "EU" },
  { value: "US", label: "US" },
];

// need to add state management for both the size and the currency preference 

// these will need to be added to the users table so preferred currency will update the data in mysql about preferences and when that user logs in those will set the preferences 

// and then we can populate the users details which will show in settings so email name so and so
const Settings = () => {

  const { currency, setCurrency } = useCurrency();

  useEffect(() => {
    // This effect will be triggered whenever selectedPlatform changes
    console.log("Selected Currency:", currency);
  }, [currency]);

  const handleCurrencySelect = (selectedValue: string) => {
    setCurrency(selectedValue);
  };


  return (
    <div className="page page-layout settingpage">

      
      <div className='grid-setting-body'>
      <div className='card btn-card'>
        <div className='btn-row'>
      <label className="price-input-label" htmlFor="Platform">
      Primary currency 
            </label>
      <DropdownButton intervals={currencyTable}
      buttonWidth="setting-btns"
      btnContainerWidth="setting-btn-ctn-width"
      dropdownWidth="drop-setting-btn-width"
      onSelect={handleCurrencySelect}
      />
      </div>
      <div className='btn-row'>
      <label className="price-input-label" htmlFor="Platform">
      Size Preference 
            </label>
      <DropdownButton 
      intervals={sizePreference} 
      buttonWidth="setting-btns"
      btnContainerWidth="setting-btn-ctn-width"
      dropdownWidth="drop-setting-btn-width"
      />
      </div>
      </div>
      {/* <div className='card user-card'></div> */}
      
      </div>

    </div>
  )
}

export default Settings