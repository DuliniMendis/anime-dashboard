"use client";

import { useFormState } from "react-dom";
import {
  FormControl,
  FormLabel,
  Input,
  Flex,
  Card,
  Heading,
  Button,
  Text,
  Stack,
} from "@chakra-ui/react";
import { authenticate } from "@/app/lib/actions";

export const LoginForm = () => {
  const [errorMessage, formAction, isPending] = useFormState(
    authenticate,
    undefined
  );

  return (
    <Flex height="100vh" align="center" justify="center">
      <Card px="5rem" py="3rem">
        <form action={formAction}>
          <Stack spacing={10}>
            <Heading as="h1" size="xl" textAlign="center">
              Welcome to AniRealm
            </Heading>
            <Text fontSize="lg" textAlign="center" maxW="500px">
              Before you embark on your epic anime adventure, we need a little
              info to get started.
            </Text>
            <FormControl isRequired>
              <FormLabel>What should we call you?</FormLabel>
              <Input
                name="username"
                variant="filled"
                placeholder="Enter username"
              />
            </FormControl>
            <FormControl isRequired>
              <FormLabel>What is your job title?</FormLabel>
              <Input
                name="jobTitle"
                variant="filled"
                placeholder="Enter job title"
              />
            </FormControl>
            <Button
              aria-disabled={isPending}
              colorScheme="purple"
              type="submit"
            >
              Log in
            </Button>
            <div aria-live="polite" aria-atomic="true">
              {errorMessage && <Text>{errorMessage}</Text>}
            </div>
          </Stack>
        </form>
      </Card>
    </Flex>
  );
};
