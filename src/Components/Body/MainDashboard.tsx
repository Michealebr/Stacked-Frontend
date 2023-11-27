import { useState } from 'react';
import "./MainDashboard.css"
interface Interval {
  value: string;
  label: string;
}

const mainDashboard = () => {

  const [isClicked, setClick] = useState(false)
  const handleCLick = () => {
    setClick(!isClicked)
  }

 const [selectedInterval, setSelectedInterval] = useState<Interval>({ value: 'monthly', label: 'This Month' });
  const intervals: Interval[] = [
    { value: 'This month', label: 'This Month' },
    { value: '3months', label: '3 Months' },
    { value: '6months', label: '6 Months' },
    { value: 'This yearl', label: 'This Year' },
  ];
  const handleIntervalClick = (interval: Interval) => {
    setSelectedInterval(interval)
  }


  return (
    <div>
      <div className="filter-container">
      <div className="dropdown">
        <button className="dropbtn" onClick={handleCLick}>{selectedInterval.label}</button>
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
      </div>

      </div>
      <div className="grid">

      </div>
    </div>
  )
}

export default mainDashboard