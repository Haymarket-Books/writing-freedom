import {defineConfig} from 'sanity'
import {deskTool} from 'sanity/desk'
import {visionTool} from '@sanity/vision'
import {schemaTypes} from './schemas'
import {deskStructure} from './deskStructure'
import {dashboardTool, projectInfoWidget} from '@sanity/dashboard'
import {dashboardWelcomeWidget} from './widgets/dashboardWelcome'
import {documentListWidget} from 'sanity-plugin-dashboard-widget-document-list'
import {netlifyTool} from 'sanity-plugin-netlify'

const singletonActions = new Set(['publish', 'discardChanges', 'restore'])
const singletonTypes = new Set([
  'siteSettings',
  'homepage',
  'navigation',
  // 'aboutPage',
  // 'fellowsPage',
  // 'programPage',
])

export default defineConfig({
  name: 'default',
  title: 'Haymarket Writing Freedom',

  projectId: '7zni91yt',
  dataset: 'production',

  plugins: [
    dashboardTool({
      widgets: [
        dashboardWelcomeWidget({
          layout: {width: 'large'},
        }),
        documentListWidget({
          title: 'Last edited items',
          order: '_updatedAt desc',
          types: [
            'fellow',
            'teamMember',
            'page',
            'homepage',
            'category',
            'teamCategory',
            'siteSettings',
          ],
          layout: {width: 'regular'},
        }),
        // documentListWidget({
        //   title: 'Currently drafting (changes not published)',
        //   query: '*[(_id in path("drafts.**"))]',
        //   types: [
        //     'fellow',
        //     'teamMember',
        //     'page',
        //     'homepage',
        //     'category',
        //     'teamCategory',
        //     'siteSettings',
        //   ],
        //   layout: {width: 'regular'},
        // }),
      ],
    }),
    deskTool({structure: deskStructure}),
    netlifyTool(),
    visionTool(),
  ],

  schema: {
    types: schemaTypes,
    // Filter out singleton types from the global "new document menu options"
    templates: (templates) => templates.filter(({schemaType}) => !singletonTypes.has(schemaType)),
  },
  document: {
    // For singleton types, filter out actions that are not explicitly included in the 'singletonActions' list above
    actions: (input, context) =>
      singletonTypes.has(context.schemaType)
        ? input.filter(({action}) => action && singletonActions.has(action))
        : input,
  },
})
