'use client'

import { useSuspenseQuery } from '@apollo/client'
import {
  Container,
  Heading,
  Box,
  Text,
  Image,
  Flex,
  HStack,
  Stack,
} from '@chakra-ui/react'
import { notFound } from 'next/navigation'
import { getMedia } from '../lib/graphql/pages'
import { GetMediaQuery } from '../lib/graphql/pages.generated'
import { mapDetailsDataToView } from '../lib/dataMappers/detailsMapper'

export const Details = ({ id }: { id: string }) => {
  const { data } = useSuspenseQuery<GetMediaQuery>(getMedia, {
    variables: { id },
    fetchPolicy: 'cache-and-network',
  })

  const media = mapDetailsDataToView(data)

  if (!media) {
    notFound()
  }

  return (
    <>
      <Flex alignItems='center' justifyContent='center'>
        <Image
          src={media.bannerImage || ''}
          alt={media.title || ''}
          width='100%'
          style={{ borderRadius: '1rem' }}
        />
      </Flex>
      <Container maxW='container.md' p='6'>
        <Box>
          <Heading as='h1' size='xl'>
            {media.title}
          </Heading>
          <HStack justifyContent='space-between' mt='1rem'>
            <SubInfo title='Year' value={media.seasonYear} />
            <SubInfo title='Episodes' value={media.episodes} />
            <SubInfo title='Duration' value={media.duration} />
          </HStack>
          {media.description?.map((line, index) => (
            <Text mt='4' fontSize='sm' key={index}>
              {line}
            </Text>
          ))}
        </Box>
      </Container>
    </>
  )
}

const SubInfo = ({
  title,
  value,
}: {
  title: string
  value?: number | string | null
}) => (
  <Stack spacing={0} alignItems='center'>
    <Text fontSize='sm' id={title}>
      {title}
    </Text>
    <Text fontSize='lg' color='blue.500' aria-labelledby={title}>
      {value}
    </Text>
  </Stack>
)
