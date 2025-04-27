"use client";
import React, { useState } from "react";
import { Pie } from "react-chartjs-2";
import { useCategoryStats } from "@/modules/StatisticModule/hooks";
import { Chart as ChartJS, ArcElement, Tooltip, Legend, ChartOptions } from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend);

const CategoryPieChart = () => {
  const [period, setPeriod] = useState("month");
  const [type, setType] = useState("expense");
  
  const categoryData = useCategoryStats(period, type);
  
  if (!categoryData || categoryData.length === 0) 
    return <p>No category data available for the selected period</p>;

  const generateColors = (count: number): string[] => {
    const colors: string[] = [];
    for (let i = 0; i < count; i++) {
      const hue = (i * 137) % 360;
      colors.push(`hsl(${hue}, 70%, 65%)`);
    }
    return colors;
  };

  const chartData = {
    labels: categoryData.map(d => d.category_name),
    datasets: [
      {
        data: categoryData.map(d => d.percentage),
        backgroundColor: generateColors(categoryData.length),
        borderWidth: 1,
      },
    ],
  };

  const options: ChartOptions<'pie'> = {
    plugins: {
      legend: {
        position: 'right' as const,
        labels: {
          boxWidth: 15,
          padding: 10,
        }
      },
      tooltip: {
        callbacks: {
          label: (context: any) => {
            const label = context.label || '';
            const value = context.parsed || 0;
            return `${label}: ${value.toFixed(1)}%`;
          }
        }
      }
    }
  };

  return (
    <div>
      <div className="flex justify-between">
        <select 
          className="border rounded p-1 text-sm"
          value={type}
          onChange={(e) => setType(e.target.value)}
        >
          <option value="expense">Expenses</option>
          <option value="income">Income</option>
        </select>
        
        <select 
          className="border rounded p-1 text-sm"
          value={period}
          onChange={(e) => setPeriod(e.target.value)}
        >
          <option value="week">This Week</option>
          <option value="month">This Month</option>
          <option value="year">This Year</option>
        </select>
      </div>
      <div className="h-64">
        <Pie data={chartData} options={options} />
      </div>
    </div>
  );
};

export default CategoryPieChart;