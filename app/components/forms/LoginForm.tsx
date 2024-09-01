'use client'

import {
  FormControl,
  FormLabel,
  Input,
  Heading,
  Button,
  Text,
  Stack,
  FormErrorMessage,
} from '@chakra-ui/react'
import { logIn, doesUsernameAndJobTitleMatch } from '@/app/lib/actions'
import { useEffect, useMemo, useState } from 'react'
import { debounce } from 'lodash'
import { FormPendingSpinner } from '../LoadingSpinner'

export const LoginForm = () => {
  // Keeping individual fields in state since a username check is done as the user types
  const [username, setUsername] = useState('')
  const [jobTitle, setJobTitle] = useState('')
  const [mismatchError, setMismatchError] = useState('')

  // Check if username and job title match what was previously used
  const checkIfUsernameExists = async (username: string, jobTitle: string) => {
    const usernameAndJobTitleMatch = await doesUsernameAndJobTitleMatch(
      username,
      jobTitle,
    )
    if (usernameAndJobTitleMatch) {
      setMismatchError('')
    } else {
      setMismatchError(
        'Username and job title does not match what was previously used.',
      )
    }
  }

  const debouncedCheckIfUsernameExists = useMemo(
    () => debounce(checkIfUsernameExists, 300),
    [],
  )

  useEffect(() => {
    if (username && jobTitle) {
      debouncedCheckIfUsernameExists(username, jobTitle)
    }
  }, [username, jobTitle, debouncedCheckIfUsernameExists])

  // Using a custom form action instead of using useActionState
  // to have bother client and server side actions triggered through this.
  const handleLogin = async () => {
    await logIn({ username, jobTitle })
    location.reload()
  }

  const isLoginDisabled = !username || !jobTitle || !!mismatchError

  return (
    <form action={handleLogin}>
      <Stack spacing={10}>
        <Heading as='h1' size='xl' textAlign='center'>
          Welcome to AniRealm
        </Heading>
        <Text fontSize='lg' textAlign='center' maxW='500px'>
          Before you embark on your epic anime adventure, we need a little info
          to get started.
        </Text>
        <FormControl isRequired isInvalid={!!mismatchError}>
          <FormLabel>What should we call you?</FormLabel>
          <Input
            name='username'
            variant='filled'
            placeholder='Enter username'
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          {mismatchError && (
            <FormErrorMessage>{mismatchError}</FormErrorMessage>
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
        <Button colorScheme='purple' type='submit' isDisabled={isLoginDisabled}>
          Log in
        </Button>
      </Stack>
      <FormPendingSpinner />
    </form>
  )
}
