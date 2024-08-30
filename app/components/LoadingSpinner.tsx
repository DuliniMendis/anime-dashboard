'use client'

import React from 'react'
import { Spinner } from '@chakra-ui/react'
import { useFormStatus } from 'react-dom'

export const LoadingSpinner = ({ isFullPage }: { isFullPage?: boolean }) => {
  return (
    <Spinner
      thickness='4px'
      speed='0.65s'
      emptyColor='gray.200'
      color='purple.500'
      size='xl'
      position={isFullPage ? 'fixed' : 'inherit'}
      top={isFullPage ? 'calc(50% - 25px)' : 'auto'}
      left={isFullPage ? 'calc(50% - 25px)' : 'auto'}
    />
  )
}

export const FormPendingSpinner = () => {
  const status = useFormStatus()
  return status.pending ? <LoadingSpinner isFullPage /> : null
}
