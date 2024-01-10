import type { PagePayload, PageNavigation } from "../types";

export default function buildPageNav(
  pageSections: PagePayload["content"]
): PageNavigation {
  return pageSections
    .filter((section) => section.slug && section.type !== "hero")
    .map((section) => {
      return {
        title: section.title || section.heading || "Section",
        slug: section.slug,
      };
    });
}
