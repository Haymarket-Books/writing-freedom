import { defineCollection } from "astro:content";
import { z } from "astro/zod";
import { customSanityLoader } from "@lib/sanity/customSanityLoader";
import { FELLOWS_QUERY } from "@lib/sanity/queries/fellowsQuery";
import { SanityImage, PortableText } from "./schemaFragments/sanityComponents";

export const fellows = defineCollection({
  loader: customSanityLoader({
    name: "Fellows",
    query: FELLOWS_QUERY,
  }),
  schema: z.object({
    type: z.string(),
    name: z.object({
      firstName: z.string(),
      lastName: z.string(),
    }),
    slug: z.string(),
    image: SanityImage,
    fellowshipYear: z.object({
      _id: z.string(),
      year: z.number(),
      slug: z.string(),
    }),
    categories: z.array(
      z.object({
        _id: z.string(),
        name: z.string(),
        slug: z.string(),
      }),
    ),
    ogImage: SanityImage.nullish(),
    content: PortableText,
    selectedWorks: z.array(z.any()),
    socialLinks: z.array(
      z.object({
        icon: z.string(),
        url: z.string(),
      }),
    ),
    websiteLink: z.string().nullish(),
    media: z
      .object({
        file: z.any(),
        content: PortableText,
      })
      .nullish(),
  }),
});
