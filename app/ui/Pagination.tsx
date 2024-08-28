import React, { useMemo } from 'react'
import { Button, HStack, Text, Stack } from '@chakra-ui/react'

const NUM_PAGEES_TO_SHOW = 5

const Pagination = ({
  currentPage,
  totalPages,
  itemsPerPage,
  onPageChange,
}: {
  currentPage: number
  totalPages: number
  itemsPerPage: number
  onPageChange: (page: number) => void
}) => {
  const { pageNumbers, startIndex, endIndex, totalItems } = useMemo(() => {
    const pageNumbers = []

    const currentPageSet = Math.floor((currentPage - 1) / NUM_PAGEES_TO_SHOW)
    const currentStartPage = currentPageSet * NUM_PAGEES_TO_SHOW + 1
    const currentEndPage = currentStartPage + NUM_PAGEES_TO_SHOW

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

export default Pagination
