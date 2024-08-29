import { Suspense } from 'react'
import { Details } from '../../components/Details'
import Link from 'next/link'
import { Button, Flex } from '@chakra-ui/react'
import { DetailsFallback } from '@/app/components/DetailsFallback'

export default function DetailsPage({ params }: { params: { id: string } }) {
  return (
    <Suspense fallback={<DetailsFallback />}>
      <Details id={params.id} />
      <Flex justifyContent='center'>
        <Link href='/information'>
          <Button colorScheme='purple'>Go Back</Button>
        </Link>
      </Flex>
    </Suspense>
  )
}
