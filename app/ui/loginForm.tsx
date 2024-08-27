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
  FormErrorMessage,
} from "@chakra-ui/react";
import { authenticate, doesUsernameAndJobTitleMatch } from "@/app/lib/actions";
import { useContext, useEffect, useState } from "react";
import { UserContext } from "../context/userContext";

export const LoginForm = () => {
  const userContext = useContext(UserContext);

  const [username, setUsername] = useState("");
  const [jobTitle, setJobTitle] = useState("");
  const [mismatchError, setMismatchError] = useState("");

  const handleLogin = async (formData: FormData) => {
    const username = formData.get("username") as string;
    const jobTitle = formData.get("jobTitle") as string;
    await authenticate(undefined, formData);
    userContext?.setUser({ username, jobTitle });
  };

  const checkIfUsernameExists = async (username: string, jobTitle: string) => {
    const usernameAndJobTitleMismatch = await doesUsernameAndJobTitleMatch(
      username,
      jobTitle
    );
    console.log({ isUsernameUsed: usernameAndJobTitleMismatch });
    if (usernameAndJobTitleMismatch) {
      setMismatchError(
        "Username and job title does not match what was previously used."
      );
    } else {
      setMismatchError("");
    }
  };

  useEffect(() => {
    if (username && jobTitle) {
      checkIfUsernameExists(username, jobTitle);
    }
  }, [username, jobTitle]);

  console.log({ usernameError: mismatchError });

  return (
    <Flex height="90vh" align="center" justify="center">
      <Card px="5rem" py="3rem">
        <form action={handleLogin}>
          <Stack spacing={10}>
            <Heading as="h1" size="xl" textAlign="center">
              Welcome to AniRealm
            </Heading>
            <Text fontSize="lg" textAlign="center" maxW="500px">
              Before you embark on your epic anime adventure, we need a little
              info to get started.
            </Text>
            <FormControl isRequired isInvalid={!!mismatchError}>
              <FormLabel>What should we call you?</FormLabel>
              <Input
                name="username"
                variant="filled"
                placeholder="Enter username"
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
                name="jobTitle"
                variant="filled"
                placeholder="Enter job title"
                value={jobTitle}
                onChange={(e) => setJobTitle(e.target.value)}
              />
            </FormControl>
            <Button colorScheme="purple" type="submit">
              Log in
            </Button>
          </Stack>
        </form>
      </Card>
    </Flex>
  );
};
