import { useState } from "react";
import { Link } from "wouter";
import { ArrowLeft, TrendingUp, DollarSign, PiggyBank } from "lucide-react";
import { Button } from "@/components/ui/button";
import { InputSlider } from "@/components/input-slider";
import { ResultCard } from "@/components/result-card";
import { InvestmentChart } from "@/components/investment-chart";
import { GrowthChart } from "@/components/growth-chart";
import { BreakdownTable } from "@/components/breakdown-table";
import { DownloadButtons } from "@/components/download-buttons";
import { calculateSIP } from "@/lib/calculations";
import type { SIPInput } from "@shared/schema";
import jsPDF from "jspdf";
import * as XLSX from "xlsx";

export default function SIPCalculator() {
  const [inputs, setInputs] = useState<SIPInput>({
    monthlyInvestment: 10000,
    durationYears: 10,
    expectedReturn: 12,
  });

  const results = calculateSIP(inputs);

  const handleDownloadPDF = async () => {
    const doc = new jsPDF();
    
    doc.setFontSize(20);
    doc.text("SIP Calculator Report", 20, 20);
    
    doc.setFontSize(12);
    doc.text(`Monthly Investment: ₹${inputs.monthlyInvestment.toLocaleString()}`, 20, 40);
    doc.text(`Duration: ${inputs.durationYears} years`, 20, 50);
    doc.text(`Expected Return: ${inputs.expectedReturn}% p.a.`, 20, 60);
    
    doc.setFontSize(14);
    doc.text("Results:", 20, 80);
    doc.setFontSize(12);
    doc.text(`Total Value: ₹${results.totalValue.toLocaleString()}`, 20, 95);
    doc.text(`Invested Amount: ₹${results.investedAmount.toLocaleString()}`, 20, 105);
    doc.text(`Estimated Returns: ₹${results.estimatedReturns.toLocaleString()}`, 20, 115);
    
    doc.save("sip-calculator-report.pdf");
  };

  const handleDownloadExcel = async () => {
    const wb = XLSX.utils.book_new();
    
    const summaryData = [
      ["SIP Calculator Report"],
      [""],
      ["Inputs"],
      ["Monthly Investment", `₹${inputs.monthlyInvestment.toLocaleString()}`],
      ["Duration", `${inputs.durationYears} years`],
      ["Expected Return", `${inputs.expectedReturn}%`],
      [""],
      ["Results"],
      ["Total Value", `₹${results.totalValue.toLocaleString()}`],
      ["Invested Amount", `₹${results.investedAmount.toLocaleString()}`],
      ["Estimated Returns", `₹${results.estimatedReturns.toLocaleString()}`],
    ];
    
    const breakdownData = [
      ["Year", "Invested Amount", "Total Value", "Returns"],
      ...results.yearlyBreakdown.map((row) => [
        row.year,
        row.invested,
        row.value,
        row.returns,
      ]),
    ];
    
    const ws1 = XLSX.utils.aoa_to_sheet(summaryData);
    const ws2 = XLSX.utils.aoa_to_sheet(breakdownData);
    
    XLSX.utils.book_append_sheet(wb, ws1, "Summary");
    XLSX.utils.book_append_sheet(wb, ws2, "Yearly Breakdown");
    
    XLSX.writeFile(wb, "sip-calculator-report.xlsx");
  };

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
            SIP Calculator
          </h1>
          <p className="text-muted-foreground" data-testid="text-calculator-description">
            Calculate the future value of your Systematic Investment Plan
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-6 mb-8">
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-card rounded-lg p-6 border space-y-6">
              <h2 className="text-xl font-semibold" data-testid="text-inputs-title">Investment Details</h2>
              
              <InputSlider
                label="Monthly Investment"
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
                icon={DollarSign}
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
                { key: "invested", label: "Invested" },
                { key: "value", label: "Total Value" },
                { key: "returns", label: "Returns" },
              ]}
            />
          </div>
          <div>
            <DownloadButtons
              onDownloadPDF={handleDownloadPDF}
              onDownloadExcel={handleDownloadExcel}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
