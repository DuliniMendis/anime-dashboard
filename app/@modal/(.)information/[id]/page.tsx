import React, { Suspense } from 'react'
import { Container } from '@chakra-ui/react'
import { DetailsFallback } from '@/app/components/DetailsFallback'
import { ModalDetails } from '@/app/components/ModalDetails'
import { Details } from '@/app/components/Details'

export default function InterceptedRoute({
  params,
}: {
  params: { id: string }
}) {
  return (
    <ModalDetails>
      <Container mt={10}>
        <Suspense fallback={<DetailsFallback />}>
          <Details id={params.id} />
        </Suspense>
      </Container>
    </ModalDetails>
  )
}
