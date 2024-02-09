import type { Link } from "../types";

export default function buildHref(link?: Link) {
  let href: string | undefined;
  let name: string | undefined;
  let target: string | undefined;

  if (typeof link !== undefined) {
    switch (link?.href?.type) {
      case "externalLink":
        href = link?.href?.url;
        break;
      case "page":
        href = link?.href?.slug ? `/${link.href.slug}` : "/";
        break;
      case "slugString":
        href = link?.href?.slug;
        break;
      default:
        href = `/${link?.href?.slug}`;
        break;
    }
  } else {
    href = "#";
  }

  if (link?.name) {
    name = link.name;
  } else if (link?.href?.pageName) {
    name = link.href.pageName;
  } else if (link?.href?.slug) {
    name = link.href.slug;
  } else if (link?.href?.url) {
    name = link.href.url;
  } else {
    name = link?.href?.type;
  }

  if (link?.href?.type === "externalLink") {
    target = "_blank";
  } else {
    target = "_self";
  }

  return {
    href,
    name,
    target,
  };
}
