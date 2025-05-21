"use client";

import { api } from "@/trpc/react";
import { TutorCard } from "./tutor-card";
import LoadingTutoresContainer from "./loading-tutores";

export default function TutoresContainer() {
  const { data: tutores, isLoading } = api.admin.usuarios.getAllTutores.useQuery();

  if (isLoading) {
    return <LoadingTutoresContainer />;
  }

  return (
    <div className="flex w-full flex-row gap-x-8 px-4">
      <div className="grid w-full grid-cols-1 content-center justify-center gap-8 px-8 md:grid-cols-2 lg:grid-cols-3 xl:px-12 ">
        {(tutores ?? []).map((tutor) => {
          return <TutorCard key={tutor.userId} tutor={tutor} className="grid-flow-row" />;
        })}
      </div>
    </div>
  );
}
