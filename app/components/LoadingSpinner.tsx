'use client'

import React from 'react'
import { Spinner } from '@chakra-ui/react'
import { useFormStatus } from 'react-dom'

/**
 * The `LoadingSpinner` component displays a loading spinner,
 * which can be either centered on the full page or positioned inline.
 *
 * @example
 * // Inline spinner usage
 * return <LoadingSpinner />;
 *
 * @example
 * // Full-page centered spinner usage
 * return <LoadingSpinner isFullPage={true} />;
 */
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

/**
 * The `FormPendingSpinner` component conditionally displays a full-page loading spinner
 * based on the form's submission status.
 *
 * This component utilizes the `useFormStatus` hook to monitor the current form submission status.
 * If the form is pending (i.e., the submission is in progress), a full-page loading spinner is displayed.
 * Otherwise, nothing is rendered.
 *
 * @example
 * // Usage of FormPendingSpinner within a form component
 * return (
 *   <form>
 *     <FormPendingSpinner />
 *   </form>
 * );
 */
export const FormPendingSpinner = () => {
  const status = useFormStatus()
  return status.pending ? <LoadingSpinner isFullPage /> : null
}
