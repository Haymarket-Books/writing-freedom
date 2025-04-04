import {defineField, defineType, defineArrayMember} from 'sanity'

export default defineType({
  name: 'page',
  title: 'Page',
  type: 'document',
  groups: [
    {name: 'content', title: 'Page Content'},
    {name: 'metadata', title: 'Page Metadata'},
  ],
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      description: 'Page title – set for SEO and primary page identifier.',
      type: 'string',
      group: 'metadata',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'URL Slug',
      type: 'slug',
      group: 'metadata',
      options: {
        source: 'title',
        isUnique: (value, context) => context.defaultIsUnique(value, context),
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'blueprint',
      title: 'Page Blueprint',
      type: 'string',
      readOnly: true,
      options: {
        list: ['interior', 'index', 'contact'],
      },
    }),
    defineField({
      name: 'content',
      title: 'Page Content',
      type: 'array',
      hidden: ({document}) => document?.blueprint !== 'interior',
      group: 'content',
      of: [
        defineArrayMember({
          name: 'hero',
          title: 'Hero Section',
          type: 'hero',
        }),
        defineArrayMember({
          name: 'grid',
          title: 'Columns Section',
          type: 'grid',
        }),
        defineArrayMember({
          name: 'sponsors',
          title: 'Sponsors Section',
          type: 'sponsorsSection',
        }),
        defineArrayMember({
          name: 'index',
          title: 'Index Section',
          type: 'indexSection',
        }),
        defineArrayMember({
          name: 'teamSection',
          title: 'Team Section',
          type: 'teamSection',
        }),
        defineArrayMember({
          name: 'presentation',
          title: 'Presentation Section',
          type: 'presentation',
        }),
        defineArrayMember({
          name: 'richContent',
          title: 'Rich Content Section',
          type: 'object',
          fields: [
            defineField({
              name: 'blocks',
              title: 'Text',
              type: 'richContentLite',
            }),
          ],
          preview: {
            select: {
              content: 'blocks',
            },
            prepare({content}) {
              return {
                title: content[0].children[0].text,
                subtitle: 'Rich Content Section',
              }
            },
          },
        }),
        defineArrayMember({
          name: 'faq',
          title: 'FAQ Section',
          type: 'faqs',
        }),
        defineArrayMember({
          name: 'quote',
          title: 'Quote',
          type: 'quote',
        }),
        defineArrayMember({
          name: 'linkCTA',
          title: 'Link CTA',
          type: 'linkCTA',
        }),
        defineArrayMember({
          name: 'cta',
          title: 'Call to Action',
          type: 'cta',
        }),
        // defineArrayMember({
        //   name: 'indexContent',
        //   title: 'Index Content',
        //   type: 'object',
        //   fields: [
        //     defineField({
        //       name: 'type',
        //       title: 'Type',
        //       type: 'string',
        //       options: {list: ['fellows', 'teamMembers', 'programYears']},
        //     }),
        //   ],
        // }),
      ],
    }),
    defineField({
      name: 'seo',
      title: 'SEO Info',
      type: 'seo',
      group: 'metadata',
    }),
    defineField({
      name: 'openGraph',
      title: 'Open Graph Info',
      type: 'openGraph',
      group: 'metadata',
    }),
  ],
})
