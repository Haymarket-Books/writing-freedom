import groq from "groq";

// Partials
const groqNavigationLink = groq`_type == 'navigationLink' => {
    "type": _type,
    name,
    href[0]{
        _type == 'page' => @-> {
            "type": ^._type,
            "pageName": title,
            "slug": slug.current
        },
        _type == 'slugString' => {
            "type": _type,
            slug,
        },
        _type == 'externalLink' => {
            "type": _type,
            url
        }
    }
}`;

const groqImage = groq`image{
    _type,
    alt,
    asset->
}`;

export const settingsQuery = groq`*[_type == 'siteSettings'][0]{
    title,
    description,
    logo{
        asset->
    },
    defaultOgImage{
        asset->
    },
    socialLinks[]{
        icon,
        url
    }
}`;

//// PAGES
// Navigation
export const mainNavQuery = `*[_type == 'navigation'][0] {
    title,
    entries[]->{
        title,
        "slug": slug.current
    }
}`;

// Home page

// Interior pages
export const pageQuery = `*[_type == $page]{
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
        _type == "indexSection" => {
            ...
        },
        _type == "emphasis" => {
            text,
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
        _type == "faqs" => {
            ...
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
    }
}`;
