import NextAuth from 'next-auth'
import { authConfig } from '../../auth.config'
import Credentials from 'next-auth/providers/credentials'
import { sql } from '@vercel/postgres'
import { User, UserDBRecord } from './types'

const getUser = async (
  username: string,
  jobTitle: string,
): Promise<User | undefined> => {
  try {
    let id: string
    const users =
      await sql<UserDBRecord>`SELECT id FROM anime_users WHERE username=${username}`

    if (!users.rows.length) {
      await sql<User>`INSERT INTO anime_users (username, job_title) VALUES (${username}, ${jobTitle})`
      const createdUsers =
        await sql<UserDBRecord>`SELECT id FROM anime_users WHERE username=${username}`
      id = createdUsers.rows[0].id
    } else {
      id = users.rows[0].id
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
