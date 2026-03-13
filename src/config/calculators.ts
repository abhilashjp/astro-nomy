import type { CalculatorConfig, InputConfig, InputGroup } from "./calculator-types";

// ============================================================
// Shared input templates for token-based (AI infrastructure) calculators
// ============================================================

const tokenInputs: InputConfig[] = [
  {
    id: "inputTokens",
    label: "Input tokens per request",
    unit: "tokens",
    min: 100,
    max: 1_000_000,
    default: 1_000,
    step: 100,
    scale: "logarithmic",
    helpText: "Average number of tokens you send per API call",
    group: "tokens",
  },
  {
    id: "outputTokens",
    label: "Output tokens per request",
    unit: "tokens",
    min: 100,
    max: 500_000,
    default: 500,
    step: 100,
    scale: "logarithmic",
    helpText: "Average number of tokens the model generates per call",
    group: "tokens",
  },
  {
    id: "requestsPerDay",
    label: "Requests per day",
    unit: "requests",
    min: 1,
    max: 100_000,
    default: 100,
    step: 1,
    scale: "logarithmic",
    helpText: "How many API calls do you make daily?",
    group: "volume",
  },
];

const tokenInputGroups: InputGroup[] = [
  { id: "tokens", label: "Token Usage", icon: "Coins" },
  { id: "volume", label: "Request Volume", icon: "Activity" },
];

// ============================================================
// AI Infrastructure Calculator Configs (plans populated from DB)
// ============================================================

function createTokenConfig(
  companyName: string,
  companySlug: string,
  description: string,
  pricingPageUrl: string
): CalculatorConfig {
  return {
    type: "token-based",
    companyName,
    companySlug,
    description,
    pricingPageUrl,
    plans: [], // Populated from DB at page level
    inputs: tokenInputs,
    inputGroups: tokenInputGroups,
    computeId: "token-based",
  };
}

export const openaiConfig = createTokenConfig(
  "OpenAI",
  "openai",
  "Estimate costs for GPT-4.1, GPT-4.1 mini, o3, o4-mini, and other OpenAI models based on your token usage.",
  "https://openai.com/api/pricing/"
);

export const anthropicConfig = createTokenConfig(
  "Anthropic",
  "anthropic",
  "Calculate costs for Claude Sonnet 4, Claude Opus 4, Claude Haiku 3.5, and other Anthropic models.",
  "https://www.anthropic.com/pricing"
);

export const googleConfig = createTokenConfig(
  "Google",
  "google",
  "Estimate costs for Gemini 2.5 Pro, Gemini 2.5 Flash, and other Google AI models.",
  "https://ai.google.dev/pricing"
);

export const mistralConfig = createTokenConfig(
  "Mistral",
  "mistral",
  "Calculate costs for Mistral Large 2, Mistral Medium 3, and other Mistral AI models.",
  "https://mistral.ai/pricing"
);

export const metaConfig = createTokenConfig(
  "Meta",
  "meta",
  "Estimate API costs for Llama 4 Maverick, Llama 4 Scout, and other Meta open-weight models.",
  "https://ai.meta.com/llama/"
);

// ============================================================
// AI Application Calculator Configs (fully self-contained)
// ============================================================

export const intercomFinConfig: CalculatorConfig = {
  type: "use-case-based",
  companyName: "Intercom Fin AI",
  companySlug: "intercom",
  description:
    "Estimate your monthly cost for Intercom's Fin AI agent based on your support volume and expected resolution rate.",
  pricingPageUrl: "https://www.intercom.com/pricing",
  computeId: "intercom",
  plans: [
    {
      id: "fin-ai",
      name: "Fin AI Agent",
      description: "$0.99 per resolution, 50 free resolutions/month",
      priceParams: { pricePerResolution: 0.99, freeResolutions: 50 },
    },
  ],
  inputs: [
    {
      id: "monthlyTickets",
      label: "Monthly support conversations",
      unit: "conversations",
      min: 100,
      max: 100_000,
      default: 1_000,
      step: 50,
      scale: "logarithmic",
      helpText: "Total customer conversations your team handles per month",
      group: "volume",
    },
    {
      id: "resolutionRate",
      label: "Fin resolution rate",
      unit: "%",
      min: 10,
      max: 80,
      default: 30,
      step: 1,
      scale: "linear",
      helpText: "Percentage of conversations Fin resolves without a human agent",
      benchmarkText:
        "Most customers see ~30% resolution rate initially. Fin improves by about 1% each month.",
      group: "performance",
    },
  ],
  inputGroups: [
    { id: "volume", label: "Support Volume", icon: "MessageSquare" },
    { id: "performance", label: "AI Performance", icon: "Zap" },
  ],
};

