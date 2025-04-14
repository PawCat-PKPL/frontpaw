"use client";
import React from "react";
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
  const data = useMonthlyTrends();
  if (!data.length) return <p>Loading...</p>;

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
        label: "Expense",
        data: data.map(d => d.expense),
        borderColor: "#f87171",
        backgroundColor: "rgba(248, 113, 113, 0.2)",
        fill: true,
      },
    ],
  };

  return <Line data={chartData} />;
};

export default MonthlyTrendsChart;
