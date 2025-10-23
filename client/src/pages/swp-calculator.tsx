import { useState } from "react";
import { Link } from "wouter";
import { ArrowLeft, TrendingUp, IndianRupee, ArrowDownCircle, Wallet } from "lucide-react";
import { Button } from "@/components/ui/button";
import { InputSlider } from "@/components/input-slider";
import { ResultCard } from "@/components/result-card";
import { Card } from "@/components/ui/card";
import { BreakdownTable } from "@/components/breakdown-table";
import { Disclaimer } from "@/components/disclaimer";
import { calculateSWP } from "@/lib/calculations";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";
import type { SWPInput } from "@shared/schema";

export default function SWPCalculator() {
  const [inputs, setInputs] = useState<SWPInput>({
    investment: 1000000,
    monthlyWithdrawal: 10000,
    durationYears: 10,
    expectedReturn: 12,
  });

  const results = calculateSWP(inputs);

  const chartData = results.yearlyBreakdown.map((item) => ({
    year: `Year ${item.year}`,
    "Remaining Corpus": item.remainingCorpus,
    "Total Withdrawn": item.withdrawn,
  }));

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
            SWP Calculator
          </h1>
          <p className="text-muted-foreground mb-4" data-testid="text-calculator-description">
            Plan your systematic withdrawal from investment corpus
          </p>
          <Disclaimer />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-6 mb-8">
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-card rounded-lg p-6 border space-y-6">
              <h2 className="text-xl font-semibold" data-testid="text-inputs-title">Withdrawal Details</h2>
              
              <InputSlider
                label="Initial Investment"
                value={inputs.investment}
                onChange={(value) => setInputs({ ...inputs, investment: value })}
                min={10000}
                max={100000000}
                step={10000}
                prefix="₹"
                testId="investment"
              />

              <InputSlider
                label="Monthly Withdrawal"
                value={inputs.monthlyWithdrawal}
                onChange={(value) => setInputs({ ...inputs, monthlyWithdrawal: value })}
                min={1000}
                max={1000000}
                step={1000}
                prefix="₹"
                testId="monthly-withdrawal"
              />

              <InputSlider
                label="Withdrawal Duration"
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
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <ResultCard
                title="Total Withdrawn"
                value={results.totalWithdrawn}
                icon={ArrowDownCircle}
                variant="highlight"
                testId="total-withdrawn"
              />
              <ResultCard
                title="Remaining Corpus"
                value={results.remainingCorpus}
                icon={Wallet}
                variant="primary"
                testId="remaining-corpus"
              />
              <ResultCard
                title="Initial Investment"
                value={results.investedAmount}
                icon={IndianRupee}
                variant="success"
                testId="invested-amount"
              />
              <ResultCard
                title="Total Returns"
                value={results.totalReturns}
                icon={TrendingUp}
                variant="success"
                testId="total-returns"
              />
            </div>

            <Card className="p-6">
              <h3 className="text-lg font-semibold mb-4" data-testid="text-chart-title">
                Corpus Projection
              </h3>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={chartData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                  <XAxis dataKey="year" tick={{ fontSize: 12 }} />
                  <YAxis
                    tick={{ fontSize: 12 }}
                    tickFormatter={(value) => {
                      if (value >= 10000000) return `₹${(value / 10000000).toFixed(1)}Cr`;
                      if (value >= 100000) return `₹${(value / 100000).toFixed(1)}L`;
                      if (value >= 1000) return `₹${(value / 1000).toFixed(0)}K`;
                      return `₹${value}`;
                    }}
                  />
                  <Tooltip
                    formatter={(value: number) =>
                      new Intl.NumberFormat("en-IN", {
                        style: "currency",
                        currency: "INR",
                        maximumFractionDigits: 0,
                      }).format(value)
                    }
                  />
                  <Legend />
                  <Bar dataKey="Remaining Corpus" fill="hsl(var(--chart-1))" />
                  <Bar dataKey="Total Withdrawn" fill="hsl(var(--chart-3))" />
                </BarChart>
              </ResponsiveContainer>
            </Card>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <BreakdownTable
              data={results.yearlyBreakdown}
              columns={[
                { key: "withdrawn", label: "Total Withdrawn" },
                { key: "remainingCorpus", label: "Remaining Corpus" },
                { key: "returns", label: "Returns" },
              ]}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
