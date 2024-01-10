import {defineType, defineField, defineArrayMember} from 'sanity'

export default defineType({
  name: 'seo',
  title: 'SEO Info',
  type: 'object',
  options: {
    collapsible: true,
  },
  fields: [
    defineField({
      name: 'title',
      title: 'SEO Title',
      type: 'string',
    }),
    defineField({
      name: 'description',
      title: 'SEO Description',
      type: 'text',
      validation: (Rule) =>
        Rule.max(200).warning('It is best to keep this text under 200 characters'),
    }),
  ],
})
