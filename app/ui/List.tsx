"use client";

import { useSuspenseQuery } from "@apollo/client";
import { SimpleGrid } from "@chakra-ui/react";
import { getPage } from "../lib/graphql/pages";
import Link from "next/link";
import { AnimeCard } from "./Card";
import {
  BasicMediaInfoFragment,
  GetPageQuery,
} from "../lib/graphql/pages.generated";
import { useEffect } from "react";

export const List = ({
  currentPage,
  updatePagination,
}: {
  currentPage: number;
  updatePagination: (pageInfo: {
    totalPages: number;
    itemsPerPage: number;
  }) => void;
}) => {
  const { data } = useSuspenseQuery<GetPageQuery>(getPage, {
    variables: { page: currentPage },
    fetchPolicy: "cache-and-network",
  });

  const items = data?.Page?.media as BasicMediaInfoFragment[];

  useEffect(() => {
    const totalPages = data?.Page?.pageInfo?.total;
    const itemsPerPage = data?.Page?.pageInfo?.perPage;
    if (totalPages && itemsPerPage) {
      updatePagination({ totalPages, itemsPerPage });
    }
  }, [data]);

  return (
    <SimpleGrid columns={{ base: 1, sm: 1, md: 2, lg: 2, xl: 3 }} spacing={4}>
      {items.map((item) => (
        <Link href={`/information/${item.id}`} key={item.id}>
          <AnimeCard media={item} />
        </Link>
      ))}
    </SimpleGrid>
  );
};
