import { db, Provider, Model, PriceHistory } from 'astro:db';

export default async function seed() {
  await db.insert(Provider).values([
    { id: 1, name: 'OpenAI', slug: 'openai', website: 'https://openai.com' },
    { id: 2, name: 'Anthropic', slug: 'anthropic', website: 'https://anthropic.com' },
    { id: 3, name: 'Google', slug: 'google', website: 'https://deepmind.google' },
    { id: 4, name: 'Meta', slug: 'meta', website: 'https://ai.meta.com' },
    { id: 5, name: 'Mistral', slug: 'mistral', website: 'https://mistral.ai' },
  ]);

  await db.insert(Model).values([
    // ── OpenAI ──────────────────────────────────────────────
    {
      id: 1,
      providerId: 1,
      name: 'GPT-4.1',
      slug: 'gpt-4-1',
      description: 'Flagship model with 1M context — best for complex tasks, coding, and instruction following.',
      contextWindow: 1_000_000,
      knowledgeCutoff: '2024-06',
      inputPrice: 2.00,
      outputPrice: 8.00,
    },
    {
      id: 2,
      providerId: 1,
      name: 'GPT-4.1 mini',
      slug: 'gpt-4-1-mini',
      description: 'Balanced performance at lower cost with full 1M context window.',
      contextWindow: 1_000_000,
      knowledgeCutoff: '2024-06',
      inputPrice: 0.40,
      outputPrice: 1.60,
    },
    {
      id: 3,
      providerId: 1,
      name: 'GPT-4.1 nano',
      slug: 'gpt-4-1-nano',
      description: 'Ultra-affordable model for high-volume classification, extraction, and routing.',
      contextWindow: 1_000_000,
      knowledgeCutoff: '2024-06',
      inputPrice: 0.10,
      outputPrice: 0.40,
    },
    {
      id: 4,
      providerId: 1,
      name: 'GPT-4o',
      slug: 'gpt-4o',
      description: 'Previous-generation flagship multimodal model.',
      contextWindow: 128_000,
      knowledgeCutoff: '2023-10',
      inputPrice: 2.50,
      outputPrice: 10.00,
    },
    {
      id: 5,
      providerId: 1,
      name: 'o3',
      slug: 'o3',
      description: 'Reasoning model for complex multi-step tasks and analysis.',
      contextWindow: 200_000,
      knowledgeCutoff: '2024-06',
      inputPrice: 2.00,
      outputPrice: 8.00,
    },
    {
      id: 6,
      providerId: 1,
      name: 'o4-mini',
      slug: 'o4-mini',
      description: 'Cost-efficient reasoning model — solid reasoning at roughly half the cost of o3.',
      contextWindow: 200_000,
      knowledgeCutoff: '2024-06',
      inputPrice: 1.10,
      outputPrice: 4.40,
    },

    // ── Anthropic ───────────────────────────────────────────
    {
      id: 7,
      providerId: 2,
      name: 'Claude Sonnet 4',
      slug: 'claude-sonnet-4',
      description: 'Balanced model for enterprise workloads — strong reasoning and coding.',
      contextWindow: 200_000,
      knowledgeCutoff: '2025-03',
      inputPrice: 3.00,
      outputPrice: 15.00,
    },
    {
      id: 8,
      providerId: 2,
      name: 'Claude Haiku 3.5',
      slug: 'claude-haiku-3-5',
      description: 'Fast and cost-efficient for high-volume tasks like triage and classification.',
      contextWindow: 200_000,
      knowledgeCutoff: '2024-07',
      inputPrice: 0.80,
      outputPrice: 4.00,
    },
    {
      id: 9,
      providerId: 2,
      name: 'Claude Opus 4',
      slug: 'claude-opus-4',
      description: 'Most capable model for complex analysis, research, and extended reasoning.',
      contextWindow: 200_000,
      knowledgeCutoff: '2025-03',
      inputPrice: 15.00,
      outputPrice: 75.00,
    },

    // ── Google ───────────────────────────────────────────────
    {
      id: 10,
      providerId: 3,
      name: 'Gemini 2.5 Pro',
      slug: 'gemini-2-5-pro',
      description: 'Flagship thinking model — best for complex reasoning, coding, and math.',
      contextWindow: 1_000_000,
      knowledgeCutoff: '2025-01',
      inputPrice: 1.25,
      outputPrice: 10.00,
    },
    {
      id: 11,
      providerId: 3,
      name: 'Gemini 2.5 Flash',
      slug: 'gemini-2-5-flash',
      description: 'Fast hybrid reasoning model — great balance of speed and intelligence.',
      contextWindow: 1_000_000,
      knowledgeCutoff: '2025-01',
      inputPrice: 0.15,
      outputPrice: 0.60,
    },
    {
      id: 12,
      providerId: 3,
      name: 'Gemini 2.0 Flash',
      slug: 'gemini-2-0-flash',
      description: 'Previous-gen workhorse — fast and cost-efficient multimodal model.',
      contextWindow: 1_000_000,
      knowledgeCutoff: '2024-08',
      inputPrice: 0.10,
      outputPrice: 0.40,
    },

    // ── Meta ─────────────────────────────────────────────────
    {
      id: 13,
      providerId: 4,
      name: 'Llama 4 Maverick',
      slug: 'llama-4-maverick',
      description: 'MoE model — frontier-class quality at a fraction of proprietary model costs.',
      contextWindow: 1_000_000,
      knowledgeCutoff: '2025-03',
      inputPrice: 0.22,
      outputPrice: 0.85,
    },
    {
      id: 14,
      providerId: 4,
      name: 'Llama 4 Scout',
      slug: 'llama-4-scout',
      description: 'Lightweight MoE model with 10M context window — ultra-affordable.',
      contextWindow: 10_000_000,
      knowledgeCutoff: '2025-03',
      inputPrice: 0.15,
      outputPrice: 0.50,
    },

    // ── Mistral ──────────────────────────────────────────────
    {
      id: 15,
      providerId: 5,
      name: 'Mistral Large 2',
      slug: 'mistral-large-2',
      description: 'Top-tier reasoning model with 128K context window.',
      contextWindow: 128_000,
      knowledgeCutoff: '2024-07',
      inputPrice: 2.00,
      outputPrice: 6.00,
    },
    {
      id: 16,
      providerId: 5,
      name: 'Mistral Medium 3',
      slug: 'mistral-medium-3',
      description: 'GPT-4 class performance at a fraction of the cost.',
      contextWindow: 128_000,
      knowledgeCutoff: '2024-07',
      inputPrice: 0.40,
      outputPrice: 2.00,
    },
  ]);

  // Seed some history for charts
  await db.insert(PriceHistory).values([
    { id: 1, modelId: 4, priceInput: 5.00, priceOutput: 15.00, date: new Date('2024-05-13') },   // GPT-4o launch
    { id: 2, modelId: 4, priceInput: 2.50, priceOutput: 10.00, date: new Date('2024-08-06') },   // GPT-4o price drop
    { id: 3, modelId: 7, priceInput: 3.00, priceOutput: 15.00, date: new Date('2025-05-22') },   // Claude Sonnet 4 launch
    { id: 4, modelId: 1, priceInput: 2.00, priceOutput: 8.00, date: new Date('2025-04-14') },    // GPT-4.1 launch
    { id: 5, modelId: 10, priceInput: 1.25, priceOutput: 10.00, date: new Date('2025-03-25') },  // Gemini 2.5 Pro launch
  ]);
}
