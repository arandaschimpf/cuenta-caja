"use client";

import Button from "@/components/Button";
import DenominationCounter from "@/components/caja/DenominationCounter";
import SavedDenominations from "@/components/caja/SavedDenominations";
import TotalSummary from "@/components/caja/TotalSummary";
import HistoryModal, { HistoryEntry } from "@/components/caja/HistoryModal";
import { useEffect, useState } from "react";

export default function CajaPage() {
  const denominations = [20000, 10000, 2000, 1000, 500, 200, 100, 50, 20, 10];
  const [currentDenominationIndex, setCurrentDenominationIndex] = useState(0);
  const [count, setCount] = useState(0);
  const [savedCounts, setSavedCounts] = useState<Record<number, number>>({});
  const [completed, setCompleted] = useState(false);
  const [history, setHistory] = useState<HistoryEntry[]>([]);
  const [showHistoryModal, setShowHistoryModal] = useState(false);
  const [openCollapsible, setOpenCollapsible] = useState<number | null>(null);

  const currentDenomination = denominations[currentDenominationIndex];

  // Load history from localStorage on component mount
  useEffect(() => {
    const savedHistory = localStorage.getItem("countHistory");
    if (savedHistory) {
      try {
        setHistory(JSON.parse(savedHistory));
      } catch {
        console.error("Failed to parse history from localStorage");
      }
    }
  }, []);

  const handleIncrement = (value: number) => {
    setCount((count) => Math.max(count + value, 0));
  };

  const handleSave = () => {
    const newSavedCounts = { ...savedCounts, [currentDenomination]: count };
    setSavedCounts(newSavedCounts);

    if (currentDenominationIndex === denominations.length - 1) {
      setCompleted(true);
    } else {
      setCount(
        newSavedCounts[denominations[currentDenominationIndex + 1]] ?? 0
      );
      setCurrentDenominationIndex(currentDenominationIndex + 1);
    }
  };

  const saveToHistory = () => {
    const total = calculateTotal();
    const newEntry: HistoryEntry = {
      date: new Date().toLocaleString(),
      total,
      counts: { ...savedCounts },
    };

    // Keep only the most recent 10 entries
    const updatedHistory = [newEntry, ...history].slice(0, 10);
    setHistory(updatedHistory);
    localStorage.setItem("countHistory", JSON.stringify(updatedHistory));
    handleReset();
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

  const handleEdit = (denomination: number, count: number) => {
    setCurrentDenominationIndex(denominations.indexOf(denomination));
    setCount(count);
    setCompleted(false);
  };

  const toggleCollapsible = (index: number) => {
    setOpenCollapsible(openCollapsible === index ? null : index);
  };

  return (
    <div className="flex flex-col p-4 max-w-md mx-auto">
      <h1 className="text-2xl font-bold text-center mb-6 text-primary">
        Cash Counter
      </h1>

      <div className="flex-1 space-y-4">
        {!completed && (
          <DenominationCounter
            count={count}
            currentDenomination={currentDenomination}
            onIncrement={handleIncrement}
            onSave={handleSave}
          />
        )}

        {Object.keys(savedCounts).length > 0 && (
          <SavedDenominations savedCounts={savedCounts} onEdit={handleEdit} />
        )}

        <TotalSummary
          total={calculateTotal()}
          completed={completed}
          onFinish={saveToHistory}
          onReset={handleReset}
        />

        {/* History button */}
        <Button
          variant="secondary"
          className="w-full"
          onClick={() => setShowHistoryModal(true)}
        >
          View History
        </Button>
      </div>

      <HistoryModal
        show={showHistoryModal}
        onClose={() => setShowHistoryModal(false)}
        history={history}
        openCollapsible={openCollapsible}
        toggleCollapsible={toggleCollapsible}
      />
    </div>
  );
}
