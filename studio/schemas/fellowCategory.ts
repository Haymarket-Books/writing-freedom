import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'category',
  title: 'Fellow Category',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Name',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      description:
        "Unique identifier for this category's detail page. Defaults to name of category.",
      options: {
        source: (doc) => `${doc.name}s`,
        isUnique: (value, context) => context.defaultIsUnique(value, context),
      },
      validation: (Rule) => Rule.required(),
    }),
  ],
})
