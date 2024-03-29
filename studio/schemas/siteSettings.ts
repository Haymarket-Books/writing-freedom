import {defineField, defineType} from 'sanity'

const SOCIAL_ICONS = [
  {title: 'Email', value: 'envelope'},
  {title: 'LinkedIn', value: 'linkedin'},
  {title: 'Facebook', value: 'facebook'},
  {title: 'Instagram', value: 'instagram'},
  {title: 'YouTube', value: 'youtube'},
  {title: 'Twitter', value: 'twitter'},
  {title: 'Website', value: 'square-arrow-up-right'},
]

export default defineType({
  name: 'siteSettings',
  title: 'Site Settings',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Site Title',
      type: 'string',
      description: 'Default site title, used for SEO and footer information.',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'description',
      title: 'Site Description',
      type: 'text',
      description: 'Default site description, used for SEO and footer information.',
      validation: (Rule) => Rule.max(250).required(),
    }),
    defineField({
      name: 'contact',
      title: 'Default Contact Info',
      type: 'url',
      description: 'Set the default contact email.',
      validation: (Rule) =>
        Rule.uri({
          scheme: ['mailto'],
        }).required(),
    }),
    defineField({
      name: 'logo',
      title: 'Site Logo',
      type: 'image',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'defaultFellowshipYear',
      title: 'Default Fellowship Year',
      description: 'Set a default year for index grids, which show fellows of that year.',
      type: 'reference',
      to: [{type: 'fellowshipYear'}],
      options: {
        disableNew: true,
      },
      validation: (Rule) => Rule.required(),
      // options: {
      //   list: [2024, 2025],
      // },
    }),
    defineField({
      name: 'socialLinks',
      title: 'Social Media Links',
      type: 'array',
      of: [
        {
          name: 'socialLink',
          title: 'Social Link',
          type: 'object',
          fields: [
            defineField({
              name: 'icon',
              title: 'Icon',
              type: 'string',
              options: {
                list: SOCIAL_ICONS,
              },
            }),
            defineField({
              name: 'url',
              title: 'URL',
              type: 'url',
              validation: (Rule) =>
                Rule.uri({
                  scheme: ['http', 'https', 'mailto', 'tel'],
                }),
            }),
          ],
          preview: {
            select: {
              icon: 'icon',
            },
            prepare({icon}) {
              const socialIcon =
                icon &&
                SOCIAL_ICONS.flatMap((option) => (option.value === icon ? [option.title] : []))
              return {
                title: `${socialIcon}`,
              }
            },
          },
        },
      ],
    }),
    defineField({
      name: 'defaultOgImage',
      title: 'Default Image',
      description:
        'Set a default image for Open Graph and social sharing. Will be overridden if set on a page basis.',
      type: 'image',
    }),
  ],
})
