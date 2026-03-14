import { db, Provider, Model, eq } from "astro:db";
import { allCalculatorConfigs } from "../config/calculators";

export async function GET() {
    // Fetch all providers and models from the database
    const providers = await db.select().from(Provider);
    const models = await db
        .select({
            slug: Model.slug,
            providerSlug: Provider.slug,
        })
        .from(Model)
        .innerJoin(Provider, eq(Model.providerId, Provider.id));

    // Generate comparison slugs for all model pairs
    const comparisonSlugs: string[] = [];
    for (let i = 0; i < models.length; i++) {
        for (let j = i + 1; j < models.length; j++) {
            comparisonSlugs.push(`${models[i].slug}-vs-${models[j].slug}`);
        }
    }

    // Generate XML for AI pricing URLs
    const baseUrl = "https://usagepricing.com";
    const now = new Date().toISOString();

    const urls = [
        // Main pricing page
        `  <url>
    <loc>${baseUrl}/ai-token-pricing</loc>
    <lastmod>${now}</lastmod>
    <changefreq>daily</changefreq>
    <priority>1.0</priority>
  </url>`,

        // Provider pages
        ...providers.map(
            (p) => `  <url>
    <loc>${baseUrl}/ai-token-pricing/${p.slug}</loc>
    <lastmod>${now}</lastmod>
    <changefreq>daily</changefreq>
    <priority>0.9</priority>
  </url>`
        ),

        // Model pages
        ...models.map(
            (m) => `  <url>
    <loc>${baseUrl}/ai-token-pricing/${m.providerSlug}/${m.slug}</loc>
    <lastmod>${now}</lastmod>
    <changefreq>daily</changefreq>
    <priority>0.8</priority>
  </url>`
        ),

        // Comparison pages (top priority pairs)
        ...comparisonSlugs.slice(0, 50).map(
            (slug) => `  <url>
    <loc>${baseUrl}/ai-token-pricing/compare/${slug}</loc>
    <lastmod>${now}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.7</priority>
  </url>`
        ),

        // Calculator hub
        `  <url>
    <loc>${baseUrl}/tools/pricing-calculator</loc>
    <lastmod>${now}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.9</priority>
  </url>`,

        // Individual calculator pages
        ...allCalculatorConfigs.map(
            (c) => `  <url>
    <loc>${baseUrl}/tools/pricing-calculator/${c.companySlug}</loc>
    <lastmod>${now}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
  </url>`
        ),

        // Guides index
        `  <url>
    <loc>${baseUrl}/guides</loc>
    <lastmod>${now}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
  </url>`,
    ];

    const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.join("\n")}
</urlset>`;

    return new Response(xml, {
        headers: {
            "Content-Type": "application/xml",
        },
    });
}
