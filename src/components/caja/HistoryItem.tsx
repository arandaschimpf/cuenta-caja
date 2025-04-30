import { HistoryEntry } from "./HistoryModal";

type HistoryItemProps = {
  entry: HistoryEntry;
  isOpen: boolean;
  onToggle: () => void;
};

export default function HistoryItem({
  entry,
  isOpen,
  onToggle,
}: HistoryItemProps) {
  return (
    <div className="border border-secondary/10 rounded-lg overflow-hidden">
      <div
        className="flex justify-between items-center p-3 bg-secondary/5 cursor-pointer"
        onClick={onToggle}
      >
        <div>
          <p className="font-medium">${entry.total.toLocaleString()}</p>
          <p className="text-sm text-secondary">{entry.date}</p>
        </div>
        <span
          className="transform transition-transform duration-200"
          style={{
            transform: isOpen ? "rotate(180deg)" : "rotate(0deg)",
          }}
        >
          ▼
        </span>
      </div>

      {isOpen && (
        <div className="p-3 bg-secondary/5 border-t border-secondary/10">
          <h3 className="text-sm font-medium mb-2">Denomination Breakdown</h3>
          <div className="space-y-1">
            {Object.entries(entry.counts)
              .sort(([a], [b]) => Number(b) - Number(a))
              .map(([denom, count]) => (
                <div key={denom} className="flex justify-between text-sm">
                  <span>
                    {count} x ${Number(denom).toLocaleString()}
                  </span>
                  <span>${(Number(denom) * count).toLocaleString()}</span>
                </div>
              ))}
          </div>
        </div>
      )}
    </div>
  );
}
