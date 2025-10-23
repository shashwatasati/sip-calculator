import { useState } from "react";
import { Link } from "wouter";
import { ArrowLeft, TrendingUp, IndianRupee, PiggyBank } from "lucide-react";
import { Button } from "@/components/ui/button";
import { InputSlider } from "@/components/input-slider";
import { ResultCard } from "@/components/result-card";
import { InvestmentChart } from "@/components/investment-chart";
import { GrowthChart } from "@/components/growth-chart";
import { BreakdownTable } from "@/components/breakdown-table";
import { Disclaimer } from "@/components/disclaimer";
import { calculateLumpSum } from "@/lib/calculations";
import type { LumpSumInput } from "@shared/schema";

export default function LumpSumCalculator() {
  const [inputs, setInputs] = useState<LumpSumInput>({
    investment: 100000,
    durationYears: 10,
    expectedReturn: 12,
  });

  const results = calculateLumpSum(inputs);

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8 max-w-7xl">
        <Link href="/">
          <Button variant="ghost" className="mb-6" data-testid="button-back-home">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Home
          </Button>
        </Link>

        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold mb-2" data-testid="text-calculator-title">
            Lump Sum Calculator
          </h1>
          <p className="text-muted-foreground mb-4" data-testid="text-calculator-description">
            Calculate future value of your one-time investment
          </p>
          <Disclaimer />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-6 mb-8">
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-card rounded-lg p-6 border space-y-6">
              <h2 className="text-xl font-semibold" data-testid="text-inputs-title">Investment Details</h2>
              
              <InputSlider
                label="Investment Amount"
                value={inputs.investment}
                onChange={(value) => setInputs({ ...inputs, investment: value })}
                min={1000}
                max={10000000}
                step={1000}
                prefix="₹"
                testId="investment"
              />

              <InputSlider
                label="Investment Duration"
                value={inputs.durationYears}
                onChange={(value) => setInputs({ ...inputs, durationYears: value })}
                min={1}
                max={50}
                step={1}
                suffix="years"
                testId="duration"
              />

              <InputSlider
                label="Expected Return Rate"
                value={inputs.expectedReturn}
                onChange={(value) => setInputs({ ...inputs, expectedReturn: value })}
                min={1}
                max={30}
                step={0.5}
                suffix="% p.a."
                testId="return-rate"
              />
            </div>
          </div>

          <div className="lg:col-span-3 space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <ResultCard
                title="Total Value"
                value={results.totalValue}
                icon={TrendingUp}
                variant="primary"
                testId="total-value"
              />
              <ResultCard
                title="Invested Amount"
                value={results.investedAmount}
                icon={IndianRupee}
                variant="highlight"
                testId="invested-amount"
              />
              <ResultCard
                title="Estimated Returns"
                value={results.estimatedReturns}
                icon={PiggyBank}
                variant="success"
                testId="estimated-returns"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <InvestmentChart
                investedAmount={results.investedAmount}
                returns={results.estimatedReturns}
              />
              <GrowthChart
                data={results.yearlyBreakdown.map((item) => ({
                  year: item.year,
                  invested: results.investedAmount,
                  value: item.value,
                }))}
              />
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <BreakdownTable
              data={results.yearlyBreakdown}
              columns={[
                { key: "value", label: "Total Value" },
                { key: "returns", label: "Returns" },
              ]}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
