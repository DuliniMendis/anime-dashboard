import {
  Container,
  Heading,
  Box,
  Flex,
  SkeletonText,
  Skeleton,
} from '@chakra-ui/react'

export default function AnimeDetailsFallback() {
  return (
    <>
      <Flex alignItems='center' justifyContent={'center'} mt='3rem'>
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
