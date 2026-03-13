export interface CalculatorConfig {
  type: "token-based" | "use-case-based";
  companyName: string;
  companySlug: string;
  description: string;
  pricingPageUrl?: string;

  plans: PlanConfig[];
  inputs: InputConfig[];
  inputGroups?: InputGroup[];
  computeId: string; // Key into the compute functions registry (functions can't be serialized by Astro)
}

export interface PlanConfig {
  id: string;
  name: string;
  description?: string;
  basePrice?: number;
  priceParams: Record<string, number>;
}

export interface InputConfig {
  id: string;
  label: string;
  unit: string;
  unitPosition?: "suffix" | "prefix";
  min: number;
  max: number;
  default: number;
  step: number;
  scale: "linear" | "logarithmic";
  helpText?: string;
  benchmarkText?: string;
  group?: string;
}

export interface InputGroup {
  id: string;
  label: string;
  icon?: string;
}

export interface CostBreakdown {
  lineItems: { label: string; amount: number; color?: string }[];
  totalPerUnit?: { label: string; amount: number };
  dailyCost?: number;
  monthlyCost: number;
  annualCost?: number;
  notes?: string[];
}

// Utility: format a dollar amount for display
export function formatCost(amount: number): string {
  if (amount === 0) return "$0.00";
  if (Math.abs(amount) < 0.01) return `$${amount.toFixed(4)}`;
  if (Math.abs(amount) >= 1000)
    return `$${amount.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
  return `$${amount.toFixed(2)}`;
}

// Utility: format a count with K/M suffixes
export function formatCount(n: number): string {
  if (n >= 1_000_000) {
    const val = n / 1_000_000;
    return `${val % 1 === 0 ? val.toFixed(0) : val.toFixed(1)}M`;
  }
  if (n >= 1_000) {
    const val = n / 1_000;
    return `${val % 1 === 0 ? val.toFixed(0) : val.toFixed(1)}K`;
  }
  return n.toLocaleString("en-US");
}

// Utility: convert logarithmic slider position (0-1) to actual value
export function logToValue(position: number, min: number, max: number): number {
  const minLog = Math.log(Math.max(min, 1));
  const maxLog = Math.log(max);
  return Math.round(Math.exp(minLog + position * (maxLog - minLog)));
}

// Utility: convert actual value to logarithmic slider position (0-1)
export function valueToLog(value: number, min: number, max: number): number {
  const minLog = Math.log(Math.max(min, 1));
  const maxLog = Math.log(max);
  return (Math.log(Math.max(value, 1)) - minLog) / (maxLog - minLog);
}
