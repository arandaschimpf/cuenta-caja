import { TransactionForm } from "@/components/transaction/TransactionForm";
import { TransactionHeader } from "@/components/transaction/TransactionHeader";

export default function TransactionPage() {
  return (
    <div className="space-y-6">
      <TransactionHeader />
      <TransactionForm />
    </div>
  );
}