export const elevenLabsConfig: CalculatorConfig = {
  type: "use-case-based",
  companyName: "ElevenLabs",
  companySlug: "elevenlabs",
  description:
    "Estimate your monthly ElevenLabs cost based on text-to-speech character volume and conversational AI usage.",
  pricingPageUrl: "https://elevenlabs.io/pricing",
  computeId: "elevenlabs",
  plans: [
    {
      id: "starter",
      name: "Starter",
      description: "$5/mo — 30,000 characters",
      basePrice: 5,
      priceParams: { includedChars: 30_000, overagePerThousand: 0.30 },
    },
    {
      id: "creator",
      name: "Creator",
      description: "$22/mo — 100,000 characters",
      basePrice: 22,
      priceParams: { includedChars: 100_000, overagePerThousand: 0.24 },
    },
    {
      id: "scale",
      name: "Scale",
      description: "$99/mo — 500,000 characters",
      basePrice: 99,
      priceParams: { includedChars: 500_000, overagePerThousand: 0.24 },
    },
    {
      id: "business",
      name: "Business",
      description: "$330/mo — 2,000,000 characters",
      basePrice: 330,
      priceParams: { includedChars: 2_000_000, overagePerThousand: 0.24 },
    },
  ],
  inputs: [
    {
      id: "monthlyCharacters",
      label: "Characters to synthesize",
      unit: "characters",
      min: 1_000,
      max: 10_000_000,
      default: 100_000,
      step: 1000,
      scale: "logarithmic",
      helpText: "Total characters of text you want to convert to speech monthly",
      benchmarkText: "1 minute of speech ≈ 800-1,000 characters",
      group: "tts",
    },
    {
      id: "conversationalMinutes",
      label: "Conversational AI minutes",
      unit: "minutes",
      min: 0,
      max: 10_000,
      default: 0,
      step: 10,
      scale: "linear",
      helpText: "Minutes of real-time conversational AI (voice agents, etc.)",
      group: "conversational",
    },
  ],
  inputGroups: [
    { id: "tts", label: "Text-to-Speech", icon: "Volume2" },
    { id: "conversational", label: "Conversational AI", icon: "Mic" },
  ],
};

export const gorgiasConfig: CalculatorConfig = {
  type: "use-case-based",
  companyName: "Gorgias AI",
  companySlug: "gorgias",
  description:
    "Calculate your Gorgias cost based on ticket volume and AI automation rate.",
  pricingPageUrl: "https://www.gorgias.com/pricing",
  computeId: "gorgias",
  plans: [
    {
      id: "annual",
      name: "Annual Billing",
      description: "Save with annual commitment",
      priceParams: { aiRate: 0.90, manualRate: 0.36 },
    },
    {
      id: "monthly",
      name: "Monthly Billing",
      priceParams: { aiRate: 1.00, manualRate: 0.40 },
    },
  ],
  inputs: [
    {
      id: "monthlyTickets",
      label: "Monthly support tickets",
      unit: "tickets",
      min: 100,
      max: 50_000,
      default: 1_000,
      step: 50,
      scale: "logarithmic",
      helpText: "Total customer support tickets your team handles per month",
      group: "volume",
    },
    {
      id: "automationRate",
      label: "AI automation rate",
      unit: "%",
      min: 10,
      max: 70,
      default: 30,
      step: 1,
      scale: "linear",
      helpText: "Percentage of tickets resolved by AI without human agent involvement",
      benchmarkText:
        "Businesses using Gorgias AI typically see 20-40% automation rates.",
      group: "performance",
    },
  ],
  inputGroups: [
    { id: "volume", label: "Ticket Volume", icon: "Ticket" },
    { id: "performance", label: "AI Automation", icon: "Bot" },
  ],
};

