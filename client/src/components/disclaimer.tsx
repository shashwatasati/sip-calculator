import { Alert, AlertDescription } from "@/components/ui/alert";
import { Info } from "lucide-react";

export function Disclaimer() {
  return (
    <Alert className="bg-muted/50 border-muted-foreground/20" data-testid="disclaimer-alert">
      <Info className="h-4 w-4" />
      <AlertDescription className="text-sm text-muted-foreground ml-2">
        <span className="font-semibold text-foreground">Disclaimer:</span> The calculations provided by this tool are estimates based on the inputs provided and assumed rates of return. Actual investment returns may vary significantly based on market conditions, fund performance, and other factors. This calculator is for educational and planning purposes only and should not be considered as financial advice. Please consult with a qualified financial advisor before making investment decisions.
      </AlertDescription>
    </Alert>
  );
}
