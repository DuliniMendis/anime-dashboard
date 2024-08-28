import { Container, Heading, Stack } from "@chakra-ui/react";
import { AnimeList } from "../ui/ListWithPagination";

export default function Information() {
  return (
    <Container maxW="1200px" paddingTop={20}>
      <Stack spacing="7" alignItems="center">
        <Heading
          as="h2"
          size="xl"
          textAlign="center"
          maxW="800px"
          padding="0 2rem"
        >
          Take a peek at the most popular anime shows of the season
        </Heading>
        <AnimeList />
      </Stack>
    </Container>
  );
}
