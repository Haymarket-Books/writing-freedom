import groq from "groq";
import { IMAGE_PROJECTION } from "../groqFragments/commonProjections";

export const FELLOWS_QUERY = groq`*[_type == "fellow"] | order(name.firstName) | order(name.lastName asc) {
    _id,
    "type": _type,
    name,
    "slug": slug.current,
    fellowshipYear->{
        _id,
        year,
        "slug": slug.current
    },
    "categories": coalesce(categories[]->{
        _id,
        name,
        "slug": slug.current
    }, []),
    "image": ${IMAGE_PROJECTION},
    ogImage{
        ...,
        asset->
    },
    "content": coalesce(content[], []),
    "selectedWorks": coalesce(selectedWorks[], []),
    "socialLinks": coalesce(socialLinks[]{
        icon,
        url
    }, []),
    websiteLink,
    media{
        "file": file.asset->,
        "content": coalesce(fileDescription[], [])
    }
}`;
