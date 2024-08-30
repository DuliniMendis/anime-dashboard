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
import { FormPendingSpinner, LoadingSpinner } from '../LoadingSpinner'

export const EditDetailsForm = () => {
  const { user, setUser } = useUserContext()

  const [username, setUsername] = useState(user?.username || '')
  const [jobTitle, setJobTitle] = useState(user?.jobTitle || '')
  const [usernameError, setUsernameError] = useState('')

  const router = useRouter()

  // Check if username belongs to another user
  const checkIfUsernameExists = async (username: string) => {
    console.log('Checking if username exists', username)
    const usernameExists = await doesUsernameExist(username)
    console.log('Username exists', usernameExists)
    if (usernameExists) {
      setUsernameError('This username is already in use.')
    } else {
      setUsernameError('')
    }
  }

  const debouncedCheckIfUsernameExists = useMemo(
    () => debounce(checkIfUsernameExists, 500),
    [],
  )

  useEffect(() => {
    if (username && username !== user?.username) {
      debouncedCheckIfUsernameExists(username)
    }
  }, [username, user, debouncedCheckIfUsernameExists])

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
