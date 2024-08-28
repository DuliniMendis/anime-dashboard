import { Suspense } from "react";
import AnimeDetails from "../../ui/Details";
import Link from "next/link";
import { Button, Flex } from "@chakra-ui/react";

export default function DetailsPage({ params }: { params: { id: string } }) {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <AnimeDetails id={params.id} />
      <Flex justifyContent="center">
        <Link href="/information">
          <Button colorScheme="purple">Go Back</Button>
        </Link>
      </Flex>
    </Suspense>
  );
}
