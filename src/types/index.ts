import type { PortableTextBlock } from "sanity";
import type { Image, ImageAsset, ImageMetadata } from "sanity";

// Content Collections
export interface CoverImage extends Image {
  alt?: string;
  asset?: any;
}

export type Link = {
  type?: string;
  name?: string;
  href?: {
    type?: string;
    pageName?: string;
    slug?: string;
    url?: string;
  };
};

export type Category = {
  name?: string;
  slug?: string;
};

export type Work = {
  title?: string;
  year?: number;
};

export type FellowshipYear = {
  type?: string;
  year?: number;
  slug?: string;
  fellows?: Fellow[];
};

export type Person = {
  name?: {
    firstName?: string;
    lastName?: string;
  };
  slug?: string;
  type?: string;
  image?: CoverImage;
};

export interface TeamMember extends Person {
  title?: string;
  category?: Category;
}

export interface Fellow extends Person {
  fellowshipYear?: FellowshipYear;
  categories?: Category[];
  content?: PortableTextBlock[];
  selectedWorks?: Work[];
  media?: string;
}

// Pages
export type Navigation = {
  title?: string;
  entries?: {
    title?: string;
    slug?: string;
  }[];
};

export type PageNavigation = {
  title?: string;
  slug?: string;
}[];

export type SiteSettings = {
  title?: string;
  description?: string;
  logo?: Image;
  defaultFellowshipYear?: FellowshipYear;
  defaultOgImage?: Image;
  socialLinks?: {
    icon?: string;
    url?: string;
  }[];
};

// export type PageSectionValues =
//   | string
//   | CoverImage
//   | Array<any>
//   | Array<PortableTextBlock>
//   | Link
//   | undefined;

// Page Sections
export type PageSectionTypes =
  | "hero"
  | "cta"
  | "linkCTA"
  | "faq"
  | "grid"
  | "sponsors"
  | "index"
  | "emphasis"
  | "presentation"
  | "quote"
  | "richContent";

// export type PageSection = {
//   [key: string]: PageSectionValues;
// };

export type PageSection = {
  type?: PageSectionTypes;
  slug?: string;
};

export interface Hero extends PageSection {
  title?: string;
  heading?: string;
  text?: string;
  image?: CoverImage;
  linkObject?: Link;
}

export interface Grid extends PageSection {
  title?: string;
  items?: {
    heading?: string;
    text?: string;
    image?: CoverImage;
    linkObject?: Link;
  }[];
}

export interface Emphasis extends PageSection {
  title?: string;
  blocks?: PortableTextBlock[];
  image?: CoverImage;
}

export interface Presentation extends PageSection {
  title?: string;
  blocks?: PortableTextBlock[];
  image?: CoverImage | null;
  linkObject?: Link;
  layout?: boolean;
}

export interface Quote extends PageSection {
  title?: string;
  attribution?: {
    name?: string;
    title?: string;
  };
  image?: CoverImage;
  blocks?: PortableTextBlock[];
  featuredLink?: {
    description?: string;
    linkObject?: Link;
  };
}

export interface CTA extends PageSection {
  title?: string;
  heading?: string;
  text?: string;
  image?: CoverImage;
  linkObject?: Link;
  ctaType: string;
}

export interface LinkCTA extends PageSection {
  linkObject?: Link;
}

export interface FAQ extends PageSection {
  title?: string;
  list?: {
    question?: string;
    answer?: PortableTextBlock[];
  }[];
  sectionPadding?: boolean;
}

export interface Index extends PageSection {
  title?: string;
  text?: string;
  linkObject?: Link;
  showContentType?: string;
  entries?: Array<Person | Fellow>;
  sectionPadding?: boolean;
}

// Metadata and queries

export type PageMetadata = {
  seo?: {
    title?: string;
    description?: string;
  };
  openGraph?: {
    title?: string;
    image?: CoverImage;
    description?: string;
  };
};

export type PagePayload = {
  id: string;
  title: string;
  slug: string;
  blueprint?: "home" | "interior" | "index" | "contact";
  metadata?: PageMetadata;
  content: Array<
    Hero | Grid | Emphasis | Presentation | Quote | FAQ | Index | LinkCTA | CTA
  >;
};
