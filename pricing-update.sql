
> astro-nomy@0.1.0 update-prices /home/abhil/projects/astro-nomy
> tsx ./scripts/update-prices.ts

[dotenv@17.2.3] injecting env (11) from .env -- tip: 🔄 add secrets lifecycle management: https://dotenvx.com/ops
Fetching pricing for openai from https://openai.com/api/pricing/...
Successfully scraped 12229 characters.
Generating SQL for openai...
Found: GPT-5.1 - Input: $1.25, Output: $10
Found: GPT-5 mini - Input: $0.25, Output: $2
Found: GPT-5 nano - Input: $0.05, Output: $0.4
Found: GPT-5 pro - Input: $15, Output: $120
Found: gpt-realtime - Input: $4, Output: $16
Found: gpt-realtime-mini - Input: $0.6, Output: $2.4
Fetching pricing for anthropic from https://www.anthropic.com/pricing...
Successfully scraped 20414 characters.
Generating SQL for anthropic...
Found: Opus 4.5 - Input: $5, Output: $25
Found: Sonnet 4.5 (prompts ≤ 200K tokens) - Input: $3, Output: $15
Found: Sonnet 4.5 (prompts > 200K tokens) - Input: $6, Output: $22.5
Found: Haiku 4.5 - Input: $1, Output: $5
Found: Opus 4.1 - Input: $15, Output: $75
Found: Sonnet 4 - Input: $3, Output: $15
Found: Opus 4 - Input: $15, Output: $75
Found: Sonnet 3.7 - Input: $3, Output: $15
Found: Haiku 3.5 - Input: $0.8, Output: $4
Found: Opus 3 - Input: $15, Output: $75
Found: Haiku 3 - Input: $0.25, Output: $1.25
Fetching pricing for google from https://ai.google.dev/pricing...
Successfully scraped 39495 characters.
Generating SQL for google...
Found: gemini-3-pro-preview - Input: $2, Output: $12
Found: gemini-2.5-pro - Input: $1.25, Output: $10
Found: gemini-2.5-flash - Input: $0.3, Output: $2.5
Found: gemini-2.5-flash-preview-09-2025 - Input: $0.3, Output: $2.5
Found: gemini-2.5-flash-lite - Input: $0.1, Output: $0.4
Found: gemini-2.5-flash-lite-preview-09-2025 - Input: $0.1, Output: $0.4
Found: gemini-2.0-flash - Input: $0.1, Output: $0.4
Found: gemini-2.0-flash-lite - Input: $0.075, Output: $0.3
Found: gemini-2.5-computer-use-preview-10-2025 - Input: $1.25, Output: $10
Found: gemini-robotics-er-1.5-preview - Input: $0.3, Output: $2.5

--- Generated SQL Updates ---
-- ========================================
-- Provider: openai
-- ========================================

-- GPT-5.1
-- Insert new model if it doesn't exist, or update if it does

INSERT INTO Model (name, slug, providerId, inputPrice, outputPrice, contextWindow, description)
SELECT 
    'GPT-5.1', 
    'gpt-51',
    id,
    1.25,
    10,
    128000,
    'Auto-imported from openai pricing page'
FROM Provider 
WHERE slug = 'openai'
AND NOT EXISTS (
    SELECT 1 FROM Model WHERE slug = 'gpt-51'
);

UPDATE Model 
SET inputPrice = 1.25, 
    outputPrice = 10
WHERE slug = 'gpt-51';

INSERT INTO PriceHistory (modelId, priceInput, priceOutput, date) 
SELECT id, 1.25, 10, date('now')
FROM Model 
WHERE slug = 'gpt-51';

-- GPT-5 mini
-- Insert new model if it doesn't exist, or update if it does

INSERT INTO Model (name, slug, providerId, inputPrice, outputPrice, contextWindow, description)
SELECT 
    'GPT-5 mini', 
    'gpt-5-mini',
    id,
    0.25,
    2,
    128000,
    'Auto-imported from openai pricing page'
FROM Provider 
WHERE slug = 'openai'
AND NOT EXISTS (
    SELECT 1 FROM Model WHERE slug = 'gpt-5-mini'
);

UPDATE Model 
SET inputPrice = 0.25, 
    outputPrice = 2
WHERE slug = 'gpt-5-mini';

INSERT INTO PriceHistory (modelId, priceInput, priceOutput, date) 
SELECT id, 0.25, 2, date('now')
FROM Model 
WHERE slug = 'gpt-5-mini';

