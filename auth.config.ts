import type { NextAuthConfig } from 'next-auth'

export const authConfig = {
  pages: {
    signIn: '/login',
  },
  callbacks: {
    authorized({ auth, request: { nextUrl } }) {
      const isLoggedIn = !!auth?.user
      const isOnLogin = nextUrl.pathname.startsWith('/login')
      if (!isOnLogin) {
        // If not in login page and not logged in --> Redirect to login page
        // If not in login page and logged in --> Return true and let the user access the page
        return isLoggedIn
      }
      // If in login page and logged in --> Redirect to home page
      if (isLoggedIn) {
        return Response.redirect(new URL('/', nextUrl))
      }
      // If in login page and not logged in --> Keep them in the login page
      return true
    },
  },
  providers: [],
} satisfies NextAuthConfig
