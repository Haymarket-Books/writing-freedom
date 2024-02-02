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
      description:
        'Set a title for Open Graph contexts. This will display in social media, chats, and other shares. If nothing is set, it will default to the SEO title.',
      validation: (Rule) =>
        Rule.max(80).warning('It is best to keep this text under 80 characters.'),
    }),
    defineField({
      name: 'ogImage',
      title: 'Open Graph Image',
      type: 'image',
      description:
        'Set an image for Open Graph contexts. This will display in social media, chats, and other shares. If nothing is set, it will default to the default OG image in the Site Settings.',
      options: {
        hotspot: true,
      },
    }),
  ],
})
