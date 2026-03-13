/**
 * Compute functions registry.
 *
 * These are separated from calculator configs because Astro serializes
 * component props to JSON (for client:load hydration), and functions
 * can't be serialized. The React component imports this file directly.
 */
import type { PlanConfig, CostBreakdown } from "./calculator-types";

export type ComputeFn = (
  values: Record<string, number>,
  plan: PlanConfig
) => CostBreakdown;

// ============================================================
// Token-based (shared by all AI infrastructure calculators)
// ============================================================

function tokenCompute(values: Record<string, number>, plan: PlanConfig): CostBreakdown {
  const { inputTokens = 1000, outputTokens = 500, requestsPerDay = 100 } = values;
  const { inputPrice = 0, outputPrice = 0 } = plan.priceParams;

  const inputCostPerReq = (inputTokens * inputPrice) / 1_000_000;
  const outputCostPerReq = (outputTokens * outputPrice) / 1_000_000;
  const costPerRequest = inputCostPerReq + outputCostPerReq;
  const dailyCost = costPerRequest * requestsPerDay;
  const monthlyCost = dailyCost * 30;

  return {
    lineItems: [
      { label: "Input tokens", amount: inputCostPerReq * requestsPerDay * 30, color: "blue" },
      { label: "Output tokens", amount: outputCostPerReq * requestsPerDay * 30, color: "purple" },
    ],
    totalPerUnit: { label: "Per request", amount: costPerRequest },
    dailyCost,
    monthlyCost,
    annualCost: monthlyCost * 12,
  };
}

// ============================================================
// Intercom Fin AI
// ============================================================

function intercomCompute(values: Record<string, number>, plan: PlanConfig): CostBreakdown {
  const { monthlyTickets = 1000, resolutionRate = 30 } = values;
  const { pricePerResolution = 0.99, freeResolutions = 50 } = plan.priceParams;

  const totalResolutions = Math.round(monthlyTickets * (resolutionRate / 100));
  const billableResolutions = Math.max(0, totalResolutions - freeResolutions);
  const monthlyCost = billableResolutions * pricePerResolution;

  return {
    lineItems: [
      { label: "AI resolutions", amount: totalResolutions * pricePerResolution, color: "blue" },
      {
        label: "Free tier credit",
        amount: -(Math.min(totalResolutions, freeResolutions) * pricePerResolution),
        color: "emerald",
      },
    ],
    totalPerUnit: { label: "Per resolution", amount: pricePerResolution },
    monthlyCost,
    annualCost: monthlyCost * 12,
    notes: [
      `${totalResolutions.toLocaleString()} conversations resolved by Fin`,
      `${freeResolutions} free resolutions included monthly`,
    ],
  };
}

// ============================================================
// ElevenLabs
// ============================================================

function elevenLabsCompute(values: Record<string, number>, plan: PlanConfig): CostBreakdown {
  const { monthlyCharacters = 100_000, conversationalMinutes = 0 } = values;
  const { includedChars = 0, overagePerThousand = 0.24 } = plan.priceParams;
  const baseCost = plan.basePrice ?? 0;

  const overageChars = Math.max(0, monthlyCharacters - includedChars);
  const overageCost = (overageChars / 1000) * overagePerThousand;
  const conversationalCost = conversationalMinutes * 0.08;
  const monthlyCost = baseCost + overageCost + conversationalCost;

  const lineItems: CostBreakdown["lineItems"] = [
    { label: "Base plan", amount: baseCost, color: "blue" },
  ];
  if (overageCost > 0) {
    lineItems.push({ label: "Character overage", amount: overageCost, color: "purple" });
  }
  if (conversationalCost > 0) {
    lineItems.push({ label: "Conversational AI", amount: conversationalCost, color: "amber" });
  }

  const notes = [`${includedChars.toLocaleString()} characters included in plan`];
  if (overageChars > 0) {
    notes.push(`${overageChars.toLocaleString()} overage characters at $${overagePerThousand}/1K`);
  }

  return { lineItems, monthlyCost, annualCost: monthlyCost * 12, notes };
}

// ============================================================
// Gorgias AI
// ============================================================

