"use client";
import { useState } from "react";
import CurrencySelect from "./CurrencySelect";

const ConverterForm = () => {
  const [amount, setAmount] = useState(100);
  const [fromCurrency, setFromCurrency] = useState("USD");
  const [toCurrency, setToCurrency] = useState("IDR");
  const [result, setResult] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showResult, setShowResult] = useState(false);

  const handleSwapCurrencies = () => {
    setFromCurrency(toCurrency);
    setToCurrency(fromCurrency);
  };

  const getExchangeRate = async () => {
    if (amount < 1) {
      setResult("Amount must be greater than 0");
      setShowResult(true);
      return;
    }

    setIsLoading(true);

    try {
      const response = await fetch(
        `/api/currency?from=${fromCurrency}&to=${toCurrency}&amount=${amount}`
      );
      if (!response.ok) throw Error("Something went wrong!");

      const data = await response.json();
      const rate = (data.conversion_rate * amount).toFixed(2);

      setResult(`${amount} ${fromCurrency} = ${rate} ${toCurrency}`);
      setShowResult(true);
    } catch {
      setResult("Something went wrong!");
      setShowResult(true);
    } finally {
      setIsLoading(false);
    }
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    getExchangeRate();
  };

  return (
    <div className="flex justify-center items-center min-h-screen">
      <div className="bg-white shadow-lg rounded-2xl p-6 w-96">
        <h2 className="text-xl font-semibold text-center mb-4">
          Currency Converter
        </h2>

        <form onSubmit={handleFormSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium">
              Enter Amount
            </label>
            <input
              type="number"
              className="w-full p-2 border rounded-lg mt-1"
              value={amount || ""}
              onChange={(e) => setAmount(Number(e.target.value))}
              required
            />
          </div>

          <div className="flex items-center justify-between gap-4">
            <div className="w-1/2">
              <label className="block text-sm font-medium">
                From
              </label>
              <CurrencySelect
                selectedCurrency={fromCurrency}
                handleCurrency={(e) =>
                  setFromCurrency(e.target.value)
                }
              />
            </div>

            <button
              type="button"
              className="p-2 border rounded-lg bg-gray-200"
              onClick={handleSwapCurrencies}
            >
              ⇄
            </button>

            <div className="w-1/2">
              <label className="block text-sm font-medium">To</label>
              <CurrencySelect
                selectedCurrency={toCurrency}
                handleCurrency={(e) => setToCurrency(e.target.value)}
              />
            </div>
          </div>

          <button
            type="submit"
            className="w-full p-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
            disabled={isLoading}
          >
            {isLoading ? "Loading..." : "Get Exchange Rate"}
          </button>
        </form>

        {showResult && (
          <div className="mt-4 p-3 bg-gray-100 text-center rounded-lg">
            {result}
          </div>
        )}
      </div>
    </div>
  );
};

export default ConverterForm;