export const cursorConfig: CalculatorConfig = {
  type: "use-case-based",
  companyName: "Cursor",
  companySlug: "cursor",
  description:
    "Estimate your Cursor AI code editor costs based on team size and premium model usage.",
  pricingPageUrl: "https://cursor.com/pricing",
  computeId: "cursor",
  plans: [
    {
      id: "pro",
      name: "Pro",
      description: "$20/mo per seat — includes monthly credit pool",
      basePrice: 20,
      priceParams: { includedCredits: 500, overageRate: 0.04 },
    },
    {
      id: "business",
      name: "Business",
      description: "$40/mo per seat — team admin + security features",
      basePrice: 40,
      priceParams: { includedCredits: 500, overageRate: 0.04 },
    },
  ],
  inputs: [
    {
      id: "developers",
      label: "Number of developers",
      unit: "seats",
      min: 1,
      max: 500,
      default: 5,
      step: 1,
      scale: "linear",
      helpText: "Number of developer seats on your team",
      group: "team",
    },
    {
      id: "premiumRequestsPerDay",
      label: "Premium model requests per dev/day",
      unit: "requests",
      min: 0,
      max: 200,
      default: 20,
      step: 1,
      scale: "linear",
      helpText: "Average premium model requests (Claude, GPT-4) each developer makes daily",
      benchmarkText:
        "Auto-complete is unlimited and free. Only premium model chat/edit uses credits.",
      group: "usage",
    },
  ],
  inputGroups: [
    { id: "team", label: "Team Size", icon: "Users" },
    { id: "usage", label: "Premium Usage", icon: "Sparkles" },
  ],
};

export const vercelConfig: CalculatorConfig = {
  type: "use-case-based",
  companyName: "Vercel",
  companySlug: "vercel",
  description:
    "Estimate your Vercel serverless function costs based on invocations, execution time, and memory usage.",
  pricingPageUrl: "https://vercel.com/pricing",
  computeId: "vercel",
  plans: [
    {
      id: "pro",
      name: "Pro",
      description: "$20/mo — includes 1M invocations, 16 CPU-hours",
      basePrice: 20,
      priceParams: {
        includedInvocations: 1_000_000,
        includedCpuHours: 16,
        includedGbHours: 1440,
        invocationRate: 0.60,
        cpuHourRate: 0.128,
        gbHourRate: 0.0106,
      },
    },
    {
      id: "enterprise",
      name: "Enterprise",
      description: "Custom pricing — includes higher limits",
      basePrice: 0,
      priceParams: {
        includedInvocations: 10_000_000,
        includedCpuHours: 100,
        includedGbHours: 14400,
        invocationRate: 0.40,
        cpuHourRate: 0.10,
        gbHourRate: 0.008,
      },
    },
  ],
  inputs: [
    {
      id: "invocations",
      label: "Function invocations per month",
      unit: "invocations",
      min: 100_000,
      max: 100_000_000,
      default: 2_000_000,
      step: 100_000,
      scale: "logarithmic",
      helpText: "Total serverless function calls across your application",
      group: "compute",
    },
    {
      id: "avgExecutionMs",
      label: "Average execution time",
      unit: "ms",
      min: 10,
      max: 30_000,
      default: 200,
      step: 10,
      scale: "logarithmic",
      helpText: "Average duration of each function execution in milliseconds",
      benchmarkText: "Only active CPU time is billed, not I/O wait time.",
      group: "compute",
    },
    {
      id: "avgMemoryMb",
      label: "Average memory allocation",
      unit: "MB",
      min: 128,
      max: 3008,
      default: 256,
      step: 64,
      scale: "linear",
      helpText: "Memory allocated per function execution",
      group: "compute",
    },
  ],
  inputGroups: [
    { id: "compute", label: "Serverless Compute", icon: "Server" },
  ],
};

// ============================================================
// Combined registry
// ============================================================

export const tokenBasedConfigs = [
  openaiConfig,
  anthropicConfig,
  googleConfig,
  mistralConfig,
  metaConfig,
];

export const useCaseConfigs = [
  intercomFinConfig,
  elevenLabsConfig,
  gorgiasConfig,
  cursorConfig,
  vercelConfig,
];

export const allCalculatorConfigs: CalculatorConfig[] = [
  ...tokenBasedConfigs,
  ...useCaseConfigs,
];

export function getCalculatorBySlug(slug: string): CalculatorConfig | undefined {
  return allCalculatorConfigs.find((c) => c.companySlug === slug);
}
