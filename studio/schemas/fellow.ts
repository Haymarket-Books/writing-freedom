import {defineArrayMember, defineField, defineType} from 'sanity'
import type {SanityDocument} from 'sanity'
import {NameField} from './components/NameField'

interface Fellow extends SanityDocument {
  name?: {
    firstName?: string
    lastName?: string
  }
}

export default defineType({
  name: 'fellow',
  title: 'Fellow',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Fellow Name',
      type: 'object',
      fields: [
        defineField({
          name: 'firstName',
          title: 'First Name',
          type: 'string',
          validation: (Rule) => Rule.required(),
        }),
        defineField({
          name: 'lastName',
          title: 'Last Name',
          type: 'string',
          validation: (Rule) => Rule.required(),
        }),
      ],
    }),
    defineField({
      name: 'slug',
      title: 'URL Slug',
      type: 'slug',
      options: {
        source: (doc: Fellow) => {
          return `${doc?.name?.firstName} ${doc?.name?.lastName}`
        },
        isUnique: (value, context) => context.defaultIsUnique(value, context),
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'fellowshipYear',
      title: 'Fellowship Year',
      type: 'number',
      initialValue: 2024,
      options: {
        list: [2024, 2025],
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'image',
      title: 'Headshot',
      type: 'coverImage',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'category',
      title: 'Fellow Type',
      type: 'reference',
      to: [{type: 'category'}],
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'content',
      title: 'Background',
      type: 'richContentLite',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'selectedWorks',
      title: 'Selected Works',
      type: 'array',
      of: [
        defineArrayMember({
          name: 'work',
          title: 'Work',
          type: 'object',
          fields: [
            defineField({
              name: 'title',
              title: 'Title',
              type: 'string',
            }),
            defineField({
              name: 'year',
              title: 'Year',
              type: 'number',
            }),
          ],
          preview: {
            select: {
              title: 'title',
              year: 'year',
            },
            prepare({title, year}) {
              return {
                title: title,
                subtitle: year,
              }
            },
          },
        }),
      ],
      validation: (Rule) => Rule.min(1),
    }),
    defineField({
      name: 'media',
      title: 'Embedded Media',
      type: 'string',
      description: 'Enter a video ID from YouTube or Vimeo.',
    }),
  ],
  preview: {
    select: {
      firstName: 'name.firstName',
      lastName: 'name.lastName',
      year: 'fellowshipYear',
      fellowType: 'category.name',
    },
    prepare({firstName, lastName, year, fellowType}) {
      return {
        title: `${firstName} ${lastName}`,
        subtitle: year && `${year} Fellow • ${fellowType}`,
      }
    },
  },
  orderings: [
    {
      title: 'Last Name, A-Z',
      name: 'lastNameAsc',
      by: [{field: 'name.lastName', direction: 'asc'}],
    },
    {
      title: 'Last Name, Z-A',
      name: 'lastNameDesc',
      by: [{field: 'name.lastName', direction: 'desc'}],
    },
  ],
})
