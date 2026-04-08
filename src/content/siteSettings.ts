import { defineCollection } from "astro:content";
import { z } from "astro/zod";
import { customSanityLoader } from "@lib/sanity/customSanityLoader";
import { SITE_SETTINGS_QUERY } from "@lib/sanity/queries/siteSettingsQuery";

export const siteSettings = defineCollection({
  loader: customSanityLoader({
    name: "Site Settings",
    query: SITE_SETTINGS_QUERY,
  }),
});
