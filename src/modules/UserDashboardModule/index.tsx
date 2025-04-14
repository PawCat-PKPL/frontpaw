"use client";

import { useState, useEffect } from "react";
import { useAuth } from "@/hooks/useAuth";
import { toast, Toaster } from "@/components/sonner";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { access } from "fs";

interface Category {
  id: number;
  name: string;
  type: "income" | "expense";
}

interface Transaction {
  id: number;
  type: "income" | "expense";
  amount: number;
  description: string;
  date: string;
  category: Category;
}

export const UserDashboardPageModule = () => {
  const { user, is_admin } = useAuth();
  const router = useRouter();
  const isAuthenticated = !!user;
  const API_URL = process.env.NEXT_PUBLIC_API_URL;

  console.log(isAuthenticated, user, is_admin);
  
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<"transactions" | "categories" | "statistic">("transactions");
  const [showTransactionForm, setShowTransactionForm] = useState(false);
  const [showCategoryForm, setShowCategoryForm] = useState(false);
  
  const [transactionForm, setTransactionForm] = useState({
    type: "expense",
    amount: "",
    description: "",
    category_id: "",
    category: "",
    date: new Date().toISOString().split('T')[0]
  });
  
  const [categoryForm, setCategoryForm] = useState({
    name: "",
    type: "expense"
  });

  // Fetch transactions and categories on component mount
  useEffect(() => {
    const fetchData = async () => {
      if (user === null) {
        router.push("/login");
        return;
      }

      try {
        await fetchCategories();
        await fetchTransactions();
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching dashboard data:", error);
        toast.error("Failed to load dashboard data");
        setIsLoading(false);
      }
    };

    fetchData();
  }, [user, router]);

  // Fetch transactions from API
  const fetchTransactions = async () => {
    try {
      const response = await fetch(`${API_URL}/dashboard/transactions`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      });

      const data = await response.json();
      
      if (response.ok) {
        setTransactions(data.data);
      } else {
        toast.error("Failed to fetch transactions");
      }
    } catch (error) {
      console.error("Error fetching transactions:", error);
      toast.error("Failed to fetch transactions");
    }
  };

  // Fetch categories from API
  const fetchCategories = async () => {
    try {

      const response = await fetch(`${API_URL}/dashboard/categories`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      });

      const data = await response.json();
      
      if (response.ok) {
        setCategories(data.data);
      } else {
        toast.error("Failed to fetch categories");
      }
    } catch (error) {
      console.error("Error fetching categories:", error);
      toast.error("Failed to fetch categories");
    }
  };

  // Handle transaction form input changes
  const handleTransactionChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setTransactionForm({
      ...transactionForm,
      [e.target.id]: e.target.value
    });
  };

  // Handle category form input changes
  const handleCategoryChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setCategoryForm({
      ...categoryForm,
      [e.target.id]: e.target.value
    });
  };

  // Submit new transaction
  const handleTransactionSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(`${API_URL}/dashboard/transactions`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({
          user:user?.user_id,
          category:transactionForm.category,
          category_id: parseInt(transactionForm.category_id),
          amount: parseFloat(transactionForm.amount),
          type: transactionForm.type,
          description: transactionForm.description,
          date: transactionForm.date
        })
      });

      const data = await response.json();
      
      if (response.ok) {
        toast.success("Transaction added successfully");
        setShowTransactionForm(false);
        setTransactionForm({
          type: "expense",
          amount: "",
          description: "",
          category_id: "",
          category: "",
          date: new Date().toISOString().split('T')[0]
        });
        fetchTransactions();
      } else {
        toast.error("Failed to add transaction");
      }
    } catch (error) {
      console.error("Error adding transaction:", error);
      toast.error("Failed to add transaction");
    }
  };

  // Submit new category
  const handleCategorySubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
			
      const response = await fetch(`${API_URL}/dashboard/categories/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({
          name: categoryForm.name,
          user: user?.user_id
        })
      });

      const data = await response.json();
      
      if (response.ok) {
        toast.success("Category created successfully");
        setShowCategoryForm(false);
        setCategoryForm({
          name: "",
          type: "expense"
        });
        fetchCategories();
      } else {
        toast.error("Failed to create category");
      }
    } catch (error) {
      console.error("Error creating category:", error);
      toast.error("Failed to create category");
    }
  };

  // Delete transaction
  const handleDeleteTransaction = async (id: number) => {
    if (!confirm("Are you sure you want to delete this transaction?")) return;
    
    try {
      const response = await fetch(`${API_URL}/dashboard/transactions/${id}/`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      });

      const data = await response.json();
      
      if (response.ok) {
        toast.success("Transaction deleted successfully");
        fetchTransactions();
      } else {
        toast.error("Failed to delete transaction");
      }
    } catch (error) {
      console.error("Error deleting transaction:", error);
      toast.error("Failed to delete transaction");
    }
  };

  // Delete category
  const handleDeleteCategory = async (id: number) => {
    if (!confirm("Are you sure you want to delete this category? All associated transactions will be affected.")) return;
    
    try {
      const response = await fetch(`${API_URL}/dashboard/categories/${id}/`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      });

      const data = await response.json();
      
      if (response.ok) {
        toast.success("Category deleted successfully");
        fetchCategories();
        fetchTransactions(); // Refresh transactions as they might be affected
      } else {
        toast.error("Failed to delete category");
      }
    } catch (error) {
      console.error("Error deleting category:", error);
      toast.error("Failed to delete category");
    }
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(amount);
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-xl font-bold">Loading...</div>
      </div>
    );
  }

  return (
    <section className="min-h-screen p-8 bg-gray-50">
      <Toaster />
      
      {/* Dashboard header */}
      <div className="max-w-6xl mx-auto mb-8">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-gray-800">Financial Dashboard</h1>
            <p className="text-gray-600">Welcome back, {user?.username || "User"}</p>
          </div>
          <div className="flex items-center space-x-4">
            <div className="bg-white p-4 rounded-lg shadow-md">
              <p className="text-sm text-gray-500">Current Balance</p>
              <p className="text-2xl font-bold text-[#FAA307]">{formatCurrency(user?.saldo || 0)}</p>
            </div>
            {activeTab === "transactions" && (
              <button
                onClick={() => setShowTransactionForm(true)}
                className="bg-[#FF7A00] hover:bg-[#F48C06] text-white font-bold rounded-lg px-4 py-2 focus:ring-4 focus:ring-blue-800"
              >
                Add Transaction
              </button>
            )}
            {activeTab === "categories" && (
              <button
                onClick={() => setShowCategoryForm(true)}
                className="bg-[#FF7A00] hover:bg-[#F48C06] text-white font-bold rounded-lg px-4 py-2 focus:ring-4 focus:ring-blue-800"
              >
                Add Category
              </button>
            )}
          </div>
        </div>
      </div>
      
      {/* Tab navigation */}
      <div className="max-w-6xl mx-auto mb-6">
        <div className="flex border-b border-gray-200">
          <button
            onClick={() => setActiveTab("transactions")}
            className={`py-3 px-6 font-medium ${
              activeTab === "transactions"
                ? "border-b-2 border-[#FF7A00] text-[#FF7A00]"
                : "text-gray-500 hover:text-gray-700"
            }`}
          >
            Transactions
          </button>
          <button
            onClick={() => setActiveTab("categories")}
            className={`py-3 px-6 font-medium ${
              activeTab === "categories"
                ? "border-b-2 border-[#FF7A00] text-[#FF7A00]"
                : "text-gray-500 hover:text-gray-700"
            }`}
          >
            Categories
          </button>
          <button
            onClick={() => setActiveTab("statistic")}
            className={`py-3 px-6 font-medium ${
              activeTab === "statistic"
                ? "border-b-2 border-[#FF7A00] text-[#FF7A00]"
                : "text-gray-500 hover:text-gray-700"
            }`}
          >
            Statistic
          </button>
        </div>
      </div>
      
      {/* Main content */}
      <div className="max-w-6xl mx-auto">
        {/* Transactions tab */}
        {activeTab === "transactions" && (
          <div className="bg-white rounded-xl shadow-md p-6">
            {transactions.length === 0 ? (
              <div className="text-center py-8">
                <p className="text-gray-500 mb-4">You haven't added any transactions yet</p>
                <button
                  onClick={() => setShowTransactionForm(true)}
                  className="bg-[#FF7A00] hover:bg-[#F48C06] text-white font-bold rounded-lg px-4 py-2 focus:ring-4 focus:ring-blue-800"
                >
                  Add Your First Transaction
                </button>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full table-auto">
                  <thead>
                    <tr className="text-left text-gray-500 border-b">
                      <th className="pb-3 font-medium">Date</th>
                      <th className="pb-3 font-medium">Description</th>
                      <th className="pb-3 font-medium">Category</th>
                      <th className="pb-3 font-medium">Amount</th>
                      <th className="pb-3 font-medium">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {transactions.map((transaction) => (
                      <tr key={transaction.id} className="border-b last:border-0 hover:bg-gray-50">
                        <td className="py-4">{formatDate(transaction.date)}</td>
                        <td className="py-4">{transaction.description}</td>
                        <td className="py-4">{transaction.category?.name || "Uncategorized"}</td>
                        <td className={`py-4 font-medium ${
                          transaction.type === "income" ? "text-green-600" : "text-red-600"
                        }`}>
                          {transaction.type === "income" ? "+" : "-"}{formatCurrency(transaction.amount)}
                        </td>
                        <td className="py-4">
                          <button
                            onClick={() => handleDeleteTransaction(transaction.id)}
                            className="text-red-600 hover:text-red-800"
                          >
                            Delete
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        )}
        
        {/* Categories tab */}
          {activeTab === "categories" && (
            <div className="bg-white rounded-xl shadow-md p-6">
              {categories.length === 0 ? (
                <div className="text-center py-8">
                  <p className="text-gray-500 mb-4">You haven't added any categories yet</p>
                  <button
                    onClick={() => setShowCategoryForm(true)}
                    className="bg-[#FF7A00] hover:bg-[#F48C06] text-white font-bold rounded-lg px-4 py-2 focus:ring-4 focus:ring-blue-800"
                  >
                    Add Your First Category
                  </button>
                </div>
              ) : (
                <div>
                  <h3 className="text-xl font-bold mb-4 text-gray-700">All Categories</h3>
                  <ul className="space-y-2">
                    {categories.map(category => (
                      <li key={category.id} className="flex justify-between items-center p-3 bg-gray-50 rounded">
                        <span>{category.name}</span>
                        <button
                          onClick={() => handleDeleteCategory(category.id)}
                          className="text-red-600 hover:text-red-800"
                        >
                          Delete
                        </button>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          )}

        {/* Statistic tab */}
          {activeTab === "statistic" && (
            <div className="bg-white rounded-xl shadow-md p-6">
              <h3 className="text-xl font-bold mb-4 text-gray-700">Statistics</h3>
            </div>
          )}
      </div>
      
      {/* Transaction form modal */}
      {showTransactionForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl shadow-lg p-6 w-full max-w-md">
            <h2 className="text-2xl font-bold mb-4">Add New Transaction</h2>
            <form onSubmit={handleTransactionSubmit}>
              <div className="mb-4">
                <label htmlFor="type" className="block mb-2 text-sm font-medium">
                  Type
                </label>
                <select
                  id="type"
                  value={transactionForm.type}
                  onChange={handleTransactionChange}
                  className="w-full p-2.5 bg-gray-100 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                  required
                >
                  <option value="expense">Expense</option>
                  <option value="income">Income</option>
                </select>
              </div>
              
              <div className="mb-4">
                <label htmlFor="amount" className="block mb-2 text-sm font-medium">
                  Amount
                </label>
                <input
                  type="number"
                  id="amount"
                  step="0.01"
                  min="0.01"
                  value={transactionForm.amount}
                  onChange={handleTransactionChange}
                  placeholder="0.00"
                  className="w-full p-2.5 bg-gray-100 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                  required
                />
              </div>
              
              <div className="mb-4">
                <label htmlFor="description" className="block mb-2 text-sm font-medium">
                  Description
                </label>
                <input
                  type="text"
                  id="description"
                  value={transactionForm.description}
                  onChange={handleTransactionChange}
                  placeholder="Transaction description"
                  className="w-full p-2.5 bg-gray-100 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                  required
                />
              </div>
              
              <div className="mb-4">
                <label htmlFor="category_id" className="block mb-2 text-sm font-medium">
                  Category
                </label>
                <select
                  id="category_id"
                  value={transactionForm.category_id}
                  onChange={handleTransactionChange}
                  className="w-full p-2.5 bg-gray-100 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                  required
                >
                  <option value="">Select a category</option>
                  {categories
                    .map(category => (
                      <option key={category.id} value={category.id}>
                        {category.name}
                      </option>
                    ))}
                </select>
              </div>
              
              <div className="mb-6">
                <label htmlFor="date" className="block mb-2 text-sm font-medium">
                  Date
                </label>
                <input
                  type="date"
                  id="date"
                  value={transactionForm.date}
                  onChange={handleTransactionChange}
                  className="w-full p-2.5 bg-gray-100 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                  required
                />
              </div>
              
              <div className="flex justify-end space-x-3">
                <button
                  type="button"
                  onClick={() => setShowTransactionForm(false)}
                  className="px-4 py-2 text-gray-700 bg-gray-200 rounded-lg hover:bg-gray-300"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-[#FF7A00] hover:bg-[#F48C06] text-white font-bold rounded-lg"
                >
                  Save Transaction
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
      
      {/* Category form modal */}
      {showCategoryForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl shadow-lg p-6 w-full max-w-md">
            <h2 className="text-2xl font-bold mb-4">Add New Category</h2>
            <form onSubmit={handleCategorySubmit}>
              <div className="mb-4">
                <label htmlFor="name" className="block mb-2 text-sm font-medium">
                  Category Name
                </label>
                <input
                  type="text"
                  id="name"
                  value={categoryForm.name}
                  onChange={handleCategoryChange}
                  placeholder="e.g. Groceries, Salary"
                  className="w-full p-2.5 bg-gray-100 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                  required
                />
              </div>
              
              <div className="mb-6">
                <label htmlFor="type" className="block mb-2 text-sm font-medium">
                  Type
                </label>
                <select
                  id="type"
                  value={categoryForm.type}
                  onChange={handleCategoryChange}
                  className="w-full p-2.5 bg-gray-100 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                  required
                >
                  <option value="expense">Expense</option>
                  <option value="income">Income</option>
                </select>
              </div>
              
              <div className="flex justify-end space-x-3">
                <button
                  type="button"
                  onClick={() => setShowCategoryForm(false)}
                  className="px-4 py-2 text-gray-700 bg-gray-200 rounded-lg hover:bg-gray-300"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-[#FF7A00] hover:bg-[#F48C06] text-white font-bold rounded-lg"
                >
                  Save Category
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </section>
  );
};