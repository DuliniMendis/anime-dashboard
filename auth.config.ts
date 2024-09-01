import type { NextAuthConfig, Session } from 'next-auth'

export const authConfig = {
  pages: {
    signIn: '/login',
  },
  session: {
    strategy: 'jwt',
  },
  callbacks: {
    authorized({ auth, request: { nextUrl } }) {
      const isLoggedIn = !!auth?.user
      const isOnLogin = nextUrl.pathname.startsWith('/login')
      if (!isOnLogin) {
        // If not in login page and logged in --> Return true and let the user access the page
        // If not in login page and not logged in --> Redirect to login page
        return isLoggedIn
      }
      // If in login page and logged in --> Redirect to home page
      if (isLoggedIn) {
        return Response.redirect(new URL('/', nextUrl))
      }
      // If in login page and not logged in --> Keep them in the login page
      return true
    },
    // store the user id in the token
    async jwt({ token, user }) {
      if (user) {
        token.userId = user.id
      }
      return token
    },
    // then get the userId from the token and pass it on to the session
    session({ token, session }) {
      if (token.userId) {
        return {
          ...session,
          user: {
            id: token.userId as string,
          },
        }
      }

      return session
    },
  },
  providers: [],
} satisfies NextAuthConfig
