import {
  Card,
  CardBody,
  HStack,
  Stack,
  Heading,
  Box,
  Text,
} from '@chakra-ui/react'
import Image from 'next/image'
import { SharedMediaInfoFragment } from '../lib/graphql/pages.generated'
import { mapMediaDataToCardView } from '../lib/dataMappers/listMapper'

/**
 * `AnimeCard` displays a card view for a given anime or media item.
 * The card includes an image, title, genres, and average score rating.
 *
 * @example
 * // Example usage of the AnimeCard component with a media object
 * const media = {
 *   id: 1,
 *   title: "My Hero Academia",
 *   genres: ["Action", "Adventure"],
 *   averageScore: 85,
 *   coverImage: "https://example.com/cover.jpg"
 * };
 *
 * return <AnimeCard media={media} />;
 */
export const AnimeCard = ({ media }: { media: SharedMediaInfoFragment }) => {
  const { coverImage, title, genres, averageScore } =
    mapMediaDataToCardView(media)

  return (
    <Card width={350} height={180} key={media?.id}>
      <CardBody>
        <HStack spacing='5'>
          <Box
            position='relative'
            width='100px'
            minWidth='100px'
            height='140px'
          >
            <Image
              src={coverImage}
              alt={title}
              sizes={'100px'}
              fill
              style={{ borderRadius: '0.5rem', border: '2px solid white' }}
            />
          </Box>
          <Stack spacing='3'>
            <Heading size='sm'>{title}</Heading>
            <Text fontSize='sm'>{genres}</Text>
            <Text color='blue.500'>Rating: {averageScore}</Text>
          </Stack>
        </HStack>
      </CardBody>
    </Card>
  )
}
