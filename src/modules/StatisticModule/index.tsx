"use client";

import React, { useState, useEffect } from "react";
import { useAuth } from "@/hooks/useAuth"; 
import CategoryPieChart from "./sections/CategoryPieChart";
import SummaryCards from "./sections/SummaryCards";
import MonthlyTrendsChart from "./sections/MonthlyTrendsChart";
import  { useRouter } from "next/navigation";

const StatisticsPageModule = () => {
  const { user, is_admin } = useAuth();
  const isAuthenticated = !!user;
  const [dataLoaded, setDataLoaded] = useState(false);
  const router = useRouter()

  useEffect(() => {
    if (isAuthenticated) {
      setDataLoaded(true);
    }
  }, [isAuthenticated]);

  if (!isAuthenticated) {
    // router.push("/login")
    return <p>Loading or please log in...</p>;
  }

  if (!dataLoaded) {
    return <p>Loading statistics...</p>;
  }

  return (
    <div className="p-6 space-y-10 min-h-screen">
      <h1 className="text-2xl font-bold">Financial Statistics</h1>

      <SummaryCards />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white p-4 rounded-xl shadow">
          <h2 className="text-lg font-semibold mb-2">Category Breakdown</h2>
          <CategoryPieChart />
        </div>

        <div className="bg-white p-4 rounded-xl shadow">
          <h2 className="text-lg font-semibold mb-2">Monthly Trends</h2>
          <MonthlyTrendsChart />
        </div>
      </div>
    </div>
  );
};

export default StatisticsPageModule;
