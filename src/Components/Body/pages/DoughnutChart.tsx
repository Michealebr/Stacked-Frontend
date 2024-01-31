
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
            'rgb(233, 233, 233)',
'rgb(208, 208, 208)',
'rgb(180,180,180)',
'rgb(163,163,163)',
'rgb(147,147,147)',
'rgb(131,131,131)',
'rgb(99, 99, 99)'
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