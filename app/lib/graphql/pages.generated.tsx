import * as Types from '../generated/types'

export type SharedMediaInfoFragment = {
  __typename?: 'Media'
  id: number
  genres?: Array<string | null> | null
  averageScore?: number | null
  title?: { __typename?: 'MediaTitle'; english?: string | null } | null
  coverImage?: { __typename?: 'MediaCoverImage'; medium?: string | null } | null
}

export type GetPageQueryVariables = Types.Exact<{
  page?: Types.InputMaybe<Types.Scalars['Int']['input']>
  sort?: Types.InputMaybe<
    Array<Types.InputMaybe<Types.MediaSort>> | Types.InputMaybe<Types.MediaSort>
  >
  perPage?: Types.InputMaybe<Types.Scalars['Int']['input']>
}>

export type GetPageQuery = {
  __typename?: 'Query'
  Page?: {
    __typename?: 'Page'
    pageInfo?: { __typename?: 'PageInfo'; total?: number | null } | null
    media?: Array<{
      __typename?: 'Media'
      id: number
      genres?: Array<string | null> | null
      averageScore?: number | null
      title?: { __typename?: 'MediaTitle'; english?: string | null } | null
      coverImage?: {
        __typename?: 'MediaCoverImage'
        medium?: string | null
      } | null
    } | null> | null
  } | null
}

export type GetMediaQueryVariables = Types.Exact<{
  id: Types.Scalars['Int']['input']
}>

export type GetMediaQuery = {
  __typename?: 'Query'
  Media?: {
    __typename?: 'Media'
    bannerImage?: string | null
    seasonYear?: number | null
    description?: string | null
    episodes?: number | null
    duration?: number | null
    id: number
    genres?: Array<string | null> | null
    averageScore?: number | null
    title?: { __typename?: 'MediaTitle'; english?: string | null } | null
    coverImage?: {
      __typename?: 'MediaCoverImage'
      medium?: string | null
    } | null
  } | null
}
