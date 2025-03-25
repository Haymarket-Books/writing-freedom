import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'teamSection',
  title: 'Team Section',
  type: 'object',
  fields: [
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
      name: 'sections',
      title: 'Sections',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            defineField({
              name: 'heading',
              title: 'Heading',
              type: 'string',
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: 'items',
              title: 'People List',
              type: 'array',
              of: [{type: 'reference', to: [{type: 'teamMember'}]}],
            }),
          ],
        },
      ],
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
    prepare: () => {
      return {
        title: 'Team Section',
        subtitle: 'Team Section',
      }
    },
  },
})
