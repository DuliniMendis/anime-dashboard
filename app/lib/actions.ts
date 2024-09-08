'use server'

import { sql } from '@vercel/postgres'
import { AuthError } from 'next-auth'
import { User, UserDBRecord } from './types'
import { signIn, signOut, auth } from '../../auth'

// These are all the server actions that are called from the client.
export const logIn = async (user: User) => {
  try {
    await signIn('credentials', user)
  } catch (error) {
    if (error instanceof AuthError) {
      return 'Something went wrong while logging in'
    }
    throw error
  }
}

export const logOut = async () => {
  await signOut()
}

const checkIfLoggedIn = async () => {
  const session = await auth()

  if (!session) {
    throw new Error('Failed to fetch user.')
  }
}

export const editDetails = async (
  prevUserName: string,
  username: string,
  jobTitle: string,
) => {
  await checkIfLoggedIn()

  try {
    if (prevUserName !== username) {
      const usernameExists = await doesUsernameExist(username)

      if (usernameExists) {
        throw new Error('Username already exists.')
      }
    }
    await sql`UPDATE anime_users SET username=${username}, job_title=${jobTitle} WHERE username=${prevUserName}`
  } catch (error) {
    throw new Error('Failed to update user.')
  }
}

export const getUser = async (id: string) => {
  await checkIfLoggedIn()

  const users =
    await sql<UserDBRecord>`SELECT * FROM anime_users WHERE id=${id}`

  if (!users.rows[0]) {
    throw new Error('User not found.')
  }

  return {
    id,
    username: users.rows[0].username,
    jobTitle: users.rows[0].job_title,
  }
}

export const doesUsernameAndJobTitleMatch = async (
  username: string,
  jobTitle: string,
) => {
  const users =
    await sql<UserDBRecord>`SELECT username, job_title FROM anime_users WHERE username=${username}`

  return users.rows.length === 0 || users.rows[0]?.job_title === jobTitle
}

export const doesUsernameExist = async (username: string) => {
  const users =
    await sql<UserDBRecord>`SELECT id FROM anime_users WHERE username=${username}`

  return users.rows.length > 0
}
