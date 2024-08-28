import {
  BasicMediaInfoFragment,
  GetPageQuery,
} from '../graphql/pages.generated'

export const mapPageDataToView = (data: GetPageQuery) => {
  const items = data?.Page?.media as BasicMediaInfoFragment[]
  const totalPages = data?.Page?.pageInfo?.total

  return {
    items,
    totalPages,
  }
}
