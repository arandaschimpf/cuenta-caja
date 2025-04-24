"use client";

import Button from "@/components/Button";
import { useState } from "react";

export default function CajaPage() {
  const denominations = [20000, 10000, 2000, 1000, 500, 200, 100, 50, 20, 10];
  const [currentDenominationIndex, setCurrentDenominationIndex] = useState(0);
  const [count, setCount] = useState(0);
  const [savedCounts, setSavedCounts] = useState<Record<number, number>>({});
  const [completed, setCompleted] = useState(false);

  const currentDenomination = denominations[currentDenominationIndex];

  const handleIncrement = (value: number) => {
    setCount((count) => Math.max(count + value, 0));
  };

  const handleSave = () => {
    const newSavedCounts = { ...savedCounts };
    if (count > 0) {
      newSavedCounts[currentDenomination] = count;
    } else {
      delete newSavedCounts[currentDenomination];
    }
    setSavedCounts(newSavedCounts);

    if (currentDenominationIndex === denominations.length - 1) {
      setCompleted(true);
    } else {
      setCurrentDenominationIndex(currentDenominationIndex + 1);
      setCount(0);
    }
  };

  const handleReset = () => {
    setCurrentDenominationIndex(0);
    setCount(0);
    setSavedCounts({});
    setCompleted(false);
  };

  const calculateTotal = () => {
    return Object.entries(savedCounts).reduce((total, [denom, count]) => {
      return total + Number(denom) * count;
    }, 0);
  };

  return (
    <div className="flex flex-col min-h-screen p-4 max-w-md mx-auto">
      <h1 className="text-2xl font-bold text-center mb-6 text-primary">
        Cash Counter
      </h1>

      <div className="flex-1 space-y-4">
        {!completed && (
          <div className="bg-background shadow-md rounded-xl p-5 border border-secondary/10">
            <div className="flex justify-between items-center mb-4">
              <span className="text-xl font-bold">
                {count} x ${currentDenomination.toLocaleString()}
              </span>
              <Button variant="success" size="sm" onClick={handleSave}>
                Save
              </Button>
            </div>
            <div className="grid grid-cols-3 gap-2 sm:gap-3">
              <Button variant="primary" onClick={() => handleIncrement(10)}>
                +10
              </Button>
              <Button variant="primary" onClick={() => handleIncrement(5)}>
                +5
              </Button>
              <Button variant="primary" onClick={() => handleIncrement(1)}>
                +1
              </Button>
              <Button variant="secondary" onClick={() => handleIncrement(-1)}>
                -1
              </Button>
              <Button variant="secondary" onClick={() => handleIncrement(-5)}>
                -5
              </Button>
              <Button variant="secondary" onClick={() => handleIncrement(-10)}>
                -10
              </Button>
            </div>
          </div>
        )}

        {Object.keys(savedCounts).length > 0 && (
          <div className="bg-background shadow-md rounded-xl p-5 border border-secondary/10">
            <h2 className="text-lg font-semibold mb-3 text-secondary">
              Saved Denominations
            </h2>
            <div className="space-y-3">
              {Object.entries(savedCounts)
                .sort(([a], [b]) => Number(b) - Number(a))
                .map(([denom, count]) => (
                  <div
                    key={denom}
                    className="flex justify-between items-center p-2 rounded-lg bg-secondary/5 hover:bg-secondary/10 transition-colors"
                  >
                    <span className="font-medium">
                      {count} x ${Number(denom).toLocaleString()}
                    </span>
                    <Button
                      variant="secondary"
                      size="sm"
                      onClick={() => {
                        setCurrentDenominationIndex(
                          denominations.indexOf(Number(denom))
                        );
                        setCount(count);
                        setCompleted(false);
                      }}
                    >
                      Edit
                    </Button>
                  </div>
                ))}
            </div>
          </div>
        )}

        <div className="bg-background shadow-md rounded-xl p-5 border border-secondary/10 mt-auto">
          <div className="flex justify-between items-center">
            <div>
              <span className="text-sm text-secondary">Total</span>
              <p className="text-2xl font-bold text-primary">
                ${calculateTotal().toLocaleString()}
              </p>
            </div>
            <Button
              variant="danger"
              onClick={handleReset}
              className="hover:scale-105 transition-transform"
            >
              Reset
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
