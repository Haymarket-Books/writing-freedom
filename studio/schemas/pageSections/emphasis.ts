import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'emphasis',
  title: 'Emphasis',
  type: 'object',
  fields: [
    defineField({
      name: 'text',
      title: 'Text',
      type: 'text',
      validation: (Rule) => Rule.required().max(200),
    }),
    defineField({
      name: 'image',
      type: 'coverImage',
      validation: (Rule) => Rule.required(),
    }),
  ],
  preview: {
    select: {
      text: 'text',
    },
    prepare({text}) {
      return {
        title: text,
        subtitle: 'Emphasis Section',
      }
    },
  },
})
