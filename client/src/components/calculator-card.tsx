import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { LucideIcon } from "lucide-react";

interface CalculatorCardProps {
  title: string;
  description: string;
  icon: LucideIcon;
  path: string;
}

export function CalculatorCard({ title, description, icon: Icon, path }: CalculatorCardProps) {
  return (
    <Card className="hover-elevate transition-all duration-300 group">
      <CardHeader className="space-y-4">
        <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
          <Icon className="w-6 h-6 text-primary" />
        </div>
        <div className="space-y-2">
          <CardTitle className="text-xl font-semibold" data-testid={`text-${path.slice(1)}-title`}>{title}</CardTitle>
          <CardDescription className="text-sm leading-relaxed" data-testid={`text-${path.slice(1)}-description`}>
            {description}
          </CardDescription>
        </div>
      </CardHeader>
      <CardContent>
        <Link href={path}>
          <Button className="w-full" data-testid={`button-calculate-${path.slice(1)}`}>
            Calculate Now
          </Button>
        </Link>
      </CardContent>
    </Card>
  );
}
