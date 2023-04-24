"use client";
import { Inter } from 'next/font/google'
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
  ScriptableContext,
} from 'chart.js';
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


interface ChartProps {
  title: string;
  chartData: {
    labels: string[];
    label: string;
    data: number[];
  };
}

const inter = Inter({ subsets: ['latin'] })

export default function Chart({ chartData, title }: ChartProps) {

  const data = () => {
    return {
      labels: chartData.labels,
      datasets: [{
        label: chartData.label,
        data: chartData.data,
        fill: "start",
        backgroundColor: (context: ScriptableContext<"line">) => {
          const ctx = context.chart.ctx;
          const gradient = ctx.createLinearGradient(0, 0, 0, 200);
          gradient.addColorStop(0, "rgb(132, 0, 255)");
          gradient.addColorStop(1, "rgba(132, 0, 255, 0)");
          gradient.addColorStop(0.5, "rgba(132, 0, 255, .5)");
          return gradient;
        },
        borderColor: "#8400ff"
      }]
    };
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as const,
      },
      title: {
        display: true,
        text: title,
      },
    },
  };

  return (
      <Line options={options} data={data()} />
  )
}