import Button from "@/components/Button";

type SavedDenominationsProps = {
  savedCounts: Record<number, number>;
  onEdit: (denomination: number, count: number) => void;
};

export default function SavedDenominations({
  savedCounts,
  onEdit,
}: SavedDenominationsProps) {
  return (
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
                onClick={() => onEdit(Number(denom), count)}
              >
                Edit
              </Button>
            </div>
          ))}
      </div>
    </div>
  );
}
