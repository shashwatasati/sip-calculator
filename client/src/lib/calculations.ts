import type { SIPInput, SIPResult, SIPStepUpInput, SIPStepUpResult, LumpSumInput, LumpSumResult, SWPInput, SWPResult } from "@shared/schema";

export function calculateSIP(input: SIPInput): SIPResult {
  const { monthlyInvestment, durationYears, expectedReturn } = input;
  const monthlyRate = expectedReturn / 12 / 100;
  const totalMonths = durationYears * 12;
  
  const yearlyBreakdown = [];
  let currentValue = 0;
  
  for (let year = 1; year <= durationYears; year++) {
    const monthsElapsed = year * 12;
    
    // FV = P × [(1 + r)^n - 1] / r × (1 + r)
    const futureValue = monthlyInvestment * 
      (((Math.pow(1 + monthlyRate, monthsElapsed) - 1) / monthlyRate) * (1 + monthlyRate));
    
    const investedAmount = monthlyInvestment * monthsElapsed;
    const returns = futureValue - investedAmount;
    
    yearlyBreakdown.push({
      year,
      invested: investedAmount,
      value: futureValue,
      returns,
    });
    
    currentValue = futureValue;
  }
  
  const investedAmount = monthlyInvestment * totalMonths;
  const totalValue = currentValue;
  const estimatedReturns = totalValue - investedAmount;
  
  return {
    totalValue,
    investedAmount,
    estimatedReturns,
    yearlyBreakdown,
  };
}

export function calculateSIPStepUp(input: SIPStepUpInput): SIPStepUpResult {
  const { monthlyInvestment: initialInvestment, durationYears, expectedReturn, annualIncrease } = input;
  const monthlyRate = expectedReturn / 12 / 100;
  
  const yearlyBreakdown = [];
  let totalInvested = 0;
  let currentValue = 0;
  
  for (let year = 1; year <= durationYears; year++) {
    const yearlyInvestment = initialInvestment * Math.pow(1 + annualIncrease / 100, year - 1);
    
    // Calculate for this year
    let yearStartValue = currentValue;
    for (let month = 1; month <= 12; month++) {
      yearStartValue = yearStartValue * (1 + monthlyRate) + yearlyInvestment;
    }
    
    currentValue = yearStartValue;
    totalInvested += yearlyInvestment * 12;
    
    yearlyBreakdown.push({
      year,
      monthlyInvestment: yearlyInvestment,
      invested: totalInvested,
      value: currentValue,
      returns: currentValue - totalInvested,
    });
  }
  
  return {
    totalValue: currentValue,
    investedAmount: totalInvested,
    estimatedReturns: currentValue - totalInvested,
    yearlyBreakdown,
  };
}

export function calculateLumpSum(input: LumpSumInput): LumpSumResult {
  const { investment, durationYears, expectedReturn } = input;
  const annualRate = expectedReturn / 100;
  
  const yearlyBreakdown = [];
  
  for (let year = 1; year <= durationYears; year++) {
    const value = investment * Math.pow(1 + annualRate, year);
    const returns = value - investment;
    
    yearlyBreakdown.push({
      year,
      value,
      returns,
    });
  }
  
  const totalValue = investment * Math.pow(1 + annualRate, durationYears);
  const estimatedReturns = totalValue - investment;
  
  return {
    totalValue,
    investedAmount: investment,
    estimatedReturns,
    yearlyBreakdown,
  };
}

export function calculateSWP(input: SWPInput): SWPResult {
  const { investment, monthlyWithdrawal, durationYears, expectedReturn } = input;
  const monthlyRate = expectedReturn / 12 / 100;
  const totalMonths = durationYears * 12;
  
  const yearlyBreakdown = [];
  let remainingCorpus = investment;
  let totalWithdrawn = 0;
  
  for (let year = 1; year <= durationYears; year++) {
    for (let month = 1; month <= 12; month++) {
      remainingCorpus = remainingCorpus * (1 + monthlyRate) - monthlyWithdrawal;
      totalWithdrawn += monthlyWithdrawal;
      
      if (remainingCorpus < 0) {
        remainingCorpus = 0;
        break;
      }
    }
    
    yearlyBreakdown.push({
      year,
      withdrawn: totalWithdrawn,
      remainingCorpus: Math.max(0, remainingCorpus),
      returns: totalWithdrawn + remainingCorpus - investment,
    });
    
    if (remainingCorpus <= 0) break;
  }
  
  const totalReturns = totalWithdrawn + remainingCorpus - investment;
  
  return {
    totalWithdrawn,
    remainingCorpus: Math.max(0, remainingCorpus),
    investedAmount: investment,
    totalReturns,
    yearlyBreakdown,
  };
}

export function formatCurrency(value: number): string {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  }).format(value);
}

export function formatNumber(value: number): string {
  return new Intl.NumberFormat('en-IN', {
    maximumFractionDigits: 0,
  }).format(value);
}
