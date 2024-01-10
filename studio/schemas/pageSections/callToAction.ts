import {defineType, defineField} from 'sanity'

export default defineType({
  name: 'cta',
  title: 'Call to Action',
  type: 'object',
  fields: [
    defineField({
      name: 'heading',
      title: 'Heading',
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
      name: 'type',
      title: 'CTA Type',
      type: 'string',
      options: {
        list: [
          {title: 'Sign Up', value: 'signup'},
          {title: 'Link', value: 'link'},
        ],
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'link',
      type: 'navigationLink',
      hidden: ({parent}) => !(parent?.type == 'link'),
    }),
    defineField({
      name: 'image',
      type: 'coverImage',
      validation: (Rule) => Rule.required(),
    }),
  ],
  preview: {
    select: {
      title: 'heading',
    },
    prepare({title}) {
      return {
        title: title,
        subtitle: 'Call to Action',
      }
    },
  },
})
