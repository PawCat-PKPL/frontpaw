"use client";
import React, { useState } from "react";
import { Line } from "react-chartjs-2";
import { useMonthlyTrends } from "@/modules/StatisticModule/hooks";
import {
  Chart as ChartJS,
  LineElement,
  PointElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
  ChartOptions,
} from "chart.js";

ChartJS.register(
  LineElement,
  PointElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend
);

const MonthlyTrendsChart = () => {
  const [year, setYear] = useState(new Date().getFullYear());
  const data = useMonthlyTrends(year);
  
  if (!data || !data.length) return <p>Loading monthly trends data...</p>;

  const chartData = {
    labels: data.map(d => d.month),
    datasets: [
      {
        label: "Income",
        data: data.map(d => d.income),
        borderColor: "#34d399",
        backgroundColor: "rgba(52, 211, 153, 0.2)",
        fill: true,
      },
      {
        label: "Expenses",
        data: data.map(d => d.expenses),
        borderColor: "#f87171",
        backgroundColor: "rgba(248, 113, 113, 0.2)",
        fill: true,
      },
    ],
  };

  const options: ChartOptions<'line'> = {
    responsive: true,
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          callback: function(value) {
            return '$' + value.toLocaleString();
          }
        }
      }
    },
    plugins: {
      tooltip: {
        callbacks: {
          label: function(context) {
            let label = context.dataset.label || '';
            if (label) {
              label += ': ';
            }
            if (context.parsed.y !== null) {
              label += '$' + context.parsed.y.toLocaleString();
            }
            return label;
          }
        }
      }
    }
  };

  const currentYear = new Date().getFullYear();
  const yearOptions = [];
  for (let y = currentYear; y >= currentYear - 5; y--) {
    yearOptions.push(y);
  }

  return (
    <div>
      <div className="flex justify-end">
        <select
          className="border rounded p-1 text-sm"
          value={year}
          onChange={(e) => setYear(parseInt(e.target.value))}
        >
          {yearOptions.map(y => (
            <option key={y} value={y}>{y}</option>
          ))}
        </select>
      </div>
      <div className="h-64">
        <Line data={chartData} options={options} />
      </div>
    </div>
  );
};

export default MonthlyTrendsChart;