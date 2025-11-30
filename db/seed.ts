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
    // OpenAI
    {
      id: 1,
      providerId: 1,
      name: 'GPT-4o',
      slug: 'gpt-4o',
      description: 'Flagship high-intelligence model.',
      contextWindow: 128000,
      knowledgeCutoff: '2023-10',
      inputPrice: 2.50,
      outputPrice: 10.00,
    },
    {
      id: 2,
      providerId: 1,
      name: 'GPT-4o mini',
      slug: 'gpt-4o-mini',
      description: 'Affordable and intelligent small model.',
      contextWindow: 128000,
      knowledgeCutoff: '2023-10',
      inputPrice: 0.15,
      outputPrice: 0.60,
    },
    // Anthropic
    {
      id: 3,
      providerId: 2,
      name: 'Claude 3.5 Sonnet',
      slug: 'claude-3-5-sonnet',
      description: 'Balanced model for enterprise workloads.',
      contextWindow: 200000,
      knowledgeCutoff: '2024-04',
      inputPrice: 3.00,
      outputPrice: 15.00,
    },
    {
      id: 4,
      providerId: 2,
      name: 'Claude 3 Haiku',
      slug: 'claude-3-haiku',
      description: 'Fastest and most compact model.',
      contextWindow: 200000,
      knowledgeCutoff: '2024-02',
      inputPrice: 0.25,
      outputPrice: 1.25,
    },
    // Google
    {
      id: 5,
      providerId: 3,
      name: 'Gemini 1.5 Pro',
      slug: 'gemini-1-5-pro',
      description: 'Mid-size multimodal model.',
      contextWindow: 2000000,
      knowledgeCutoff: '2024-04',
      inputPrice: 3.50,
      outputPrice: 10.50,
    },
    {
      id: 6,
      providerId: 3,
      name: 'Gemini 1.5 Flash',
      slug: 'gemini-1-5-flash',
      description: 'Fast and cost-efficient multimodal model.',
      contextWindow: 1000000,
      knowledgeCutoff: '2024-04',
      inputPrice: 0.35,
      outputPrice: 1.05,
    },
    // Meta
    {
      id: 7,
      providerId: 4,
      name: 'Llama 3 70B',
      slug: 'llama-3-70b',
      description: 'Open weight model (Hosted pricing estimated).',
      contextWindow: 8192,
      knowledgeCutoff: '2024-03',
      inputPrice: 0.90,
      outputPrice: 0.90,
    },
    // Mistral
    {
      id: 8,
      providerId: 5,
      name: 'Mistral Large',
      slug: 'mistral-large',
      description: 'Top-tier reasoning model.',
      contextWindow: 32000,
      knowledgeCutoff: '2024-02',
      inputPrice: 8.00,
      outputPrice: 24.00,
    },
  ]);

  // Seed some history for charts
  await db.insert(PriceHistory).values([
    { id: 1, modelId: 1, priceInput: 5.00, priceOutput: 15.00, date: new Date('2024-05-13') }, // GPT-4o launch
    { id: 2, modelId: 3, priceInput: 3.00, priceOutput: 15.00, date: new Date('2024-06-20') }, // Claude 3.5 Sonnet launch
    { id: 3, modelId: 1, priceInput: 2.50, priceOutput: 10.00, date: new Date('2024-08-06') }, // GPT-4o price drop
  ]);
}