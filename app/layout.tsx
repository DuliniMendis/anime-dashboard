import type { Metadata } from 'next'
import { ThemeProvider } from './lib/providers/ThemeProvider'
import { ApolloProvider } from './lib/providers/ApolloProvider'
import { Header } from './components/Header'
import { Flex } from '@chakra-ui/react'
import { SessionProvider } from 'next-auth/react'
import { UserContextProvider } from './lib/providers/UserContextProvider'

export const metadata: Metadata = {
  title: 'AniRealm',
  description: 'A simple app to keep track of your favorite anime and manga',
}

export default function RootLayout({
  children,
  modal,
}: Readonly<{
  children: React.ReactNode
  modal: React.ReactNode
}>) {
  return (
    <html lang='en'>
      <body>
        <ApolloProvider>
          <ThemeProvider>
            <SessionProvider>
              <UserContextProvider>
                <Flex direction='column' height='100vh'>
                  <Header />
                  <Flex direction='column' flex='1' overflowY='auto' as='main'>
                    {children}
                  </Flex>
                </Flex>
                {modal}
              </UserContextProvider>
            </SessionProvider>
          </ThemeProvider>
        </ApolloProvider>
      </body>
    </html>
  )
}
