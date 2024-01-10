import {defineArrayMember, defineField, defineType} from 'sanity'

export default defineType({
  name: 'homepage',
  title: 'Home Page',
  type: 'document',
  groups: [
    {name: 'content', title: 'Page Content'},
    {name: 'metadata', title: 'Page Metadata'},
  ],
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      description: 'Page title.',
      type: 'string',
      group: 'metadata',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'content',
      title: 'Page Content',
      type: 'array',
      group: 'content',
      // options: {
      //   sortable: false,
      // },
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
          name: 'index',
          title: 'Index Section',
          type: 'indexSection',
        }),
        defineArrayMember({
          name: 'presentation',
          title: 'Presentation Section',
          type: 'presentation',
        }),
        defineArrayMember({
          name: 'quote',
          title: 'Quote Section',
          type: 'quote',
        }),
        defineArrayMember({
          name: 'emphasis',
          title: 'Emphasis Section',
          type: 'emphasis',
        }),
        defineArrayMember({
          name: 'cta',
          title: 'Call to Action',
          type: 'cta',
        }),
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
