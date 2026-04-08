import { defineCollection } from "astro:content";
import { z } from "astro/zod";
import { customSanityLoader } from "@lib/sanity/customSanityLoader";
import { NAVIGATION_QUERY } from "@lib/sanity/queries/navigationQuery";

export const navigation = defineCollection({
  loader: customSanityLoader({
    name: "Navigation",
    query: NAVIGATION_QUERY,
  }),
});
