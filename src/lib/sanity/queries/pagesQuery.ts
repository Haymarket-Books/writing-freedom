import groq from "groq";
import {
  NAVIGATION_LINK_PROJECTION,
  IMAGE_PROJECTION,
} from "../groqFragments/commonProjections";

export const PAGES_QUERY = groq`*[_type == "page" || _type == "homepage"] {
    _id,
    "type": _type,
    title,
    "blueprint": coalesce(blueprint, "home"),
    "slug": coalesce(slug.current, "/"),
    "metadata": {
        "seo": {
            "title": seo.title,
            "description": seo.description
        },
        "openGraph": {
            "title": openGraph.ogTitle,
            "image": openGraph.ogImage{
                ...,
                asset->
            }
        }
    },
    "content": coalesce(content[]{
        "type": _type,
        _type == "hero" => {
            title,
            "slug": slug.current,
            heading,
            text,
            "image": ${IMAGE_PROJECTION},
            "linkObject": link{
                ${NAVIGATION_LINK_PROJECTION}
            }
        },
        _type == "grid" => {
            title,
            "slug": slug.current,
            "items": coalesce(gridItems[]{
                heading,
                text,
                "image": ${IMAGE_PROJECTION},
                "linkObject": link{
                ${NAVIGATION_LINK_PROJECTION}
                }
            }, [])
        },
        _type == "sponsors" => {
            title,
            "slug": slug.current,
            "items": gridItems[]{
                heading,
                text,
                "image": ${IMAGE_PROJECTION},
                "linkObject": link{
                    ${NAVIGATION_LINK_PROJECTION}
                }
            }
        },
        _type == "teamSection" => {
            "slug": slug.current,
            "sections": coalesce(sections[] {
                heading,
                "items": coalesce(items[] {
                    _ref
                }, [])
            }, []),
            sectionPadding
        },
        _type == "index" => {
            title,
            "slug": slug.current,
            text,
            "linkObject": link{${NAVIGATION_LINK_PROJECTION}},
            sectionPadding,
            "showContentType": coalesce(items[0], "fellows")
        },
        _type == "richContent" => {
            "blocks": coalesce(blocks[], [])
        },
        _type == "emphasis" => {
            "blocks": coalesce(blocks[], []),
            "image": ${IMAGE_PROJECTION}
        },
        _type == "presentation" => {
            title,
            "slug": slug.current,
            "image": ${IMAGE_PROJECTION},
            "blocks": coalesce(blocks[], []),
            "linkObject": link{
                ${NAVIGATION_LINK_PROJECTION}
            },
            layout
        },
        _type == "faq" => {
            title,
            "slug": slug.current,
            "list": coalesce(list[], []),
            sectionPadding
        },
        _type == "quote" => {
            attribution,
            "image": ${IMAGE_PROJECTION},
            "blocks": coalesce(blocks[], []),
            featuredLink{
                description,
                "linkObject": link{
                    ${NAVIGATION_LINK_PROJECTION}
                }
            }
        },
        _type == "cta" => {
            heading,
            "slug": slug.current,
            text,
            "image": ${IMAGE_PROJECTION},
            "ctaType": type,
            "linkObject": link{
                ${NAVIGATION_LINK_PROJECTION}
            }
        },
        _type == "linkCTA" => {
            "linkObject": link{
                ${NAVIGATION_LINK_PROJECTION}
            }
        }
    }, [])
}`;
