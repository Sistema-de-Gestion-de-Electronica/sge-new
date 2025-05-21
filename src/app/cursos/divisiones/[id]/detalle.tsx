"use client";

import { useRouter } from "next/navigation";
import { DivisionForm } from "./division-form";
import { CURSOS_ROUTE } from "@/shared/server-routes";

const rutaCurso = CURSOS_ROUTE.subRutas !== undefined ? CURSOS_ROUTE?.subRutas[2] : undefined;

export default function DetalleDivision({ id }: { id: string }) {
  const router = useRouter();

  const handleClickCancel = () => router.back();

  const handleClickSave = () => router.push(rutaCurso?.href ?? "");

  return <DivisionForm id={id} onCancel={handleClickCancel} onSubmit={handleClickSave} />;
}
