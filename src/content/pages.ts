import { defineCollection } from "astro:content";
import { z } from "astro/zod";
import { customSanityLoader } from "@lib/sanity/customSanityLoader";
import { PAGES_QUERY } from "@lib/sanity/queries/pagesQuery";
import { HeroSection, GridSection, PresentationSection, QuoteSection, IndexSection, CTASection, IndexContentSection, FAQSection, LinkCTASection, RichContentSection, TeamSection, SponsorsSection, EmphasisSection } from "./schemaFragments/sanityComponents";

export const pages = defineCollection({
  loader: customSanityLoader({
    name: "Pages",
    query: PAGES_QUERY,
  }),
  schema: z.object({
    _id: z.string(),
    type: z.enum(["page", "homepage"]),
    blueprint: z.enum(["interior", "index", "contact", "home"]),
    title: z.string(),
    slug: z.string(),
    metadata: z.object({
      seo: z.object({
        title: z.string().nullish(),
        description: z.string().nullish(),
      }),
      openGraph: z.object({
        title: z.string().nullish(),
        image: z.any(),
      }),
    }),
    content: z.array(
        z.union([HeroSection, GridSection, PresentationSection, QuoteSection, IndexSection, CTASection, LinkCTASection, IndexContentSection, FAQSection, RichContentSection, TeamSection, SponsorsSection, EmphasisSection])
    //   z.object({
    //     type: z.enum([
    //       "hero",
    //       "grid",
    //       "sponsors",
    //       "index",
    //       "indexContent",
    //       "teamSection",
    //       "presentation",
    //       "richContent",
    //       "faq",
    //       "quote",
    //       "emphasis",
    //       "linkCTA",
    //       "cta",
    //     ]),
    //   }),
    ),
  }),
});
