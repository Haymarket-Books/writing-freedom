import {defineType, defineField} from 'sanity'
import type {SanityImageSource} from '@sanity/asset-utils'
import {tryGetImageDimensions} from '@sanity/asset-utils'

export default defineType({
  name: 'coverImage',
  title: 'Cover Image',
  type: 'image',
  description: 'Featured image for display in grids and previews.',
  options: {
    hotspot: true,
  },
  validation: (Rule) => [
    // Rule.required(),
    Rule.warning().custom((img) => {
      if (typeof img === 'undefined') {
        return true
      }
      // console.log('getimage', tryGetImage(img, project))
      const dimensions = tryGetImageDimensions(img as SanityImageSource)
      return dimensions.width > 5000
        ? `Warning: image size is very large (${dimensions.width} pixels wide), please consider using a smaller image.`
        : // : dimensions.width < 800
          // ? `Warning: image size is very small (${dimensions.width} pixels wide), please consider using a larger image.`
          true
    }),
  ],
  fields: [
    // defineField({
    //   name: 'caption',
    //   title: 'Caption',
    //   type: 'string',
    //   description: 'Optional caption to display on detail page.',
    // }),
    defineField({
      name: 'alt',
      title: 'Alternative Text',
      type: 'string',
      description: 'Required alternative text description for screenreaders.',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'attribution',
      title: 'Image Attribution',
      type: 'string',
      description: 'Optional attribution or credit for the image.',
      hidden: ({document}) => (document?._type === 'fellow' ? false : true),
    }),
  ],
})
