import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'presentation',
  title: 'Presentation',
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
    // defineField({
    //   name: 'heading',
    //   title: 'Heading',
    //   type: 'string',
    //   description: 'Optional heading.',
    // }),
    defineField({
      name: 'blocks',
      title: 'Text',
      type: 'richContentLite',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'image',
      type: 'coverImage',
      description: 'Optional image.',
      // validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'link',
      title: 'Link',
      type: 'navigationLink',
      description: 'Optional link.',
    }),
    defineField({
      name: 'layout',
      title: 'Flip Layout?',
      type: 'boolean',
    }),
  ],
  preview: {
    select: {
      title: 'title',
      heading: 'heading',
    },
    prepare({heading, title}) {
      return {
        title: heading || title,
        subtitle: 'Presentation Section',
      }
    },
  },
})
