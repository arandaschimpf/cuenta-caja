"use client";

import { useState } from "react";

export function TransactionForm() {
  const [type, setType] = useState<"income" | "expense">("income");
  const [amount, setAmount] = useState("");
  const [description, setDescription] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // This would submit to API in a real app
    console.log({
      type,
      amount: parseFloat(amount),
      description,
      date: new Date(),
    });

    // Reset form
    setAmount("");
    setDescription("");
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div className="grid grid-cols-2 gap-3 p-1 bg-secondary/10 rounded-lg">
        <button
          type="button"
          className={`py-2.5 px-4 rounded-md text-center ${
            type === "income"
              ? "bg-primary text-white font-medium shadow-sm"
              : "text-secondary"
          }`}
          onClick={() => setType("income")}
        >
          Income
        </button>
        <button
          type="button"
          className={`py-2.5 px-4 rounded-md text-center ${
            type === "expense"
              ? "bg-primary text-white font-medium shadow-sm"
              : "text-secondary"
          }`}
          onClick={() => setType("expense")}
        >
          Expense
        </button>
      </div>

      <div>
        <label
          htmlFor="amount"
          className="block text-sm font-medium text-secondary mb-1"
        >
          Amount
        </label>
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <span className="text-foreground sm:text-sm">$</span>
          </div>
          <input
            type="number"
            name="amount"
            id="amount"
            className="block w-full pl-8 pr-3 py-3 bg-background border border-secondary/20 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary"
            placeholder="0.00"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            required
          />
        </div>
      </div>

      <div>
        <label
          htmlFor="description"
          className="block text-sm font-medium text-secondary mb-1"
        >
          Description
        </label>
        <input
          type="text"
          name="description"
          id="description"
          className="block w-full px-3 py-3 bg-background border border-secondary/20 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary"
          placeholder="What is this transaction for?"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        />
      </div>

      <div>
        <label
          htmlFor="date"
          className="block text-sm font-medium text-secondary mb-1"
        >
          Date
        </label>
        <input
          type="date"
          name="date"
          id="date"
          className="block w-full px-3 py-3 bg-background border border-secondary/20 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary"
          defaultValue={new Date().toISOString().split("T")[0]}
        />
      </div>

      <button
        type="submit"
        className="w-full py-3 bg-primary hover:bg-primary/90 text-white font-medium rounded-lg shadow-sm mt-6"
      >
        Add Transaction
      </button>
    </form>
  );
}
