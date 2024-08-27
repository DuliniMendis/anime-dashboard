import {
  Container,
  Heading,
  Text,
  Stack,
  Link,
  Button,
} from "@chakra-ui/react";
import NextLink from "next/link";
import Image from "next/image";

export default function Home() {
  return (
    <>
      <Container maxW="1200px" padding="5rem 0">
        <Stack spacing="20" alignItems="center">
          <Stack spacing="10" textAlign="center" maxW="800px" padding="0 2rem">
            <Heading as="h2" size="xl">
              Embark on a wild journey through the realms of your favorite
              anime!
            </Heading>
            <Text fontSize="lg">
              Whether you are a seasoned otaku or a curious newbie, dive into a
              world where heroes never back down, friendships conquer all, and
              every episode leaves you craving more. Ready to unleash your inner
              fan? Your next adventure starts here!
            </Text>
          </Stack>
          <Link
            as={NextLink}
            colorScheme="purple"
            href="/information"
            variant="button"
          >
            <Button colorScheme="purple" size="lg">
              Enter the realm
            </Button>
          </Link>
        </Stack>
        <Image
          src="/coverimg.png"
          alt="cover image"
          width="500"
          height="500"
          style={{ position: "fixed", bottom: "0px", marginBottom: "-20px" }}
        />
      </Container>
    </>
  );
}
