import { createClient } from "@sanity/client";

export const sanityClient = createClient({
  projectId: "7zni91yt",
  dataset: "production",
  useCdn: false,
  apiVersion: "2026-04-01",
});
