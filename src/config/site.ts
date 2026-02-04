import type { SidebarNavItem, SiteConfig } from "@/types";

export const siteConfig: SiteConfig = {
  name: "UsagePricing",
  description:
    "The Ultimate One-Stop Resource Hub for Everything You Need to Know About Usage Based Pricing Models.",
  url: "https://usagepricing.com/",
  ogImage: "https://usagepricing.com/og.jpg",
  links: {
    twitter: "https://x.com/usagepricing",
    github: "",
  },
};

export const footerLinks: SidebarNavItem[] = [
  {
    title: "Company",
    items: [
      { title: "About", href: "/about" },
      { title: "Blog", href: "/blog" },
      // { title: "Careers", href: "#" },
    ],
  },
  {
    title: "Resources",
    items: [
      { title: "Guides", href: "/guides/introduction-usage-based-pricing" },
      { title: "Pricing Explained", href: "/explained" },
      { title: "AI Token Price Tracker", href: "/ai-token-pricing" },
    ],
  },
  {
    title: "Social",
    items: [
      { title: "Twitter", href: siteConfig.links.twitter },
      // { title: "GitHub", href: siteConfig.links.github },
    ],
  },
];