-- GPT-5 nano
-- Insert new model if it doesn't exist, or update if it does

INSERT INTO Model (name, slug, providerId, inputPrice, outputPrice, contextWindow, description)
SELECT 
    'GPT-5 nano', 
    'gpt-5-nano',
    id,
    0.05,
    0.4,
    128000,
    'Auto-imported from openai pricing page'
FROM Provider 
WHERE slug = 'openai'
AND NOT EXISTS (
    SELECT 1 FROM Model WHERE slug = 'gpt-5-nano'
);

UPDATE Model 
SET inputPrice = 0.05, 
    outputPrice = 0.4
WHERE slug = 'gpt-5-nano';

INSERT INTO PriceHistory (modelId, priceInput, priceOutput, date) 
SELECT id, 0.05, 0.4, date('now')
FROM Model 
WHERE slug = 'gpt-5-nano';

-- GPT-5 pro
-- Insert new model if it doesn't exist, or update if it does

INSERT INTO Model (name, slug, providerId, inputPrice, outputPrice, contextWindow, description)
SELECT 
    'GPT-5 pro', 
    'gpt-5-pro',
    id,
    15,
    120,
    128000,
    'Auto-imported from openai pricing page'
FROM Provider 
WHERE slug = 'openai'
AND NOT EXISTS (
    SELECT 1 FROM Model WHERE slug = 'gpt-5-pro'
);

UPDATE Model 
SET inputPrice = 15, 
    outputPrice = 120
WHERE slug = 'gpt-5-pro';

INSERT INTO PriceHistory (modelId, priceInput, priceOutput, date) 
SELECT id, 15, 120, date('now')
FROM Model 
WHERE slug = 'gpt-5-pro';

-- gpt-realtime
-- Insert new model if it doesn't exist, or update if it does

INSERT INTO Model (name, slug, providerId, inputPrice, outputPrice, contextWindow, description)
SELECT 
    'gpt-realtime', 
    'gpt-realtime',
    id,
    4,
    16,
    128000,
    'Auto-imported from openai pricing page'
FROM Provider 
WHERE slug = 'openai'
AND NOT EXISTS (
    SELECT 1 FROM Model WHERE slug = 'gpt-realtime'
);

UPDATE Model 
SET inputPrice = 4, 
    outputPrice = 16
WHERE slug = 'gpt-realtime';

INSERT INTO PriceHistory (modelId, priceInput, priceOutput, date) 
SELECT id, 4, 16, date('now')
FROM Model 
WHERE slug = 'gpt-realtime';

-- gpt-realtime-mini
-- Insert new model if it doesn't exist, or update if it does

INSERT INTO Model (name, slug, providerId, inputPrice, outputPrice, contextWindow, description)
SELECT 
    'gpt-realtime-mini', 
    'gpt-realtime-mini',
    id,
    0.6,
    2.4,
    128000,
    'Auto-imported from openai pricing page'
FROM Provider 
WHERE slug = 'openai'
AND NOT EXISTS (
    SELECT 1 FROM Model WHERE slug = 'gpt-realtime-mini'
);

UPDATE Model 
SET inputPrice = 0.6, 
    outputPrice = 2.4
WHERE slug = 'gpt-realtime-mini';

INSERT INTO PriceHistory (modelId, priceInput, priceOutput, date) 
SELECT id, 0.6, 2.4, date('now')
FROM Model 
WHERE slug = 'gpt-realtime-mini';
-- ========================================
-- Provider: anthropic
-- ========================================

-- Opus 4.5
-- Insert new model if it doesn't exist, or update if it does

INSERT INTO Model (name, slug, providerId, inputPrice, outputPrice, contextWindow, description)
SELECT 
    'Opus 4.5', 
    'opus-45',
    id,
    5,
    25,
    128000,
    'Auto-imported from anthropic pricing page'
FROM Provider 
WHERE slug = 'anthropic'
AND NOT EXISTS (
    SELECT 1 FROM Model WHERE slug = 'opus-45'
);

UPDATE Model 
SET inputPrice = 5, 
    outputPrice = 25
WHERE slug = 'opus-45';

INSERT INTO PriceHistory (modelId, priceInput, priceOutput, date) 
SELECT id, 5, 25, date('now')
FROM Model 
WHERE slug = 'opus-45';

-- Sonnet 4.5 (prompts ≤ 200K tokens)
-- Insert new model if it doesn't exist, or update if it does

