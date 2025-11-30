import Firecrawl from '@mendable/firecrawl-js';
import OpenAI from 'openai';
import dotenv from 'dotenv';

dotenv.config();

// Initialize clients
const firecrawl = new Firecrawl({ apiKey: process.env.FIRECRAWL_API_KEY });
const openai = new OpenAI({
    apiKey: process.env.AZURE_OPENAI_API_KEY,
    baseURL: `${process.env.AZURE_OPENAI_ENDPOINT}/openai/deployments/${process.env.AZURE_OPENAI_DEPLOYMENT}`,
    defaultQuery: { 'api-version': '2024-08-01-preview' },
    defaultHeaders: { 'api-key': process.env.AZURE_OPENAI_API_KEY },
});

// Mapping of provider slugs to their pricing URLs
const PROVIDER_URLS = {
    openai: 'https://openai.com/api/pricing/',
    anthropic: 'https://www.anthropic.com/pricing',
    google: 'https://ai.google.dev/pricing',
};

async function fetchAndExtractPrices(url: string, providerName: string) {
    console.log(`Fetching pricing for ${providerName} from ${url}...`);

    try {
        // 1. Scrape the page using Firecrawl
        const scrapeResult = await firecrawl.scrape(url);

        const markdown = scrapeResult.data?.markdown || scrapeResult.markdown || '';

        if (!markdown) {
            throw new Error(`No content scraped from ${url}`);
        }

        console.log(`Successfully scraped ${markdown.length} characters.`);

        // 2. Extract data using Azure OpenAI with structured outputs
        const completion = await openai.chat.completions.create({
            model: process.env.AZURE_OPENAI_DEPLOYMENT || 'gpt-4o',
            messages: [
                {
                    role: 'system',
                    content: 'You are a data extraction assistant. Extract AI model pricing information from the provided text. Return a JSON array of models with their names and prices per 1 MILLION tokens.'
                },
                {
                    role: 'user',
                    content: `Extract the pricing for ${providerName} models from the following text. 
Return ONLY a JSON object with a "models" array. Each model should have:
- model_name: string (the model name)
- input_price_per_million: number (price per 1 MILLION input tokens in USD)
- output_price_per_million: number (price per 1 MILLION output tokens in USD)

If the price is given per 1k tokens, multiply by 1000.
Ignore enterprise, batch, or custom pricing. Focus on standard API pay-as-you-go pricing.
Only include text-based chat/completion models, not image/video/audio/embedding models.

Text:
${markdown.substring(0, 100000)}`
                }
            ],
            response_format: { type: 'json_object' },
        });

        const responseText = completion.choices[0].message.content || '{}';
        const extractedData = JSON.parse(responseText);
        return extractedData.models || [];

    } catch (error) {
        console.error(`Error processing ${providerName}:`, error);
        return [];
    }
}

async function updateDatabase(providerSlug: string, extractedModels: any[]) {
    console.log(`Generating SQL for ${providerSlug}...`);

    const sqlStatements = [];

    sqlStatements.push(`-- ========================================`);
    sqlStatements.push(`-- Provider: ${providerSlug}`);
    sqlStatements.push(`-- ========================================`);

    for (const model of extractedModels) {
        console.log(`Found: ${model.model_name} - Input: $${model.input_price_per_million}, Output: $${model.output_price_per_million}`);

        // Sanitize model name for slug generation
        const modelSlug = model.model_name.toLowerCase()
            .replace(/\s+/g, '-')
            .replace(/[^a-z0-9-]/g, '');

        sqlStatements.push(``);
        sqlStatements.push(`-- ${model.model_name}`);
        sqlStatements.push(`-- Insert new model if it doesn't exist, or update if it does`);

        // Use INSERT OR REPLACE pattern (SQLite syntax)
        // First, try to insert the model if it's new
        sqlStatements.push(`
INSERT INTO Model (name, slug, providerId, inputPrice, outputPrice, contextWindow, description)
SELECT 
    '${model.model_name}', 
    '${modelSlug}',
    id,
    ${model.input_price_per_million},
    ${model.output_price_per_million},
    128000,
    'Auto-imported from ${providerSlug} pricing page'
FROM Provider 
WHERE slug = '${providerSlug}'
AND NOT EXISTS (
    SELECT 1 FROM Model WHERE slug = '${modelSlug}'
);`);

        // Then update existing models
        sqlStatements.push(`
UPDATE Model 
SET inputPrice = ${model.input_price_per_million}, 
    outputPrice = ${model.output_price_per_million}
WHERE slug = '${modelSlug}';`);

        // Add price history entry
        sqlStatements.push(`
INSERT INTO PriceHistory (modelId, priceInput, priceOutput, date) 
SELECT id, ${model.input_price_per_million}, ${model.output_price_per_million}, date('now')
FROM Model 
WHERE slug = '${modelSlug}';`);
    }

    return sqlStatements;
}

async function main() {
    const allSql = [];

    for (const [slug, url] of Object.entries(PROVIDER_URLS)) {
        const models = await fetchAndExtractPrices(url, slug);
        if (models.length > 0) {
            const sql = await updateDatabase(slug, models);
            allSql.push(...sql);
        }
    }

    console.log('\n--- Generated SQL Updates ---');
    console.log(allSql.join('\n'));
}

main().catch(console.error);
