import groq from "groq";

export const NAVIGATION_QUERY = groq`*[_type == "navigation"] {
    _id,
    title,
    entries[]->{
        title,
        "slug": slug.current
    }
}`;
