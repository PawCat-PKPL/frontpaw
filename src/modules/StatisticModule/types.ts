export interface SummaryStats {
    total_income: number;
    total_expense: number;
    balance: number;
    period: string;
  }
  
  export interface CategoryStats {
    category: string;
    percentage: number;
  }
  
  export interface MonthlyTrend {
    month: string;
    income: number;
    expense: number;
  }
  