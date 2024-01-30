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
      type: 'reference',
      to: [{type: 'fellowshipYear'}],
      options: {
        disableNew: true,
      },
      validation: (Rule) => Rule.required(),
    }),
    // defineField({
    //   name: 'fellowshipYear',
    //   title: 'Fellowship Year',
    //   type: 'number',
    //   initialValue: 2024,
    //   options: {
    //     list: [2024, 2025],
    //   },
    //   validation: (Rule) => Rule.required(),
    // }),
    defineField({
      name: 'image',
      title: 'Headshot',
      type: 'coverImage',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'categories',
      title: 'Fellow Categories',
      type: 'array',
      of: [
        {
          type: 'reference',
          to: [{type: 'category'}],
        },
      ],
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
      title: 'Embedded Audio',
      type: 'object',
      description: 'Upload an audio file and provide a description.',
      fields: [
        defineField({
          name: 'file',
          title: 'Audio File',
          type: 'file',
          description: 'Upload an .mp3 file.',
          options: {
            accept: '.mp3',
          },
        }),
        defineField({
          name: 'fileDescription',
          title: 'Audio File Description',
          type: 'richContentLite',
        }),
      ],
    }),
  ],
  preview: {
    select: {
      firstName: 'name.firstName',
      lastName: 'name.lastName',
      year: 'fellowshipYear.year',
      // fellowType: 'category.name',
      image: 'image',
    },
    prepare({firstName, lastName, year, image}) {
      return {
        title: `${firstName} ${lastName}`,
        subtitle: year && `${year} Fellow`,
        media: image,
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
