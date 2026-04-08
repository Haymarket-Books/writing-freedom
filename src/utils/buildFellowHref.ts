import type { CollectionEntry } from "astro:content";

export default function buildFellowHref(fellow: CollectionEntry<"fellows">) {
  return `/fellows/${fellow.data.fellowshipYear.slug}/${fellow.data.slug}`;
}
