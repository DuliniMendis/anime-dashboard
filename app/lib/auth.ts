import NextAuth from 'next-auth'
import { authConfig } from '../../auth.config'
import Credentials from 'next-auth/providers/credentials'
import { sql } from '@vercel/postgres'
import { User, UserDBRecord } from './types'

const getUser = async (
  username: string,
  jobTitle: string,
): Promise<User | undefined> => {
  let user: User
  try {
    const users =
      await sql<UserDBRecord>`SELECT username, job_title FROM anime_users WHERE username=${username}`

    if (!users.rows.length) {
      await sql<User>`INSERT INTO anime_users (username, job_title) VALUES (${username}, ${jobTitle})`
      const createdUsers =
        await sql<UserDBRecord>`SELECT username, job_title FROM anime_users WHERE username=${username}`
      user = {
        id: createdUsers.rows[0].id,
        username: createdUsers.rows[0].username,
        jobTitle: createdUsers.rows[0].job_title,
      }
    } else {
      user = {
        id: users.rows[0].id,
        username: users.rows[0].username,
        jobTitle: users.rows[0].job_title,
      }
    }
  } catch (error) {
    throw new Error('Failed to fetch user.')
  }

  if (jobTitle !== user.jobTitle) {
    throw new Error('Job title does not match.')
  }

  return user
}

export const { auth, signIn, signOut } = NextAuth({
  ...authConfig,
  providers: [
    Credentials({
      async authorize(credentials) {
        console.log({ credentials })
        const { username, jobTitle } = credentials as User
        const user = await getUser(username, jobTitle)
        return user || null
      },
    }),
  ],
})
