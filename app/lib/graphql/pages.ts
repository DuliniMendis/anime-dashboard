import gql from 'graphql-tag'

// Using a fragment since that part is duplicated between the 2 queries.
const MediaFragment = gql`
  fragment SharedMediaInfo on Media {
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
        ...SharedMediaInfo
      }
    }
  }
  ${MediaFragment}
`

// We don't even need another query for this is all the data it fetched in the getPage query.
// Just doing it like this to mimic real world scenarios
// where the details page has a lot more data to fetch.
export const getMedia = gql`
  query getMedia($id: Int!) {
    Media(id: $id) {
      ...SharedMediaInfo
      bannerImage
      seasonYear
      description
      episodes
      duration
    }
  }
  ${MediaFragment}
`