function gorgiasCompute(values: Record<string, number>, plan: PlanConfig): CostBreakdown {
  const { monthlyTickets = 1000, automationRate = 30 } = values;
  const { aiRate = 0.90, manualRate = 0.36 } = plan.priceParams;

  const aiTickets = Math.round(monthlyTickets * (automationRate / 100));
  const manualTickets = monthlyTickets - aiTickets;
  const aiCost = aiTickets * aiRate;
  const manualCost = manualTickets * manualRate;
  const monthlyCost = aiCost + manualCost;

  return {
    lineItems: [
      { label: "AI-resolved tickets", amount: aiCost, color: "blue" },
      { label: "Agent-handled tickets", amount: manualCost, color: "purple" },
    ],
    totalPerUnit: {
      label: "Blended cost per ticket",
      amount: monthlyCost / monthlyTickets,
    },
    monthlyCost,
    annualCost: monthlyCost * 12,
    notes: [
      `${aiTickets.toLocaleString()} tickets automated at $${aiRate.toFixed(2)}/ticket`,
      `${manualTickets.toLocaleString()} tickets handled by agents at $${manualRate.toFixed(2)}/ticket`,
    ],
  };
}

// ============================================================
// Cursor
// ============================================================

function cursorCompute(values: Record<string, number>, plan: PlanConfig): CostBreakdown {
  const { developers = 5, premiumRequestsPerDay = 20 } = values;
  const { includedCredits = 500, overageRate = 0.04 } = plan.priceParams;
  const basePricePerSeat = plan.basePrice ?? 20;

  const totalBaseCost = basePricePerSeat * developers;
  const monthlyRequestsPerDev = premiumRequestsPerDay * 30;
  const overageRequestsPerDev = Math.max(0, monthlyRequestsPerDev - includedCredits);
  const totalOverageCost = overageRequestsPerDev * overageRate * developers;
  const monthlyCost = totalBaseCost + totalOverageCost;

  const lineItems: CostBreakdown["lineItems"] = [
    { label: "Base subscription", amount: totalBaseCost, color: "blue" },
  ];
  if (totalOverageCost > 0) {
    lineItems.push({ label: "Premium model overage", amount: totalOverageCost, color: "purple" });
  }

  const notes = [`${includedCredits} premium requests included per seat/month`];
  if (overageRequestsPerDev > 0) {
    notes.push(
      `${(overageRequestsPerDev * developers).toLocaleString()} overage requests at $${overageRate}/req`
    );
  }

  return {
    lineItems,
    totalPerUnit: { label: "Per developer/month", amount: monthlyCost / developers },
    monthlyCost,
    annualCost: monthlyCost * 12,
    notes,
  };
}

// ============================================================
// Vercel
// ============================================================

function vercelCompute(values: Record<string, number>, plan: PlanConfig): CostBreakdown {
  const { invocations = 2_000_000, avgExecutionMs = 200, avgMemoryMb = 256 } = values;
  const p = plan.priceParams;

  const overageInvocations = Math.max(0, invocations - (p.includedInvocations ?? 0));
  const invocationCost = (overageInvocations / 1_000_000) * (p.invocationRate ?? 0.60);

  const totalCpuHours = (invocations * avgExecutionMs) / (1000 * 3600);
  const overageCpuHours = Math.max(0, totalCpuHours - (p.includedCpuHours ?? 0));
  const cpuCost = overageCpuHours * (p.cpuHourRate ?? 0.128);

  const totalGbHours = (invocations * avgExecutionMs * (avgMemoryMb / 1024)) / (1000 * 3600);
  const overageGbHours = Math.max(0, totalGbHours - (p.includedGbHours ?? 0));
  const gbCost = overageGbHours * (p.gbHourRate ?? 0.0106);

  const baseCost = plan.basePrice ?? 0;
  const monthlyCost = baseCost + invocationCost + cpuCost + gbCost;

  const lineItems: CostBreakdown["lineItems"] = [
    { label: "Base plan", amount: baseCost, color: "blue" },
  ];
  if (invocationCost > 0) lineItems.push({ label: "Invocations", amount: invocationCost, color: "purple" });
  if (cpuCost > 0) lineItems.push({ label: "CPU time", amount: cpuCost, color: "amber" });
  if (gbCost > 0) lineItems.push({ label: "Memory", amount: gbCost, color: "emerald" });

  return {
    lineItems,
    monthlyCost,
    annualCost: monthlyCost * 12,
    notes: [
      `${(p.includedInvocations ?? 0).toLocaleString()} invocations included`,
      `${p.includedCpuHours ?? 0} CPU-hours included`,
      `${totalCpuHours.toFixed(1)} total CPU-hours used`,
    ],
  };
}

// ============================================================
// Registry
// ============================================================

export const computeRegistry: Record<string, ComputeFn> = {
  "token-based": tokenCompute,
  intercom: intercomCompute,
  elevenlabs: elevenLabsCompute,
  gorgias: gorgiasCompute,
  cursor: cursorCompute,
  vercel: vercelCompute,
};

export function getComputeFn(computeId: string): ComputeFn {
  return computeRegistry[computeId] ?? tokenCompute;
}
