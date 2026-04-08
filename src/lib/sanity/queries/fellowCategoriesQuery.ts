import groq from "groq";

export const FELLOW_CATEGORIES = groq`*[_type == "category"] | order(slug.current asc) {
    _id,
    "slug": slug.current,
    name
}`;
