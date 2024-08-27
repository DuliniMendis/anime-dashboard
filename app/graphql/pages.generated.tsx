import * as Types from '../generated/types';

export type MediaInfoFragment = { __typename?: 'Media', id: number, type?: Types.MediaType | null, genres?: Array<string | null> | null, averageScore?: number | null, popularity?: number | null, title?: { __typename?: 'MediaTitle', english?: string | null } | null, coverImage?: { __typename?: 'MediaCoverImage', medium?: string | null } | null };

export type GetPageQueryVariables = Types.Exact<{
  page?: Types.InputMaybe<Types.Scalars['Int']['input']>;
  sort?: Types.InputMaybe<Array<Types.InputMaybe<Types.MediaSort>> | Types.InputMaybe<Types.MediaSort>>;
}>;


export type GetPageQuery = { __typename?: 'Query', Page?: { __typename?: 'Page', pageInfo?: { __typename?: 'PageInfo', total?: number | null, perPage?: number | null, currentPage?: number | null, lastPage?: number | null, hasNextPage?: boolean | null } | null, media?: Array<{ __typename?: 'Media', id: number, type?: Types.MediaType | null, genres?: Array<string | null> | null, averageScore?: number | null, popularity?: number | null, title?: { __typename?: 'MediaTitle', english?: string | null } | null, coverImage?: { __typename?: 'MediaCoverImage', medium?: string | null } | null } | null> | null } | null };

export type GetMediaQueryVariables = Types.Exact<{ [key: string]: never; }>;


export type GetMediaQuery = { __typename?: 'Query', Media?: { __typename?: 'Media', bannerImage?: string | null, season?: Types.MediaSeason | null, seasonYear?: number | null, description?: string | null, format?: Types.MediaFormat | null, episodes?: number | null, duration?: number | null, isAdult?: boolean | null, id: number, type?: Types.MediaType | null, genres?: Array<string | null> | null, averageScore?: number | null, popularity?: number | null, startDate?: { __typename?: 'FuzzyDate', year?: number | null, month?: number | null, day?: number | null } | null, endDate?: { __typename?: 'FuzzyDate', year?: number | null, month?: number | null, day?: number | null } | null, studios?: { __typename?: 'StudioConnection', edges?: Array<{ __typename?: 'StudioEdge', isMain: boolean, node?: { __typename?: 'Studio', id: number, name: string } | null } | null> | null } | null, title?: { __typename?: 'MediaTitle', english?: string | null } | null, coverImage?: { __typename?: 'MediaCoverImage', medium?: string | null } | null } | null };
