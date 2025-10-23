import { z } from "zod";

// SIP Calculator Schema
export const sipInputSchema = z.object({
  monthlyInvestment: z.number().min(500).max(10000000),
  durationYears: z.number().min(1).max(50),
  expectedReturn: z.number().min(1).max(30),
});

export type SIPInput = z.infer<typeof sipInputSchema>;

export interface SIPResult {
  totalValue: number;
  investedAmount: number;
  estimatedReturns: number;
  yearlyBreakdown: Array<{
    year: number;
    invested: number;
    value: number;
    returns: number;
  }>;
}

// SIP Step-up Calculator Schema
export const sipStepUpInputSchema = z.object({
  monthlyInvestment: z.number().min(500).max(10000000),
  durationYears: z.number().min(1).max(50),
  expectedReturn: z.number().min(1).max(30),
  annualIncrease: z.number().min(0).max(100),
});

export type SIPStepUpInput = z.infer<typeof sipStepUpInputSchema>;

export interface SIPStepUpResult {
  totalValue: number;
  investedAmount: number;
  estimatedReturns: number;
  yearlyBreakdown: Array<{
    year: number;
    monthlyInvestment: number;
    invested: number;
    value: number;
    returns: number;
  }>;
}

// Lump Sum Calculator Schema
export const lumpSumInputSchema = z.object({
  investment: z.number().min(1000).max(100000000),
  durationYears: z.number().min(1).max(50),
  expectedReturn: z.number().min(1).max(30),
});

export type LumpSumInput = z.infer<typeof lumpSumInputSchema>;

export interface LumpSumResult {
  totalValue: number;
  investedAmount: number;
  estimatedReturns: number;
  yearlyBreakdown: Array<{
    year: number;
    value: number;
    returns: number;
  }>;
}

// SWP Calculator Schema
export const swpInputSchema = z.object({
  investment: z.number().min(10000).max(100000000),
  monthlyWithdrawal: z.number().min(1000).max(10000000),
  durationYears: z.number().min(1).max(50),
  expectedReturn: z.number().min(1).max(30),
});

export type SWPInput = z.infer<typeof swpInputSchema>;

export interface SWPResult {
  totalWithdrawn: number;
  remainingCorpus: number;
  investedAmount: number;
  totalReturns: number;
  yearlyBreakdown: Array<{
    year: number;
    withdrawn: number;
    remainingCorpus: number;
    returns: number;
  }>;
}

// Export Request Schema
export const exportRequestSchema = z.object({
  calculatorType: z.enum(['sip', 'sip-stepup', 'lumpsum', 'swp']),
  inputs: z.record(z.any()),
  results: z.record(z.any()),
  format: z.enum(['pdf', 'excel']),
});

export type ExportRequest = z.infer<typeof exportRequestSchema>;