INSERT INTO Model (name, slug, providerId, inputPrice, outputPrice, contextWindow, description)
SELECT 
    'Sonnet 4.5 (prompts ≤ 200K tokens)', 
    'sonnet-45-prompts--200k-tokens',
    id,
    3,
    15,
    128000,
    'Auto-imported from anthropic pricing page'
FROM Provider 
WHERE slug = 'anthropic'
AND NOT EXISTS (
    SELECT 1 FROM Model WHERE slug = 'sonnet-45-prompts--200k-tokens'
);

UPDATE Model 
SET inputPrice = 3, 
    outputPrice = 15
WHERE slug = 'sonnet-45-prompts--200k-tokens';

INSERT INTO PriceHistory (modelId, priceInput, priceOutput, date) 
SELECT id, 3, 15, date('now')
FROM Model 
WHERE slug = 'sonnet-45-prompts--200k-tokens';

-- Sonnet 4.5 (prompts > 200K tokens)
-- Insert new model if it doesn't exist, or update if it does

INSERT INTO Model (name, slug, providerId, inputPrice, outputPrice, contextWindow, description)
SELECT 
    'Sonnet 4.5 (prompts > 200K tokens)', 
    'sonnet-45-prompts--200k-tokens',
    id,
    6,
    22.5,
    128000,
    'Auto-imported from anthropic pricing page'
FROM Provider 
WHERE slug = 'anthropic'
AND NOT EXISTS (
    SELECT 1 FROM Model WHERE slug = 'sonnet-45-prompts--200k-tokens'
);

UPDATE Model 
SET inputPrice = 6, 
    outputPrice = 22.5
WHERE slug = 'sonnet-45-prompts--200k-tokens';

INSERT INTO PriceHistory (modelId, priceInput, priceOutput, date) 
SELECT id, 6, 22.5, date('now')
FROM Model 
WHERE slug = 'sonnet-45-prompts--200k-tokens';

-- Haiku 4.5
-- Insert new model if it doesn't exist, or update if it does

INSERT INTO Model (name, slug, providerId, inputPrice, outputPrice, contextWindow, description)
SELECT 
    'Haiku 4.5', 
    'haiku-45',
    id,
    1,
    5,
    128000,
    'Auto-imported from anthropic pricing page'
FROM Provider 
WHERE slug = 'anthropic'
AND NOT EXISTS (
    SELECT 1 FROM Model WHERE slug = 'haiku-45'
);

UPDATE Model 
SET inputPrice = 1, 
    outputPrice = 5
WHERE slug = 'haiku-45';

INSERT INTO PriceHistory (modelId, priceInput, priceOutput, date) 
SELECT id, 1, 5, date('now')
FROM Model 
WHERE slug = 'haiku-45';

-- Opus 4.1
-- Insert new model if it doesn't exist, or update if it does

INSERT INTO Model (name, slug, providerId, inputPrice, outputPrice, contextWindow, description)
SELECT 
    'Opus 4.1', 
    'opus-41',
    id,
    15,
    75,
    128000,
    'Auto-imported from anthropic pricing page'
FROM Provider 
WHERE slug = 'anthropic'
AND NOT EXISTS (
    SELECT 1 FROM Model WHERE slug = 'opus-41'
);

UPDATE Model 
SET inputPrice = 15, 
    outputPrice = 75
WHERE slug = 'opus-41';

INSERT INTO PriceHistory (modelId, priceInput, priceOutput, date) 
SELECT id, 15, 75, date('now')
FROM Model 
WHERE slug = 'opus-41';

-- Sonnet 4
-- Insert new model if it doesn't exist, or update if it does

INSERT INTO Model (name, slug, providerId, inputPrice, outputPrice, contextWindow, description)
SELECT 
    'Sonnet 4', 
    'sonnet-4',
    id,
    3,
    15,
    128000,
    'Auto-imported from anthropic pricing page'
FROM Provider 
WHERE slug = 'anthropic'
AND NOT EXISTS (
    SELECT 1 FROM Model WHERE slug = 'sonnet-4'
);

UPDATE Model 
SET inputPrice = 3, 
    outputPrice = 15
WHERE slug = 'sonnet-4';

INSERT INTO PriceHistory (modelId, priceInput, priceOutput, date) 
SELECT id, 3, 15, date('now')
FROM Model 
WHERE slug = 'sonnet-4';

-- Opus 4
-- Insert new model if it doesn't exist, or update if it does

