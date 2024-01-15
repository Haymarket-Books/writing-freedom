import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'fellowshipYear',
  title: 'Fellowship Year',
  type: 'document',
  fields: [
    defineField({
      name: 'year',
      title: 'Year',
      type: 'number',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: (doc) => `${doc.year}`,
        isUnique: (value, context) => context.defaultIsUnique(value, context),
      },
      validation: (Rule) => Rule.required(),
    }),
  ],
  preview: {
    select: {
      year: 'year',
    },
    prepare({year}) {
      return {
        title: `${year}`,
        subtitle: 'Fellowship Year',
      }
    },
  },
})
