import { useState, useEffect } from "react";
import "./MainDashboard.css";
import BarChart from "./BarChart";
import DoughnutChart from "./pages/DoughnutChart";
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

const mainDashboard = () => {


  interface SoldEntry {
    product_name: string;
  size: string;
  purchase_price: number;
  product_sku: string;
  img_url: string;
  sizes: string | [];
  value: string;
  acquisition_date: string;
  total_cost: number;
  profit: number;
  total_payout: number;
  platform: string;
  }
  interface PlatformTally {
platform : string
count: number
  }

  // const [soldChartData, soldCetChartData] = useState({});
  const [fetchTrigger, setFetchTrigger] = useState(0);
  const [totalProfitData, setTotalProfit] = useState([]);
  const [sumProfit, setSumProfit] = useState(0);
  const [sumRev, setSumRev] = useState(0);
  const [totalSoldUnits, setTotalSoldUnits] = useState(0);
  const [totalStockUnits, setTotalStockUnits] = useState(0);
  const [totalProjProfit, setTotalProjProfit] = useState(0);
  const [totalStockCost, setTotalStockCost] = useState(0);
  const [recentSold, setRecentSold] = useState<SoldEntry[]>([]);
  const [platformTally, setPlatformTally] = useState<PlatformTally[]>([]);
  const [chartFilter, setChartFilter] = useState("YTD");
  const [customStartDate, setCustomStartDate] = useState('');
const [customEndDate, setCustomEndDate] = useState('');

  

  const handleChartDataUpdate = () => {
    setFetchTrigger((prev) => prev + 1);
  };



  // fetch the sold data
  const fetchSoldChartData = async () => {
    try {
      let apiUrl = `http://localhost:3009/api/solddata?filter=${chartFilter}`
      if (chartFilter === 'Custom'){
        apiUrl += `&start=${customStartDate}&end=${customEndDate}`;
      }
      const response = await fetch(apiUrl);
      if (response.ok) {
        const soldChartData = await response.json();
        console.log(soldChartData, "sold");

        //calculates the total payout/ revenue
        const sumAllRev = soldChartData.reduce(
          (sum, item) => sum + parseFloat(item.total_payout),
          0
        );
        setSumRev(sumAllRev.toLocaleString());

        // calculates the total profit
        const sumAllProfit = soldChartData.reduce(
          (sum, item) => sum + parseFloat(item.profit),
          0
        );
        setSumProfit(sumAllProfit.toLocaleString());

        // gets units sold
        const soldUnitCount = soldChartData.length;
        setTotalSoldUnits(soldUnitCount);

        // need to get all platforms sold and create a tally for pie chart

        //gets recent sold 
        const recentSoldItems = soldChartData.slice(0, 4)
        setRecentSold(recentSoldItems)

        // gets the platform of all sold items 
        const platformData = soldChartData.reduce((counts, item) => {
          const platform = item.platform;

          if(!counts[platform]){
            counts[platform] = 0
          }
          counts[platform]++  
          return counts;
        }, {});
        // Ensure all platforms are present with counts, defaulting to 0
      const allPlatforms = ["StockX", "Laced", "Ebay", "Alias", "Instagram", "Website", "Other"];

      const platformTallyResult = allPlatforms.map(platform => ({
        platform,
        count: platformData[platform] || 0
      }));
      setPlatformTally(platformTallyResult);

      console.log(platformTally, "platform");

        console.log(platformTallyResult, 'platform');

        // console.log(recentSoldItems, "recent sold")


        // group data by YTD 
        // group data by ALL Time 
        // group data by Custom  

        const groupedData = groupDataByTime(soldChartData, chartFilter);


     
        const monthNames = [
          "Jan",
          "Feb",
          "Mar",
          "Apr",
          "May",
          "Jun",
          "Jul",
          "Aug",
          "Sep",
          "Oct",
          "Nov",
          "Dec",
        ];
        
        const totalProfits = [...groupedData.entries()].map(([timeKey, timeData]) => {
          if (chartFilter === 'YTD') {
            // Grouping by month
            const [month, year] = timeKey.split("/");
            const monthLabel = `${monthNames[parseInt(month, 10) - 1]} ${year}`;
        
            const totalProfit = timeData.reduce(
              (sum, item) => sum + parseFloat(item.profit),
              0
            );
        
            return {
              label: monthLabel,
              value: totalProfit,
            };
          } else if (chartFilter === 'AllTime') {
            // Grouping by year
            const yearLabel = timeKey;
        
            const totalProfit = timeData.reduce(
              (sum, item) => sum + parseFloat(item.profit),
              0
            );
        
            return {
              label: yearLabel,
              value: totalProfit,
            };
          }
          else if (chartFilter === 'Custom'){

            const [month, year] = timeKey.split("/");
            const monthLabel = `${monthNames[parseInt(month, 10) - 1] } ${year}`;
        
            const totalProfit = timeData.reduce(
              (sum, item) => sum + parseFloat(item.profit),
              0
            );
        
            return {
              label: monthLabel,
              value: totalProfit,
            };
          }
        
          // Handle other cases or return default values
          return {};
        })
        .filter(item => item.label !== '') // Remove empty labels
        
        const sortedTotalProfits = totalProfits.flat().sort((a, b) => {
          const aDate = new Date(a.label);
          const bDate = new Date(b.label);
          return aDate - bDate;
        });

        
        
        setTotalProfit(sortedTotalProfits);
        console.log(sortedTotalProfits, 'haha')
     
     
      } else {
        console.error(
          "Error fetching data:",
          response.status,
          response.statusText
        );
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }




    
  };



  // fetches stock data 
  const fetchStockData = async () => {
    try {
      const response = await fetch("http://localhost:3009/api/stocklist");
      if (response.ok) {
        const stockChartData = await response.json();
        console.log(stockChartData);

        const totalSumStockCost = stockChartData.reduce(
          (sum, item) => sum + parseFloat(item.total_cost),
          0
        );
        setTotalStockCost(totalSumStockCost.toLocaleString());
        // gets stock units
        const stockUnitCount = stockChartData.length;
        setTotalStockUnits(stockUnitCount);

        // gets project profit for unsold stock
        const projectedStockProfit = stockChartData.reduce(
          (sum, item) => sum + parseFloat(item.expected_profit),
          0
        );
        setTotalProjProfit(projectedStockProfit.toLocaleString());

        // need to get 3 or 4 most recent sold
      } else {
        console.error(
          "Error fetching data:",
          response.status,
          response.statusText
        );
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const groupDataByTime = (data, filter) => {
    if (filter === 'YTD') {
      return data.reduce((groupedData, item) => {
        const date = new Date(item.sold_date);
        if (date.getFullYear() === new Date().getFullYear()) {
          const monthYear = `${date.getMonth() + 1}/${date.getFullYear()}`;
          if (!groupedData.has(monthYear)) {
            groupedData.set(monthYear, []);
          }
          groupedData.get(monthYear).push(item);
        }
        return groupedData;
      }, new Map());
    } else if (filter === 'AllTime') {
      return data.reduce((groupedData, item) => {
        const date = new Date(item.sold_date);
        const year = date.getFullYear();
        if (!groupedData.has(year)) {
          groupedData.set(year, []);
        }
        groupedData.get(year).push(item);
        return groupedData;
      }, new Map());
    } else if (filter === 'Custom') {
      return data.reduce((groupedData, item) => {
        const date = new Date(item.sold_date);
        const monthYear = `${date.getMonth() + 1}/${date.getFullYear()}`;
  
        if (!groupedData.has(monthYear)) {
          groupedData.set(monthYear, []);
        }
  
        groupedData.get(monthYear).push(item);
        return groupedData;
      }, new Map());
    }
  
    return new Map(); // Default to an empty map if no filter matches
  };

  const handleFilterClick = (filter) => {
console.log(customStartDate , "custom start date")
console.log(customEndDate)

    setChartFilter(filter);
    console.log(filter, "filter")
    handleChartDataUpdate(); // Trigger data fetch
  };

  
  const getMaxEndDate = (startDate) => {
    const maxEndDate = new Date(startDate);
    const currentDate = new Date();
  
    // Set the maximum date 11 months from the start date
    maxEndDate.setMonth(maxEndDate.getMonth() + 11);
  
    // If the calculated max end date is in the future, set it to the current date
    if (maxEndDate > currentDate) {
      return currentDate;
    }
  
    return maxEndDate;
  };


  // const handleCustomFilter = () => {
  //   setChartFilter("Custom");
  // handleChartDataUpdate()
  // }
  useEffect(() => {
    fetchSoldChartData();
    fetchStockData();
  }, [fetchTrigger]);

  useEffect(() => {
    // Execute when fetchTrigger, chartFilter, customStartDate change
    // (or any other dependencies that should trigger the general updates)
    // ...
  
    // Execute when fetchTrigger, chartFilter, customEndDate, customStartDate change
    if (chartFilter === 'Custom' && customEndDate && customStartDate) {
      fetchSoldChartData();
    }
  }, [fetchTrigger,chartFilter, customStartDate, customEndDate]);

  return (
    <div className="main-dash">
      <div className="page-header">
      <div className="filter-container">
      <div className={`filter-text ${chartFilter === "YTD" ? "active" : ""}`} onClick={() => handleFilterClick("YTD")}>
    YTD
  </div>
  <div className={`filter-text ${chartFilter === "AllTime" ? "active" : ""}`} onClick={() => handleFilterClick("AllTime")}>
    All Time
  </div>
  <div
            className={`filter-text ${chartFilter === 'Custom' ? 'active' : ''}`}
            onClick={() => handleFilterClick('Custom')}
          >
            Custom
          </div>
          {chartFilter === 'Custom' && (
            <div className="date-picker-container">
<DatePicker
  selected={customStartDate}
  onChange={(date) => {
    setCustomStartDate(date.toISOString().split('T')[0]);
            console.log(date, "date is ")}}
  selectsStart
  startDate={customStartDate}
  endDate={customEndDate}
  dateFormat="MM/yyyy" // Display only months and years
  showMonthYearPicker // Display only months and years
  maxDate={new Date()}
/>
<DatePicker
  selected={customEndDate}
  onChange={(date) => setCustomEndDate(date.toISOString().split('T')[0])}
  selectsEnd
  startDate={customStartDate}
  endDate={customEndDate}
  dateFormat="MM/yyyy" // Display only months and years
  showMonthYearPicker // Display only months and years
  maxDate={getMaxEndDate(customStartDate)}
  minDate={customStartDate}
/>
            </div>
          )}

      </div>
      </div>
      <div className="grid-container">
        <div className="card c1">
          <div className="line-graph-header-ctn">
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
            <BarChart data={totalProfitData} chartFilter={chartFilter}/>
          </div>
        </div>
        <div className="card c2">
          <h4 className="card-title">Recent Sales</h4>
        {recentSold.map((entry, index) => (
          <div key={index} className="recent-sold-dash-line">
            <div className="recent-sold-img-ctn">
              <img 
              className="product-img dash-prod-img"
              src={entry.img_url}
              alt="product img"
              />
            </div>
            <div className="recent-sold-name">
              {entry.product_name}
              <p className="product-sku dash-sku">
                {entry.product_sku}
              </p>
              
            </div>
            <div className="recent-sold-profit">
            $ {parseFloat(entry.profit) % 1 !== 0 ? parseFloat(entry.profit).toFixed(2) : parseInt(entry.profit, 10)}
            </div>
          </div>
        ))}
        </div>
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
        <div className="card c4">
          <div className="card-4-grid">
            
          <div className="inner-card ic5">
          <h4 className="card-title platform-title">Platform Data</h4>
{platformTally.sort((a, b) => b.count - a.count).map((entry, index) => (
    <div className="platform-data-ctn" key={index}>
    <div className="platform-number">{entry.count}</div>
    <p className="platform-name">{entry.platform}</p>
    </div>
))}
          </div>
          <div className="inner-card ic6">
            <div className="doughnut-chart-ctn">
            <DoughnutChart data={platformTally}/>
            </div>
          </div>

          </div>


        </div>
      </div>
    </div>
  );
};

export default mainDashboard;
