import {defineArrayMember, defineField, defineType} from 'sanity'
import type {SanityDocument} from 'sanity'

interface TeamMember extends SanityDocument {
  name?: {
    firstName?: string
    lastName?: string
  }
}

export default defineType({
  name: 'teamMember',
  title: 'Team Member',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Name',
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
        source: (doc: TeamMember) => {
          return `${doc?.name?.firstName} ${doc?.name?.lastName}`
        },
        isUnique: (value, context) => context.defaultIsUnique(value, context),
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'category',
      title: 'Category',
      type: 'reference',
      to: [{type: 'teamCategory'}],
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'title',
      title: 'Title',
      description: 'The title or role of this member.',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'image',
      title: 'Headshot',
      type: 'coverImage',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'content',
      title: 'Background',
      type: 'richContentLite',
    }),
  ],
  preview: {
    select: {
      firstName: 'name.firstName',
      lastName: 'name.lastName',
      role: 'title',
    },
    prepare({firstName, lastName, role}) {
      return {
        title: `${firstName} ${lastName}`,
        subtitle: role,
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
