'use client'

import { useSuspenseQuery } from '@apollo/client'
import { Container, Heading, Box, Text, Image, Flex } from '@chakra-ui/react'
import { notFound } from 'next/navigation'
import { getMedia } from '../lib/graphql/pages'
import { GetMediaQuery } from '../lib/graphql/pages.generated'

export default function AnimeDetails({ id }: { id: string }) {
  const { data } = useSuspenseQuery<GetMediaQuery>(getMedia, {
    variables: { id },
    fetchPolicy: 'cache-and-network',
  })

  if (!data.Media) {
    notFound()
  }

  return (
    <>
      <Flex alignItems='center' justifyContent='center'>
        <Image
          src={data.Media.bannerImage || ''}
          alt={data.Media.title?.english || ''}
          width='100%'
          style={{ borderRadius: '1rem' }}
        />
      </Flex>
      <Container maxW='container.md' p='6'>
        <Box>
          <Heading as='h1' size='xl'>
            {data.Media.title?.english}
          </Heading>
          {data.Media.description
            ?.replace('<i>', '') // description has html tags so removing the common ones
            .split('<br>')
            .map((line, index) => (
              <Text mt='4' fontSize='sm' key={index}>
                {line}
              </Text>
            ))}
        </Box>
      </Container>
    </>
  )
}
