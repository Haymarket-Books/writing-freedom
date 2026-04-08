import { z } from "astro/zod";

export const SanityImage = z.object({
  _type: z.union([z.literal("image"), z.literal("coverImage")]),
  asset: z.any(),
  alt: z.string().nullish(),
  crop: z.any().nullish(),
  hotspot: z.any().nullish(),
  attribution: z.string().nullish(),
});

export type SanityImage = z.infer<typeof SanityImage>;

export const LinkObject = z.any();

export type LinkObject = z.infer<typeof LinkObject>;

export const PortableText = z.array(z.any());

export type PortableText = z.infer<typeof PortableText>;

export const HeroSection = z.object({
  type: z.literal("hero"),
  title: z.string(),
  slug: z.string(),
  heading: z.string(),
  text: z.string(),
  image: SanityImage.nullish(),
  linkObject: LinkObject.nullish(),
});

export type HeroSection = z.infer<typeof HeroSection>;

export const GridSection = z.object({
  type: z.literal("grid"),
  title: z.string(),
  slug: z.string(),
  items: z.array(
    z.object({
      heading: z.string(),
      text: z.string(),
      image: SanityImage,
      linkObject: LinkObject,
    }),
  ),
});

export type GridSection = z.infer<typeof GridSection>;

export const PresentationSection = z.object({
  type: z.literal("presentation"),
  title: z.string(),
  slug: z.string(),
  image: SanityImage.nullish(),
  blocks: PortableText,
  linkObject: LinkObject.nullish(),
  layout: z.boolean(),
});

export type PresentationSection = z.infer<typeof PresentationSection>;

export const QuoteSection = z.object({
  type: z.literal("quote"),
  attribution: z.object({
    name: z.string(),
    title: z.string().nullish(),
  }).nullish(),
  image: SanityImage.nullish(),
  blocks: PortableText,
  featuredLink: z.object({
    description: z.string(),
    linkObject: LinkObject.nullish(),
  }),
});

export type QuoteSection = z.infer<typeof QuoteSection>;

export const IndexSection = z.object({
  type: z.literal("index"),
  title: z.string(),
  slug: z.string(),
  text: z.string().nullish(),
  linkObject: LinkObject.nullish(),
  sectionPadding: z.boolean().nullish(),
  showContentType: z.enum(["fellows", "teamMembers", "programYears"]),
});

export type IndexSection = z.infer<typeof IndexSection>;

export const CTASection = z.object({
  type: z.literal("cta"),
  heading: z.string(),
  slug: z.string(),
  text: z.string().nullish(),
  image: SanityImage.nullish(),
  ctaType: z.string(),
  linkObject: LinkObject.nullish(),
});

export type CTASection = z.infer<typeof CTASection>;

export const LinkCTASection = z.object({
  type: z.literal("linkCTA"),
  linkObject: LinkObject.nullish(),
});

export type LinkCTASection = z.infer<typeof LinkCTASection>;

export const IndexContentSection = z.object({
  type: z.literal("indexContent"),
});

export type IndexContentSection = z.infer<typeof IndexContentSection>;

export const FAQSection = z.object({
  type: z.literal("faq"),
  title: z.string(),
  slug: z.string(),
  list: z.array(
    z.object({
      question: z.string(),
      answer: PortableText,
    }),
  ),
  sectionPadding: z.boolean().nullish(),
});

export type FAQSection = z.infer<typeof FAQSection>;

export const RichContentSection = z.object({
  type: z.literal("richContent"),
  blocks: PortableText,
});

export type RichContentSection = z.infer<typeof RichContentSection>;

export const TeamSection = z.object({
  type: z.literal("teamSection"),
  slug: z.string(),
  sections: z.array(z.object({
    heading: z.string(),
    items: z.array(z.object({
        _ref: z.string() // ref to team member
    }))
  })),
   sectionPadding: z.boolean().nullish(),
});

export type TeamSection = z.infer<typeof TeamSection>;

export const SponsorsSection = z.object({
  type: z.literal("sponsors"),
  title: z.string(),
  slug: z.string(),
  items: z.array(z.object({
    heading: z.string(),
    text: z.string().nullish(),
    image: SanityImage.nullish(),
    linkObject: LinkObject.nullish() 
  }))
});

export type SponsorsSection = z.infer<typeof SponsorsSection>;

export const EmphasisSection = z.object({
  type: z.literal("emphasis"),
  blocks: PortableText,
  image: SanityImage.nullish()
});

export type EmphasisSection = z.infer<typeof EmphasisSection>;
