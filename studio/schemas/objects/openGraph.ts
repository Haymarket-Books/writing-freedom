import {defineType, defineField} from 'sanity'

export default defineType({
  name: 'openGraph',
  title: 'Open Graph Info',
  type: 'object',
  options: {
    collapsible: true,
  },
  fields: [
    defineField({
      name: 'ogTitle',
      title: 'Open Graph Title',
      type: 'string',
    }),
    defineField({
      name: 'ogImage',
      title: 'Open Graph Image',
      type: 'image',
      options: {
        hotspot: true,
      },
    }),
  ],
})
