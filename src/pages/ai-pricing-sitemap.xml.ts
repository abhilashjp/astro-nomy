import { db, Provider, Model } from "astro:db";

export async function GET() {
    // Fetch all providers and models from the database
    const providers = await db.select().from(Provider);
    const models = await db
        .select({
            slug: Model.slug,
            providerSlug: Provider.slug,
        })
        .from(Model)
        .innerJoin(Provider, (Model, Provider) => Model.providerId === Provider.id);

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
