import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'linkCTA',
  title: 'Link CTA',
  type: 'object',
  fields: [
    defineField({
      name: 'link',
      title: 'Link',
      description: 'A standalone link to use as a call to action.',
      type: 'navigationLink',
      validation: (Rule) => Rule.required(),
    }),
  ],
  preview: {
    prepare() {
      return {
        title: 'Link CTA',
      }
    },
  },
})
