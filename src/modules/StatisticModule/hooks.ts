import { useEffect, useState } from "react";
import { SummaryStats, CategoryStats, MonthlyTrend } from "./types";

const API = process.env.NEXT_PUBLIC_API_URL;

export function useSummaryStats() {
  const [data, setData] = useState<SummaryStats | null>(null);

  useEffect(() => {
    fetch(`${API}/dashboard/statistics/summary`, {
      credentials: "include",
    })
      .then(res => res.json())
      .then(json => setData(json.data))
      .catch(console.error);
  }, []);

  console.log()
  console.log(data)

  return data;
}

export function useCategoryStats() {
  const [data, setData] = useState<CategoryStats[]>([]);

  useEffect(() => {
    fetch(`${API}/dashboard/statistics/categories`, {
      credentials: "include",
    })
      .then(res => res.json())
      .then(json => setData(json.data ?? []))
      .catch(console.error);
  }, []);  

  return data;
}

export function useMonthlyTrends() {
  const [data, setData] = useState<MonthlyTrend[]>([]);

  useEffect(() => {
    fetch(`${API}/dashboard/statistics/monthly-trends`, {
      credentials: "include",
    })
      .then(res => res.json())
      .then(json => setData(json.data))
      .catch(console.error);
  }, []);

  return data;
}
