import React, { Suspense } from 'react'
import { ModalDetails } from '../../../ui/ModalDetails'
import AnimeDetails from '@/app/ui/Details'
import AnimeDetailsFallback from './fallback'
import { Container } from '@chakra-ui/react'

const InterceptedRoute = ({ params }: { params: { id: string } }) => {
  return (
    <ModalDetails>
      <Container mt={10}>
        <Suspense fallback={<AnimeDetailsFallback />}>
          <AnimeDetails id={params.id} />
        </Suspense>
      </Container>
    </ModalDetails>
  )
}

export default InterceptedRoute
