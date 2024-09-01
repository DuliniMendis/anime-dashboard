'use client'

import {
  FormControl,
  FormLabel,
  Input,
  Flex,
  Card,
  Heading,
  Button,
  Stack,
  HStack,
  FormErrorMessage,
} from '@chakra-ui/react'
import { doesUsernameExist, editDetails } from '../../lib/actions'
import { useRouter } from 'next/navigation'
import { useUserContext } from '@/app/lib/providers/UserContextProvider'
import { useEffect, useMemo, useState } from 'react'
import { debounce } from 'lodash'
import { FormPendingSpinner } from '../LoadingSpinner'

export const EditDetailsForm = () => {
  const { user, setUser } = useUserContext()

  // Keeping individual fields in state since a username check is done as the user types
  const [username, setUsername] = useState(user?.username || '')
  const [jobTitle, setJobTitle] = useState(user?.jobTitle || '')
  const [usernameError, setUsernameError] = useState('')

  const router = useRouter()

  // Check if username belongs to another user
  const checkIfUsernameExists = async (username: string) => {
    const usernameExists = await doesUsernameExist(username)
    if (usernameExists) {
      setUsernameError('This username is already in use.')
    } else {
      setUsernameError('')
    }
  }

  const debouncedCheckIfUsernameExists = useMemo(
    () => debounce(checkIfUsernameExists, 300),
    [],
  )

  useEffect(() => {
    if (username && username !== user?.username) {
      debouncedCheckIfUsernameExists(username)
    }
  }, [username, user, debouncedCheckIfUsernameExists])

  // Using a custom form action instead of using useActionState
  // to have bother client and server side actions triggered through this.
  const handleEditDetails = async () => {
    if (user) {
      await editDetails(user?.username, username, jobTitle)
      setUser({ ...user, username, jobTitle })
      handleOnClose()
    }
  }

  const handleOnClose = () => {
    router.back()
  }

  const isSaveDisabled = !username || !jobTitle || !!usernameError

  return (
    <Flex height='90vh' align='center' justify='center'>
      <Card px='5rem' py='3rem'>
        <form action={handleEditDetails}>
          <Stack spacing={10}>
            <Heading as='h1' size='xl' textAlign='center'>
              Do you want to change your details?
            </Heading>
            <FormControl isRequired isInvalid={!!usernameError}>
              <FormLabel>What should we call you?</FormLabel>
              <Input
                name='username'
                variant='filled'
                placeholder='Enter username'
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
              {usernameError && (
                <FormErrorMessage>{usernameError}</FormErrorMessage>
              )}
            </FormControl>
            <FormControl isRequired>
              <FormLabel>What is your job title?</FormLabel>
              <Input
                name='jobTitle'
                variant='filled'
                placeholder='Enter job title'
                value={jobTitle}
                onChange={(e) => setJobTitle(e.target.value)}
              />
            </FormControl>
            <Flex justifyContent='flex-end'>
              <HStack spacing={10}>
                <Button
                  colorScheme='purple'
                  onClick={handleOnClose}
                  variant='outline'
                >
                  Cancel
                </Button>
                <Button
                  colorScheme='purple'
                  type='submit'
                  isDisabled={isSaveDisabled}
                >
                  Save
                </Button>
              </HStack>
            </Flex>
          </Stack>
          <FormPendingSpinner />
        </form>
      </Card>
    </Flex>
  )
}
