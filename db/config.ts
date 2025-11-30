import { column, defineDb, defineTable } from "astro:db";

const WaitingList = defineTable({
  columns: {
    id: column.number({ primaryKey: true }),
    email: column.text({ unique: true }),
  },
});

const Provider = defineTable({
  columns: {
    id: column.number({ primaryKey: true }),
    name: column.text(),
    slug: column.text({ unique: true }),
    website: column.text({ optional: true }),
  },
});

const Model = defineTable({
  columns: {
    id: column.number({ primaryKey: true }),
    providerId: column.number({ references: () => Provider.columns.id }),
    name: column.text(),
    slug: column.text({ unique: true }),
    description: column.text({ optional: true }),
    contextWindow: column.number(),
    knowledgeCutoff: column.text({ optional: true }),
    inputPrice: column.number(), // Cost per 1M tokens
    outputPrice: column.number(), // Cost per 1M tokens
  },
});

const PriceHistory = defineTable({
  columns: {
    id: column.number({ primaryKey: true }),
    modelId: column.number({ references: () => Model.columns.id }),
    priceInput: column.number(),
    priceOutput: column.number(),
    date: column.date(),
    currency: column.text({ default: "USD" }),
  },
});

// https://astro.build/db/config
export default defineDb({
  tables: { WaitingList, Provider, Model, PriceHistory },
});
