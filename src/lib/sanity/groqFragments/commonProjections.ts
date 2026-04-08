import groq from "groq";

export const IMAGE_PROJECTION = groq`image{
    _type,
    alt,
    asset->,
    crop,
    hotspot,
    attribution
}`;

export const NAVIGATION_LINK_PROJECTION = groq`_type == "navigationLink" => {
    "type": _type,
    name,
    href[0]{
        _type == "page" => @-> {
            "type": ^._type,
            "pageName": title,
            "slug": slug.current
        },
        _type == "slugString" => {
            "type": _type,
            slug,
        },
        _type == "externalLink" => {
            "type": _type,
            url
        }
    }
}`;
