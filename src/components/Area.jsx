import React from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Filler,
  Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";


ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Filler,
  Legend
);

export const options = {
  responsive: true,
  plugins: {
    legend: {
      position: "top",
    },
    title: {
      display: true,
      text: "Monthly Donations",
    }
  },
  scales: {
    y: {
        ticks: {
            font: {
                size: 14,
            }
        }
    },
    x: {
        ticks: {
            font: {
                size: 14,
            }
        }
    }
}
,
elements:{
    point:{
        radius:7
    }
}
};

const labels = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

export const data = {
  labels,
  datasets: [
    {
      fill: true,
      label: "Amount in Rs",
      data: labels.map(()=>Math.random()*20000),
      borderColor: "rgb(180, 162, 235)",
      backgroundColor: "rgba(10, 162, 235, 0.3)",
    },
  ],
};

export default function App() {
  return <Line options={options} data={data} />;
}
