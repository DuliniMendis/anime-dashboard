import React from 'react'
import { Container, Heading, Stack } from '@chakra-ui/react'
import { ListWithPagination } from '../components/ListWithPagination'

// Pages are split into their static component (ex: this page) and their dynamic components (ex: <ListWithPagination />)
// depending on whether they have data fetching and client features like hooks and events.
export default function Information() {
  return (
    <Container maxW='1200px' py={20} px={0}>
      <Stack spacing='7' alignItems='center'>
        <Heading
          as='h2'
          size='xl'
          textAlign='center'
          maxW='800px'
          padding='0 2rem'
        >
          Take a peek at the most popular anime shows of the season
        </Heading>
        <ListWithPagination />
      </Stack>
    </Container>
  )
}
