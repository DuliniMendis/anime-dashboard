'use client'

import { Suspense, useState } from 'react'
import Pagination from './Pagination'
import { List } from './List'
import { AnimeListFallback } from './ListFallback'

interface PageInfo {
  totalPages: number
  itemsPerPage: number
}

export const AnimeList = () => {
  const [currentPage, setCurrentPage] = useState(1)
  const [pageInfo, setPageInfo] = useState<PageInfo>({
    totalPages: 10,
    itemsPerPage: 20,
  })

  const handlePageChange = (page: number) => {
    setCurrentPage(page)
  }

  return (
    <>
      <Pagination
        currentPage={currentPage}
        totalPages={pageInfo.totalPages}
        onPageChange={handlePageChange}
        itemsPerPage={pageInfo.itemsPerPage}
      />
      <Suspense fallback={<AnimeListFallback />}>
        <List
          currentPage={currentPage}
          updatePagination={(options) => setPageInfo(options)}
        />
      </Suspense>
    </>
  )
}
