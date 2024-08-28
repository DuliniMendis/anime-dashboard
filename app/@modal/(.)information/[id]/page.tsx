import React, { Suspense } from 'react'
import { ModalDetails } from '../../../components/ModalDetails'
import AnimeDetails from '@/app/components/Details'
import DetailsFallback from '../../../components/DetailsFallback'
import { Container } from '@chakra-ui/react'

export default function InterceptedRoute({
  params,
}: {
  params: { id: string }
}) {
  return (
    <ModalDetails>
      <Container mt={10}>
        <Suspense fallback={<DetailsFallback />}>
          <AnimeDetails id={params.id} />
        </Suspense>
      </Container>
    </ModalDetails>
  )
}
