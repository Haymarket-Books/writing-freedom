import {defineField, defineType} from 'sanity'
import {HiCalendar} from 'react-icons/hi2'

export default defineType({
  name: 'fellowshipYear',
  title: 'Fellowship Year',
  type: 'document',
  icon: HiCalendar,
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
      description: "Unique identifier for this year's detail page. Defaults to year.",
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
