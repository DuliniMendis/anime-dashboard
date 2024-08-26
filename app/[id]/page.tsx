import { Suspense } from "react";
import AnimeDetails from "../ui/AnimeDetails";

export default function DetailsPage({ params }: { params: { id: string } }) {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <AnimeDetails id={params.id} />
    </Suspense>
  );
}
