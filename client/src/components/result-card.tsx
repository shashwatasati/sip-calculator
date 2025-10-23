import { Card, CardContent } from "@/components/ui/card";
import { formatCurrency } from "@/lib/calculations";
import { LucideIcon } from "lucide-react";

interface ResultCardProps {
  title: string;
  value: number;
  icon: LucideIcon;
  variant?: "primary" | "success" | "highlight";
  testId?: string;
}

export function ResultCard({ title, value, icon: Icon, variant = "primary", testId }: ResultCardProps) {
  const bgColors = {
    primary: "bg-primary/5 border-primary/20",
    success: "bg-success/5 border-success/20",
    highlight: "bg-highlight/5 border-highlight/20",
  };

  const iconColors = {
    primary: "text-primary",
    success: "text-success",
    highlight: "text-highlight",
  };

  const textColors = {
    primary: "text-primary",
    success: "text-success",
    highlight: "text-highlight",
  };

  return (
    <Card className={`${bgColors[variant]} border-2`}>
      <CardContent className="p-6">
        <div className="flex items-start justify-between mb-3">
          <p className="text-sm font-medium text-muted-foreground" data-testid={`label-${testId}`}>
            {title}
          </p>
          <Icon className={`w-5 h-5 ${iconColors[variant]}`} />
        </div>
        <p className={`text-2xl md:text-3xl font-bold ${textColors[variant]} break-words`} data-testid={`value-${testId}`}>
          {formatCurrency(value)}
        </p>
      </CardContent>
    </Card>
  );
}
