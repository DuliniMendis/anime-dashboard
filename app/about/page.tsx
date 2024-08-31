import React from 'react'
import {
  Heading,
  Text,
  Link,
  UnorderedList,
  ListItem,
  Code,
  Flex,
  Stack,
} from '@chakra-ui/react'

export default function About() {
  return (
    <Flex justifyContent='center'>
      <Stack py='5rem' maxW='800px' spacing='1rem'>
        <Heading as='h1' size='xl' mb={4}>
          Behind the scenes
        </Heading>

        <Text mb={4}>
          This is a simple list and details pages app made with{' '}
          <Link
            href='https://github.com/vercel/next.js/tree/canary/packages/create-next-app'
            isExternal
            color='teal.100'
          >
            create-next-app
          </Link>{' '}
          using{' '}
          <Link href='https://nextjs.org/' isExternal color='teal.100'>
            Next.js
          </Link>{' '}
          version 14.
        </Text>
        <Text>
          I learnt a bunch of new NextJs features while doing this so I am happy
          about the time I spent on it. It was definitely more than 2 hours.
        </Text>
        <Text>
          ChatGPT helped a bit too. I would be alarmed if someone does not use
          it for dev work these days.
        </Text>

        <Heading as='h2' size='md' my={2}>
          See the code
        </Heading>

        <Text mb={4}>
          You can see the code in{' '}
          <Link
            href='https://github.com/DuliniMendis/anime-dashboard'
            isExternal
            color='teal.100'
          >
            this Git repo.
          </Link>
          Hopefully, I have not broken it while trying to improve it.
        </Text>

        <Heading as='h2' size='md' mb={2}>
          The development process
        </Heading>

        <Text mb={2}>
          <strong>GraphQL</strong>
        </Text>
        <UnorderedList mb={4}>
          <ListItem>
            I setup <Code>graphql-codegen</Code> to generate types with the
            co-location plugin to prevent types from the two queries I was using
            from conflicting with each other.
          </ListItem>
          <ListItem>
            Ideally, I would also make a factory generator that generates mock
            data for each query so they can be used in testing.
          </ListItem>
        </UnorderedList>

        <Text mb={2}>
          <strong>Forms</strong>
        </Text>
        <UnorderedList mb={4}>
          <ListItem>
            The forms do not have loading states and error messages coming back
            from the server. If I had more time, I would have added those.
          </ListItem>
        </UnorderedList>

        <Text mb={2}>
          <strong>Modal and interception</strong>
        </Text>
        <UnorderedList mb={4}>
          <ListItem>
            I made the modal with anime details show up by using route
            interception. It could have been done in a simple modal but I
            thought I would try the parallel route concept just to add some
            (maybe unnecessary) complexity.
          </ListItem>
        </UnorderedList>

        <Text mb={2}>
          <strong>Styles</strong>
        </Text>
        <UnorderedList mb={4}>
          <ListItem>
            I extended the theme in <Code>Chakra UI</Code> a bit and used some
            Google fonts.
          </ListItem>
          <ListItem>
            This was the first time I used <Code>Chakra UI</Code> but it was
            pretty easy to use.
          </ListItem>
        </UnorderedList>

        <Text mb={2}>
          <strong>Authentication</strong>
        </Text>
        <UnorderedList mb={4}>
          <ListItem>
            I used <Code>next-auth</Code> to block routes until users logged in
            using a middleware pattern.
          </ListItem>
          <ListItem>
            I also added a <Code>Postgres</Code> database that stores the user
            data.
          </ListItem>
          <ListItem>
            <Code>Next-auth</Code> was so confusing to setup but I think I got
            it working.
          </ListItem>
          <ListItem>
            When you log in, a session is created with the <Code>userId</Code>{' '}
            saved in the session.
          </ListItem>
          <ListItem>
            A <Code>UserContext</Code> reads the <Code>userId</Code> from the
            session and fetches the full user from the DB using server actions.
          </ListItem>
          <ListItem>
            When user details are edited, the <Code>UserContext</Code> is
            updated as well.
          </ListItem>
          <ListItem>
            The login and edit details forms show an error if you try to use a
            username that is already used with a job title that does not match
            the existing username. Since this is a made-up scenario and users
            will not be using usernames and job titles to log in, I thought it
            was fine to show this error. I would not do this if passwords were
            involved since you can find passwords of other users with this
            security loophole.
          </ListItem>
        </UnorderedList>

        <Text mb={2}>
          <strong>Testing</strong>
        </Text>
        <UnorderedList mb={4}>
          <ListItem>
            I configured <Code>jest</Code> and{' '}
            <Code>React Testing Library</Code> and wrote a few unit tests.
            Obviously, they are just examples and not comprehensive at all.
          </ListItem>
          <ListItem>
            There are no E2E tests, but that would be something I would have in
            a typical CI/CD pipeline.
          </ListItem>
          <ListItem>
            I would have used <Code>faker-js</Code> for mocking values for tests
            but I did not do it in this app since it might be overkill.
          </ListItem>
        </UnorderedList>

        <Text mb={2}>
          <strong>Formatting</strong>
        </Text>
        <UnorderedList mb={4}>
          <ListItem>
            I added <Code>Prettier</Code> for making formatting consistent.
          </ListItem>
          <ListItem>
            I would have added an import sorting package as well if I had time.
          </ListItem>
        </UnorderedList>
      </Stack>
    </Flex>
  )
}
