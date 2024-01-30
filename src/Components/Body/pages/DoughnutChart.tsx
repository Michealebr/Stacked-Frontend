
import { Bar, Line, Doughnut} from 'react-chartjs-2';
import { Chart, registerables } from 'chart.js';
Chart.register(...registerables);

interface ChartData {
    platform: string;
    count: number;
  }

const DoughnutChart: React.FC<{ data: ChartData[]}> = ({ data }) => {
console.log(data)
    const doughnutChartData = {
        labels: data.map(item => item.platform),
        type: 'doughnut',
        datasets: [{
          // label: 'Total Profit',
          data: data.map(item => item.count),
          backgroundColor: [
            'rgb(255, 205, 86)',
'rgb(86, 205, 255)',
'rgb(205, 86, 255)',
'rgb(255, 86, 205)',
'rgb(205, 255, 86)',
'rgb(86, 255, 205)',
'rgb(255, 86, 205)'
          ],
        }],

    }
        const options = {
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
            height: 150, // Set the height
        width: 350, // Set the width
          }


  return (
    <Doughnut data={doughnutChartData} options={options}/>
  )
}

export default DoughnutChart