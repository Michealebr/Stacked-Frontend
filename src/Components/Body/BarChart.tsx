import React from 'react'
import { Bar } from 'react-chartjs-2';

const BarChart = ({ data }) => {

    console.log(data)

    if (!data || data.length === 0) {
        return <div>No data available for the chart.</div>;
      }
      const chartData = {
        labels: data.map(item => item.label),
        datasets: [{
          label: 'Total Profit',
          data: data.map(item => item.value),
          backgroundColor: 'rgba(75,192,192,0.6)',
          borderColor: 'rgba(75,192,192,1)',
          borderWidth: 0,
        }],
      };

      const options = {
        scales: {
          x: {
            type: 'category', // Ensure 'category' type for x-axis
          },
          y: {
            beginAtZero: true,
          },
        },
        plugins: {
          legend: {
            display: false,
            position: 'top', // You can change the legend position
          },
          title: {
            display: false,
            // text: 'Custom Bar Chart Title',
          },
        },
        tooltips: {
          mode: 'index',
          intersect: false,
        },
        responsive: true,
        maintainAspectRatio: false, // Set to false for custom aspect ratio
      };

  return (
    <>
    <Bar data={chartData} options={options} />
    </>
  )
}

export default BarChart