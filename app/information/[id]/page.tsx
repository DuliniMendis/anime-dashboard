import React, { Suspense } from 'react'
import Link from 'next/link'
import { Button, Flex } from '@chakra-ui/react'
import { DetailsFallback } from '@/app/components/DetailsFallback'
import { Details } from '@/app/components/Details'

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
