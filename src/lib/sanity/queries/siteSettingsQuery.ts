import groq from "groq";

export const SITE_SETTINGS_QUERY = groq`*[_type == "siteSettings"] {
    _id,
    title,
    description,
    logo{
        asset->
    },
    contact,
    defaultFellowshipYear->{
        year,
        "slug": slug.current,
    },
    defaultOgImage{
        asset->
    },
    socialLinks[]{
        icon,
        url
    }
}`;
