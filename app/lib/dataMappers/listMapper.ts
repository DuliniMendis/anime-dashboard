import {
  SharedMediaInfoFragment,
  GetPageQuery,
} from '../graphql/pages.generated'

export const mapPageDataToView = (data: GetPageQuery) => {
  const items = data?.Page?.media as SharedMediaInfoFragment[]
  const totalPages = data?.Page?.pageInfo?.total

  return {
    items,
    totalPages,
  }
}
