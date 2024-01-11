import { useState } from 'react';
import Arrow from "src/assets/Arrow.svg"

interface Interval {
  value: string;
  label: string;
}

interface DropdownButtonProps {
  intervals: Interval[];
  svg: string | null 
  buttonWidth: string
  dropdownWidth: string
  btnContainerWidth: string
  arrowSize:string
  onSelect?: (selectedValue: string) => void;
}


const DropdownButton: React.FC<DropdownButtonProps> = ({ intervals , svg, btnContainerWidth, buttonWidth, dropdownWidth , arrowSize, onSelect}) => {
  const [isClicked, setClick] = useState(false)
  const handleCLick = () => {
    setClick(!isClicked)
  }
  
  const [selectedInterval, setSelectedInterval] = useState<Interval>(intervals[0]);
  // const [selectedValue, setSelectedValue] = useState<string | null>(null);
 
//  const handleIntervalClick = (interval: Interval) => {
//    setSelectedInterval(interval)
//    console.log(selectedInterval)
//    setClick(!isClicked)
//  }
const handleIntervalClick = (interval: { value: string; label: string }) => {
  setSelectedInterval(interval);
  setClick(false);

  if (onSelect) {
    onSelect(interval.value);
  }
};

//  const handleSelect = (value: string) => {
//     setSelectedValue(value);

//     if (onSelect) {
//       onSelect(value);
//     }
//   };

  return (
    <div className={`dropdown ${btnContainerWidth}`}>
        <div className="btn-container">
        
        <button className={`dropbtn ${buttonWidth}`} onClick={(e) => {
                e.preventDefault()
                handleCLick()}}
        >
                  {selectedInterval.label}
        <img className='cal-icon' src={svg}/>
        <img className={`arrow-icon ${arrowSize}`} src={Arrow}/>
        </button>
        
        </div>
        <div className={`dropdown-content ${dropdownWidth} ${isClicked? 'active': 'closed'}`}>
        {intervals.map((interval) => (
            <div
              key={interval.value}

              onClick={(e) => {
                e.preventDefault()
                handleIntervalClick(interval)
              }}

              className={selectedInterval.value === interval.value ? 'selected' : ''}
            >
              {interval.label}
            </div>
          ))}
        </div>
      </div>
  )
}

export default DropdownButton