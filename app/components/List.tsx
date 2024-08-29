'use client'

import { useSuspenseQuery } from '@apollo/client'
import { SimpleGrid } from '@chakra-ui/react'
import { getPage } from '../lib/graphql/pages'
import Link from 'next/link'
import { AnimeCard } from './Card'
import { GetPageQuery } from '../lib/graphql/pages.generated'
import { useEffect } from 'react'
import { mapPageDataToView } from '../lib/dataMappers/listMapper'
import { ITEMS_PER_PAGE } from '../lib/constants'

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

  const { items, totalPages } = mapPageDataToView(data)

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
