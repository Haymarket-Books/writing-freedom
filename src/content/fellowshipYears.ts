import { defineCollection } from "astro:content";
import { z } from "astro/zod";
import { customSanityLoader } from "@lib/sanity/customSanityLoader";
import { FELLOWSHIP_YEARS_QUERY } from "@lib/sanity/queries/fellowshipYearsQuery";

export const fellowshipYears = defineCollection({
  loader: customSanityLoader({
    name: "Fellowship Years",
    query: FELLOWSHIP_YEARS_QUERY,
  }),
});
