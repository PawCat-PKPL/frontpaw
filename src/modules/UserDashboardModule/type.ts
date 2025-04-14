export interface Transaction {
  id: number;
  category: number | null;
  amount: number;
  type: "income" | "expense";
  description?: string;
  date: string;
}

export interface Category {
  id: number;
  name: string;
}