import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'indexSection',
  title: 'Index',
  type: 'object',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
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
      name: 'text',
      title: 'Text',
      type: 'text',
    }),
    defineField({
      name: 'items',
      title: 'Show Content Types',
      type: 'array',
      validation: (Rule) => Rule.max(1),
      of: [
        {
          type: 'string',
          options: {list: ['fellows', 'teamMembers', 'programYears']},
        },
      ],
    }),
    defineField({
      name: 'link',
      title: 'Link',
      type: 'navigationLink',
      description: 'Optional link.',
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
        subtitle: 'Index Section',
      }
    },
  },
})