INSERT INTO Model (name, slug, providerId, inputPrice, outputPrice, contextWindow, description)
SELECT 
    'Opus 4', 
    'opus-4',
    id,
    15,
    75,
    128000,
    'Auto-imported from anthropic pricing page'
FROM Provider 
WHERE slug = 'anthropic'
AND NOT EXISTS (
    SELECT 1 FROM Model WHERE slug = 'opus-4'
);

UPDATE Model 
SET inputPrice = 15, 
    outputPrice = 75
WHERE slug = 'opus-4';

INSERT INTO PriceHistory (modelId, priceInput, priceOutput, date) 
SELECT id, 15, 75, date('now')
FROM Model 
WHERE slug = 'opus-4';

-- Sonnet 3.7
-- Insert new model if it doesn't exist, or update if it does

INSERT INTO Model (name, slug, providerId, inputPrice, outputPrice, contextWindow, description)
SELECT 
    'Sonnet 3.7', 
    'sonnet-37',
    id,
    3,
    15,
    128000,
    'Auto-imported from anthropic pricing page'
FROM Provider 
WHERE slug = 'anthropic'
AND NOT EXISTS (
    SELECT 1 FROM Model WHERE slug = 'sonnet-37'
);

UPDATE Model 
SET inputPrice = 3, 
    outputPrice = 15
WHERE slug = 'sonnet-37';

INSERT INTO PriceHistory (modelId, priceInput, priceOutput, date) 
SELECT id, 3, 15, date('now')
FROM Model 
WHERE slug = 'sonnet-37';

-- Haiku 3.5
-- Insert new model if it doesn't exist, or update if it does

INSERT INTO Model (name, slug, providerId, inputPrice, outputPrice, contextWindow, description)
SELECT 
    'Haiku 3.5', 
    'haiku-35',
    id,
    0.8,
    4,
    128000,
    'Auto-imported from anthropic pricing page'
FROM Provider 
WHERE slug = 'anthropic'
AND NOT EXISTS (
    SELECT 1 FROM Model WHERE slug = 'haiku-35'
);

UPDATE Model 
SET inputPrice = 0.8, 
    outputPrice = 4
WHERE slug = 'haiku-35';

INSERT INTO PriceHistory (modelId, priceInput, priceOutput, date) 
SELECT id, 0.8, 4, date('now')
FROM Model 
WHERE slug = 'haiku-35';

-- Opus 3
-- Insert new model if it doesn't exist, or update if it does

INSERT INTO Model (name, slug, providerId, inputPrice, outputPrice, contextWindow, description)
SELECT 
    'Opus 3', 
    'opus-3',
    id,
    15,
    75,
    128000,
    'Auto-imported from anthropic pricing page'
FROM Provider 
WHERE slug = 'anthropic'
AND NOT EXISTS (
    SELECT 1 FROM Model WHERE slug = 'opus-3'
);

UPDATE Model 
SET inputPrice = 15, 
    outputPrice = 75
WHERE slug = 'opus-3';

INSERT INTO PriceHistory (modelId, priceInput, priceOutput, date) 
SELECT id, 15, 75, date('now')
FROM Model 
WHERE slug = 'opus-3';

-- Haiku 3
-- Insert new model if it doesn't exist, or update if it does

INSERT INTO Model (name, slug, providerId, inputPrice, outputPrice, contextWindow, description)
SELECT 
    'Haiku 3', 
    'haiku-3',
    id,
    0.25,
    1.25,
    128000,
    'Auto-imported from anthropic pricing page'
FROM Provider 
WHERE slug = 'anthropic'
AND NOT EXISTS (
    SELECT 1 FROM Model WHERE slug = 'haiku-3'
);

UPDATE Model 
SET inputPrice = 0.25, 
    outputPrice = 1.25
WHERE slug = 'haiku-3';

INSERT INTO PriceHistory (modelId, priceInput, priceOutput, date) 
SELECT id, 0.25, 1.25, date('now')
FROM Model 
WHERE slug = 'haiku-3';
-- ========================================
-- Provider: google
-- ========================================

-- gemini-3-pro-preview
-- Insert new model if it doesn't exist, or update if it does

INSERT INTO Model (name, slug, providerId, inputPrice, outputPrice, contextWindow, description)
SELECT 
    'gemini-3-pro-preview', 
    'gemini-3-pro-preview',
    id,
    2,
    12,
    128000,
    'Auto-imported from google pricing page'
