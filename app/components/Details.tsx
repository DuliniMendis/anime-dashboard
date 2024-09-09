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

/**
 * The `Details` component fetches and displays detailed information about a specific media item
 * (such as an anime) based on the provided ID.
 *
 * This component utilizes a suspense query to fetch media data and maps the retrieved data to a view-friendly format.
 *
 * The displayed information includes:
 * - A banner image of the media.
 * - The title of the media.
 * - Sub-information such as the release year, number of episodes, and duration.
 * - A description that may span multiple lines.
 *
 * @example
 * // Usage of the Details component to display details of a media item with a specific ID.
 * return <Details id="12345" />;
 */
export const Details = ({ id }: { id: string }) => {
  const { data } = useSuspenseQuery<GetMediaQuery>(getMedia, {
    variables: { id },
    fetchPolicy: 'cache-and-network',
  })

  const media = mapDetailsDataToView(data)

  // Redirect to the not found page if the media is not found for the given id
  if (!media) {
    notFound()
  }

  return (
    <>
      <Flex alignItems='center' justifyContent='center'>
        <Image
          src={media.bannerImage}
          alt={media.title}
          width='100%'
          style={{ borderRadius: '1rem' }}
        />
      </Flex>
      <Container maxW='container.md' p='6'>
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
      </Container>
    </>
  )
}

/**
 * The `SubInfo` component displays a small section of information with a title and a corresponding value.
 *
 * @example
 * // Example usage of SubInfo to display the year of a media item
 * return <SubInfo title="Year" value={2024} />;
 */
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
