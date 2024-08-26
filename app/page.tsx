import { Suspense } from "react";
import { AnimeList } from "./ui/AnimeList";
import { Container, Heading, Text } from "@chakra-ui/react";

export default function Home() {
  return (
    <Container maxW="6xl" bg="blue.100">
      <Heading>Top Anime</Heading>
      <Text>Click on an anime to see more details</Text>
      <Suspense fallback={<div>Loading...</div>}>
        <AnimeList />
      </Suspense>
    </Container>
  );
}
