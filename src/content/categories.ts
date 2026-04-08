import { defineCollection } from "astro:content";
import { z } from "astro/zod";
import { customSanityLoader } from "@lib/sanity/customSanityLoader";
import { FELLOW_CATEGORIES } from "@lib/sanity/queries/fellowCategoriesQuery";

export const categories = defineCollection({
  loader: customSanityLoader({
    name: "Fellow Categories",
    query: FELLOW_CATEGORIES,
  }),
});
