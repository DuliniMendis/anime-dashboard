"use client";

import { useSuspenseQuery } from "@apollo/client";
import { SimpleGrid } from "@chakra-ui/react";
import { getPage } from "../graphql/pages";
import Link from "next/link";
import { AnimeCard } from "./Card";
import { GetPageQuery } from "../graphql/pages.generated";

export const AnimeList = () => {
  const { data, error } = useSuspenseQuery<GetPageQuery>(getPage);

  return (
    <SimpleGrid columns={{ base: 1, sm: 1, md: 2, lg: 2, xl: 3 }} spacing={4}>
      {data?.Page?.media?.map(
        (media) =>
          media && (
            <Link href={`/information/${media?.id}`} key={media?.id}>
              <AnimeCard media={media} />
            </Link>
          )
      )}
    </SimpleGrid>
  );
};
