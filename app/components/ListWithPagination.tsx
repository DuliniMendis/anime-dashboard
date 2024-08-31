'use client'

import { Suspense, useState } from 'react'
import { Pagination } from './Pagination'
import { List } from './List'
import { AnimeListFallback } from './ListFallback'
import { ITEMS_PER_PAGE, NUM_PAGEES_TO_SHOW } from '../lib/constants'
import { useRouter, useSearchParams } from 'next/navigation'

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
