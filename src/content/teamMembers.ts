import { defineCollection } from "astro:content";
import { z } from "astro/zod";
import { customSanityLoader } from "@lib/sanity/customSanityLoader";
import { TEAM_MEMBERS_QUERY } from "@lib/sanity/queries/teamMembersQuery";
import { SanityImage } from "./schemaFragments/sanityComponents";

export const teamMembers = defineCollection({
  loader: customSanityLoader({
    name: "Team Members",
    query: TEAM_MEMBERS_QUERY,
  }),
  schema: z.object({
    type: z.string(),
    name: z.object({
      firstName: z.string(),
      lastName: z.string(),
    }),
    category: z.object({
      name: z.string(),
      slug: z.string(),
    }),
    genres: z.string().nullish(),
    url: z.string().nullish(),
    image: SanityImage.nullish(),
  }),
});
