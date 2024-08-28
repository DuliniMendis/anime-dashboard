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
import { useContext, useEffect, useState } from 'react'
import { UserContext } from '@/app/lib/context/userContext'

export const LoginForm = () => {
  const userContext = useContext(UserContext)

  const [username, setUsername] = useState('')
  const [jobTitle, setJobTitle] = useState('')
  const [mismatchError, setMismatchError] = useState('')

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

  useEffect(() => {
    if (username && jobTitle) {
      checkIfUsernameExists(username, jobTitle)
    }
  }, [username, jobTitle])

  const handleLogin = async () => {
    await logIn({ username, jobTitle })
    userContext?.setUser({ username, jobTitle })
  }

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
        <Button colorScheme='purple' type='submit'>
          Log in
        </Button>
      </Stack>
    </form>
  )
}
