import { getEntry } from "astro:content";
import type { PageMetadata } from "../types/index";
import { type CollectionEntry } from "astro:content";

const siteSettings = await getEntry("siteSettings", "siteSettings");

export default function generatePageMetadata(
  metadata:
    | CollectionEntry<"pages">["data"]["metadata"]
    | PageMetadata
    | undefined,
  title?: string,
  path?: string,
): PageMetadata {
  const getTitle = metadata?.seo?.title || title || undefined;
  const generatedTitle = getTitle
    ? path === "/"
      ? getTitle
      : `${getTitle} | ${siteSettings?.data.title}`
    : siteSettings?.data.title;

  return {
    seo: {
      title: generatedTitle,
      description: metadata?.seo?.description || siteSettings?.data.description,
    },
    openGraph: {
      title:
        metadata?.openGraph?.title ||
        metadata?.seo?.title ||
        title ||
        siteSettings?.data.title,
      image: metadata?.openGraph?.image || siteSettings?.data.defaultOgImage,
      description: metadata?.seo?.description || siteSettings?.data.description,
    },
  };
}
