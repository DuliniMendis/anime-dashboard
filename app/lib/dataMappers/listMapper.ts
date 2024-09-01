import {
  SharedMediaInfoFragment,
  GetPageQuery,
} from '../graphql/pages.generated'

// Mappers for the List component
export const mapPageDataToListView = (data: GetPageQuery) => {
  const items = data?.Page?.media as SharedMediaInfoFragment[]
  const totalPages = data?.Page?.pageInfo?.total

  return {
    items,
    totalPages,
  }
}

export const mapMediaDataToCardView = (media: SharedMediaInfoFragment) => {
  return {
    id: media.id,
    title: media.title?.english || '',
    coverImage: media.coverImage?.medium || '',
    genres: media.genres?.slice(0, 3).join(', '),
    averageScore: media.averageScore,
  }
}
