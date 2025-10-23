import { useState } from "react";
import { Link } from "wouter";
import { ArrowLeft, Plus, X, Copy } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { InputSlider } from "@/components/input-slider";
import { ResultCard } from "@/components/result-card";
import { calculateSIP, calculateSIPStepUp, calculateLumpSum, calculateSWP, formatCurrency } from "@/lib/calculations";
import { TrendingUp, DollarSign, PiggyBank } from "lucide-react";
import type { SIPInput, SIPStepUpInput, LumpSumInput, SWPInput } from "@shared/schema";

type CalculatorType = "sip" | "sip-stepup" | "lumpsum" | "swp";

interface Scenario {
  id: string;
  name: string;
  type: CalculatorType;
  inputs: SIPInput | SIPStepUpInput | LumpSumInput | SWPInput;
}

const defaultInputs = {
  sip: { monthlyInvestment: 10000, durationYears: 10, expectedReturn: 12 },
  "sip-stepup": { monthlyInvestment: 10000, durationYears: 10, expectedReturn: 12, annualIncrease: 10 },
  lumpsum: { investment: 100000, durationYears: 10, expectedReturn: 12 },
  swp: { investment: 1000000, monthlyWithdrawal: 10000, durationYears: 10, expectedReturn: 12 },
};

export default function Comparison() {
  const [scenarios, setScenarios] = useState<Scenario[]>([
    {
      id: "1",
      name: "Scenario 1",
      type: "sip",
      inputs: defaultInputs.sip,
    },
  ]);
  const [nextId, setNextId] = useState(2);

  const addScenario = () => {
    const newId = nextId.toString();
    setScenarios([
      ...scenarios,
      {
        id: newId,
        name: `Scenario ${newId}`,
        type: "sip",
        inputs: structuredClone(defaultInputs.sip),
      },
    ]);
    setNextId(nextId + 1);
  };

  const removeScenario = (id: string) => {
    if (scenarios.length > 1) {
      setScenarios(scenarios.filter((s) => s.id !== id));
    }
  };

  const duplicateScenario = (id: string) => {
    const scenario = scenarios.find((s) => s.id === id);
    if (scenario) {
      const newId = nextId.toString();
      setScenarios([
        ...scenarios,
        {
          ...scenario,
          id: newId,
          name: `${scenario.name} (Copy)`,
          inputs: structuredClone(scenario.inputs),
        },
      ]);
      setNextId(nextId + 1);
    }
  };

  const updateScenarioType = (id: string, type: CalculatorType) => {
    setScenarios(
      scenarios.map((s) =>
        s.id === id
          ? { ...s, type, inputs: structuredClone(defaultInputs[type]) }
          : s
      )
    );
  };

  const updateScenarioInputs = (id: string, inputs: any) => {
    setScenarios(scenarios.map((s) => (s.id === id ? { ...s, inputs } : s)));
  };

  const getResults = (scenario: Scenario) => {
    switch (scenario.type) {
      case "sip":
        return calculateSIP(scenario.inputs as SIPInput);
      case "sip-stepup":
        return calculateSIPStepUp(scenario.inputs as SIPStepUpInput);
      case "lumpsum":
        return calculateLumpSum(scenario.inputs as LumpSumInput);
      case "swp":
        return calculateSWP(scenario.inputs as SWPInput);
    }
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

        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl md:text-4xl font-bold mb-2" data-testid="text-comparison-title">
              Compare Scenarios
            </h1>
            <p className="text-muted-foreground" data-testid="text-comparison-description">
              Compare multiple investment scenarios side-by-side
            </p>
          </div>
          <Button
            onClick={addScenario}
            disabled={scenarios.length >= 4}
            data-testid="button-add-scenario"
          >
            <Plus className="w-4 h-4 mr-2" />
            Add Scenario
          </Button>
        </div>

        <div className={`grid grid-cols-1 ${scenarios.length === 2 ? 'lg:grid-cols-2' : scenarios.length === 3 ? 'lg:grid-cols-3' : scenarios.length === 4 ? 'lg:grid-cols-2 xl:grid-cols-4' : ''} gap-6`}>
          {scenarios.map((scenario) => {
            const results = getResults(scenario);
            return (
              <Card key={scenario.id} className="border-2" data-testid={`card-scenario-${scenario.id}`}>
                <CardHeader className="space-y-4">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-xl">{scenario.name}</CardTitle>
                    <div className="flex gap-2">
                      <Button
                        size="icon"
                        variant="ghost"
                        onClick={() => duplicateScenario(scenario.id)}
                        data-testid={`button-duplicate-${scenario.id}`}
                      >
                        <Copy className="w-4 h-4" />
                      </Button>
                      <Button
                        size="icon"
                        variant="ghost"
                        onClick={() => removeScenario(scenario.id)}
                        disabled={scenarios.length === 1}
                        data-testid={`button-remove-${scenario.id}`}
                      >
                        <X className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                  <Select
                    value={scenario.type}
                    onValueChange={(value) => updateScenarioType(scenario.id, value as CalculatorType)}
                  >
                    <SelectTrigger data-testid={`select-type-${scenario.id}`}>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="sip">SIP Calculator</SelectItem>
                      <SelectItem value="sip-stepup">SIP Step-up</SelectItem>
                      <SelectItem value="lumpsum">Lump Sum</SelectItem>
                      <SelectItem value="swp">SWP</SelectItem>
                    </SelectContent>
                  </Select>
                </CardHeader>
                <CardContent className="space-y-6">
                  {scenario.type === "sip" && (
                    <SIPInputs
                      inputs={scenario.inputs as SIPInput}
                      onChange={(inputs) => updateScenarioInputs(scenario.id, inputs)}
                      scenarioId={scenario.id}
                    />
                  )}
                  {scenario.type === "sip-stepup" && (
                    <SIPStepUpInputs
                      inputs={scenario.inputs as SIPStepUpInput}
                      onChange={(inputs) => updateScenarioInputs(scenario.id, inputs)}
                      scenarioId={scenario.id}
                    />
                  )}
                  {scenario.type === "lumpsum" && (
                    <LumpSumInputs
                      inputs={scenario.inputs as LumpSumInput}
                      onChange={(inputs) => updateScenarioInputs(scenario.id, inputs)}
                      scenarioId={scenario.id}
                    />
                  )}
                  {scenario.type === "swp" && (
                    <SWPInputs
                      inputs={scenario.inputs as SWPInput}
                      onChange={(inputs) => updateScenarioInputs(scenario.id, inputs)}
                      scenarioId={scenario.id}
                    />
                  )}

                  <div className="pt-4 border-t space-y-3">
                    <h3 className="font-semibold text-sm text-muted-foreground">Results</h3>
                    <div className="space-y-2">
                      <div className="flex justify-between items-center">
                        <span className="text-sm">
                          {scenario.type === "swp" ? "Remaining Corpus" : "Total Value"}
                        </span>
                        <span className="font-bold text-primary" data-testid={`value-total-${scenario.id}`}>
                          {formatCurrency(
                            "totalValue" in results ? results.totalValue : results.remainingCorpus
                          )}
                        </span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm">
                          {scenario.type === "swp" ? "Total Withdrawn" : "Invested"}
                        </span>
                        <span className="font-semibold text-muted-foreground">
                          {formatCurrency(
                            scenario.type === "swp" 
                              ? (results as any).totalWithdrawn 
                              : results.investedAmount
                          )}
                        </span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm">Returns</span>
                        <span className="font-semibold text-success">
                          {formatCurrency(
                            "estimatedReturns" in results 
                              ? results.estimatedReturns 
                              : (results as any).totalReturns
                          )}
                        </span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {scenarios.length > 1 && (
          <Card className="mt-8 p-6">
            <h3 className="text-xl font-semibold mb-4" data-testid="text-comparison-summary">
              Comparison Summary
            </h3>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b">
                    <th className="text-left py-3 px-4">Metric</th>
                    {scenarios.map((scenario) => (
                      <th key={scenario.id} className="text-right py-3 px-4">
                        {scenario.name}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b">
                    <td className="py-3 px-4 font-medium">Final Value</td>
                    {scenarios.map((scenario) => {
                      const results = getResults(scenario);
                      const value = "totalValue" in results ? results.totalValue : results.remainingCorpus;
                      return (
                        <td key={scenario.id} className="text-right py-3 px-4 font-semibold">
                          {formatCurrency(value)}
                        </td>
                      );
                    })}
                  </tr>
                  <tr className="border-b">
                    <td className="py-3 px-4 font-medium">Total Invested/Withdrawn</td>
                    {scenarios.map((scenario) => {
                      const results = getResults(scenario);
                      const amount = scenario.type === "swp" 
                        ? (results as any).totalWithdrawn
                        : results.investedAmount;
                      return (
                        <td key={scenario.id} className="text-right py-3 px-4">
                          {formatCurrency(amount)}
                        </td>
                      );
                    })}
                  </tr>
                  <tr>
                    <td className="py-3 px-4 font-medium">Total Returns</td>
                    {scenarios.map((scenario) => {
                      const results = getResults(scenario);
                      const returns = "estimatedReturns" in results 
                        ? results.estimatedReturns 
                        : (results as any).totalReturns;
                      return (
                        <td key={scenario.id} className="text-right py-3 px-4 font-semibold text-success">
                          {formatCurrency(returns)}
                        </td>
                      );
                    })}
                  </tr>
                </tbody>
              </table>
            </div>
          </Card>
        )}
      </div>
    </div>
  );
}

function SIPInputs({ inputs, onChange, scenarioId }: { inputs: SIPInput; onChange: (inputs: SIPInput) => void; scenarioId: string }) {
  return (
    <div className="space-y-4">
      <InputSlider
        label="Monthly Investment"
        value={inputs.monthlyInvestment}
        onChange={(value) => onChange({ ...inputs, monthlyInvestment: value })}
        min={500}
        max={100000}
        step={500}
        prefix="₹"
        testId={`${scenarioId}-monthly`}
      />
      <InputSlider
        label="Duration"
        value={inputs.durationYears}
        onChange={(value) => onChange({ ...inputs, durationYears: value })}
        min={1}
        max={30}
        suffix="yrs"
        testId={`${scenarioId}-duration`}
      />
      <InputSlider
        label="Return Rate"
        value={inputs.expectedReturn}
        onChange={(value) => onChange({ ...inputs, expectedReturn: value })}
        min={1}
        max={30}
        step={0.5}
        suffix="%"
        testId={`${scenarioId}-return`}
      />
    </div>
  );
}

function SIPStepUpInputs({ inputs, onChange, scenarioId }: { inputs: SIPStepUpInput; onChange: (inputs: SIPStepUpInput) => void; scenarioId: string }) {
  return (
    <div className="space-y-4">
      <InputSlider
        label="Initial Monthly"
        value={inputs.monthlyInvestment}
        onChange={(value) => onChange({ ...inputs, monthlyInvestment: value })}
        min={500}
        max={100000}
        step={500}
        prefix="₹"
        testId={`${scenarioId}-monthly`}
      />
      <InputSlider
        label="Duration"
        value={inputs.durationYears}
        onChange={(value) => onChange({ ...inputs, durationYears: value })}
        min={1}
        max={30}
        suffix="yrs"
        testId={`${scenarioId}-duration`}
      />
      <InputSlider
        label="Return Rate"
        value={inputs.expectedReturn}
        onChange={(value) => onChange({ ...inputs, expectedReturn: value })}
        min={1}
        max={30}
        step={0.5}
        suffix="%"
        testId={`${scenarioId}-return`}
      />
      <InputSlider
        label="Annual Increase"
        value={inputs.annualIncrease}
        onChange={(value) => onChange({ ...inputs, annualIncrease: value })}
        min={0}
        max={50}
        suffix="%"
        testId={`${scenarioId}-increase`}
      />
    </div>
  );
}

function LumpSumInputs({ inputs, onChange, scenarioId }: { inputs: LumpSumInput; onChange: (inputs: LumpSumInput) => void; scenarioId: string }) {
  return (
    <div className="space-y-4">
      <InputSlider
        label="Investment"
        value={inputs.investment}
        onChange={(value) => onChange({ ...inputs, investment: value })}
        min={1000}
        max={10000000}
        step={10000}
        prefix="₹"
        testId={`${scenarioId}-investment`}
      />
      <InputSlider
        label="Duration"
        value={inputs.durationYears}
        onChange={(value) => onChange({ ...inputs, durationYears: value })}
        min={1}
        max={30}
        suffix="yrs"
        testId={`${scenarioId}-duration`}
      />
      <InputSlider
        label="Return Rate"
        value={inputs.expectedReturn}
        onChange={(value) => onChange({ ...inputs, expectedReturn: value })}
        min={1}
        max={30}
        step={0.5}
        suffix="%"
        testId={`${scenarioId}-return`}
      />
    </div>
  );
}

function SWPInputs({ inputs, onChange, scenarioId }: { inputs: SWPInput; onChange: (inputs: SWPInput) => void; scenarioId: string }) {
  return (
    <div className="space-y-4">
      <InputSlider
        label="Initial Investment"
        value={inputs.investment}
        onChange={(value) => onChange({ ...inputs, investment: value })}
        min={100000}
        max={10000000}
        step={100000}
        prefix="₹"
        testId={`${scenarioId}-investment`}
      />
      <InputSlider
        label="Monthly Withdrawal"
        value={inputs.monthlyWithdrawal}
        onChange={(value) => onChange({ ...inputs, monthlyWithdrawal: value })}
        min={1000}
        max={100000}
        step={1000}
        prefix="₹"
        testId={`${scenarioId}-withdrawal`}
      />
      <InputSlider
        label="Duration"
        value={inputs.durationYears}
        onChange={(value) => onChange({ ...inputs, durationYears: value })}
        min={1}
        max={30}
        suffix="yrs"
        testId={`${scenarioId}-duration`}
      />
      <InputSlider
        label="Return Rate"
        value={inputs.expectedReturn}
        onChange={(value) => onChange({ ...inputs, expectedReturn: value })}
        min={1}
        max={30}
        step={0.5}
        suffix="%"
        testId={`${scenarioId}-return`}
      />
    </div>
  );
}
