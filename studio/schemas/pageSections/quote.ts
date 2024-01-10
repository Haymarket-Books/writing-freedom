import {defineType, defineField, defineArrayMember} from 'sanity'

export default defineType({
  name: 'quote',
  title: 'Quote',
  type: 'object',
  fields: [
    defineField({
      name: 'blocks',
      title: 'Quote Body',
      type: 'richContentLite',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'attribution',
      title: 'Quote Attribution',
      type: 'object',
      fields: [
        defineField({
          name: 'name',
          title: 'Name',
          type: 'string',
          validation: (Rule) => Rule.required(),
        }),
        defineField({
          name: 'title',
          title: 'Title',
          type: 'string',
        }),
      ],
    }),
    defineField({
      name: 'image',
      type: 'coverImage',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'featuredLink',
      title: 'Featured Link',
      type: 'object',
      fields: [
        defineField({
          name: 'description',
          title: 'Description',
          type: 'string',
        }),
        defineField({
          name: 'link',
          type: 'navigationLink',
        }),
      ],
    }),
  ],
  preview: {
    select: {
      name: 'attribution.name',
    },
    prepare({name}) {
      return {
        title: `Quote by ${name}`,
        subtitle: 'Quote Section',
      }
    },
  },
})
