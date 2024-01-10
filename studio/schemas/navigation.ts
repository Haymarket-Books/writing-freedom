import {defineArrayMember, defineField, defineType} from 'sanity'

export default defineType({
  name: 'navigation',
  title: 'Navigation',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
    }),
    defineField({
      name: 'entries',
      title: 'Navigation Items',
      type: 'array',
      of: [{type: 'reference', to: {type: 'page'}}],
    }),
  ],
})
