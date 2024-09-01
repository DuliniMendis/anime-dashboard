import { SimpleGrid, Skeleton } from '@chakra-ui/react'

/**
 * The `AnimeListFallback` component serves as a visual placeholder while the actual anime list is loading.
 * It displays a grid of skeleton loaders that mimic the appearance of anime cards.
 *
 * @example
 * // Usage of the AnimeListFallback component as a placeholder during data loading
 *   <Suspense fallback={<AnimeListFallback />}>
 *     <AnimeList />
 *   </Suspense>
 */
export const AnimeListFallback = () => {
  return (
    <SimpleGrid columns={{ base: 1, sm: 1, md: 2, lg: 2, xl: 3 }} spacing={4}>
      {new Array(10).fill(null).map((_, i) => (
        <Skeleton key={i} height='180px' width='350px' borderRadius='10px' />
      ))}
    </SimpleGrid>
  )
}
