import type { NavMenuConfig } from "@/types";

export const navMenuConfig: NavMenuConfig = {
  pagesNav: [
    {
      title: "Products",
      items: [
        {
          title: "Pricing calculator",
          href: "/calculator",
          description: "Simplify Usage Based Pricing with Pricing Calculators.",
          image: "/images/examples/landing.jpg",
        },

        {
          title: "ROI calculator",
          href: "/calculator",
          description: "Easily communicate the value delivered with ROI calculators",
          image: "/images/examples/landing.jpg",
          disabled: true,
        },
      /* {
          title: "Changelog",
          href: "/releases",
          description: "A reproduction of Starlog template with Tailwind CSS.",
          image: "/images/examples/changelog.jpg",
        },
        {
          title: "Waitlist",
          href: "/waitlist",
          description:
            "A waitlist form using Astro DB, React Hook Form & Sonner. Static page.",
          image: "/images/examples/waitlist.jpg",
          forceReload: true,
        },
        */
        {
          title: "Pricing",
          href: "/pricing",
          description: "Start free. Simple pricing with no hidden fees.",
          image: "/images/examples/pricing.jpg",
        },
       /* {
          title: "About",
          href: "/about",
          description: "A simple page with a masonry gallery and little text.",
          image: "/images/examples/about.jpg",
        },
        {
          title: "Newsletter",
          href: "/newsletter",
          description:
            "A newsletter form using Astro DB & Simple Stack Form. Counter display!",
          image: "/images/examples/newsletter.jpg",
        },*/
        {
          title: "Templates",
          href: "#",
          description:
            "Choose from our calculator templates library to get started quickly.",
          image: "/images/examples/animes.jpg",
          launched: true,
        },
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
          image: "/images/examples/static-blog.jpg",
        },
        {
          title: "Guides",
          href: "/guides/introduction-usage-based-pricing",
          description:
            "Learn everything about usage based pricing from our guides.",
          image: "/images/examples/documentation.jpg",
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
       href: "/guides/introduction-usage-based-pricing",
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
