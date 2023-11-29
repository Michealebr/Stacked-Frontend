import { useState } from 'react';
import Arrow from "src/assets/Arrow.svg"

interface Interval {
  value: string;
  label: string;
}

interface DropdownButtonProps {
  intervals: Interval[];
  svg: string  
}


const DropdownButton: React.FC<DropdownButtonProps> = ({ intervals , svg}) => {
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
    <div className="dropdown">
        <div className="btn-container">
        
        <button className="dropbtn" onClick={handleCLick}>{selectedInterval.label}
        <img className='cal-icon' src={svg}/>
        <img className='arrow-icon' src={Arrow}/>
        </button>
        
        </div>
        <div className={`dropdown-content ${isClicked? 'active': 'closed'}`}>
        {intervals.map((interval) => (
            <div
              key={interval.value}
              onClick={() => handleIntervalClick(interval)}
              className={selectedInterval.value === interval.value ? 'selected' : ''}
            >
              {interval.label}
            </div>
          ))}
        </div>
        {/* <svg className='not-in-use'>
  <filter id="goo">
    <feGaussianBlur in="SourceGraphic" stdDeviation="6" result="blur" />
    <feColorMatrix in="blur" type="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 18 -7" result="goo" />
    <feBlend in="SourceGraphic" in2="goo" />
  </filter>
</svg> */}
      </div>
  )
}

export default DropdownButton