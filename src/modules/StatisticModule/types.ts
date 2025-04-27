  export interface SummaryStats {
    today: PeriodSummary;
    this_week: PeriodSummary;
    this_month: PeriodSummary;
    this_year: PeriodSummary;
    saldo: number;
  }
  
  export interface PeriodSummary {
    income: {
      total: number;
      count: number;
    };
    expenses: {
      total: number;
      count: number;
    };
    net: number;
  }

  export interface CategoryStats {
    category_id: number;
    category_name: string;
    total: number;
    count: number;
    percentage: number;
  }
  
  export interface MonthlyTrend {
    month: number;
    month_name: string;
    income: number;
    expenses: number;
    net: number;
  }
  