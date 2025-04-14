"use client";
import React from "react";
import { Pie } from "react-chartjs-2";
import { useCategoryStats } from "@/modules/StatisticModule/hooks";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend);

const CategoryPieChart = () => {
  const data = useCategoryStats();
  if (!data.length) return <p>Loading...</p>;

  const chartData = {
    labels: data.map(d => d.category),
    datasets: [
      {
        data: data.map(d => d.percentage),
        backgroundColor: ["#f87171", "#60a5fa", "#34d399", "#facc15"],
      },
    ],
  };

  return <Pie data={chartData} />;
};

export default CategoryPieChart;
