import NextAuth, { DefaultSession } from 'next-auth'

// Needed to extend the session object in next-auth so a userId can be stored in there
declare module 'next-auth' {
  interface Session {
    user: {
      id: string
    }
  }
}
