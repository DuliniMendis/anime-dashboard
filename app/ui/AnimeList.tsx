"use client";

import { useSuspenseQuery } from "@apollo/client";
import {
  Text,
  Card,
  CardBody,
  Heading,
  Stack,
  SimpleGrid,
  HStack,
} from "@chakra-ui/react";
import { GetPageQuery } from "../generated/graphql";
import { getPage } from "../graphql/pages";
import Image from "next/image";
import Link from "next/link";

export const AnimeList = () => {
  const { data, error } = useSuspenseQuery<GetPageQuery>(getPage);

  console.log({ data, error });

  return (
    <SimpleGrid columns={{ base: 1, sm: 1, md: 1, lg: 2, xl: 3 }} spacing={4}>
      {data?.Page?.media?.map((media) => (
        <Link href={`/${media?.id}}`} key={media?.id}>
          <Card width={350} height={180} key={media?.id}>
            <CardBody>
              <HStack spacing="5">
                <Image
                  src={media?.coverImage?.medium || ""}
                  alt={media?.title?.english || ""}
                  height={100}
                  width={100}
                  style={{ width: "100px", height: "140px" }}
                />
                <Stack spacing="3">
                  <Heading size="sm">{media?.title?.english}</Heading>
                  <Text fontSize="sm">
                    {media?.genres?.slice(0, 3).join(", ")}
                  </Text>
                  <Text color="blue.500">Rating: {media?.averageScore}</Text>
                </Stack>
              </HStack>
            </CardBody>
          </Card>
        </Link>
      ))}
    </SimpleGrid>
  );
};