FROM Provider 
WHERE slug = 'google'
AND NOT EXISTS (
    SELECT 1 FROM Model WHERE slug = 'gemini-3-pro-preview'
);

UPDATE Model 
SET inputPrice = 2, 
    outputPrice = 12
WHERE slug = 'gemini-3-pro-preview';

INSERT INTO PriceHistory (modelId, priceInput, priceOutput, date) 
SELECT id, 2, 12, date('now')
FROM Model 
WHERE slug = 'gemini-3-pro-preview';

-- gemini-2.5-pro
-- Insert new model if it doesn't exist, or update if it does

INSERT INTO Model (name, slug, providerId, inputPrice, outputPrice, contextWindow, description)
SELECT 
    'gemini-2.5-pro', 
    'gemini-25-pro',
    id,
    1.25,
    10,
    128000,
    'Auto-imported from google pricing page'
FROM Provider 
WHERE slug = 'google'
AND NOT EXISTS (
    SELECT 1 FROM Model WHERE slug = 'gemini-25-pro'
);

UPDATE Model 
SET inputPrice = 1.25, 
    outputPrice = 10
WHERE slug = 'gemini-25-pro';

INSERT INTO PriceHistory (modelId, priceInput, priceOutput, date) 
SELECT id, 1.25, 10, date('now')
FROM Model 
WHERE slug = 'gemini-25-pro';

-- gemini-2.5-flash
-- Insert new model if it doesn't exist, or update if it does

INSERT INTO Model (name, slug, providerId, inputPrice, outputPrice, contextWindow, description)
SELECT 
    'gemini-2.5-flash', 
    'gemini-25-flash',
    id,
    0.3,
    2.5,
    128000,
    'Auto-imported from google pricing page'
FROM Provider 
WHERE slug = 'google'
AND NOT EXISTS (
    SELECT 1 FROM Model WHERE slug = 'gemini-25-flash'
);

UPDATE Model 
SET inputPrice = 0.3, 
    outputPrice = 2.5
WHERE slug = 'gemini-25-flash';

INSERT INTO PriceHistory (modelId, priceInput, priceOutput, date) 
SELECT id, 0.3, 2.5, date('now')
FROM Model 
WHERE slug = 'gemini-25-flash';

-- gemini-2.5-flash-preview-09-2025
-- Insert new model if it doesn't exist, or update if it does

INSERT INTO Model (name, slug, providerId, inputPrice, outputPrice, contextWindow, description)
SELECT 
    'gemini-2.5-flash-preview-09-2025', 
    'gemini-25-flash-preview-09-2025',
    id,
    0.3,
    2.5,
    128000,
    'Auto-imported from google pricing page'
FROM Provider 
WHERE slug = 'google'
AND NOT EXISTS (
    SELECT 1 FROM Model WHERE slug = 'gemini-25-flash-preview-09-2025'
);

UPDATE Model 
SET inputPrice = 0.3, 
    outputPrice = 2.5
WHERE slug = 'gemini-25-flash-preview-09-2025';

INSERT INTO PriceHistory (modelId, priceInput, priceOutput, date) 
SELECT id, 0.3, 2.5, date('now')
FROM Model 
WHERE slug = 'gemini-25-flash-preview-09-2025';

-- gemini-2.5-flash-lite
-- Insert new model if it doesn't exist, or update if it does

INSERT INTO Model (name, slug, providerId, inputPrice, outputPrice, contextWindow, description)
SELECT 
    'gemini-2.5-flash-lite', 
    'gemini-25-flash-lite',
    id,
    0.1,
    0.4,
    128000,
    'Auto-imported from google pricing page'
FROM Provider 
WHERE slug = 'google'
AND NOT EXISTS (
    SELECT 1 FROM Model WHERE slug = 'gemini-25-flash-lite'
);

UPDATE Model 
SET inputPrice = 0.1, 
    outputPrice = 0.4
WHERE slug = 'gemini-25-flash-lite';

INSERT INTO PriceHistory (modelId, priceInput, priceOutput, date) 
SELECT id, 0.1, 0.4, date('now')
FROM Model 
WHERE slug = 'gemini-25-flash-lite';

-- gemini-2.5-flash-lite-preview-09-2025
-- Insert new model if it doesn't exist, or update if it does

INSERT INTO Model (name, slug, providerId, inputPrice, outputPrice, contextWindow, description)
SELECT 
    'gemini-2.5-flash-lite-preview-09-2025', 
    'gemini-25-flash-lite-preview-09-2025',
    id,
    0.1,
    0.4,
    128000,
    'Auto-imported from google pricing page'
