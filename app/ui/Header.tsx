"use client";

import {
  Flex,
  Heading,
  Menu,
  MenuButton,
  Button,
  Avatar,
  MenuList,
  MenuItem,
  Box,
  HStack,
} from "@chakra-ui/react";
import Image from "next/image";
import { logOut } from "../lib/actions";

export const Header = () => {
  const handleEditDetails = () => {};

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
        <Menu>
          <MenuButton
            as={Button}
            rounded="full"
            variant="link"
            cursor="pointer"
            minW={0}
            color="white"
            _hover={{ textDecoration: "none" }}
          >
            <Avatar size="md" />
          </MenuButton>
          <MenuList>
            <MenuItem onClick={handleEditDetails}>Edit details</MenuItem>
            <MenuItem onClick={logOut}>Log out</MenuItem>
          </MenuList>
        </Menu>
      </Flex>
    </Box>
  );
};
