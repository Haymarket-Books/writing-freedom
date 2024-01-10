import {
  HiDocument,
  HiFolder,
  HiMiniCog6Tooth,
  HiSquares2X2,
  HiTag,
  HiUser,
  HiUserCircle,
  HiMiniBars3,
} from 'react-icons/hi2'
import type {StructureBuilder} from 'sanity/desk'
import teamMember from './schemas/teamMember'

export const deskStructure = (S: StructureBuilder) =>
  S.list()
    .title('Content')
    .items([
      // S.listItem().title('Home').child(S.document().schemaType('homepage').documentId('homepage')),
      S.listItem().title('Pages').icon(HiDocument).child(
        S.documentList().title('Pages').filter('_type match "*page"'),
        // S.list()
        //   .title('Pages')
        //   .items([
        //     S.listItem()
        //       .title('Home')
        //       .icon(HiDocument)
        //       .child(S.document().schemaType('home').documentId('home')),
        //     S.listItem()
        //       .title('Who We Are')
        //       .icon(HiDocument)
        //       .child(S.document().schemaType('aboutPage').documentId('aboutPage')),
        //     S.listItem()
        //       .title('About the Program')
        //       .icon(HiDocument)
        //       .child(S.document().schemaType('programPage').documentId('programPage')),
        //     S.listItem()
        //       .title('Fellows')
        //       .icon(HiDocument)
        //       .child(S.document().schemaType('fellowsPage').documentId('fellowsPage')),
        //   ]),
      ),
      S.listItem()
        .title('Navigation')
        .icon(HiMiniBars3)
        .child(S.document().schemaType('navigation').documentId('navigation')),
      S.listItem()
        .title('Content Collections')
        .icon(HiSquares2X2)
        .child(
          S.list()
            .title('Content Collections')
            .items([
              S.listItem()
                .title('Fellows')
                .icon(HiUser)
                .child(
                  S.list()
                    .title('Filter: Fellows')
                    .items([
                      S.listItem()
                        .title('All Fellows')
                        .icon(HiUser)
                        .child(S.documentTypeList('fellow')),
                      S.divider(),
                      S.listItem()
                        .title('Fellows by Category')
                        .icon(HiFolder)
                        .child(
                          S.documentTypeList('category')
                            .title('Fellows by Category')
                            .child((categoryId) =>
                              S.documentList()
                                .schemaType('fellow')
                                .title('Fellows')
                                .filter('_type == "fellow" && category._ref == $categoryId')
                                .params({categoryId}),
                            ),
                        ),
                    ]),
                ),
              S.listItem()
                .title('Fellow Categories')
                .icon(HiTag)
                .child(S.documentTypeList('category')),
              S.divider(),
              S.listItem()
                .title('Team Members')
                .icon(HiUserCircle)
                .child(
                  S.list()
                    .title('Filter: Team Members')
                    .items([
                      S.listItem()
                        .title('All Team Members')
                        .icon(HiUser)
                        .child(S.documentTypeList('teamMember')),
                      S.divider(),
                      S.listItem()
                        .title('Team Members by Category')
                        .icon(HiFolder)
                        .child(
                          S.documentTypeList('teamCategory')
                            .title('Team Members by Category')
                            .child((categoryId) =>
                              // Can I get dynamic category Name here to pass in?
                              S.documentList()
                                .schemaType('teamMember')
                                .title('Team Members by Category')
                                .filter('_type == "teamMember" && category._ref == $categoryId')
                                .params({categoryId}),
                            ),
                        ),
                    ]),
                ),
            ]),
        ),
      S.divider(),
      S.listItem()
        .title('Site Settings')
        .icon(HiMiniCog6Tooth)
        .child(S.document().schemaType('siteSettings').documentId('siteSettings')),
      // S.divider(),
      // ...S.documentTypeListItems().filter(
      //   (listItem) => !['siteSettings'].includes(listItem.getId() as string),
      // ),
    ])
