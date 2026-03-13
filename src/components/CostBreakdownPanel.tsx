import React from "react";
import { Share2, ExternalLink } from "lucide-react";
import type { CostBreakdown } from "@/config/calculator-types";
import { formatCost } from "@/config/calculator-types";

interface CostBreakdownPanelProps {
  breakdown: CostBreakdown;
  planName: string;
  companyName: string;
  pricingPageUrl?: string;
  showBranding?: boolean;
}

const COLOR_MAP: Record<string, { bg: string; text: string }> = {
  blue: { bg: "bg-blue-500", text: "text-blue-500" },
  purple: { bg: "bg-purple-500", text: "text-purple-500" },
  amber: { bg: "bg-amber-500", text: "text-amber-500" },
  emerald: { bg: "bg-emerald-500", text: "text-emerald-500" },
};

export default function CostBreakdownPanel({
  breakdown,
  planName,
  companyName,
  pricingPageUrl,
  showBranding = true,
}: CostBreakdownPanelProps) {
  const { lineItems, totalPerUnit, dailyCost, monthlyCost, annualCost, notes } =
    breakdown;

  // Calculate total of positive line items for proportion bar
  const positiveTotal = lineItems
    .filter((li) => li.amount > 0)
    .reduce((sum, li) => sum + li.amount, 0);

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
  };

  return (
    <div className="rounded-2xl border border-gray-200 dark:border-white/10 bg-white dark:bg-white/5 p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
            Monthly Estimate
          </p>
          <p className="text-xs text-gray-400 dark:text-gray-500">{planName}</p>
        </div>
        <button
          onClick={handleShare}
          className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-white/10 transition-colors text-gray-400 hover:text-gray-600 dark:hover:text-white"
          title="Copy link to clipboard"
        >
          <Share2 className="w-4 h-4" />
        </button>
      </div>

      {/* Hero Monthly Cost */}
      <div className="text-center py-4">
        <p className="text-5xl font-bold text-gray-900 dark:text-white tracking-tight">
          {formatCost(monthlyCost)}
        </p>
        <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">per month</p>
      </div>

      {/* Per-unit cost */}
      {totalPerUnit && (
        <div className="text-center pb-2">
          <span className="inline-flex items-center gap-1 text-sm text-gray-500 dark:text-gray-400 bg-gray-50 dark:bg-white/5 px-3 py-1 rounded-full">
            {totalPerUnit.label}: {formatCost(totalPerUnit.amount)}
          </span>
        </div>
      )}

      {/* Divider */}
      <div className="border-t border-gray-200 dark:border-white/10" />

      {/* Line Items */}
      <div className="space-y-3">
        <p className="text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
          Cost Breakdown
        </p>
        {lineItems.map((item, i) => {
          const colors = COLOR_MAP[item.color ?? "blue"] ?? COLOR_MAP.blue;
          return (
            <div key={i} className="flex items-center justify-between text-sm">
              <div className="flex items-center gap-2">
                <span className={`w-2.5 h-2.5 rounded-full ${colors.bg}`} />
                <span className="text-gray-700 dark:text-gray-300">
                  {item.label}
                </span>
              </div>
              <span
                className={`font-mono font-medium ${item.amount < 0 ? "text-emerald-500" : "text-gray-900 dark:text-white"}`}
              >
                {item.amount < 0 ? "-" : ""}
                {formatCost(Math.abs(item.amount))}
              </span>
            </div>
          );
        })}
      </div>

      {/* Proportion Bar */}
      {positiveTotal > 0 && lineItems.filter((li) => li.amount > 0).length > 1 && (
        <div className="h-3 rounded-full overflow-hidden flex bg-gray-100 dark:bg-white/5">
          {lineItems
            .filter((li) => li.amount > 0)
            .map((item, i) => {
              const pct = (item.amount / positiveTotal) * 100;
              const colors = COLOR_MAP[item.color ?? "blue"] ?? COLOR_MAP.blue;
              return (
                <div
                  key={i}
                  className={`${colors.bg} transition-all duration-300`}
                  style={{ width: `${Math.max(pct, 2)}%` }}
                  title={`${item.label}: ${pct.toFixed(0)}%`}
                />
              );
            })}
        </div>
      )}

      {/* Daily + Annual */}
      {(dailyCost !== undefined || annualCost !== undefined) && (
        <div className="grid grid-cols-2 gap-3">
          {dailyCost !== undefined && (
            <div className="bg-gray-50 dark:bg-white/5 rounded-lg p-3 text-center">
              <p className="text-xs text-gray-500 dark:text-gray-400">Daily</p>
              <p className="text-sm font-semibold text-gray-900 dark:text-white">
                {formatCost(dailyCost)}
              </p>
            </div>
          )}
          {annualCost !== undefined && (
            <div className="bg-gray-50 dark:bg-white/5 rounded-lg p-3 text-center">
              <p className="text-xs text-gray-500 dark:text-gray-400">Annual</p>
              <p className="text-sm font-semibold text-gray-900 dark:text-white">
                {formatCost(annualCost)}
              </p>
            </div>
          )}
        </div>
      )}

      {/* Notes */}
      {notes && notes.length > 0 && (
        <div className="bg-blue-50 dark:bg-blue-500/5 border border-blue-100 dark:border-blue-500/10 rounded-lg p-3 space-y-1">
          {notes.map((note, i) => (
            <p
              key={i}
              className="text-xs text-blue-700 dark:text-blue-300 italic"
            >
              {note}
            </p>
          ))}
        </div>
      )}

      {/* Pricing page link */}
      {pricingPageUrl && (
        <a
          href={pricingPageUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center gap-1.5 text-xs text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
        >
          View {companyName} pricing page
          <ExternalLink className="w-3 h-3" />
        </a>
      )}

      {/* Branding */}
      {showBranding && (
        <div className="pt-2 border-t border-gray-200 dark:border-white/10 text-center">
          <a
            href="https://usagepricing.com"
            className="text-xs text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
          >
            Powered by{" "}
            <span className="font-semibold">UsagePricing.com</span>
          </a>
        </div>
      )}
    </div>
  );
}
