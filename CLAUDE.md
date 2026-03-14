# UsagePricing.com — Project Reference

## About
UsagePricing.com is the go-to resource for usage-based pricing for AI companies. Free tools (calculators, token tracker, comparisons) drive SEO traffic → future paid calculator-builder SaaS.

## Tech Stack
- Astro 5.x (SSR + static hybrid) on Vercel
- React 18 for interactive components (client:load hydration)
- Astro DB (libSQL) for provider/model/pricing data
- Tailwind CSS + shadcn/ui components
- MDX for blog posts and guides
- pnpm package manager, WSL dev environment

## Dev Commands
- `pnpm run dev` — Start dev server on port 4321
- `pnpm run build` — Production build
- `pnpm astro db push` — Push DB schema changes
- `pnpm astro db seed` — Seed database

## Content Architecture

### Blog Posts (`src/content/blog/*.md`)
- Frontmatter: title, description, cover, category, pubDate, tags, author
- Categories: business, engineering, AI Pricing, AI Infrastructure, AI Future, AI FinOps, Product Strategy
- ~40 published posts focused on AI pricing, FinOps, billing infrastructure

### Guides (`src/content/guides/*.mdx`)
- 15 published comprehensive guides on usage-based pricing implementation
- Series covering: fundamentals → metrics → models → credits → entitlements → tracking → aggregation → invoicing → thresholds → implementation → revenue recognition

### Explained Articles (`src/content/explained/*.md`)
- Deep analysis of individual company pricing models
- Frontmatter: title, description, company, product, pricing_model, pricingHistory, sourceUrl, lastVerified
- Currently 1 published (Intercom). Target: 100+ companies.
- Slug convention: `{company}-pricing` (e.g., `intercom-pricing`)

### AI Token Pricing Tracker (DB-driven, SSR)
- `/ai-token-pricing` — Hub page
- `/ai-token-pricing/{provider}` — Provider overview
- `/ai-token-pricing/{provider}/{model}` — Individual model page
- `/ai-token-pricing/compare/{model-a-vs-model-b}` — Comparison pages

### Pricing Calculators (Config-driven, static)
- `/tools/pricing-calculator` — Calculator hub
- `/tools/pricing-calculator/{slug}` — Individual calculator
- Config: `src/config/calculators.ts` (all 10 calculator configs)
- Compute functions: `src/config/compute-functions.ts`
- Types: `src/config/calculator-types.ts`

## SEO Standards

### Title Tags
- Format: `{Page Title} | UsagePricing`
- Keep under 60 characters
- Include primary keyword
- Never use "Usagepricing.com" — always "UsagePricing"

### Meta Descriptions
- 150-160 characters
- Include primary keyword naturally
- End with value proposition or CTA

### URL Conventions
- Lowercase kebab-case, no trailing slashes
- Blog: `/blog/{descriptive-slug}`
- Guides: `/guides/{topic-slug}`
- Explained: `/explained/{company}-pricing`
- Calculators: `/tools/pricing-calculator/{company-slug}`
- Glossary: `/glossary/{term-slug}`
- Industry: `/industry/{vertical}-ai-pricing`
- Keep slugs under 5 words

### Schema Markup
- Organization schema on every page (base layout)
- BlogPosting on blog posts
- Article on guides
- WebApplication on calculator pages
- Product on model pages
- DataCatalog on token tracker
- BreadcrumbList on all non-homepage pages
- FAQPage where FAQ sections exist

### Internal Linking Rules
- Every blog post should link to at least 1 relevant calculator
- Every blog post should link to at least 1 relevant guide
- Every calculator page should have "Related Blog Posts" section
- Every model page should link to its calculator
- Every model page should suggest 3 comparisons

## Content Strategy & Voice

### Philosophy
- Solve real problems for real people — not just aggregate info
- Be the first click in the buyer journey
- Write in the user's language (tickets, not tokens; cost, not COGS)
- Content IS the product — not decoration or lead bait
- Be there earlier — help the curious, not just the ready-to-buy

### Target Audiences
1. **AI Product Managers** — pricing strategy, value metrics, packaging
2. **Engineering Leaders / CTOs** — implementation, billing systems, cost tracking
3. **Finance Teams / CFOs** — budgeting, forecasting, revenue recognition, AI FinOps
4. **Developers** — API cost estimation, model selection, token optimization
5. **Founders / Business Leaders** — pricing models, competitive analysis, go-to-market

### Content Pillars
1. **UBP Fundamentals** — What is usage-based pricing, types, pros/cons, case studies
2. **Pricing Metric Selection** — Value metrics, price sensitivity, packaging
3. **Technical Implementation** — Usage tracking, billing systems, data pipelines
4. **Financial Management** — Revenue forecasting, cash flow, investor communication
5. **Customer Communication** — Education materials, change management, sales enablement
6. **AI-Specific Pricing** — Token economics, model selection, cost optimization

### Writing Guidelines
- Use "you" and "your" — direct address
- Lead with the problem, then the solution
- Include real numbers and examples (use data from our token tracker)
- Add "Quick Answer" / TL;DR at the top of long posts (for AI Overview citations)
- Include comparison tables in HTML `<table>` format (not just markdown)
- Add `updatedDate` to frontmatter when updating existing posts
- Avoid: jargon without explanation, walls of text, generic advice

### GEO (Generative Engine Optimization) Patterns
- Start articles with direct answer to the query in first 2-3 sentences
- Include explicit definitions: **{Term}** is {definition}.
- Format quotable stats: "According to UsagePricing's tracker, {stat}."
- Use semantic HTML tables for all comparison data
- Always show "Updated {Month Year}" visibly on pages

## Primary Keyword Targets

| Keyword Cluster | Target Page |
|---|---|
| usage-based pricing | `/guides/introduction-usage-based-pricing` + guides index |
| AI pricing calculator | `/tools/pricing-calculator` |
| {company} pricing calculator | `/tools/pricing-calculator/{slug}` |
| AI token pricing / LLM cost | `/ai-token-pricing` |
| {model A} vs {model B} | `/ai-token-pricing/compare/{slug}` |
| {company} pricing | `/explained/{company}-pricing` |
| AI pricing strategy | Future pillar page |
| AI cost optimization | Future hub page |
| AI FinOps | Future hub page |
| usage-based billing | `/guides/usage-invoicing-billing-cycles` |

## Competitor Intelligence

| Competitor | Their Edge | Our Differentiation |
|---|---|---|
| langcopilot.com | 210+ models calculator | Editorial + tools combo |
| docsbot.ai | Focused "openai api pricing calculator" SEO | Multi-company + use-case calculators |
| tokencalculator.ai | Pure calculator tool | Calculator + guides + explained = full funnel |
| cloudidr.com | Live cost tracking | Free public tools (they're paid SaaS) |
| getmonetizely.com | Pricing strategy content | Usage-based pricing depth + interactive tools |
| bvp.com/atlas | VC-authority pricing playbook | Practitioner depth + free tools |

## DB Schema Reference
- **Provider**: id, name, slug, website, description, logoUrl
- **Model**: id, providerId, name, slug, inputPrice (per 1M tokens), outputPrice, contextWindow, isDeprecated
- **PriceHistory**: id, modelId, inputPrice, outputPrice, recordedAt
- **WaitingList**: id, email, createdAt
