import React from 'react';
import { Line } from 'react-chartjs-2';
import ProductCard from '../components/ProductCard';
import data from '../data.json';

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const Statistics = () => {
  const chartData = {
    labels: data.statistics.ordersCount.labels,
    datasets: [
      {
        label: 'Rendelések száma',
        data: data.statistics.ordersCount.data,
        borderColor: 'rgb(75, 192, 192)',
        tension: 0.1,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Rendelések Száma',
      },
    },
    scales: {
      y: {
        beginAtZero: true
      }
    }
  };

  return (
    <div>
      <h2>Statisztikák</h2>
      <div className="chart-container">
        <Line data={chartData} options={options} />
      </div>
      <h3>Legnépszerűbb termékek</h3>
      <div className="top-products-grid">
        {data.statistics.topSellingProducts.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
};

export default Statistics;