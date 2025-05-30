import { defineCollection, z } from "astro:content";

const blog = defineCollection({
  // Type-check frontmatter using a schema
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      description: z.string(),
      cover: z.string(),
      category: z.string(),
      // Transform string to Date object
      pubDate: z
        .string()
        .or(z.date())
        .transform((val) => new Date(val)),
      updatedDate: z
        .string()
        .optional()
        .transform((str) => (str ? new Date(str) : undefined)),
      // Add draft support fields
      draft: z.boolean().optional(),
      excludeFromBuild: z.boolean().optional(),
      devOnly: z.boolean().optional(),
    }),
});

const docs = defineCollection({
  schema: z.object({
    title: z.string(),
    description: z.string(),
    // Add draft support fields
    draft: z.boolean().optional(),
    excludeFromBuild: z.boolean().optional(),
    devOnly: z.boolean().optional(),
  }),
});

const guides = defineCollection({
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
    }),
});

export const collections = { blog, docs, guides, releases };