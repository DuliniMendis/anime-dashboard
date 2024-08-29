'use client'

import { Button, Heading, Text, Stack, Flex } from '@chakra-ui/react'
import Link from 'next/link'

export default function NotFound() {
  return (
    <Flex
      width='100%'
      height='100%'
      justifyContent='center'
      alignItems='center'
    >
      <Stack spacing={10} textAlign='center'>
        <Heading>Oops something happened!</Heading>
        <Text>We could not find the requested anime</Text>
        <Link href='/information'>
          <Button colorScheme='purple'>Go Back</Button>
        </Link>
      </Stack>
    </Flex>
  )
}
