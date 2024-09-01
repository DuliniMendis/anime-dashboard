import React, { useMemo } from 'react'
import { Button, HStack, Text, Stack } from '@chakra-ui/react'

/**
 * The `Pagination` component provides a set of controls to navigate through multiple pages of items.
 *
 * This component renders pagination buttons that allow users to navigate between pages,
 * as well as display information about the current page range and total items.
 *
 * @param {number} props.currentPage - The current active page number.
 * @param {number} props.totalPages - The total number of pages available.
 * @param {number} props.itemsPerPage - The number of items displayed per page.
 * @param {number} props.nPagesToShow - The number of page buttons to show at once in the pagination controls.
 * @param {(page: number) => void} props.onPageChange - A callback function that is called when the user changes the page.
 *
 * @example
 * // Example usage of Pagination with 10 pages and 20 items per page
 * return (
 *   <Pagination
 *     currentPage={3}
 *     totalPages={10}
 *     itemsPerPage={20}
 *     nPagesToShow={5}
 *     onPageChange={(page) => console.log(`Changed to page ${page}`)}
 *   />
 * );
 */
export const Pagination = ({
  currentPage,
  totalPages,
  itemsPerPage,
  nPagesToShow,
  onPageChange,
}: {
  currentPage: number
  totalPages: number
  itemsPerPage: number
  nPagesToShow: number
  onPageChange: (page: number) => void
}) => {
  // Keeping this calculation here instead of in a util file because
  // - it's small
  // - it's only used in this component
  // - it's nice to have related logic in the same place
  const { pageNumbers, startIndex, endIndex, totalItems } = useMemo(() => {
    const pageNumbers = []

    const currentPageSet = Math.floor((currentPage - 1) / nPagesToShow)
    const currentStartPage = currentPageSet * nPagesToShow + 1
    const currentEndPage = currentStartPage + nPagesToShow

    for (
      let i = currentStartPage;
      i < Math.min(currentEndPage, totalPages);
      i++
    ) {
      pageNumbers.push(i)
    }

    const totalItems = totalPages * itemsPerPage
    const startIndex = (currentPage - 1) * itemsPerPage + 1
    const endIndex = Math.min(currentPage * itemsPerPage, totalItems)

    return {
      pageNumbers,
      startIndex,
      endIndex,
      totalItems,
    }
  }, [currentPage, nPagesToShow, totalPages, itemsPerPage])

  return (
    <Stack spacing={5} mt={8}>
      <HStack spacing={{ base: 2, md: 4 }} justify='center'>
        <Button
          // If performance is a concern these inline functions can be pulled out and memoized
          onClick={() => onPageChange(currentPage - 1)}
          isDisabled={currentPage === 1}
          colorScheme='purple'
          size={{ base: 'sm', md: 'md' }}
        >
          Prev
        </Button>

        {pageNumbers.map((page) => (
          <Button
            key={page}
            onClick={() => onPageChange(page)}
            colorScheme={page === currentPage ? 'purple' : 'gray'}
            size={{ base: 'sm', md: 'md' }}
          >
            {page}
          </Button>
        ))}

        <Button
          onClick={() => onPageChange(currentPage + 1)}
          isDisabled={currentPage === totalPages}
          colorScheme='purple'
          size={{ base: 'sm', md: 'md' }}
        >
          Next
        </Button>
      </HStack>
      <Text align='center'>{`You're seeing ${startIndex} to ${endIndex} of ${totalItems} anime/manga`}</Text>
    </Stack>
  )
}
