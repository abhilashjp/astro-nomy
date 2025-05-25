import mdx from "@astrojs/mdx";
import react from "@astrojs/react";
import sitemap from "@astrojs/sitemap";
import tailwind from "@astrojs/tailwind";
import vercel from "@astrojs/vercel/serverless";
import icon from "astro-icon";
import { defineConfig } from "astro/config";
import simpleStackForm from "simple-stack-form";
import db from "@astrojs/db";

//// https://astro.build/config
export default defineConfig({
  site: "https://astro-nomy.vercel.app",
  integrations: [
    mdx({
      syntaxHighlight: "shiki",
      shikiConfig: {
        theme: "github-dark-dimmed",
      },
      gfm: true,
    }),
    icon(),
    sitemap(),
    react(),
    tailwind({
      applyBaseStyles: false,
    }),
    simpleStackForm(),
    db( {
      adapter: "turso",
      dbUrl: import.meta.env.DB_URL,
      authToken: import.meta.env.DB_AUTH_TOKEN,
    }),
  ],
  output: "hybrid",
  adapter: vercel({
    analytics: true,
    functionPerRoute: true, // optional
    runtime: "nodejs",
  }),
});