FROM Provider 
WHERE slug = 'google'
AND NOT EXISTS (
    SELECT 1 FROM Model WHERE slug = 'gemini-25-flash-lite-preview-09-2025'
);

UPDATE Model 
SET inputPrice = 0.1, 
    outputPrice = 0.4
WHERE slug = 'gemini-25-flash-lite-preview-09-2025';

INSERT INTO PriceHistory (modelId, priceInput, priceOutput, date) 
SELECT id, 0.1, 0.4, date('now')
FROM Model 
WHERE slug = 'gemini-25-flash-lite-preview-09-2025';

-- gemini-2.0-flash
-- Insert new model if it doesn't exist, or update if it does

INSERT INTO Model (name, slug, providerId, inputPrice, outputPrice, contextWindow, description)
SELECT 
    'gemini-2.0-flash', 
    'gemini-20-flash',
    id,
    0.1,
    0.4,
    128000,
    'Auto-imported from google pricing page'
FROM Provider 
WHERE slug = 'google'
AND NOT EXISTS (
    SELECT 1 FROM Model WHERE slug = 'gemini-20-flash'
);

UPDATE Model 
SET inputPrice = 0.1, 
    outputPrice = 0.4
WHERE slug = 'gemini-20-flash';

INSERT INTO PriceHistory (modelId, priceInput, priceOutput, date) 
SELECT id, 0.1, 0.4, date('now')
FROM Model 
WHERE slug = 'gemini-20-flash';

-- gemini-2.0-flash-lite
-- Insert new model if it doesn't exist, or update if it does

INSERT INTO Model (name, slug, providerId, inputPrice, outputPrice, contextWindow, description)
SELECT 
    'gemini-2.0-flash-lite', 
    'gemini-20-flash-lite',
    id,
    0.075,
    0.3,
    128000,
    'Auto-imported from google pricing page'
FROM Provider 
WHERE slug = 'google'
AND NOT EXISTS (
    SELECT 1 FROM Model WHERE slug = 'gemini-20-flash-lite'
);

UPDATE Model 
SET inputPrice = 0.075, 
    outputPrice = 0.3
WHERE slug = 'gemini-20-flash-lite';

INSERT INTO PriceHistory (modelId, priceInput, priceOutput, date) 
SELECT id, 0.075, 0.3, date('now')
FROM Model 
WHERE slug = 'gemini-20-flash-lite';

-- gemini-2.5-computer-use-preview-10-2025
-- Insert new model if it doesn't exist, or update if it does

INSERT INTO Model (name, slug, providerId, inputPrice, outputPrice, contextWindow, description)
SELECT 
    'gemini-2.5-computer-use-preview-10-2025', 
    'gemini-25-computer-use-preview-10-2025',
    id,
    1.25,
    10,
    128000,
    'Auto-imported from google pricing page'
FROM Provider 
WHERE slug = 'google'
AND NOT EXISTS (
    SELECT 1 FROM Model WHERE slug = 'gemini-25-computer-use-preview-10-2025'
);

UPDATE Model 
SET inputPrice = 1.25, 
    outputPrice = 10
WHERE slug = 'gemini-25-computer-use-preview-10-2025';

INSERT INTO PriceHistory (modelId, priceInput, priceOutput, date) 
SELECT id, 1.25, 10, date('now')
FROM Model 
WHERE slug = 'gemini-25-computer-use-preview-10-2025';

-- gemini-robotics-er-1.5-preview
-- Insert new model if it doesn't exist, or update if it does

INSERT INTO Model (name, slug, providerId, inputPrice, outputPrice, contextWindow, description)
SELECT 
    'gemini-robotics-er-1.5-preview', 
    'gemini-robotics-er-15-preview',
    id,
    0.3,
    2.5,
    128000,
    'Auto-imported from google pricing page'
FROM Provider 
WHERE slug = 'google'
AND NOT EXISTS (
    SELECT 1 FROM Model WHERE slug = 'gemini-robotics-er-15-preview'
);

UPDATE Model 
SET inputPrice = 0.3, 
    outputPrice = 2.5
WHERE slug = 'gemini-robotics-er-15-preview';

INSERT INTO PriceHistory (modelId, priceInput, priceOutput, date) 
SELECT id, 0.3, 2.5, date('now')
FROM Model 
WHERE slug = 'gemini-robotics-er-15-preview';
