import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'grid',
  title: 'Columns',
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
      name: 'gridItems',
      title: 'Column Items',
      type: 'array',
      validation: (Rule) => Rule.min(1).max(4),
      of: [
        {
          name: 'gridItem',
          title: 'Column',
          type: 'object',
          fields: [
            defineField({
              name: 'heading',
              title: 'Heading',
              type: 'string',
              description: 'Column heading.',
              // validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: 'text',
              title: 'Text',
              type: 'text',
              description: 'Column text.',
              validation: (Rule) => [
                Rule.required(),
                Rule.max(300).warning('It is best to keep this text under 300 characters.'),
              ],
            }),
            defineField({
              name: 'link',
              type: 'navigationLink',
              // validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: 'image',
              type: 'coverImage',
              description: 'Background image layered behind column text.',
            }),
          ],
          preview: {
            select: {
              heading: 'heading',
              image: 'image',
            },
            prepare({heading, image}) {
              return {
                title: heading,
                media: image,
              }
            },
          },
        },
      ],
    }),
  ],
  preview: {
    select: {
      title: 'title',
    },
    prepare({title}) {
      return {
        title: title,
        subtitle: 'Columns Section',
      }
    },
  },
})
