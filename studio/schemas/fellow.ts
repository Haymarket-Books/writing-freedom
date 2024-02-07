import {defineArrayMember, defineField, defineType} from 'sanity'
import type {SanityDocument} from 'sanity'
import {NameField} from './components/NameField'

interface Fellow extends SanityDocument {
  name?: {
    firstName?: string
    lastName?: string
  }
}

const SOCIAL_ICONS = [
  {title: 'LinkedIn', value: 'linkedin'},
  {title: 'Facebook', value: 'facebook'},
  {title: 'Instagram', value: 'instagram'},
  {title: 'YouTube', value: 'youtube'},
  {title: 'Twitter', value: 'twitter'},
  // {title: 'Website', value: 'square-arrow-up-right'},
]

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
      description:
        "Unique identifier for this fellow's detail page. Defaults to full name of fellow.",
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
      name: 'socialLinks',
      title: 'Fellow Links',
      description: 'Links to personal website or social media accounts.',
      type: 'array',
      of: [
        {
          name: 'socialLink',
          title: 'Social Link',
          type: 'object',
          fields: [
            defineField({
              name: 'icon',
              title: 'Icon',
              type: 'string',
              options: {
                list: SOCIAL_ICONS,
              },
            }),
            defineField({
              name: 'url',
              title: 'URL',
              type: 'url',
              validation: (Rule) =>
                Rule.uri({
                  scheme: ['http', 'https', 'mailto', 'tel'],
                }),
            }),
          ],
          preview: {
            select: {
              icon: 'icon',
            },
            prepare({icon}) {
              const socialIcon =
                icon &&
                SOCIAL_ICONS.flatMap((option) => (option.value === icon ? [option.title] : []))
              return {
                title: `${socialIcon}`,
              }
            },
          },
        },
      ],
    }),
    defineField({
      name: 'websiteLink',
      title: 'Website Link',
      type: 'url',
      description: "Optional link to the fellow's personal website.",
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
          description: 'A short description describing the audio file.',
        }),
        defineField({
          name: 'fileTranscript',
          title: 'Audio File Transcript',
          type: 'richContentLite',
          description: 'Optional transcript of the audio file.',
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
