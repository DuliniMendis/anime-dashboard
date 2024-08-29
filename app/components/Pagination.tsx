import React, { useMemo } from 'react'
import { Button, HStack, Text, Stack } from '@chakra-ui/react'

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
  }, [currentPage, totalPages, itemsPerPage])

  const handleNextPage = () => onPageChange(currentPage + 1)

  const handlePrevPage = () => onPageChange(currentPage - 1)

  return (
    <Stack spacing={5} mt={8}>
      <HStack spacing={{ base: 2, md: 4 }} justify='center'>
        <Button
          onClick={handlePrevPage}
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
          onClick={handleNextPage}
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
