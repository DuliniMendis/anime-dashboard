'use client'

import { Suspense, useState } from 'react'
import { Pagination } from './Pagination'
import { List } from './List'
import { AnimeListFallback } from './ListFallback'
import { ITEMS_PER_PAGE, NUM_PAGEES_TO_SHOW } from '../lib/constants'
import { useRouter, useSearchParams } from 'next/navigation'

/**
 * The `ListWithPagination` component provides a paginated list of items.
 *
 * The component uses URL query parameters to determine the current page,
 * ensuring that the pagination state is preserved across page reloads and navigation.
 *
 * The list content is fetched and displayed using a suspense fallback to handle loading states gracefully.
 *
 * @example
 * // Usage of the ListWithPagination component in a page to display paginated anime content
 * return <ListWithPagination />;
 */
export const ListWithPagination = () => {
  const searchParams = useSearchParams()
  const page = searchParams.get('page')

  const [currentPage, setCurrentPage] = useState(page ? Number(page) : 1)
  const [totalPages, setTotalPages] = useState<number>(10)

  const router = useRouter()
  const handlePageChange = (page: number) => {
    setCurrentPage(page)
    router.push(`/information?page=${page}`)
  }

  return (
    <>
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        itemsPerPage={ITEMS_PER_PAGE}
        nPagesToShow={NUM_PAGEES_TO_SHOW}
        onPageChange={handlePageChange}
      />
      <Suspense fallback={<AnimeListFallback />}>
        <List
          currentPage={currentPage}
          updatePagination={(totalPages: number) => setTotalPages(totalPages)}
        />
      </Suspense>
    </>
  )
}
