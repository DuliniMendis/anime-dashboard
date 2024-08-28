'use client'

import { HttpLink } from '@apollo/client'
import {
  ApolloNextAppProvider,
  ApolloClient,
  InMemoryCache,
} from '@apollo/experimental-nextjs-app-support'

const makeClient = () => {
  const httpLink = new HttpLink({
    // keeping this url here instead of in a .env file because
    // - it's a public API
    // - it's visible in the network tab anyway
    uri: 'https://graphql.anilist.co',
  })

  return new ApolloClient({
    cache: new InMemoryCache(),
    link: httpLink,
  })
}

export const ApolloProvider = ({ children }: React.PropsWithChildren) => {
  return (
    <ApolloNextAppProvider makeClient={makeClient}>
      {children}
    </ApolloNextAppProvider>
  )
}
