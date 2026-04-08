import groq from "groq";

export const FELLOWSHIP_YEARS_QUERY = groq`*[_type == "fellowshipYear"] {
    _id,
    "type": _type,
    year,
    "slug": slug.current,
    "fellows": *[_type == "fellow" && references(^._id)] {
        _id,
    }
}`;
