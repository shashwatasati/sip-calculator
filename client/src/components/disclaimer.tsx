import { Alert, AlertDescription } from "@/components/ui/alert";
import { Info } from "lucide-react";

export function Disclaimer() {
  return (
    <Alert className="bg-blue-50 dark:bg-blue-950/20 border-blue-200 dark:border-blue-900" data-testid="disclaimer-alert">
      <Info className="h-4 w-4 text-blue-600 dark:text-blue-400" />
      <AlertDescription className="text-xs text-blue-800 dark:text-blue-300 ml-2">
        <span className="font-semibold">Disclaimer:</span> The calculations provided by this tool are estimates based on the inputs provided and assumed rates of return. Actual investment returns may vary significantly based on market conditions, fund performance, and other factors. This calculator is for educational and planning purposes only and should not be considered as financial advice. Please consult with a qualified financial advisor before making investment decisions.
      </AlertDescription>
    </Alert>
  );
}
