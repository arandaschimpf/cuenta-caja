import Button from "@/components/Button";
import HistoryItem from "./HistoryItem";

export type HistoryEntry = {
  date: string;
  total: number;
  counts: Record<number, number>;
};

type HistoryModalProps = {
  show: boolean;
  onClose: () => void;
  history: HistoryEntry[];
  openCollapsible: number | null;
  toggleCollapsible: (index: number) => void;
};

export default function HistoryModal({
  show,
  onClose,
  history,
  openCollapsible,
  toggleCollapsible,
}: HistoryModalProps) {
  if (!show) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
      <div className="bg-background rounded-xl p-5 w-full max-w-md max-h-[80vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">Count History</h2>
          <Button variant="secondary" size="sm" onClick={onClose}>
            Close
          </Button>
        </div>

        {history.length === 0 ? (
          <p className="text-center text-secondary py-4">No history yet</p>
        ) : (
          <div className="space-y-3">
            {history.map((entry, index) => (
              <HistoryItem
                key={index}
                entry={entry}
                isOpen={openCollapsible === index}
                onToggle={() => toggleCollapsible(index)}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
