import React from "react";
import { ArrowRight } from "lucide-react";

interface PricingCalculatorCardProps {
  companyName: string;
  slug: string;
  description: string;
  category: "infrastructure" | "application";
  inputPreview: string;
  badge?: string;
}

export default function PricingCalculatorCard({
  companyName,
  slug,
  description,
  category,
  inputPreview,
  badge,
}: PricingCalculatorCardProps) {
  const categoryLabel =
    category === "infrastructure" ? "API Provider" : "Application";
  const categoryColor =
    category === "infrastructure"
      ? "bg-blue-50 text-blue-700 border-blue-200 dark:bg-blue-500/10 dark:text-blue-300 dark:border-blue-500/20"
      : "bg-amber-50 text-amber-700 border-amber-200 dark:bg-amber-500/10 dark:text-amber-300 dark:border-amber-500/20";

  return (
    <a
      href={`/tools/pricing-calculator/${slug}`}
      className="group block rounded-2xl border border-gray-200 dark:border-white/10 bg-white dark:bg-white/[0.03] p-5 hover:border-blue-300 dark:hover:border-blue-500/30 hover:shadow-lg hover:shadow-blue-500/5 transition-all duration-200"
    >
      <div className="flex items-start justify-between mb-3">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
          {companyName}
        </h3>
        <div className="flex items-center gap-2">
          {badge && (
            <span className="text-xs font-medium bg-emerald-50 text-emerald-700 dark:bg-emerald-500/10 dark:text-emerald-400 px-2 py-0.5 rounded-full border border-emerald-200 dark:border-emerald-500/20">
              {badge}
            </span>
          )}
          <span
            className={`text-xs font-medium px-2 py-0.5 rounded-full border ${categoryColor}`}
          >
            {categoryLabel}
          </span>
        </div>
      </div>

      <p className="text-sm text-gray-600 dark:text-gray-400 mb-4 line-clamp-2">
        {description}
      </p>

      {/* Input preview tags */}
      <div className="flex flex-wrap gap-1.5 mb-4">
        {inputPreview.split(",").map((tag, i) => (
          <span
            key={i}
            className="text-xs text-gray-500 dark:text-gray-400 bg-gray-100 dark:bg-white/5 px-2.5 py-1 rounded-md"
          >
            {tag.trim()}
          </span>
        ))}
      </div>

      <div className="flex items-center gap-1.5 text-sm font-medium text-blue-600 dark:text-blue-400 group-hover:gap-2.5 transition-all">
        Try Calculator
        <ArrowRight className="w-4 h-4" />
      </div>
    </a>
  );
}
