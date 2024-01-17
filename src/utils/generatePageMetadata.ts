import urlFor from "../lib/sanity.urlForImage";
import { SITE_SETTINGS } from "../lib/defaults";
import type { PageMetadata } from "../types/index";

export default function generatePageMetadata(
  metadata: PageMetadata | undefined,
  title?: string,
  path?: string
): PageMetadata {
  const getTitle = metadata?.seo?.title || title || undefined;
  const generatedTitle = getTitle
    ? path === "/"
      ? getTitle
      : `${getTitle} | ${SITE_SETTINGS.title}`
    : SITE_SETTINGS.title;

  return {
    seo: {
      title: generatedTitle,
      description: metadata?.seo?.description || SITE_SETTINGS.description,
    },
    openGraph: {
      title:
        metadata?.openGraph?.title ||
        metadata?.seo?.title ||
        title ||
        SITE_SETTINGS.title,
      image: metadata?.openGraph?.image || SITE_SETTINGS.defaultOgImage,
      description: metadata?.seo?.description || SITE_SETTINGS.description,
    },
  };
}
