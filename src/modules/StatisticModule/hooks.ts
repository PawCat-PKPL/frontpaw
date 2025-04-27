import { useEffect, useState } from "react";
import { SummaryStats, CategoryStats, MonthlyTrend } from "./types";

const API = process.env.NEXT_PUBLIC_API_URL;

export function useSummaryStats() {
  const [data, setData] = useState<SummaryStats | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetch(`${API}/dashboard/statistics/summary`, {
      credentials: "include", 
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error(`Failed to fetch: ${res.status}`);
        }
        return res.json();
      })
      .then((json) => {
        setData(json.data);
        setLoading(false);
      })
      .catch((error) => {
        setError(`Error fetching data: ${error.message}`);
        setLoading(false);
      });
  }, []);

  return data;
}

export function useCategoryStats(period = 'month', type = 'expense') {
  const [data, setData] = useState<CategoryStats[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    setLoading(true);
    fetch(`${API}/dashboard/statistics/categories?period=${period}&type=${type}`, {
      credentials: "include",
    })
      .then(res => {
        if (!res.ok) {
          throw new Error(`Failed to fetch: ${res.status}`);
        }
        return res.json();
      })
      .then(json => {
        setData(json.data || []);
        setLoading(false);
      })
      .catch(error => {
        console.error("Error fetching category data:", error);
        setLoading(false);
      });
  }, [period, type]);  

  return data;
}

export function useMonthlyTrends(year = new Date().getFullYear()) {
  const [data, setData] = useState<MonthlyTrend[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    setLoading(true);
    fetch(`${API}/dashboard/statistics/monthly-trends?year=${year}`, {
      credentials: "include",
    })
      .then(res => {
        if (!res.ok) {
          throw new Error(`Failed to fetch: ${res.status}`);
        }
        return res.json();
      })
      .then(json => {
        setData(json.data || []);
        setLoading(false);
      })
      .catch(error => {
        console.error("Error fetching monthly trends data:", error);
        setLoading(false);
      });
  }, [year]);

  return data;
}
