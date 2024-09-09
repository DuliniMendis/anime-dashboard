import NextAuth from 'next-auth'
import { authConfig } from './auth.config'
import Credentials from 'next-auth/providers/credentials'
import { sql } from '@vercel/postgres'
import { User, UserDBRecord } from './app/lib/types'

export const getOrInsertUser = async (
  username: string,
  jobTitle: string,
): Promise<User | undefined> => {
  try {
    let id: string
    const users =
      await sql<UserDBRecord>`SELECT id FROM anime_users WHERE username=${username}`

    if (users.rows[0]) {
      id = users.rows[0].id
    } else {
      await sql<User>`INSERT INTO anime_users (username, job_title) VALUES (${username}, ${jobTitle})`
      const createdUsers =
        await sql<UserDBRecord>`SELECT id FROM anime_users WHERE username=${username}`
      if (!createdUsers.rows[0]) {
        throw new Error('Failed to create user.')
      }
      id = createdUsers.rows[0].id
    }
    return {
      id,
      username,
      jobTitle,
    }
  } catch (error) {
    throw new Error('Failed to fetch user.')
  }
}

export const {
  auth,
  signIn,
  signOut,
  handlers: { GET, POST },
} = NextAuth({
  ...authConfig,
  providers: [
    Credentials({
      async authorize(credentials) {
        const { username, jobTitle } = credentials as User
        const user = await getOrInsertUser(username, jobTitle)
        return user || null
      },
    }),
  ],
})
