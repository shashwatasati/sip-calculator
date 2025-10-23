import { CalculatorCard } from "@/components/calculator-card";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { Coins, TrendingUp, Wallet, ArrowDownToLine, GitCompare, History } from "lucide-react";

export default function Home() {
  const calculators = [
    {
      title: "SIP Calculator",
      description: "Calculate returns on your Systematic Investment Plan with monthly investments over time.",
      icon: Coins,
      path: "/sip",
    },
    {
      title: "SIP Step-up Calculator",
      description: "Plan your investments with annual increment percentage for increased returns.",
      icon: TrendingUp,
      path: "/sip-stepup",
    },
    {
      title: "Lump Sum Calculator",
      description: "Calculate future value of your one-time investment with compound interest.",
      icon: Wallet,
      path: "/lumpsum",
    },
    {
      title: "SWP Calculator",
      description: "Plan systematic withdrawals from your investment corpus with remaining balance projections.",
      icon: ArrowDownToLine,
      path: "/swp",
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-12 max-w-7xl">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-4" data-testid="text-page-title">
            Financial Calculator Suite
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto" data-testid="text-page-subtitle">
            Make informed investment decisions with our comprehensive suite of financial calculators.
            Plan your future with accurate projections and downloadable reports.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {calculators.map((calculator) => (
            <CalculatorCard key={calculator.path} {...calculator} />
          ))}
        </div>

        <div className="mt-8 flex justify-center gap-4">
          <Link href="/compare">
            <Button size="lg" variant="outline" className="gap-2" data-testid="button-compare-scenarios">
              <GitCompare className="w-5 h-5" />
              Compare Scenarios
            </Button>
          </Link>
          <Link href="/history">
            <Button size="lg" variant="outline" className="gap-2" data-testid="button-view-history">
              <History className="w-5 h-5" />
              View History
            </Button>
          </Link>
        </div>

        <div className="mt-16 bg-card rounded-lg p-8 border">
          <h2 className="text-2xl font-semibold mb-4" data-testid="text-features-title">
            Why Use Our Calculators?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="space-y-2">
              <h3 className="font-semibold text-lg">Accurate Calculations</h3>
              <p className="text-sm text-muted-foreground">
                Based on proven financial formulas to give you precise investment projections.
              </p>
            </div>
            <div className="space-y-2">
              <h3 className="font-semibold text-lg">Visual Insights</h3>
              <p className="text-sm text-muted-foreground">
                Interactive charts and graphs to help you understand your investment growth.
              </p>
            </div>
            <div className="space-y-2">
              <h3 className="font-semibold text-lg">Downloadable Reports</h3>
              <p className="text-sm text-muted-foreground">
                Export your calculations as PDF or Excel for future reference and planning.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
