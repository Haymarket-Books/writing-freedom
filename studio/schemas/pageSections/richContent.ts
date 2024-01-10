import {defineType, defineField, defineArrayMember} from 'sanity'

export default defineType({
  name: 'richContent',
  title: 'Rich Content',
  type: 'object',
  description:
    'Rich content is a general field for adding structured content of various types, i.e., headings, lists, and images. Styling and formatting is handled on the front-end.',
  fields: [
    defineField({
      name: 'blocks',
      title: 'Rich Content Blocks',
      type: 'array',
      of: [
        defineArrayMember({
          type: 'block',
          styles: [
            {title: 'Normal', value: 'normal'},
            {title: 'H2', value: 'h2'},
            {title: 'H3', value: 'h3'},
          ],
          marks: {
            decorators: [
              {title: 'Bold', value: 'strong'},
              {title: 'Italic', value: 'em'},
            ],
            annotations: [
              {
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
              },
            ],
          },
        }),
        defineArrayMember({
          type: 'image',
          options: {
            hotspot: true,
          },
          fields: [
            defineField({
              name: 'alt',
              title: 'Alternative Text',
              type: 'string',
              description: 'Required alternative text description for screenreaders.',
              // TODO: Add validation if parent image is present
            }),
          ],
        }),
      ],
    }),
  ],
  preview: {
    prepare() {
      return {
        title: 'Main content',
        subtitle: 'Rich Content Section',
      }
    },
  },
})
