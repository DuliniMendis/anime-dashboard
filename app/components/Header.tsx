'use client'

import {
  Flex,
  Heading,
  Box,
  HStack,
  Avatar,
  Menu,
  MenuButton,
  MenuDivider,
  MenuItem,
  MenuList,
  Stack,
  Text,
} from '@chakra-ui/react'
import Image from 'next/image'

import Link from 'next/link'

import { colors } from '../styles/colors'
import { logOut } from '../lib/actions'
import { useUserContext } from '../lib/providers/UserContextProvider'

export const Header = () => {
  const { user } = useUserContext()

  const handleLogOut = async () => {
    await logOut()
    location.reload()
  }

  return (
    <Box px={4} py={3} as='header'>
      <Flex justify='space-between' align='center' maxW='1200px' mx='auto'>
        <Link href='/'>
          <HStack spacing={{ base: 3, md: 7 }}>
            <Image src='/anilogo.png' alt='AniRealm' width='50' height='50' />
            <Heading as='h1' size='lg' color='white'>
              AniRealm
            </Heading>
          </HStack>
        </Link>
        {user && (
          <HStack spacing={{ base: 3, md: 7 }}>
            <Stack spacing={0} textAlign='right'>
              <Heading size='sm'>{user.username}</Heading>
              <Text size='sm'>{user.jobTitle}</Text>
            </Stack>

            <Menu>
              <MenuButton rounded='full'>
                <Avatar
                  size='md'
                  name={user.username}
                  bgColor={colors.light}
                  color={colors.mid}
                  fontWeight={600}
                />
              </MenuButton>
              <MenuList>
                <Link href='/edit'>
                  <MenuItem>Edit details</MenuItem>
                </Link>
                <Link href='/about'>
                  <MenuItem>Behind the scenes</MenuItem>
                </Link>
                <MenuDivider borderColor='purple.500' />
                <MenuItem onClick={handleLogOut}>Log out</MenuItem>
              </MenuList>
            </Menu>
          </HStack>
        )}
      </Flex>
    </Box>
  )
}
