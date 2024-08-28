"use client";

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
} from "@chakra-ui/react";
import { useUserContext } from "../../lib/context/userContext";
import { editDetails } from "../../lib/actions";
import { useRouter } from "next/navigation";

export const EditDetailsForm = () => {
  const { user, setUser } = useUserContext();

  const router = useRouter();

  const handleEditDetails = async (formData: FormData) => {
    if (user) {
      const username = formData.get("username") as string;
      const jobTitle = formData.get("jobTitle") as string;
      await editDetails(user?.username, username, jobTitle);
      setUser({ username, jobTitle });
      router.replace("/");
    }
  };

  const handleOnClose = () => {
    router.back();
  };

  return (
    <Flex height="90vh" align="center" justify="center">
      <Card px="5rem" py="3rem">
        <form action={handleEditDetails}>
          <Stack spacing={10}>
            <Heading as="h1" size="xl" textAlign="center">
              Do you want to change your details?
            </Heading>
            <FormControl isRequired>
              <FormLabel>What should we call you?</FormLabel>
              <Input
                name="username"
                variant="filled"
                placeholder="Enter username"
                defaultValue={user?.username}
              />
            </FormControl>
            <FormControl isRequired>
              <FormLabel>What is your job title?</FormLabel>
              <Input
                name="jobTitle"
                variant="filled"
                placeholder="Enter job title"
                defaultValue={user?.jobTitle}
              />
            </FormControl>
            <Flex justifyContent="flex-end">
              <HStack spacing={10}>
                <Button
                  colorScheme="purple"
                  onClick={handleOnClose}
                  variant="outline"
                >
                  Cancel
                </Button>
                <Button colorScheme="purple" type="submit">
                  Save
                </Button>
              </HStack>
            </Flex>
          </Stack>
        </form>
      </Card>
    </Flex>
  );
};
