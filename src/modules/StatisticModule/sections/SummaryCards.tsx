"use client";
import React, { useState } from "react";
import { useSummaryStats } from "@/modules/StatisticModule/hooks";

const SummaryCards = () => {
  const [period, setPeriod] = useState("month");
  const data = useSummaryStats();

  if (!data) return <p>Loading...</p>;

  const getPeriodData = () => {
    switch (period) {
      case "day":
        return data.today;
      case "week":
        return data.this_week;
      case "month":
        return data.this_month;
      case "year":
        return data.this_year;
      default:
        return data.this_month;
    }
  };

  const periodData = getPeriodData();
  const incomeTotal = periodData?.income?.total || 0;
  const expenseTotal = periodData?.expenses?.total || 0;
  const balance = data.saldo || 0;

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-lg font-semibold">Summary</h2>
        <select
          className="border rounded p-1 text-sm"
          value={period}
          onChange={(e) => setPeriod(e.target.value)}
        >
          <option value="day">Today</option>
          <option value="week">This Week</option>
          <option value="month">This Month</option>
          <option value="year">This Year</option>
        </select>
      </div>
      
      <div className="grid grid-cols-3 gap-4">
        <div className="bg-white shadow-md p-4 rounded-xl">
          <h3 className="text-gray-600 font-medium">Income</h3>
          <p className="text-xl font-bold text-green-600">${incomeTotal}</p>
        </div>
        <div className="bg-white shadow-md p-4 rounded-xl">
          <h3 className="text-gray-600 font-medium">Expense</h3>
          <p className="text-xl font-bold text-red-600">${expenseTotal}</p>
        </div>
        <div className="bg-white shadow-md p-4 rounded-xl">
          <h3 className="text-gray-600 font-medium">Balance</h3>
          <p className="text-xl font-bold">${balance}</p>
        </div>
      </div>
    </div>
  );
};

export default SummaryCards;