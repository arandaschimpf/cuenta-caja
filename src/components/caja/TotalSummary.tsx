import Button from "@/components/Button";

type TotalSummaryProps = {
  total: number;
  completed: boolean;
  onFinish: () => void;
  onReset: () => void;
};

export default function TotalSummary({
  total,
  completed,
  onFinish,
  onReset,
}: TotalSummaryProps) {
  return (
    <div className="bg-background shadow-md rounded-xl p-5 border border-secondary/10 mt-auto">
      <div className="flex justify-between items-center">
        <div>
          <span className="text-sm text-secondary">Total</span>
          <p className="text-2xl font-bold text-primary">
            ${total.toLocaleString()}
          </p>
        </div>
        <div className="flex gap-2">
          {completed && (
            <Button
              variant="success"
              onClick={onFinish}
              className="hover:scale-105 transition-transform"
            >
              Finish
            </Button>
          )}
          <Button
            variant="danger"
            onClick={onReset}
            className="hover:scale-105 transition-transform"
          >
            Reset
          </Button>
        </div>
      </div>
    </div>
  );
}
