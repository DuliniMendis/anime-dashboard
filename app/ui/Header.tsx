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
  MenuDivider,
  Box,
} from "@chakra-ui/react";

export const Header = () => {
  const handleLogout = () => {
    // Handle logout logic here (e.g., clear auth tokens, redirect to login, etc.)
    alert("Logged out successfully!");
  };

  const handleEditDetails = () => {};

  return (
    <Box px={4} py={3} as="header">
      <Flex justify="space-between" align="center" maxW="1200px" mx="auto">
        {/* Site Title */}
        <Heading as="h1" size="lg" color="white">
          My Anime Site
        </Heading>

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
            <Avatar size="md" src="https://bit.ly/broken-link" />
          </MenuButton>
          <MenuList>
            <MenuItem onClick={handleEditDetails}>Edit Details</MenuItem>
            <MenuDivider />
            <MenuItem onClick={handleLogout}>Log Out</MenuItem>
          </MenuList>
        </Menu>
      </Flex>
    </Box>
  );
};
