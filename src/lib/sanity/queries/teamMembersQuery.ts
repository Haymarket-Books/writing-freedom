import groq from "groq";
import { IMAGE_PROJECTION } from "../groqFragments/commonProjections";

export const TEAM_MEMBERS_QUERY = groq`*[_type == "teamMember"] | order(name.lastName asc) {
    _id,
    "type": _type,
    name,
    title,
    genres,
    url,
    category->{
        name,
        "slug": slug.current,
    },
    "image": ${IMAGE_PROJECTION}
}`;
