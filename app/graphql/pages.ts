import gql from "graphql-tag";

export const getPage = gql`
  query getPage(
    $page: Int = 1
    $sort: [MediaSort] = [POPULARITY_DESC, SCORE_DESC]
  ) {
    Page(page: $page, perPage: 20) {
      pageInfo {
        total
        perPage
        currentPage
        lastPage
        hasNextPage
      }
      media(sort: $sort) {
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
    }
  }
`;

export const getMedia = gql`
  query getMedia {
    Media(id: 16498) {
      id
      title {
        english
      }
      bannerImage
      coverImage {
        large
      }
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
      type
      format
      episodes
      duration
      genres
      isAdult
      averageScore
      popularity
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
`;
