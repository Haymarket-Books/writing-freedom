import { sanityClient } from "sanity:client";
import { mainNavQuery, settingsQuery } from "../lib/sanity.queries";
import type { SiteSettings, Navigation } from "../types";

export const SITE_SETTINGS = await sanityClient.fetch<SiteSettings>(
  settingsQuery
);

export const NAVIGATION = await sanityClient.fetch<Navigation>(mainNavQuery);
