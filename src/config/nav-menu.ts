import type { NavMenuConfig } from "@/types";

export const navMenuConfig: NavMenuConfig = {
  pagesNav: [
    {
      title: "Free Tools",
      items: [
        {
          title: "AI Pricing Calculator",
          href: "/tools/pricing-calculator",
          description: "Estimate costs for OpenAI, Anthropic, Google, and more — free, no signup.",
          image: "/images/examples/pricing_calculator_thumb.png",
          launched: true,
        },
        {
          title: "AI Token Price Tracker",
          href: "/ai-token-pricing",
          description: "Live pricing for 30+ AI models. Compare costs per 1M tokens across providers.",
          image: "/images/examples/token_tracker_thumb.png",
          launched: true,
        },
        /* {
          title: "ROI Calculator",
          href: "/calculator",
          description: "Easily communicate the value delivered with ROI calculators.",
          image: "/images/examples/roi_calculator_thumb.png",
          disabled: true,
        },
        {
          title: "Templates",
          href: "#",
          description:
            "Choose from our calculator templates library to get started quickly.",
          image: "/images/examples/templates_thumb.png",
          disabled: true,
        }, */
      ],
    },
  ],
  examplesNav: [
    {
      title: "Resources",
      items: [
        {
          title: "Blog",
          href: "/blog",
          description: "Learn from industry experts.Stay upto date with the latest trends.",
          image: "/images/examples/blog_thumb.png",
        },
        {
          title: "Guides",
          href: "/guides",
          description:
            "Learn everything about usage based pricing from our guides.",
          image: "/images/examples/guides_thumb.png",
        },
       /* {
          title: "Anime List",
          href: "/animes",
          description:
            "Fetch anime content from an graphql endpoint. Tabs component.",
          image: "/images/examples/animes.jpg",
          launched: true,
        },
        {
          title: "Blog DB",
          href: "/blog-db",
          description:
            "Blog built using Astro DB. With categories, views & likes.",
          // image: "/images/examples/blog-db.jpg",
          disabled: true,
        },
        {
          title: "Ecommerce",
          href: "/products",
          disabled: true,
          description: "Ecommerce pages fetching data from an API.",
          // image: "/images/examples/ecommerce.jpg",
        },
        {
          title: "Authentification",
          href: "/auth",
          description: "Implement an authentification using Astro DB & Lucia",
          // image: "/images/examples/auth.jpg",
          disabled: true,
        },
        */
      ],
    },
  ],
  links: [
   /* {
      title: "Ask Community",
       href: "#",
       description: "Example description",
       image: "/images/examples/image.jpg",
       
     },*/
      {
      title: "Guides",
       href: "/guides",
       description: "Learn everything about usage based pricing from our guides.",
       image: "/images/examples/image.jpg",
       
     },
      {
      title: "Pricing explained",
       href: "/explained",
       description: "Learn how AI companies at the forefront innovation are pricing thier products.",
       image: "/images/examples/image.jpg",
       
     },
  ],
};
