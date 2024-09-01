'use client'

import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  Button,
} from '@chakra-ui/react'
import { useRouter } from 'next/navigation'

/**
 * The `ModalDetails` component displays a modal dialog with customizable content and a close button.
 *
 * The modal is opened by default and includes a close button in the footer,
 * which navigates back to the previous page when clicked.
 *
 * @example
 * // Example usage of ModalDetails to display some content in a modal
 * return (
 *   <ModalDetails>
 *     <p>Here are some details about the selected item.</p>
 *   </ModalDetails>
 * );
 */
export const ModalDetails = ({ children }: { children: React.ReactNode }) => {
  const router = useRouter()

  const onClose = () => {
    router.back()
  }

  return (
    <Modal isOpen onClose={onClose} size='xl'>
      <ModalOverlay />
      <ModalContent>
        <ModalCloseButton />
        <ModalBody>{children}</ModalBody>

        <ModalFooter>
          <Button colorScheme='purple' mr={3} onClick={onClose}>
            Close
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  )
}
