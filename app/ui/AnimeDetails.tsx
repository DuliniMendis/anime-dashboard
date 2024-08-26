"use client";

import { useSuspenseQuery } from "@apollo/client";
import { Container, Heading, Box, Text, Image } from "@chakra-ui/react";
import { notFound } from "next/navigation";
import { GetMediaQuery } from "../generated/graphql";
import { getMedia } from "../graphql/pages";

export default function AnimeDetails({ id }: { id: string }) {
  const { data } = useSuspenseQuery<GetMediaQuery>(getMedia, {
    variables: { id },
  });

  if (!data.Media) {
    notFound();
  }

  return (
    <>
      <Image
        src={data.Media.bannerImage || ""}
        alt={data.Media.title?.english || ""}
        width="100vw"
      />
      <Container maxW="container.md" mt="8">
        <Box p="6">
          <Heading as="h1" size="xl">
            {data.Media.title?.english}
          </Heading>
          {data.Media.description?.split("<br>").map((line, index) => (
            <Text mt="4" fontSize="md" key={index}>
              {line}
              <br />
            </Text>
          ))}
        </Box>
      </Container>
    </>
  );
}
