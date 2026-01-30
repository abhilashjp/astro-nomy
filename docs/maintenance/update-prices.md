# How to Update Model Prices

This guide documents the process for updating the AI model pricing data in the database using the `update-prices` script.

## Overview

The `scripts/update-prices.ts` script performs the following actions:

1.  **Scrapes** pricing pages from major AI providers (OpenAI, Anthropic, Google) using [Firecrawl](https://firecrawl.dev/).
2.  **Extracts** structured pricing data (model names, input/output costs) using Azure OpenAI.
3.  **Generates** SQL statements to insert or update the `Model` table and add entries to the `PriceHistory` table.

## Prerequisites

Before running the script, ensure you have the following environment variables set in your `.env` file:

```env
# Firecrawl for scraping
FIRECRAWL_API_KEY=your_firecrawl_api_key

# Azure OpenAI for data extraction
AZURE_OPENAI_API_KEY=your_azure_api_key
AZURE_OPENAI_ENDPOINT=https://your-resource.openai.azure.com/
AZURE_OPENAI_DEPLOYMENT=gpt-4o # or your specific deployment name
```

## Running the Update

To run the script, execute the following command in the project root:

```bash
pnpm run update-prices
```

or directly:

```bash
npx tsx scripts/update-prices.ts
```

## Applying Changes

The script **does not** automatically execute the SQL against the database. Instead, it outputs the generated SQL statements to the console (stdout).

### 1. Preview Changes

Run the script to see what will be updated:

```bash
pnpm run update-prices
```

### 2. Save to File

To save the SQL queries for execution, pipe the output to a file:

```bash
pnpm run update-prices > pricing-update.sql
```

### 3. Execute SQL

You can then run the generated SQL file against your database. Use your preferred database tool or the `astro db` CLI if applicable (depending on your specific DB setup, e.g., if using a local SQLite file).

For a local SQLite database, you might run:

```bash
sqlite3 local.db < pricing-update.sql
```

## Troubleshooting

- **"No content scraped"**: Ensure the `FIRECRAWL_API_KEY` is valid and the provider URLs in `scripts/update-prices.ts` are still accessible.
- **JSON Parsing Errors**: The LLM might have failed to generate valid JSON. Check the console logs for the raw response.
- **Azure OpenAI Errors**: Verify your endpoint, deployment name, and API key.
