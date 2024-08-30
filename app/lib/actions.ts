'use server'

import { sql } from '@vercel/postgres'
import { AuthError } from 'next-auth'
import { User, UserDBRecord } from './types'
import { signIn, signOut } from '../../auth'

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

export const editDetails = async (
  prevUserName: string,
  username: string,
  jobTitle: string,
) => {
  try {
    if (prevUserName !== username) {
      const users =
        await sql<UserDBRecord>`UPDATE username, job_title FROM anime_users WHERE username=${username}`

      if (users.rows.length) {
        throw new Error('Username already exists.')
      }
    }
    await sql`UPDATE anime_users SET username=${username}, job_title=${jobTitle} WHERE username=${prevUserName}`
  } catch (error) {
    throw new Error('Failed to update user.')
  }
}

export const getUser = async (id: string) => {
  const users =
    await sql<UserDBRecord>`SELECT * FROM anime_users WHERE id=${id}`

  if (!users.rows.length) {
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

  return users.rows.length === 0 || users.rows[0].job_title === jobTitle
}
