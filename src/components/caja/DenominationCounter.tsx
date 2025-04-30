import Button from "@/components/Button";

type DenominationCounterProps = {
  count: number;
  currentDenomination: number;
  onIncrement: (value: number) => void;
  onSave: () => void;
};

export default function DenominationCounter({
  count,
  currentDenomination,
  onIncrement,
  onSave,
}: DenominationCounterProps) {
  return (
    <div className="bg-background shadow-md rounded-xl p-5 border border-secondary/10">
      <div className="flex justify-between items-center mb-4">
        <span className="text-xl font-bold">
          {count} x ${currentDenomination.toLocaleString()}
        </span>
        <Button variant="success" size="sm" onClick={onSave}>
          Save
        </Button>
      </div>
      <div className="grid grid-cols-3 gap-2 sm:gap-3">
        <Button variant="primary" onClick={() => onIncrement(10)}>
          +10
        </Button>
        <Button variant="primary" onClick={() => onIncrement(5)}>
          +5
        </Button>
        <Button variant="primary" onClick={() => onIncrement(1)}>
          +1
        </Button>
        <Button variant="secondary" onClick={() => onIncrement(-1)}>
          -1
        </Button>
        <Button variant="secondary" onClick={() => onIncrement(-5)}>
          -5
        </Button>
        <Button variant="secondary" onClick={() => onIncrement(-10)}>
          -10
        </Button>
      </div>
    </div>
  );
}
