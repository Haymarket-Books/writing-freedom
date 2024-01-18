import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'emphasis',
  title: 'Emphasis',
  type: 'object',
  fields: [
    defineField({
      name: 'blocks',
      title: 'Text',
      type: 'richContentLite',
      validation: (Rule) => Rule.required().max(200),
    }),
    defineField({
      name: 'image',
      type: 'coverImage',
      description: 'Primary image to accompany text.',
      validation: (Rule) => Rule.required(),
    }),
  ],
  preview: {
    select: {
      text: 'text',
      image: 'image',
    },
    prepare({text, image}) {
      return {
        title: text,
        subtitle: 'Emphasis Section',
        media: image,
      }
    },
  },
})
