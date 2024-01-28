import { useRef, useEffect } from 'react';
// import { Bar } from 'react-chartjs-2';
import { Chart as chartjs } from 'chart.js/auto';
import { Bar, Line } from 'react-chartjs-2';
import { Chart, registerables } from 'chart.js';
Chart.register(...registerables);


// import {
//   Chart as ChartJS,
//   CategoryScale,
//   LinearScale,
//   BarElement,
//   Title,
//   Tooltip,
//   Legend,
// } from 'chart.js';
// import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';

// ChartJS.register(
//   CategoryScale,
//   LinearScale,
//   PointElement,
//   LineElement,
//   Title,
//   Tooltip,
//   Legend
// );

interface BarChartData {
  label: string;
  value: number;
}

const BarChart: React.FC<{ data: BarChartData[]}> = ({ data }) => {

    console.log(data)

    // const chartRef = useRef(null);

    // useEffect(() => {
    //   if (chartRef.current) {
    //     const chartInstance = (chartRef.current as any).chartInstance;
    //     if (chartInstance) {
    //       chartInstance.destroy();
    //     }
    //   }
    // }, [data]);

    // if (!data || data.length === 0) {
    //     return <div>No data available for the chart.</div>;
    //   }

    
// ChartJS.register(
//   CategoryScale,
//   LinearScale,
//   BarElement,
//   Title,
//   Tooltip,
//   Legend
// );



      const chartData = {
        labels: data.map(item => item.label),
        type: 'Line',
        datasets: [{
          // label: 'Total Profit',
          data: data.map(item => item.value),
          fill: true,
          backgroundColor: 'rgb(221, 221, 221, .6)',
          borderWidth: 2,
          pointRadius: 2,
          borderColor: 'rgb(221, 221, 221)',
          
        }],
      };

const maxDataValue = Math.max(...data.map(item => item.value));

let maxAxisValue;

if (maxDataValue < 200000 && maxDataValue > 100000) {
  maxAxisValue = 250000;  // Set a predefined max value, e.g., 30000
} else if (maxDataValue < 100000 && maxDataValue > 50000) {
  maxAxisValue = 100000;  // Set a predefined max value, e.g., 15000
} else if (maxDataValue < 50000 && maxDataValue > 30000) {
  maxAxisValue = 50000;   // Set a predefined max value, e.g., 7500
} else if (maxDataValue < 30000 && maxDataValue > 10000) {
  maxAxisValue = 30000;   // Set a predefined max value, e.g., 2000
}
else if (maxDataValue < 5000 && maxDataValue > 3000) {
  maxAxisValue = 5000;   // Set a predefined max value, e.g., 2000
}
else if (maxDataValue < 3000 && maxDataValue > 1000) {
  maxAxisValue = 3000;   // Set a predefined max value, e.g., 2000
}
 else {
  maxAxisValue = 1000;   // Set a default max value
}

const stepSize = maxAxisValue / 2;

// const maxAxisValueFormatted = maxAxisValue >= 1000 ? (maxAxisValue / 1000) + 'k' : maxAxisValue;
// const stepSizeFormatted = stepSize >= 1000 ? (stepSize / 1000) + 'k' : stepSize;

      const options = {
        scales: {

          
          x: {
            type: 'category',
            position: 'bottom',
            
            grid:{
              drawTicks: false,
              display: false,
              
            },
            ticks: {
              padding: 10,
              font:{
                family: 'laced',
                size: 11,
                
              }
            },

          },
          y: {
            type: 'linear',
            position: 'left',

            min: 0, 
            max: maxAxisValue,
            grid:{
              drawTicks: false,
              // drawOnChartArea: false,
            },


            ticks: {
              stepSize: stepSize,
              min: 0,
              padding: 10,
              // color: 'black',
              callback: function(value, index, values) {
                if (value >= 1000) {
                  return (value / 1000).toFixed(0) + 'k' ;
                } else {
                  return value;
                }
              },
              font:{
                // family: 'laced',
                size: 12,
              }
            },

          },
          
        },
        elements: {
          line: {
            // tension: 0.5
          }
        },
        plugins: {
          legend: {
            display: false,
            position: 'top',
          },
          title: {
            display: false,
          },
        },
        tooltips: {
          mode: 'index',
          intersect: false,
        },
        responsive: true,
        maintainAspectRatio: false,
        height: 200, // Set the height
    width: 500, // Set the width
      };

  return (
    <>
    <Line data={chartData} options={options}/>
    </>
  )
}

export default BarChart