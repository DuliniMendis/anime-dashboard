import { SimpleGrid, Skeleton } from "@chakra-ui/react";

export const AnimeListFallback = () => {
  return (
    <SimpleGrid columns={{ base: 1, sm: 1, md: 2, lg: 2, xl: 3 }} spacing={4}>
      {new Array(10).fill(null).map((item) => (
        <Skeleton key={item} height="180px" width="350px" borderRadius="10px" />
      ))}
    </SimpleGrid>
  );
};
