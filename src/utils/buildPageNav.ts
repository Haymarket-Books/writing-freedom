import type { PageNavigation } from "../types";
import type { CollectionEntry } from "astro:content";

export default function buildPageNav(
  pageSections: CollectionEntry<"pages">["data"]["content"],
): PageNavigation {
  const nav: PageNavigation = [];

  for (const section of pageSections) {
    if ("slug" in section && section.type !== "hero") {
      let title = "Section";
      if ("title" in section) {
        title = section.title;
      } else if ("heading" in section) {
        title = section.heading;
      }
      nav.push({
        title,
        slug: section.slug,
      });
    }
  }
  return nav;
}
