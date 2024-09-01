import {
  Container,
  Heading,
  Box,
  Flex,
  SkeletonText,
  Skeleton,
} from '@chakra-ui/react'

/**
 * `DetailsFallback` provides a visual placeholder while the Details page content
 * is being loaded (because asynchronous data fetching take time)
 *
 * This component displays:
 * - A large skeleton box at the top of the page to simulate loading of a primary content block.
 * - A heading that indicates the process is still ongoing ("Getting there...").
 * - A series of skeleton text lines to represent the loading of textual content.
 *
 * @example
 * // Use `DetailsFallback` as a fallback UI within a suspense boundary or while data is loading.
 * return (
 *   <Suspense fallback={<DetailsFallback />}>
 *     <ActualComponent />
 *   </Suspense>
 * );
 */
export const DetailsFallback = () => {
  return (
    <>
      <Flex alignItems='center' justifyContent='center' mt='3rem'>
        <Skeleton
          height='100px'
          width='90%'
          borderRadius='1rem'
          isLoaded={false}
        ></Skeleton>
      </Flex>
      <Container maxW='container.md' p='6'>
        <Box>
          <Heading as='h1' size='xl'>
            Getting there...
          </Heading>
          <SkeletonText mt='4' noOfLines={10} spacing='4' skeletonHeight='2' />
        </Box>
      </Container>
    </>
  )
}
