import { Flex, Text, Stack } from '@chakra-ui/react'
import { LoadingSpinner } from '@/app/components/LoadingSpinner'

export default function Loading() {
  return (
    <Flex alignItems='center' justifyContent='center' height='100vh'>
      <Stack alignItems='center'>
        <Text fontSize='xl'>Colouring artboards. Please wait...</Text>
        <LoadingSpinner />
      </Stack>
    </Flex>
  )
}
