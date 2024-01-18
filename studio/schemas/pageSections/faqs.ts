import {defineType, defineField} from 'sanity'

export default defineType({
  name: 'faqs',
  title: 'FAQ Section',
  type: 'object',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      description:
        'Usually the columns title is not shown as a heading on the front-end, but is only used for identification purposes here.',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Section ID',
      type: 'slug',
      description: 'Use to ID the section on a page.',
      options: {
        // source: 'title',
        isUnique: (value, context) => context.defaultIsUnique(value, context),
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'list',
      title: 'FAQ List',
      type: 'array',
      of: [
        {
          name: 'faq',
          title: 'FAQ Entry',
          type: 'object',
          fields: [
            defineField({
              name: 'question',
              title: 'Question',
              type: 'string',
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: 'answer',
              title: 'Answer',
              type: 'richContentLite',
              validation: (Rule) => Rule.required(),
            }),
          ],
        },
      ],
      validation: (Rule) => Rule.min(1),
    }),
    defineField({
      name: 'sectionPadding',
      title: 'Section Padding?',
      type: 'boolean',
      initialValue: false,
      description: 'Flip to "true" to add a light background and padding to this section.',
    }),
  ],
  preview: {
    select: {
      title: 'title',
    },
    prepare({title}) {
      return {
        title: title,
        subtitle: 'FAQ Section',
      }
    },
  },
})
