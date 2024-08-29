import gql from 'graphql-tag'

const MediaFragment = gql`
  fragment BasicMediaInfo on Media {
    id
    title {
      english
    }
    coverImage {
      medium
    }
    genres
    averageScore
  }
`

export const getPage = gql`
  query getPage(
    $page: Int = 1
    $sort: [MediaSort] = [POPULARITY_DESC, SCORE_DESC]
    $perPage: Int = 20
  ) {
    Page(page: $page, perPage: $perPage) {
      pageInfo {
        total
      }
      media(sort: $sort) {
        ...BasicMediaInfo
      }
    }
  }
  ${MediaFragment}
`

export const getMedia = gql`
  query getMedia($id: Int!) {
    Media(id: $id) {
      ...BasicMediaInfo
      bannerImage
      seasonYear
      description
      episodes
      duration
    }
  }
  ${MediaFragment}
`
