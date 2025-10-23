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
import { calculateSIPStepUp } from "@/lib/calculations";
import type { SIPStepUpInput } from "@shared/schema";

export default function SIPStepUpCalculator() {
  const [inputs, setInputs] = useState<SIPStepUpInput>({
    monthlyInvestment: 10000,
    durationYears: 10,
    expectedReturn: 12,
    annualIncrease: 10,
  });

  const results = calculateSIPStepUp(inputs);

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
            SIP Step-up Calculator
          </h1>
          <p className="text-muted-foreground" data-testid="text-calculator-description">
            Calculate returns with annually increasing investment amounts
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-6 mb-8">
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-card rounded-lg p-6 border space-y-6">
              <h2 className="text-xl font-semibold" data-testid="text-inputs-title">Investment Details</h2>
              
              <InputSlider
                label="Initial Monthly Investment"
                value={inputs.monthlyInvestment}
                onChange={(value) => setInputs({ ...inputs, monthlyInvestment: value })}
                min={500}
                max={1000000}
                step={500}
                prefix="₹"
                testId="monthly-investment"
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

              <InputSlider
                label="Annual Step-up Percentage"
                value={inputs.annualIncrease}
                onChange={(value) => setInputs({ ...inputs, annualIncrease: value })}
                min={0}
                max={100}
                step={1}
                suffix="%"
                testId="annual-increase"
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
                  invested: item.invested,
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
                { key: "monthlyInvestment", label: "Monthly SIP" },
                { key: "invested", label: "Total Invested" },
                { key: "value", label: "Total Value" },
                { key: "returns", label: "Returns" },
              ]}
            />
          </div>
        </div>

        <div className="mt-8">
          <Disclaimer />
        </div>
      </div>
    </div>
  );
}
