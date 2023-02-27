import React from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';

ChartJS.register(ArcElement, Tooltip, Legend);

export const data = {
  labels: ['Health', 'Shelter', 'Education', 'Food', 'Animals', 'Clothes'],
  datasets: [
    {
      label: 'Amounts Recieved',
      data: [12, 8, 3, 9, 2, 5],
      backgroundColor: [
        'rgba(255, 99, 132, 0.7)',
        'rgba(54, 162, 235, 0.7)',
        'rgba(255, 206, 86, 0.7)',
        'rgba(109, 191, 192, 0.7)',
        'rgba(153, 102, 255, 0.7)',
        'rgba(255, 99, 64, 0.7)',
      ],
      borderColor: [
        'rgba(255, 99, 132, 1)',
        'rgba(54, 162, 235, 1)',
        'rgba(255, 206, 86, 1)',
        'rgba(75, 192, 192, 1)',
        'rgba(153, 102, 255, 1)',
        'rgba(255, 99, 64, 1)',
      ],
      borderWidth: 3,
    },
  ],
};

export default function App() {
  return <Doughnut data={data} />;
}
