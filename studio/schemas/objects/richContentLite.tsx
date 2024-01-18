import {defineType, defineField, defineArrayMember} from 'sanity'
import {HiMiniMagnifyingGlassPlus, HiLink, HiMiniPencilSquare} from 'react-icons/hi2'

// Rich content with only minimal decorators and links, no headings etc.

export default defineType({
  name: 'richContentLite',
  title: 'Formattable Text',
  type: 'array',
  of: [
    defineArrayMember({
      type: 'block',
      styles: [{title: 'Normal', value: 'normal'}],
      lists: [],
      marks: {
        decorators: [
          {title: 'Bold', value: 'strong'},
          {title: 'Italic', value: 'em'},
          {
            title: 'Large Text',
            value: 'largeText',
            component: (props) => <span style={{fontSize: 'larger'}}>{props.children}</span>,
            icon: HiMiniMagnifyingGlassPlus,
          },
          {
            title: 'Text Highlight',
            value: 'highlight',
            component: (props) => (
              <span style={{backgroundColor: '#ffecb8'}}>{props.children}</span>
            ),
            icon: HiMiniPencilSquare,
          },
        ],
        annotations: [
          {
            name: 'richContentLink',
            title: 'Link',
            type: 'object',
            icon: HiLink,
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
  ],
})
