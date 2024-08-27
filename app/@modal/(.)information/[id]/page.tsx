import React from "react";
import { ModalDetails } from "../../../ui/ModalDetails";
import AnimeDetails from "@/app/ui/AnimeDetails";

const InterceptedRoute = ({ params }: { params: { id: string } }) => {
  console.log("intercepted route", params);
  return (
    <ModalDetails>
      <AnimeDetails id={params.id} />
    </ModalDetails>
  );
};

export default InterceptedRoute;
