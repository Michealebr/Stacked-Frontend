import { useState,  useEffect } from 'react';
import "./MainDashboard.css"
import Calander from "src/assets/Calander.svg"
import Stock from "src/assets/Stock.svg"
import DropdownButton from './DropdownButton';
import BarChart from './BarChart';


const mainDashboard = () => {

  // const [chartData, setChartData] = useState({});
  const [fetchTrigger, setFetchTrigger] = useState(0);
  const [totalProfitData , setTotalProfit] = useState([])
 
  const timeIntervals = [
    { value: 'This month', label: 'This Month' },
    { value: '3months', label: '3 Months' },
    { value: '6months', label: '6 Months' },
    { value: 'This year', label: 'This Year' },
  ];
  const products = [
    { value: 'All Products', label: 'All Products' },
    { value: 'Footwear', label: 'Footwear' },
    { value: 'Clothes', label: 'Clothes' },
    { value: 'Other', label: 'Other' },
 
  ];
  const handleChartDataUpdate = () => {
    setFetchTrigger((prev) => prev + 1);
  }

const fetchedChartData = async () => {

  try{
    const response = await fetch("http://localhost:3009/api/soldlist");
    if(response.ok){
      const chartData = await response.json();

      const groupedData = groupDataByMonth(chartData);

      const monthNames = [
        "Jan", "Feb", "Mar", "Apr", "May", "Jun",
        "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
      ];

const totalProfits = [...groupedData.entries()].map(([monthYear, monthData]) => {
  const [month, year] = monthYear.split('/');
  const monthLabel = `${monthNames[parseInt(month, 10) - 1]} ${year}`;
  
  const totalProfit = monthData.reduce((sum, item) => sum + parseFloat(item.profit), 0);

  return {
    label: monthLabel,
    value: totalProfit,
  };
});

setTotalProfit(totalProfits)

    }
    else {
      console.error(
        "Error fetching data:",
        response.status,
        response.statusText
      );
    }
  } catch (error) {
    console.error("Error fetching data:", error);
  }
  
}

const groupDataByMonth = (data) => {
  return data.reduce((groupedData, item) => {
    const date = new Date(item.sold_date);
    const monthYear = `${date.getMonth() + 1}/${date.getFullYear()}`;

    if (!groupedData.has(monthYear)) {
      groupedData.set(monthYear, []);
    }

    groupedData.get(monthYear).push(item);
    return groupedData;
  }, new Map());
};

useEffect(() => {
  fetchedChartData();
}, [fetchTrigger]);


  return (
    <div className='main-dash'>
      <div className="filter-container">
<DropdownButton intervals={timeIntervals} svg={Calander}/>
<DropdownButton intervals={products} svg={Stock}/>
     
      </div>
      <div className="grid-container">
        <div className="card c1">
        <BarChart data={totalProfitData} />
        </div>
        <div className="card c2"></div>
        <div className="card c3"></div>
        <div className="card c4"></div>

      </div>
    </div>
  )
}

export default mainDashboard