"use client";
import React from "react";
import { useSummaryStats } from "@/modules/StatisticModule/hooks";

const SummaryCards = () => {
  const data = useSummaryStats();

  if (!data) return <p>Loading...</p>;

  return (
    <div className="grid grid-cols-3 gap-4 p-4">
      <div className="bg-white shadow-md p-4 rounded-xl">
        <h3>Income</h3>
        <p>${data.total_income}</p>
      </div>
      <div className="bg-white shadow-md p-4 rounded-xl">
        <h3>Expense</h3>
        <p>${data.total_expense}</p>
      </div>
      <div className="bg-white shadow-md p-4 rounded-xl">
        <h3>Balance</h3>
        <p>${data.balance}</p>
      </div>
    </div>
  );
};

export default SummaryCards;
