import { defineCollection, z } from "astro:content";

const blog = defineCollection({
  // Type-check frontmatter using a schema
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      description: z.string(),
      cover: image(),
      category: z.string(),
      // Transform string to Date object
      pubDate: z
        .string()
        .or(z.date())
        .transform((val) => new Date(val)),
      updatedDate: z
        .string()
        .or(z.date())
        .optional()
        .transform((str) => (str ? new Date(str) : undefined)),
      // Add draft support fields
      draft: z.boolean().optional(),
      excludeFromBuild: z.boolean().optional(),
      devOnly: z.boolean().optional(),
      tags: z.array(z.string()).optional(),
      author: z.string().optional().default("Abhilash John"),
      authorImage: image().optional(),
    }),
});

const guides = defineCollection({
  schema: z.object({
    title: z.string(),
    description: z.string(),
    // Add draft support fields
    draft: z.boolean().optional(),
    excludeFromBuild: z.boolean().optional(),
    devOnly: z.boolean().optional(),
    tags: z.array(z.string()).optional(),
    pubDate: z
      .string()
      .or(z.date())
      .transform((val) => new Date(val)),
    author: z.string().optional().default("Abhilash John"),
    image: z.string().optional(),
  }),
});

const docs = defineCollection({
  schema: z.object({
    title: z.string(),
    description: z.string(),
    published: z.boolean().default(true),
    featured: z.boolean().default(false),
    pubDate: z
      .string()
      .or(z.date())
      .transform((val) => new Date(val)),
    // Add draft support fields
    draft: z.boolean().optional(),
    excludeFromBuild: z.boolean().optional(),
    devOnly: z.boolean().optional(),
    tags: z.array(z.string()).optional(),
  }),
});


const explained = defineCollection({
  schema: z.object({
    title: z.string(),
    description: z.string(),
    today: z.date().optional(),
    author: z.string().optional(),
    company: z.string().optional(),
    product: z.string().optional(),
    pricing_model: z.string().optional(),
    published: z.boolean().default(true),
    featured: z.boolean().default(false),
    pubDate: z
      .string()
      .or(z.date())
      .transform((val) => new Date(val)),
    // Add draft support fields
    draft: z.boolean().optional(),
    excludeFromBuild: z.boolean().optional(),
    devOnly: z.boolean().optional(),
    tags: z.array(z.string()).optional(),
    pricingHistory: z
      .array(
        z.object({
          date: z.date({ coerce: true }),
          title: z.string(),
          summary: z.string(),
          type: z.enum(["major", "minor", "adjustment"]).optional(),
          image: z.string().optional(),
        })
      )
      .optional(),
    sourceUrl: z.string().url().optional(),
    lastVerified: z.date({ coerce: true }).optional(),
  }),
});

const releases = defineCollection({
  // Type-check frontmatter using a schema
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      description: z.string(),
      versionNumber: z.string(),
      image: z.object({
        src: image(),
        alt: z.string(),
      }),
      // Transform string to Date object
      date: z.date({ coerce: true }),
      // Add draft support fields
      draft: z.boolean().optional(),
      excludeFromBuild: z.boolean().optional(),
      devOnly: z.boolean().optional(),
      tags: z.array(z.string()).optional(),

    }),
});

export const collections = { blog, docs, guides, releases, explained };