import {defineType, defineField, defineArrayMember} from 'sanity'

export default defineType({
  name: 'richContentLink',
  title: 'Link',
  type: 'object',
  fields: [
    defineField({
      name: 'href',
      title: 'Links to',
      type: 'array',
      validation: (Rule) => Rule.required().max(1),
      of: [
        defineArrayMember({
          name: 'page',
          title: 'Site Page',
          description: 'A page on the site.',
          type: 'reference',
          to: [{type: 'page'}, {type: 'homepage'}],
        }),
        defineArrayMember({
          name: 'slugString',
          title: 'Relative Path URL String',
          description:
            'Any URL relative to the root page, i.e. "resources/data. Make sure to omit any leading slash.',
          type: 'object',
          fields: [
            defineField({
              name: 'slug',
              type: 'string',
            }),
          ],
        }),
        defineArrayMember({
          name: 'externalLink',
          title: 'External Link',
          description: 'A valid full URL for any external link.',
          type: 'object',
          fields: [
            defineField({
              name: 'url',
              type: 'url',
              validation: (Rule) =>
                Rule.uri({
                  scheme: ['http', 'https', 'mailto', 'tel'],
                }),
            }),
          ],
        }),
      ],
    }),
  ],
})
