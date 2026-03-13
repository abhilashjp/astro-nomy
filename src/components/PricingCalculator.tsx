import React, { useState, useMemo, useCallback } from "react";
import { Calculator, ChevronRight } from "lucide-react";
import { Slider } from "@/components/ui/slider";
import CostBreakdownPanel from "./CostBreakdownPanel";
import type {
  CalculatorConfig,
  PlanConfig,
  InputConfig,
} from "@/config/calculator-types";
import {
  formatCount,
  logToValue,
  valueToLog,
} from "@/config/calculator-types";
import { getComputeFn } from "@/config/compute-functions";

interface PricingCalculatorProps {
  config: CalculatorConfig;
  showBranding?: boolean;
  showCTA?: boolean;
}

export default function PricingCalculator({
  config,
  showBranding = true,
  showCTA = true,
}: PricingCalculatorProps) {
  // State: selected plan
  const [selectedPlanId, setSelectedPlanId] = useState(config.plans[0]?.id ?? "");

  // State: input values (keyed by input id)
  const [values, setValues] = useState<Record<string, number>>(() => {
    const defaults: Record<string, number> = {};
    for (const input of config.inputs) {
      defaults[input.id] = input.default;
    }
    return defaults;
  });

  const selectedPlan = useMemo(
    () => config.plans.find((p) => p.id === selectedPlanId) ?? config.plans[0],
    [config.plans, selectedPlanId]
  );

  const computeFn = useMemo(() => getComputeFn(config.computeId), [config.computeId]);

  const breakdown = useMemo(
    () => computeFn(values, selectedPlan),
    [computeFn, values, selectedPlan]
  );

  const setValue = useCallback((id: string, value: number) => {
    setValues((prev) => ({ ...prev, [id]: value }));
  }, []);

  // Group inputs
  const groupedInputs = useMemo(() => {
    if (config.inputGroups && config.inputGroups.length > 0) {
      return config.inputGroups.map((group) => ({
        ...group,
        inputs: config.inputs.filter((inp) => inp.group === group.id),
      }));
    }
    // No groups — return all as a single unnamed group
    return [{ id: "_all", label: "", inputs: config.inputs }];
  }, [config.inputs, config.inputGroups]);

  // Plan comparison: compute cost for each plan at current input values
  const planCosts = useMemo(() => {
    if (config.plans.length <= 1) return null;
    return config.plans.map((plan) => ({
      plan,
      cost: computeFn(values, plan).monthlyCost,
    }));
  }, [config.plans, computeFn, values]);

  return (
    <div className="w-full space-y-6">
      {/* Plan/Model Selector */}
      {config.plans.length > 1 && (
        <div className="flex flex-wrap gap-2">
          {config.plans.length <= 5 ? (
            // Tabs for few plans
            config.plans.map((plan) => (
              <button
                key={plan.id}
                onClick={() => setSelectedPlanId(plan.id)}
                className={`px-4 py-2.5 rounded-xl text-sm font-medium transition-all ${
                  selectedPlanId === plan.id
                    ? "bg-blue-600 text-white shadow-md shadow-blue-500/20"
                    : "bg-gray-100 dark:bg-white/5 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-white/10 border border-gray-200 dark:border-white/10"
                }`}
              >
                {plan.name}
                {plan.basePrice !== undefined && plan.basePrice > 0 && (
                  <span className="ml-1.5 text-xs opacity-75">
                    ${plan.basePrice}/mo
                  </span>
                )}
              </button>
            ))
          ) : (
            // Dropdown for many plans
            <select
              value={selectedPlanId}
              onChange={(e) => setSelectedPlanId(e.target.value)}
              className="w-full sm:w-auto px-4 py-2.5 bg-white dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-xl text-sm text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              {config.plans.map((plan) => (
                <option key={plan.id} value={plan.id}>
                  {plan.name}
                  {plan.description ? ` — ${plan.description}` : ""}
                </option>
              ))}
            </select>
          )}
        </div>
      )}

      {/* Main Layout: Inputs + Cost Panel */}
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-6 lg:gap-8">
        {/* Left: Inputs (60%) */}
        <div className="lg:col-span-3 space-y-6">
          {groupedInputs.map((group) => (
            <div
              key={group.id}
              className="bg-gray-50 dark:bg-white/[0.03] rounded-2xl border border-gray-200 dark:border-white/10 p-5 space-y-5"
            >
              {group.label && (
                <h3 className="text-sm font-semibold text-gray-900 dark:text-white uppercase tracking-wider">
                  {group.label}
                </h3>
              )}
              {group.inputs.map((input) => (
                <InputField
                  key={input.id}
                  input={input}
                  value={values[input.id] ?? input.default}
                  onChange={(v) => setValue(input.id, v)}
                />
              ))}
            </div>
          ))}

          {/* Plan Compare Table (only if multiple plans) */}
          {planCosts && planCosts.length > 1 && (
            <div className="rounded-2xl border border-gray-200 dark:border-white/10 overflow-hidden">
              <div className="bg-gray-50 dark:bg-white/5 px-5 py-3 border-b border-gray-200 dark:border-white/10">
                <h3 className="text-sm font-semibold text-gray-900 dark:text-white">
                  Compare Plans at Your Usage
                </h3>
              </div>
              <div className="divide-y divide-gray-200 dark:divide-white/5">
                {planCosts.map(({ plan, cost }) => {
                  const isSelected = plan.id === selectedPlanId;
                  const isCheapest =
                    cost === Math.min(...planCosts.map((pc) => pc.cost));
                  return (
                    <button
                      key={plan.id}
                      onClick={() => setSelectedPlanId(plan.id)}
                      className={`w-full flex items-center justify-between px-5 py-3.5 text-left transition-colors ${
                        isSelected
                          ? "bg-blue-50 dark:bg-blue-500/10"
                          : "hover:bg-gray-50 dark:hover:bg-white/5"
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <div
                          className={`w-2 h-2 rounded-full ${isSelected ? "bg-blue-500" : "bg-gray-300 dark:bg-white/20"}`}
                        />
                        <div>
                          <p
                            className={`text-sm font-medium ${isSelected ? "text-blue-600 dark:text-blue-400" : "text-gray-900 dark:text-white"}`}
                          >
                            {plan.name}
                          </p>
                          {plan.description && (
                            <p className="text-xs text-gray-500 dark:text-gray-400">
                              {plan.description}
                            </p>
                          )}
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <span
                          className={`text-sm font-mono font-semibold ${isSelected ? "text-blue-600 dark:text-blue-400" : "text-gray-900 dark:text-white"}`}
                        >
                          ${cost.toFixed(2)}/mo
                        </span>
                        {isCheapest && planCosts.length > 1 && (
                          <span className="text-xs bg-emerald-100 dark:bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 px-2 py-0.5 rounded-full font-medium">
                            Cheapest
                          </span>
                        )}
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          )}
        </div>

        {/* Right: Cost Breakdown (40%, sticky) */}
        <div className="lg:col-span-2">
          <div className="lg:sticky lg:top-24">
            <CostBreakdownPanel
              breakdown={breakdown}
              planName={selectedPlan?.name ?? ""}
              companyName={config.companyName}
              pricingPageUrl={config.pricingPageUrl}
              showBranding={showBranding}
            />
          </div>
        </div>
      </div>

      {/* CTA */}
      {showCTA && (
        <div className="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-500/5 dark:to-purple-500/5 border border-blue-100 dark:border-blue-500/10 rounded-2xl p-6 text-center">
          <div className="flex items-center justify-center gap-2 mb-2">
            <Calculator className="w-5 h-5 text-blue-600 dark:text-blue-400" />
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
              Need a calculator like this on your pricing page?
            </h3>
          </div>
          <p className="text-sm text-gray-600 dark:text-gray-400 mb-4 max-w-lg mx-auto">
            Embed interactive pricing calculators on your website to help
            customers understand costs and boost conversions.
          </p>
          <a
            href="/pricing"
            className="inline-flex items-center gap-1.5 px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium rounded-xl transition-colors shadow-md shadow-blue-500/20"
          >
            Get Started
            <ChevronRight className="w-4 h-4" />
          </a>
        </div>
      )}
    </div>
  );
}

// ============================================================
// InputField sub-component
// ============================================================

interface InputFieldProps {
  input: InputConfig;
  value: number;
  onChange: (value: number) => void;
}

function InputField({ input, value, onChange }: InputFieldProps) {
  const isLogScale = input.scale === "logarithmic";
  const isPercent = input.unit === "%";

  // For logarithmic sliders, we map slider position (0-100) to actual value
  const sliderValue = isLogScale
    ? valueToLog(value, input.min, input.max) * 100
    : value;

  const handleSliderChange = (vals: number[]) => {
    const raw = vals[0];
    if (isLogScale) {
      const actualValue = logToValue(raw / 100, input.min, input.max);
      // Snap to step
      const snapped = Math.round(actualValue / input.step) * input.step;
      onChange(Math.max(input.min, Math.min(input.max, snapped)));
    } else {
      onChange(raw);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const raw = parseFloat(e.target.value);
    if (!isNaN(raw)) {
      onChange(Math.max(input.min, Math.min(input.max, raw)));
    }
  };

  // Display value for the slider labels
  const displayMin = isPercent ? `${input.min}%` : formatCount(input.min);
  const displayMax = isPercent ? `${input.max}%` : formatCount(input.max);

  return (
    <div className="space-y-3">
      {/* Label + Value Input */}
      <div className="flex items-start justify-between gap-4">
        <div className="flex-1 min-w-0">
          <label className="text-sm font-medium text-gray-900 dark:text-white">
            {input.label}
          </label>
          {input.helpText && (
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">
              {input.helpText}
            </p>
          )}
        </div>
        <div className="relative flex-shrink-0">
          <input
            type="number"
            value={value}
            onChange={handleInputChange}
            min={input.min}
            max={input.max}
            step={input.step}
            className="w-28 pl-3 pr-12 py-2 bg-white dark:bg-black/30 border border-gray-200 dark:border-white/10 rounded-lg text-sm text-right font-mono text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
          />
          <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-gray-400 pointer-events-none">
            {input.unit === "%" ? "%" : input.unit.slice(0, 4)}
          </span>
        </div>
      </div>

      {/* Slider */}
      <div className="px-1">
        <Slider
          value={[isLogScale ? sliderValue : value]}
          min={isLogScale ? 0 : input.min}
          max={isLogScale ? 100 : input.max}
          step={isLogScale ? 0.1 : input.step}
          onValueChange={handleSliderChange}
          className="w-full"
        />
      </div>

      {/* Range Labels */}
      <div className="flex justify-between text-xs text-gray-400">
        <span>{displayMin}</span>
        <span>{displayMax}</span>
      </div>

      {/* Benchmark Text */}
      {input.benchmarkText && (
        <p className="text-xs text-gray-500 dark:text-gray-400 italic bg-gray-100 dark:bg-white/5 rounded-lg px-3 py-2">
          💡 {input.benchmarkText}
        </p>
      )}
    </div>
  );
}
