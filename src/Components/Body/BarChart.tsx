
import { Bar, Line } from 'react-chartjs-2';
import { Chart, registerables } from 'chart.js';
Chart.register(...registerables);

interface ChartData {
  label: string;
  value: number;
}

const BarChart: React.FC<{ data: ChartData[]}> = ({ data }) => {

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
else if (maxDataValue < 10000 && maxDataValue > 5000) {
  maxAxisValue = 10000;   // Set a predefined max value, e.g., 2000
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