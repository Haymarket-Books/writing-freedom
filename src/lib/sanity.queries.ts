import groq from "groq";

// Partials
const groqNavigationLink = groq`_type == "navigationLink" => {
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

const groqImage = groq`image{
    _type,
    alt,
    asset->,
    crop,
    hotspot
}`;

export const settingsQuery = groq`*[_type == "siteSettings"][0]{
    title,
    description,
    logo{
        asset->
    },
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

// Collections
export const teamMembersQuery = groq`*[_type == "teamMember"] | order(name.lastName asc) {
    "type": _type,
    name,
    title,
    category->{
        name,
        "slug": slug.current,
    },
    "image": ${groqImage}
}`;

// remove $fellowshipYear param
export const fellowsIndexQuery = groq`*[_type == "fellow"] | order(name.lastName asc) {
    "type": _type,
    name,
    "slug": slug.current,
    fellowshipYear->{
        year,
        "slug": slug.current
    },
    categories[]->{
        name,
        "slug": slug.current,
    },
    "image": ${groqImage}
}`;

export const fellowsDetailQuery = groq`*[_type == "fellow"] | order(name.lastName asc) {
    "type": _type,
    name,
    "slug": slug.current,
    fellowshipYear->{
        year,
        "slug": slug.current
    },
    categories[]->{
        name,
        "slug": slug.current
    },
    "image": ${groqImage},
    content[],
    selectedWorks[],
    media{
        "file": file.asset->,
        "content": fileDescription[]
    }
}`;

export const fellowshipYearsIndexQuery = groq`*[_type == "fellowshipYear"] | order(year asc) {
    "type": _type,
    year,
    "slug": slug.current,
    "fellows": *[_type == "fellow" && references(^._id)] | order(name.lastName asc) {
        "type": _type,
        name,
        "slug": slug.current,
        fellowshipYear->{
            year,
            "slug": slug.current
        },
        categories[]->{
            name,
            "slug": slug.current,
        },
        "image": ${groqImage}
        }
}`;

export const fellowCategoriesQuery = groq`*[_type == "category"] | order(slug.current asc) {
    "slug": slug.current,
    name
}`;

//// PAGES
// Navigation
export const mainNavQuery = groq`*[_type == "navigation"][0] {
    title,
    entries[]->{
        title,
        "slug": slug.current
    }
}`;

// Home page

// Interior pages
export const pageQuery = groq`*[_type == $page] {
    "id": _id,
    title,
    blueprint,
    "slug": slug.current,
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
    content[]{
        "type": _type,
        _type == "hero" => {
            title,
            "slug": slug.current,
            heading,
            text,
            "image": ${groqImage},
            "linkObject": link{
                ${groqNavigationLink}
            }
        },
        _type == "grid" => {
            title,
            "slug": slug.current,
            "items": gridItems[]{
                heading,
                text,
                "image": ${groqImage},
                "linkObject": link{
                ${groqNavigationLink}
                }
            }
        },
        _type == "sponsors" => {
            title,
            "slug": slug.current,
            "items": gridItems[]{
                heading,
                text,
                "image": ${groqImage},
                "linkObject": link{
                ${groqNavigationLink}
                }
            }
        },
        _type == "index" => {
            title,
            "slug": slug.current,
            text,
            "linkObject": link{
                ${groqNavigationLink}
            },
            sectionPadding,
            "showContentType": items[0],
            items[0] == "teamMembers" => {
                "entries": ${teamMembersQuery}
            },
            items[0] == "fellows" => {
                "entries": ${fellowsIndexQuery}
            }
        },
        _type == "emphasis" => {
            blocks[],
            "image": ${groqImage}
        },
        _type == "presentation" => {
            title,
            "slug": slug.current,
            "image": ${groqImage},
            blocks[],
            "linkObject": link{
                ${groqNavigationLink}
            },
            layout
        },
        _type == "faq" => {
            title,
            "slug": slug.current,
            list[],
            sectionPadding
        },
        _type == "quote" => {
            attribution,
            "image": ${groqImage},
            blocks[],
            featuredLink{
                description,
                "linkObject": link{
                    ${groqNavigationLink}
                }
            }
        },
        _type == "cta" => {
            heading,
            "slug": slug.current,
            text,
            "image": ${groqImage},
            "ctaType": type,
            "linkObject": link{
                ${groqNavigationLink}
            }
        },
        _type == "linkCTA" => {
            "linkObject": link{
                ${groqNavigationLink}
            }
        }
    }
}`;
