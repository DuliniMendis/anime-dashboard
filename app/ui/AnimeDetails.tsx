"use client";

import { useSuspenseQuery } from "@apollo/client";
import { Container, Heading, Box, Text, Image, Flex } from "@chakra-ui/react";
import { notFound } from "next/navigation";
import { getMedia } from "../graphql/pages";
import { GetMediaQuery } from "../graphql/pages.generated";

export default function AnimeDetails({ id }: { id: string }) {
  console.log("AnimeDetails", id);
  const { data } = useSuspenseQuery<GetMediaQuery>(getMedia, {
    variables: { id },
    fetchPolicy: "cache-and-network",
  });

  if (!data.Media) {
    notFound();
  }

  return (
    <>
      <Flex alignItems="center" justifyContent={"center"} mt="3rem">
        <Image
          src={data.Media.bannerImage || ""}
          alt={data.Media.title?.english || ""}
          width="100%"
          style={{ borderRadius: "1rem" }}
        />
      </Flex>
      <Container maxW="container.md" p="6">
        <Box>
          <Heading as="h1" size="xl">
            {data.Media.title?.english}
          </Heading>
          {data.Media.description?.split("<br>").map((line, index) => (
            <Text mt="4" fontSize="sm" key={index}>
              {line}
            </Text>
          ))}
        </Box>
      </Container>
    </>
  );
}
