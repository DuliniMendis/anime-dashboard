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
    type
    genres
    averageScore
    popularity
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
        perPage
        currentPage
        lastPage
        hasNextPage
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
      startDate {
        year
        month
        day
      }
      endDate {
        year
        month
        day
      }
      season
      seasonYear
      description
      format
      episodes
      duration
      isAdult
      studios(isMain: true) {
        edges {
          isMain
          node {
            id
            name
          }
        }
      }
    }
  }
  ${MediaFragment}
`
