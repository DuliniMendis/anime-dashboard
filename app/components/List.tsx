'use client'

import { useSuspenseQuery } from '@apollo/client'
import { SimpleGrid } from '@chakra-ui/react'
import { getPage } from '../lib/graphql/pages'
import Link from 'next/link'
import { AnimeCard } from './Card'
import { GetPageQuery } from '../lib/graphql/pages.generated'
import { useEffect } from 'react'
import { mapPageDataToListView } from '../lib/dataMappers/listMapper'
import { ITEMS_PER_PAGE } from '../lib/constants'

/**
 * The `List` component displays a paginated list of media items using a grid layout.
 *
 * This component relies on a suspense query to retrieve the media data for the specified page.
 * The data is then mapped to a format suitable for displaying a list of media items.
 *
 * The component triggers a callback to update the pagination state when the total number of pages is determined.
 *
 * @example
 * // Usage of the List component to display media items on the current page
 * const handleUpdatePagination = (totalPages) => {
 *   // Logic to handle pagination state
 * }
 * return <List currentPage={1} updatePagination={handleUpdatePagination} />;
 */
export const List = ({
  currentPage,
  updatePagination,
}: {
  currentPage: number
  updatePagination: (totalPages: number) => void
}) => {
  const { data, error } = useSuspenseQuery<GetPageQuery>(getPage, {
    variables: { page: currentPage, perPage: ITEMS_PER_PAGE },
    fetchPolicy: 'cache-and-network',
  })

  const { items, totalPages } = mapPageDataToListView(data)

  useEffect(() => {
    if (totalPages) {
      updatePagination(totalPages)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [totalPages])

  return (
    <SimpleGrid
      columns={{ base: 1, sm: 1, md: 2, lg: 2, xl: 3 }}
      spacing={4}
      mb={20}
    >
      {items.map((item) => (
        <Link href={`/information/${item.id}`} key={item.id}>
          <AnimeCard media={item} />
        </Link>
      ))}
    </SimpleGrid>
  )
}
