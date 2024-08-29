import { Flex, Spinner, Text, Stack } from '@chakra-ui/react'

export default function Loading() {
  return (
    <Flex alignItems='center' justifyContent='center' height='100vh'>
      <Stack alignItems='center'>
        <Text fontSize='xl'>Colouring artboards. Please wait...</Text>
        <Spinner
          thickness='4px'
          speed='0.65s'
          emptyColor='gray.200'
          color='purple.500'
          size='xl'
        />
      </Stack>
    </Flex>
  )
}
