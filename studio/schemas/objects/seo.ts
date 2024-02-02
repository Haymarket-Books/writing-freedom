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
      description:
        'Set a title for search engine optimization. This will display in search results and browser tabs. If nothing is set, it will default to the page title.',
      validation: (Rule) =>
        Rule.max(60).warning('It is best to keep this text under 60 characters'),
    }),
    defineField({
      name: 'description',
      title: 'SEO Description',
      type: 'text',
      description:
        'Set a description for search engine optimization. this will display in search results.',
      validation: (Rule) =>
        Rule.max(200).warning('It is best to keep this text under 200 characters'),
    }),
  ],
})
