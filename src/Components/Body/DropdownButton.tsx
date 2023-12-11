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
}


const DropdownButton: React.FC<DropdownButtonProps> = ({ intervals , svg, btnContainerWidth, buttonWidth, dropdownWidth , arrowSize}) => {
  const [isClicked, setClick] = useState(false)
  const handleCLick = () => {
    setClick(!isClicked)
  }
  
  const [selectedInterval, setSelectedInterval] = useState<Interval>(intervals[0]);

 
 const handleIntervalClick = (interval: Interval) => {
   setSelectedInterval(interval)
   setClick(!isClicked)
 }

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
              // onClick={() => handleIntervalClick(interval)}
              onClick={(e) => {
                e.preventDefault()
                handleIntervalClick(interval)}}

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