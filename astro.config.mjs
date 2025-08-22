import { defineConfig } from "astro/config";
import mdx from "@astrojs/mdx";
import react from "@astrojs/react";
import sitemap from "@astrojs/sitemap";
import tailwind from "@astrojs/tailwind";
import vercel from "@astrojs/vercel";
import icon from "astro-icon";
import simpleStackForm from "simple-stack-form";
import db from "@astrojs/db";
import partytown from "@astrojs/partytown";

export default defineConfig({
  site: "https://usagepricing.com",
  integrations: [
    mdx({
      syntaxHighlight: "shiki",
      shikiConfig: {
        theme: "github-dark-dimmed",
      },
      gfm: true,
    }),
    icon(),
    sitemap({
      filter: (page) => {
        if (
          page.includes("/blog/") ||
          page.includes("/docs/") ||
          page.includes("/guides/") ||
          page.includes("/explained/") ||
          page.includes("/releases/") ||
          page.includes("/newsletter")
        ) {
          return false; // rely on getStaticPaths to skip drafts
        }
        return true;
      },
    }),
    react(),
    tailwind({
      applyBaseStyles: false,
    }),
    simpleStackForm(),
    partytown({ config: { forward: ["dataLayer.push"] } }),
    db({
      adapter: "turso",
      dbUrl: import.meta.env.DB_URL,
      authToken: import.meta.env.DB_AUTH_TOKEN,
    }),
  ],
  output: "server",
  adapter: vercel({
    analytics: true,
    functionPerRoute: false, // reduce cold starts & limits
    runtime: "nodejs",
  }),
  vite: {
    server: {
      hmr: false,
    },
    
  },
});
