import { useState,  useEffect } from 'react';
import "./MainDashboard.css"
import Calander from "src/assets/Calander.svg"
import Stock from "src/assets/Stock.svg"
import DropdownButton from './DropdownButton';
import BarChart from './BarChart';


const mainDashboard = () => {

  // const [soldChartData, soldCetChartData] = useState({});
  const [fetchTrigger, setFetchTrigger] = useState(0);
  const [totalProfitData , setTotalProfit] = useState([])
  const [sumProfit , setSumProfit] = useState(0)
  const [sumRev , setSumRev] = useState(0)

  const [totalSoldUnits , setTotalSoldUnits] = useState(0)
  const [totalStockUnits , setTotalStockUnits] = useState(0)
  const [totalProjProfit , setTotalProjProfit] = useState(0)
  const [totalStockCost , setTotalStockCost] = useState(0)


 
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
// fetch the sold data 
const fetchSoldChartData = async () => {

  try{
    const response = await fetch("http://localhost:3009/api/soldlist");
    if(response.ok){
      const soldChartData = await response.json();
      console.log(soldChartData)

//calculates the total payout/ revenue 
const sumAllRev = soldChartData.reduce((sum, item) => sum + parseFloat(item.total_payout), 0)
setSumRev(sumAllRev.toLocaleString())

// calculates the total profit 
const sumAllProfit = soldChartData.reduce((sum, item) =>  sum +  parseFloat(item.profit),0)
setSumProfit(sumAllProfit.toLocaleString());
// gets units sold 
const soldUnitCount = soldChartData.length
setTotalSoldUnits(soldUnitCount)

// need to get all platforms sold and create a tally for pie chart 

      const groupedData = groupDataByMonth(soldChartData);

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

const fetchStockData = async () => {

  try{
    const response = await fetch("http://localhost:3009/api/stocklist");
    if(response.ok){
      const stockChartData = await response.json();
      console.log(stockChartData)

const totalSumStockCost  = stockChartData.reduce((sum, item) => sum + parseFloat(item.total_cost), 0)
setTotalStockCost(totalSumStockCost.toLocaleString())
// gets stock units 
const stockUnitCount = stockChartData.length
setTotalStockUnits(stockUnitCount)

// gets project profit for unsold stock
const projectedStockProfit = stockChartData.reduce((sum, item ) => sum + parseFloat(item.expected_profit), 0)
setTotalProjProfit(projectedStockProfit.toLocaleString())

// need to get 3 or 4 most recent sold 

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
  fetchSoldChartData();
  fetchStockData();
}, [fetchTrigger]);


console.log(totalProfitData)

  return (
    <div className='main-dash'>
      <div className="filter-container">
<DropdownButton intervals={timeIntervals} svg={Calander}/>
<DropdownButton intervals={products} svg={Stock}/>
     
      </div>
      <div className="grid-container">
        <div className="card c1">
          <div className='line-graph-header-ctn'>
            <div className="total-num-ctn">
              <p className="graph-title">Total Revenue</p>
              <div className="graph-number-ctn">
              <div className="graph-number">$ {sumRev}</div>
              <div className="graph-percentage"></div>
              </div>
            </div>
            <div className="total-num-ctn">
            <p className="graph-title">Total Profit</p>
            <div className="graph-number-ctn">
              <div className="graph-number">$ {sumProfit}</div>
              <div className="graph-percentage"></div>
            </div>
            </div>
            
          </div>
          <div className="line-chart-ctn">
          <BarChart data={totalProfitData} />
          </div>
        </div>
        <div className="card c2"></div>
        <div className="card c3">
          <div className="card-3-grid">
            <div className="inner-card ic1">
              <div className="inner-card-number">{totalStockUnits}</div>
              <p className="inner-card-title">Stock Units</p>
            </div>
            <div className="inner-card ic2">
            <div className="inner-card-number">{totalSoldUnits}</div>
              <p className="inner-card-title">Units Sold</p>
            </div>
            <div className="inner-card ic3">
            <div className="inner-card-number">$ {totalStockCost}</div>
              <p className="inner-card-title">Stock Cost</p>
            </div>
            <div className="inner-card ic4">
            <div className="inner-card-number">$ {totalProjProfit}</div>
              <p className="inner-card-title">Projected Profit</p>
            </div>
          </div>
        </div>
        <div className="card c4"></div>

      </div>
    </div>
  )
}

export default mainDashboard