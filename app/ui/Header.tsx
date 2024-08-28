"use client";

import {
  Flex,
  Heading,
  Menu,
  MenuButton,
  Avatar,
  MenuList,
  MenuItem,
  Box,
  HStack,
  Stack,
  Text,
} from "@chakra-ui/react";
import Image from "next/image";
import { logOut } from "../lib/actions";
import { useRouter } from "next/navigation";
import { useUserContext } from "../lib/context/userContext";

export const Header = () => {
  const { user, setUser } = useUserContext();

  const router = useRouter();

  const handleEditDetails = () => {
    router.push("/edit");
  };

  const handleLogOut = async () => {
    setUser(undefined);
    await logOut();
  };

  return (
    <Box px={4} py={3} as="header">
      <Flex justify="space-between" align="center" maxW="1200px" mx="auto">
        <HStack spacing={10}>
          <Image src="/anilogo.png" alt="AniRealm" width="50" height="50" />
          <Heading as="h1" size="lg" color="white">
            AniRealm
          </Heading>
        </HStack>
        {/* Avatar with Dropdown */}
        {user && (
          <HStack spacing={5}>
            <Stack spacing={0} textAlign="right">
              <Heading size="sm">{user.jobTitle}</Heading>
              <Text size="sm">{user.jobTitle}</Text>
            </Stack>

            <Menu>
              <MenuButton rounded="full">
                <Avatar size="md" />
              </MenuButton>
              <MenuList>
                <MenuItem onClick={handleEditDetails}>Edit details</MenuItem>
                <MenuItem onClick={handleLogOut}>Log out</MenuItem>
              </MenuList>
            </Menu>
          </HStack>
        )}
      </Flex>
    </Box>
  );
};
