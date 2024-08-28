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
import { BasicMediaInfoFragment } from '../lib/graphql/pages.generated'

export const AnimeCard = ({ media }: { media: BasicMediaInfoFragment }) => {
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
              src={media?.coverImage?.medium || ''}
              alt={media?.title?.english || ''}
              sizes={'100px'}
              fill
              style={{ borderRadius: '0.5rem', border: '2px solid white' }}
            />
          </Box>
          <Stack spacing='3'>
            <Heading size='sm'>{media?.title?.english}</Heading>
            <Text fontSize='sm'>{media?.genres?.slice(0, 3).join(', ')}</Text>
            <Text color='blue.500'>Rating: {media?.averageScore}</Text>
          </Stack>
        </HStack>
      </CardBody>
    </Card>
  )
}
